import { NextResponse } from "next/server";
import { Resend } from "resend";
import { cta as fallbackCta, footer as fallbackFooter } from "@/content/site";
import { validateReviewForm, hasReviewFormErrors, type ReviewFormValues } from "@/lib/review-form";
import { sendMetaLead } from "@/lib/meta-capi";

export const runtime = "nodejs";

// Genuine visitors take at least this long to fill the form; a submission
// faster than this is almost certainly a bot.
const MIN_FILL_TIME_MS = 2500;

type ReviewRequestBody = ReviewFormValues & {
  /** Honeypot: real visitors never fill this in (hidden from view). Same pattern as /api/contact. */
  hpField?: string;
  /** Client-set timestamp (ms) of when the form was first rendered. */
  renderedAt?: number;
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

/** Always an absolute link in the email, whether the visitor typed a bare domain or a full address. */
function toUrl(website: string): string {
  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

export async function POST(request: Request) {
  let body: ReviewRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const values: ReviewFormValues = {
    website: typeof body.website === "string" ? body.website : "",
    name: typeof body.name === "string" ? body.name : "",
    email: typeof body.email === "string" ? body.email : "",
    notes: typeof body.notes === "string" ? body.notes : "",
  };

  // Honeypot tripped: pretend success so bots don't learn to avoid this field,
  // but never send anything. Logged because a fake success looks identical to a
  // real one from the client.
  if (body.hpField) {
    console.warn("[free-review] Honeypot field was filled in, treating as a bot, no email sent.");
    return NextResponse.json({ ok: true });
  }

  if (typeof body.renderedAt === "number") {
    const elapsed = Date.now() - body.renderedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) {
      console.warn(
        `[free-review] Submitted ${elapsed}ms after the form rendered (under the ${MIN_FILL_TIME_MS}ms minimum), treating as a bot, no email sent.`,
      );
      return NextResponse.json({ ok: true });
    }
  }

  const errors = validateReviewForm(values);
  if (hasReviewFormErrors(errors)) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || fallbackFooter.email || fallbackCta.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    const missing = [!apiKey && "RESEND_API_KEY", !fromEmail && "CONTACT_FROM_EMAIL"].filter(Boolean);
    console.error(
      `[free-review] Email delivery is not configured, missing ${missing.join(" and ")}. ` +
        "CONTACT_FROM_EMAIL must be an address on a domain verified with Resend. " +
        "The request below was NOT sent:",
      { name: values.name, email: values.email, website: values.website },
    );
    return NextResponse.json(
      { error: "Sorry, something went wrong sending your request. Please try again shortly." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const website = values.website.trim();
  const name = values.name.trim();
  const email = values.email.trim();
  const notes = values.notes.trim();

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Free website review request from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Website: ${toUrl(website)}`,
      notes ? "" : null,
      notes ? "Anything they'd like looked at:" : null,
      notes || null,
    ]
      .filter((line) => line !== null)
      .join("\n"),
    html: [
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      `<p><strong>Website:</strong> <a href="${escapeHtml(toUrl(website))}">${escapeHtml(website)}</a></p>`,
      notes ? `<p><strong>Anything they'd like looked at:</strong></p>` : "",
      notes ? `<p>${escapeHtml(notes).replace(/\n/g, "<br>")}</p>` : "",
    ].join("\n"),
  });

  if (error) {
    console.error("[free-review] Resend returned an error sending the request email:", error);
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
