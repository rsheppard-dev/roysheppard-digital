import { NextResponse } from "next/server";
import { Resend } from "resend";
import { cta as fallbackCta, footer as fallbackFooter } from "@/content/site";
import {
  POSITION_LABEL,
  describeAnswers,
  formatRange,
  hasQuoteRequestErrors,
  scoreQuiz,
  validateQuoteRequest,
  type QuizAnswers,
  type QuoteRequestValues,
} from "@/lib/cost-quiz";
import { sendMetaLead } from "@/lib/meta-capi";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

// Genuine visitors take at least this long to fill the form; a submission
// faster than this is almost certainly a bot.
const MIN_FILL_TIME_MS = 2500;

type QuoteRequestBody = Partial<QuoteRequestValues> & {
  /** The quiz path the visitor chose and their answers. Re-scored here, never trusted as sent. */
  path?: string;
  answers?: QuizAnswers;
  /** Honeypot: real visitors never fill this in (hidden from view). Same pattern as /api/contact. */
  hpField?: string;
  /** Client-set timestamp (ms) of when the quote form was first shown. */
  renderedAt?: number;
  /** Invisible Turnstile token, checked with Cloudflare before anything is sent. */
  turnstileToken?: string;
  /** The visitor's cookie-banner choice; the Meta Lead event is only sent when "granted". */
  consent?: string;
  /** Page the form was submitted from, reported to Meta as the event source. */
  sourceUrl?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: QuoteRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const values: QuoteRequestValues = {
    name: typeof body.name === "string" ? body.name : "",
    email: typeof body.email === "string" ? body.email : "",
    notes: typeof body.notes === "string" ? body.notes : "",
  };

  // Honeypot tripped: pretend success so bots don't learn to avoid this field,
  // but never send anything. Logged because a fake success looks identical to a real one.
  if (body.hpField) {
    console.warn("[website-cost] Honeypot field was filled in, treating as a bot, no email sent.");
    return NextResponse.json({ ok: true });
  }

  if (typeof body.renderedAt === "number") {
    const elapsed = Date.now() - body.renderedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) {
      console.warn(
        `[website-cost] Submitted ${elapsed}ms after the form showed (under the ${MIN_FILL_TIME_MS}ms minimum), treating as a bot, no email sent.`,
      );
      return NextResponse.json({ ok: true });
    }
  }

  const errors = validateQuoteRequest(values);
  if (hasQuoteRequestErrors(errors)) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors: errors }, { status: 422 });
  }

  const result = scoreQuiz(body.path, body.answers);
  if (!result) {
    return NextResponse.json({ error: "Please answer every question first." }, { status: 400 });
  }

  const turnstile = await verifyTurnstile(body.turnstileToken, { action: "website-cost", request });
  if (turnstile === "failed") {
    return NextResponse.json(
      { error: "We couldn't confirm you're a real person. Please refresh the page and try again." },
      { status: 400 },
    );
  }
  if (turnstile === "unavailable") {
    return NextResponse.json(
      { error: "Sorry, something went wrong sending your request. Please try again shortly." },
      { status: 503 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || fallbackFooter.email || fallbackCta.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    const missing = [!apiKey && "RESEND_API_KEY", !fromEmail && "CONTACT_FROM_EMAIL"].filter(Boolean);
    console.error(
      `[website-cost] Email delivery is not configured, missing ${missing.join(" and ")}. ` +
        "CONTACT_FROM_EMAIL must be an address on a domain verified with Resend. " +
        "The request below was NOT sent:",
      { name: values.name, email: values.email, path: result.path.id },
    );
    return NextResponse.json(
      { error: "Sorry, something went wrong sending your request. Please try again shortly." },
      { status: 503 },
    );
  }

  const name = values.name.trim();
  const email = values.email.trim();
  const notes = values.notes.trim();
  const estimate = formatRange({ from: result.estimateFrom, to: result.estimateTo });
  const range = formatRange(result.path);
  const answered = describeAnswers(result.path, body.answers ?? {});
  const verdict = `${estimate} (typical range for this kind of site is ${range}, their answers point to the ${POSITION_LABEL[result.position]})`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Website cost quiz: ${name} (${result.path.label}, ${estimate})`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      `Looking for: ${result.path.label}`,
      `Estimate shown to them: ${verdict}`,
      "",
      "Their answers:",
      ...answered.map((item) => `- ${item.question} ${item.answer}`),
      notes ? "" : null,
      notes ? "Anything else they'd like me to know:" : null,
      notes || null,
    ]
      .filter((line) => line !== null)
      .join("\n"),
    html: [
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>Looking for:</strong> ${escapeHtml(result.path.label)}</p>`,
      `<p><strong>Estimate shown to them:</strong> ${escapeHtml(verdict)}</p>`,
      `<p><strong>Their answers:</strong></p>`,
      `<ul>${answered
        .map((item) => `<li>${escapeHtml(item.question)} <strong>${escapeHtml(item.answer)}</strong></li>`)
        .join("")}</ul>`,
      notes ? `<p><strong>Anything else they'd like me to know:</strong></p>` : "",
      notes ? `<p>${escapeHtml(notes).replace(/\n/g, "<br>")}</p>` : "",
    ].join("\n"),
  });

  if (error) {
    console.error("[website-cost] Resend returned an error sending the quote request email:", error);
    return NextResponse.json(
      { error: "Sorry, something went wrong sending your request. Please try again shortly." },
      { status: 502 },
    );
  }

  if (body.consent === "granted") {
    await sendMetaLead(request, {
      name,
      email,
      sourceUrl: typeof body.sourceUrl === "string" ? body.sourceUrl : undefined,
    });
  }

  return NextResponse.json({ ok: true });
}
