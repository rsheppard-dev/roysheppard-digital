import { NextResponse } from "next/server";
import { Resend } from "resend";
import { cta as fallbackCta, footer as fallbackFooter } from "@/content/site";
import { validateContactForm, hasContactFormErrors, type ContactFormValues } from "@/lib/contact-form";

export const runtime = "nodejs";

// Genuine visitors take at least this long to fill the form; a submission
// faster than this is almost certainly a bot.
const MIN_FILL_TIME_MS = 2500;

type ContactRequestBody = ContactFormValues & {
  /**
   * Honeypot — real visitors never fill this in (hidden from view). Named
   * with no semantic meaning on purpose: a field called "website" is a
   * known false-positive trap, since password managers and some browser
   * autofill heuristics fill any field named/labelled "website" with the
   * current page's URL even though it's positioned off-screen.
   */
  hpField?: string;
  /** Client-set timestamp (ms) of when the form was first rendered. */
  renderedAt?: number;
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
  let body: ContactRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const values: ContactFormValues = {
    name: typeof body.name === "string" ? body.name : "",
    email: typeof body.email === "string" ? body.email : "",
    company: typeof body.company === "string" ? body.company : "",
    projectDetails: typeof body.projectDetails === "string" ? body.projectDetails : "",
  };

  // Honeypot tripped: pretend success so bots don't learn to avoid this field,
  // but never send anything. This is the one deliberate "fake success" in
  // this route, and it's for bots, not genuine senders who hit a real error.
  // Logged (not just silent) because a fake success looks identical to a real
  // one from the client, and "success but no email" is otherwise a dead end.
  if (body.hpField) {
    console.warn("[contact] Honeypot field was filled in — treating as a bot, no email sent.");
    return NextResponse.json({ ok: true });
  }

  if (typeof body.renderedAt === "number") {
    const elapsed = Date.now() - body.renderedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) {
      console.warn(
        `[contact] Submitted ${elapsed}ms after the form rendered (under the ${MIN_FILL_TIME_MS}ms minimum) — treating as a bot, no email sent.`,
      );
      return NextResponse.json({ ok: true });
    }
  }

  const errors = validateContactForm(values);
  if (hasContactFormErrors(errors)) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fieldErrors: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || fallbackFooter.email || fallbackCta.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    const missing = [!apiKey && "RESEND_API_KEY", !fromEmail && "CONTACT_FROM_EMAIL"].filter(Boolean);
    console.error(
      `[contact] Email delivery is not configured — missing ${missing.join(" and ")}. ` +
        "CONTACT_FROM_EMAIL must be an address on a domain verified with Resend. " +
        "The form submission below was NOT sent:",
      { name: values.name, email: values.email, company: values.company },
    );
    return NextResponse.json(
      {
        error:
          "Sorry — the enquiry form isn't fully set up yet, so this couldn't be sent. Please email info@roysheppard.digital directly instead.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const name = values.name.trim();
  const email = values.email.trim();
  const company = values.company.trim();
  const projectDetails = values.projectDetails.trim();

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company/organisation: ${company}` : null,
      "",
      "Project details:",
      projectDetails,
    ]
      .filter((line) => line !== null)
      .join("\n"),
    html: [
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      company ? `<p><strong>Company/organisation:</strong> ${escapeHtml(company)}</p>` : "",
      `<p><strong>Project details:</strong></p>`,
      `<p>${escapeHtml(projectDetails).replace(/\n/g, "<br>")}</p>`,
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend returned an error sending the enquiry email:", error);
    return NextResponse.json(
      {
        error:
          "Sorry — something went wrong sending your message. Please try again, or email info@roysheppard.digital directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
