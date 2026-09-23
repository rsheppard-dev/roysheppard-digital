"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  validateContactForm,
  hasContactFormErrors,
  type ContactFormValues,
  type ContactFormErrors,
} from "@/lib/contact-form";

const EMPTY_VALUES: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  projectDetails: "",
};

const fieldClasses =
  "w-full rounded-md border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-red-600">
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

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  // Set after mount, not during render — render must stay pure, and this
  // only needs to be "roughly when the form became interactive" anyway.
  const renderedAtRef = useRef<number | null>(null);
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  function updateField<K extends keyof ContactFormValues>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fieldErrors = validateContactForm(values);
    setErrors(fieldErrors);

    if (hasContactFormErrors(fieldErrors)) {
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields below.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    const formEl = event.currentTarget;
    const honeypot = (new FormData(formEl).get("hp_field") as string) || "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          hpField: honeypot,
          renderedAt: renderedAtRef.current ?? undefined,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setStatus("error");
        setStatusMessage(
          data?.error || "Something went wrong sending your message. Please try again or email me directly.",
        );
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        return;
      }

      setStatus("success");
      setStatusMessage("Thanks — your message is on its way. I usually reply within a day.");
      setValues(EMPTY_VALUES);
      setErrors({});
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong sending your message — please check your connection and try again, or email me directly.",
      );
    }
  }

  const submitting = status === "submitting";

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex max-w-140 flex-col items-start gap-4 rounded-card border border-border bg-white p-8"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckIcon />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-bold text-ink">Message sent</h2>
          <p className="text-[15px] leading-relaxed text-muted-strong">{statusMessage}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-1 w-fit border-b-[1.5px] border-ink pb-0.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-140 flex-col gap-5">
      {/*
        Honeypot — hidden from real visitors, left blank by them; bots often
        fill every field. Deliberately named with no semantic meaning
        ("hp_field", not "website"/"url"/etc.) — a recognisable field name is
        a known false-positive trap, since password managers and some
        browser autofill heuristics fill it with the current page's URL even
        though it's positioned off-screen.
      */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="hp_field">Leave this field blank</label>
        <input type="text" id="hp_field" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && statusMessage && (
        <div role="alert" className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertIcon />
          <p className="text-sm">{statusMessage}</p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`${fieldClasses} ${errors.name ? "border-red-500" : "border-border"}`}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${fieldClasses} ${errors.email ? "border-red-500" : "border-border"}`}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-sm font-medium text-ink">
          Company or organisation <span className="text-muted-soft">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => updateField("company", e.target.value)}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? "company-error" : undefined}
          className={`${fieldClasses} ${errors.company ? "border-red-500" : "border-border"}`}
        />
        <FieldError id="company-error" message={errors.company} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="projectDetails" className="text-sm font-medium text-ink">
          Project details
        </label>
        <textarea
          id="projectDetails"
          name="projectDetails"
          rows={6}
          required
          placeholder="What are you looking to build, and what's prompted you to get in touch now?"
          value={values.projectDetails}
          onChange={(e) => updateField("projectDetails", e.target.value)}
          aria-invalid={Boolean(errors.projectDetails)}
          aria-describedby={errors.projectDetails ? "projectDetails-error" : undefined}
          className={`${fieldClasses} resize-y ${errors.projectDetails ? "border-red-500" : "border-border"}`}
        />
        <FieldError id="projectDetails-error" message={errors.projectDetails} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-fit items-center gap-2.5 rounded-pill bg-accent px-7 py-3.5 font-semibold text-ink transition-colors hover:bg-ink hover:text-cream disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
