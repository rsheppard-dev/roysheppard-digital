"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { footer as fallbackFooter, cta as fallbackCta } from "@/content/site";
import {
  validateReviewForm,
  hasReviewFormErrors,
  type ReviewFormValues,
  type ReviewFormErrors,
} from "@/lib/review-form";
import { getStoredConsent } from "@/lib/consent";

const FALLBACK_EMAIL = fallbackFooter.email || fallbackCta.email;

const EMPTY_VALUES: ReviewFormValues = { website: "", name: "", email: "", notes: "" };

// 16px on phones: iOS zooms the whole page when a focused field's text is smaller.
const fieldClasses =
  "w-full rounded-[10px] border-[1.5px] bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-3 focus:ring-accent/35 transition-[border-color,box-shadow] duration-160";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-red-700">
      {message}
    </p>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  );
}

/** The free review request card. Posts to /api/free-review; `?site=` (from the homepage band) pre-fills the address. */
export function ReviewForm() {
  const [values, setValues] = useState<ReviewFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ReviewFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  // "validation" (fix the highlighted fields) vs "submit" (the send failed: offer the email fallback).
  const [errorKind, setErrorKind] = useState<"validation" | "submit" | null>(null);
  const renderedAtRef = useRef<number | null>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderedAtRef.current = Date.now();
    // Pre-fill after mount (one frame later) so the server and first client render match.
    const frame = requestAnimationFrame(() => {
      const site = new URLSearchParams(window.location.search).get("site");
      if (site) {
        setValues((prev) => ({ ...prev, website: site.slice(0, 200) }));
        // A homepage submission that arrives here counts as a started review, even if the form is never finished.
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "review_started", form_name: "free_review", review_site: site.slice(0, 200) });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Bring the success panel or error banner into view and focus it, for sighted and screen-reader users.
  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    messageRef.current?.focus({ preventScroll: true });
  }, [status]);

  function updateField<K extends keyof ReviewFormValues>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldErrors = validateReviewForm(values);
    setErrors(fieldErrors);

    if (hasReviewFormErrors(fieldErrors)) {
      setStatus("error");
      setErrorKind("validation");
      setStatusMessage("Please fix the highlighted fields below.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");
    setErrorKind(null);

    const honeypot = (new FormData(event.currentTarget).get("hp_field") as string) || "";

    try {
      const response = await fetch("/api/free-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          hpField: honeypot,
          renderedAt: renderedAtRef.current ?? undefined,
          consent: getStoredConsent(),
          sourceUrl: window.location.href,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus("error");
        if (data?.fieldErrors) {
          setErrorKind("validation");
          setErrors(data.fieldErrors);
          setStatusMessage(data?.error || "Please fix the highlighted fields below.");
        } else {
          setErrorKind("submit");
          setStatusMessage(data?.error || "Something went wrong sending your request.");
        }
        return;
      }

      // GTM triggers the GA4 lead event on this rather than on the success message's visibility.
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "generate_lead", form_name: "free_review" });

      setStatus("success");
      setErrorKind(null);
      setStatusMessage("Thanks, your request is on its way. I usually reply within 24 hours.");
      setValues(EMPTY_VALUES);
      setErrors({});
    } catch {
      setStatus("error");
      setErrorKind("submit");
      setStatusMessage("Something went wrong sending your request. Please check your connection and try again.");
    }
  }

  const submitting = status === "submitting";

  const card =
    "flex w-full max-w-130 flex-col gap-5 rounded-card border border-border-tan bg-paper p-6 shadow-[0_12px_32px_rgba(23,23,26,0.07)] sm:p-9";

  if (status === "success") {
    return (
      <div id="review-submitted" ref={messageRef} tabIndex={-1} role="status" className={`${card} items-start focus:outline-none`}>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckIcon />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-bold text-ink">Request sent</h2>
          <p className="text-[15px] leading-relaxed text-muted-strong">{statusMessage}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 w-fit border-b-[1.5px] border-ink pb-0.5 text-sm font-semibold text-ink transition-colors hover:border-accent-text hover:text-accent-text"
        >
          Request another review
        </button>
      </div>
    );
  }

  return (
    <form id="request-review" onSubmit={handleSubmit} noValidate className={`${card} scroll-mt-28`}>
      {/* Honeypot: hidden from real visitors and left blank; bots often fill every field. Named without meaning, like the contact form's. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="review_hp_field">Leave this field blank</label>
        <input type="text" id="review_hp_field" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-[26px] font-semibold leading-tight text-ink">Request your free review</h2>
        <p className="text-[15px] leading-relaxed text-muted-strong">Free, with no obligation to hire me afterwards.</p>
      </div>

      {status === "error" && statusMessage && (
        <div
          ref={messageRef}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-red-800 focus:outline-none"
        >
          <AlertIcon />
          <div className="flex flex-col gap-1">
            <p className="text-sm">{statusMessage}</p>
            {errorKind === "submit" && (
              <p className="text-sm">
                Or email{" "}
                <a href={`mailto:${FALLBACK_EMAIL}`} className="font-semibold underline underline-offset-2 hover:text-red-950">
                  {FALLBACK_EMAIL}
                </a>{" "}
                directly.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="review-website" className="text-sm font-semibold text-ink">
          Your website address
        </label>
        <input
          id="review-website"
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          required
          placeholder="yourbusiness.co.uk"
          value={values.website}
          onChange={(e) => updateField("website", e.target.value)}
          aria-invalid={Boolean(errors.website)}
          aria-describedby={errors.website ? "review-website-error" : undefined}
          className={`${fieldClasses} ${errors.website ? "border-red-500" : "border-muted-soft"}`}
        />
        <FieldError id="review-website-error" message={errors.website} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review-name" className="text-sm font-semibold text-ink">
          Your name
        </label>
        <input
          id="review-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "review-name-error" : undefined}
          className={`${fieldClasses} ${errors.name ? "border-red-500" : "border-muted-soft"}`}
        />
        <FieldError id="review-name-error" message={errors.name} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review-email" className="text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="review-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "review-email-error" : "review-email-hint"}
          className={`${fieldClasses} ${errors.email ? "border-red-500" : "border-muted-soft"}`}
        />
        {errors.email ? (
          <FieldError id="review-email-error" message={errors.email} />
        ) : (
          <span id="review-email-hint" className="text-[13px] text-muted-strong">
            The review is sent here.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review-notes" className="text-sm font-semibold text-ink">
          Anything you&apos;d like me to look at? <span className="font-normal text-muted-strong">Optional</span>
        </label>
        <textarea
          id="review-notes"
          name="notes"
          rows={3}
          value={values.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "review-notes-error" : undefined}
          className={`${fieldClasses} resize-y ${errors.notes ? "border-red-500" : "border-muted-soft"}`}
        />
        <FieldError id="review-notes-error" message={errors.notes} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-pill bg-accent px-7 py-4 text-[17px] font-semibold text-ink transition-[color,background-color,scale] ease-out-strong hover:bg-ink hover:text-cream enabled:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          "Sending…"
        ) : (
          <>
            Request free review <span aria-hidden="true" className="text-[19px]">→</span>
          </>
        )}
      </button>

      <p className="text-[13px] leading-relaxed text-muted-strong">
        I usually reply within 24 hours. I only use your contact details to send the review. By requesting a
        review you agree that I may share my findings about your website publicly, including on social media
        and on this site. I will never share your name or email. See the{" "}
        <a href="/privacy-policy" className="text-ink underline underline-offset-2 hover:text-accent-text">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
