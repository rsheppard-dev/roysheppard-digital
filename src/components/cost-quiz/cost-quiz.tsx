"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { footer as fallbackFooter, cta as fallbackCta } from "@/content/site";
import {
  POSITION_LABEL,
  QUIZ_PATHS,
  formatPounds,
  getPath,
  hasQuoteRequestErrors,
  scoreQuiz,
  validateQuoteRequest,
  type PathId,
  type QuizAnswers,
  type QuoteRequestErrors,
  type QuoteRequestValues,
} from "@/lib/cost-quiz";
import { getStoredConsent } from "@/lib/consent";
import { TurnstileWidget, type TurnstileHandle } from "@/components/turnstile-widget";

const FALLBACK_EMAIL = fallbackFooter.email || fallbackCta.email;

const EMPTY_VALUES: QuoteRequestValues = { name: "", email: "", notes: "" };

// 16px on phones: iOS zooms the whole page when a focused field's text is smaller.
const fieldClasses =
  "w-full rounded-[10px] border-[1.5px] bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted focus:border-ink focus:outline-none focus:ring-3 focus:ring-accent/35 transition-[border-color,box-shadow] duration-160";

/** Sends an event to GTM. Outside the component so the page's own state isn't touched. */
function track(event: Record<string, string>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

const card =
  "flex w-full max-w-130 flex-col gap-6 rounded-card border border-border-tan bg-paper p-6 shadow-[0_12px_32px_rgba(23,23,26,0.07)] sm:p-9";

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

/** One answer: a full-width tap target that moves the quiz on. The previous answer stays marked when you go back. */
function OptionButton({
  label,
  description,
  selected,
  onSelect,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex min-h-14 w-full flex-col items-start gap-0.5 rounded-[10px] border-[1.5px] px-4 py-3.5 text-left transition-[border-color,background-color,scale] duration-160 ease-out-strong hover:border-ink active:scale-[0.98] ${
        selected ? "border-ink bg-accent-soft" : "border-border-tan bg-white"
      }`}
    >
      <span className="text-base font-semibold leading-snug text-ink">{label}</span>
      {description && <span className="text-sm leading-snug text-muted-strong">{description}</span>}
    </button>
  );
}

/**
 * The website cost quiz. Choose the kind of site, answer a few plain questions, see a typical range
 * straight away (no email needed), then optionally ask for a written quote. The range only ever uses
 * Roy's published figures; the answers decide whether it points to the lower end, the middle or the upper end.
 */
export function CostQuiz() {
  const [pathId, setPathId] = useState<PathId | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  // 0 is "what do you need", 1..n are that path's questions, n + 1 is the result.
  const [step, setStep] = useState(0);

  const [values, setValues] = useState<QuoteRequestValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<QuoteRequestErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorKind, setErrorKind] = useState<"validation" | "submit" | null>(null);

  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const renderedAtRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);

  const path = getPath(pathId);
  const questions = path?.questions ?? [];
  const resultStep = questions.length + 1;
  const onResult = path !== undefined && step === resultStep;
  const result = onResult ? scoreQuiz(pathId, answers) : null;

  // After the first move, send keyboard and screen-reader focus to the new question or result heading.
  useEffect(() => {
    if (!hasMovedRef.current) return;
    const heading = stepHeadingRef.current;
    if (!heading) return;
    heading.focus({ preventScroll: true });
    // The result card is taller than a question card, so on a phone the reader can be left part-way down it.
    const { top, bottom } = heading.getBoundingClientRect();
    if (top < 80 || bottom > window.innerHeight) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      heading.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
    }
  }, [step]);

  // The quote form's fill-time clock starts when the result appears.
  useEffect(() => {
    if (!result) return;
    renderedAtRef.current = Date.now();
    track({ event: "cost_quiz_completed", quiz_path: result.path.id, quiz_position: result.position });
  }, [result?.path.id, result?.position]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    messageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    messageRef.current?.focus({ preventScroll: true });
  }, [status]);

  function go(next: number) {
    hasMovedRef.current = true;
    setStep(next);
  }

  function choosePath(id: PathId) {
    if (id !== pathId) setAnswers({});
    setPathId(id);
    track({ event: "cost_quiz_started", quiz_path: id });
    go(1);
  }

  function answer(questionId: string, optionId: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    go(step + 1);
  }

  function startAgain() {
    setPathId(null);
    setAnswers({});
    setValues(EMPTY_VALUES);
    setErrors({});
    setStatus("idle");
    setStatusMessage("");
    setErrorKind(null);
    go(0);
  }

  function updateField<K extends keyof QuoteRequestValues>(field: K, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result) return;

    const fieldErrors = validateQuoteRequest(values);
    setErrors(fieldErrors);

    if (hasQuoteRequestErrors(fieldErrors)) {
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
      const turnstileToken = await turnstileRef.current?.getToken();
      const response = await fetch("/api/website-cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          path: result.path.id,
          answers,
          hpField: honeypot,
          turnstileToken,
          renderedAt: renderedAtRef.current ?? undefined,
          consent: getStoredConsent(),
          sourceUrl: window.location.href,
        }),
      });

      const data = await response.json().catch(() => null);
      turnstileRef.current?.reset();

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
      track({ event: "generate_lead", form_name: "cost_quiz" });

      setStatus("success");
      setErrorKind(null);
      setStatusMessage("Thanks, your answers are on their way. I usually reply within 24 hours with a written quote.");
      setValues(EMPTY_VALUES);
      setErrors({});
    } catch {
      turnstileRef.current?.reset();
      setStatus("error");
      setErrorKind("submit");
      setStatusMessage("Something went wrong sending your request. Please check your connection and try again.");
    }
  }

  // Thank-you state replaces the whole card, like the free review form.
  if (status === "success") {
    return (
      <div ref={messageRef} tabIndex={-1} role="status" className={`${card} items-start focus:outline-none`}>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CheckIcon />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-bold text-ink">Request sent</h2>
          <p className="text-[15px] leading-relaxed text-muted-strong">{statusMessage}</p>
        </div>
        <button
          type="button"
          onClick={startAgain}
          className="w-fit border-b-[1.5px] border-ink pb-0.5 text-sm font-semibold text-ink transition-colors hover:border-accent-text hover:text-accent-text"
        >
          Try another kind of website
        </button>
      </div>
    );
  }

  // Step 0: what kind of website.
  if (!path || step === 0) {
    return (
      <div className={card}>
        <div key="step-0" className="quiz-step flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[13px] text-muted-strong">Question 1</p>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="scroll-mt-28 text-[26px] font-semibold leading-tight text-ink focus:outline-none">
              What do you need?
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {QUIZ_PATHS.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                description={option.description}
                selected={pathId === option.id}
                onSelect={() => choosePath(option.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Steps 1..n: that path's questions.
  if (!onResult) {
    const question = questions[step - 1];
    const total = questions.length + 1;
    return (
      <div className={card}>
        <div key={`step-${step}`} className="quiz-step flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[13px] text-muted-strong">
              Question {step + 1} of {total}
            </p>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="scroll-mt-28 text-[26px] font-semibold leading-tight text-ink focus:outline-none">
              {question.prompt}
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {question.options.map((option) => (
              <OptionButton
                key={option.id}
                label={option.label}
                selected={answers[question.id] === option.id}
                onSelect={() => answer(question.id, option.id)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="tap-area w-fit border-b-[1.5px] border-ink pb-0.5 text-sm font-semibold text-ink transition-colors hover:border-accent-text hover:text-accent-text"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Result, then the optional written quote.
  if (!result) {
    // Only reachable if an answer is missing; send the visitor back to the first gap.
    return (
      <div className={card}>
        <p className="text-base text-muted-strong">Some answers are missing.</p>
        <button
          type="button"
          onClick={() => go(1)}
          className="w-fit border-b-[1.5px] border-ink pb-0.5 text-sm font-semibold text-ink hover:border-accent-text hover:text-accent-text"
        >
          Go back to the questions
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";
  // Marker sits between 8% and 92% of the line so it never touches the end labels.
  const stop = 8 + result.fraction * 84;

  return (
    <form onSubmit={handleSubmit} noValidate className={card}>
      {/* Honeypot: hidden from real visitors and left blank; bots often fill every field. */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cost_hp_field">Leave this field blank</label>
        <input type="text" id="cost_hp_field" name="hp_field" tabIndex={-1} autoComplete="off" />
      </div>
      <TurnstileWidget action="website-cost" ref={turnstileRef} />

      <div key="result" className="quiz-step flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[13px] text-muted-strong">{result.path.label}</p>
          <h2 ref={stepHeadingRef} tabIndex={-1} className="scroll-mt-28 text-[26px] font-semibold leading-tight text-ink focus:outline-none">
            {result.path.id === "features" ? "Features like yours typically cost" : "Websites like yours typically cost"}{" "}
            <span className="quiz-estimate whitespace-nowrap px-1.5">
              {formatPounds(result.estimateFrom)} to {formatPounds(result.estimateTo)}
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="relative h-5" role="img" aria-label={`Your answers point to the ${POSITION_LABEL[result.position]} of the full range, ${formatPounds(result.from)} to ${formatPounds(result.to)}`}>
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border-tan" />
            <div
              className="quiz-range-fill absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink"
              style={{ "--stop": `${100 - stop}%` } as React.CSSProperties}
            />
            <span
              className="quiz-range-marker absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-ink bg-accent"
              style={{ left: `${stop}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[13px] text-muted-strong">
            <span>{formatPounds(result.from)}</span>
            <span>{formatPounds(result.to)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-[15px] leading-relaxed text-muted-strong">
          <p>
            That&apos;s based on your answers, which point to the{" "}
            <strong className="font-semibold text-ink">{POSITION_LABEL[result.position]}</strong> of the scale above.
            {result.position === "upper" && " Bigger projects can go above it, and a written quote covers that properly."}
          </p>
          {result.path.id === "features" && answers.built === "builder" && (
            <p>
              Sites made with a website builder can limit what you can add, so this may mean rebuilding part of the site.
              I&apos;ll tell you if that applies when I send your quote.
            </p>
          )}
          {result.path.id === "features" && answers.built === "unsure" && (
            <p>I&apos;ll check how your site is built before I send your quote, since that can affect what&apos;s possible.</p>
          )}
          <p>This is a guide, not a quote. Your written quote is the real price.</p>
        </div>
      </div>

      <hr className="border-border-tan" />

      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-semibold leading-tight text-ink">Want a written quote for your project?</h3>
        <p className="text-[15px] leading-relaxed text-muted-strong">
          I&apos;ll get your answers with your details and usually reply within 24 hours. No obligation.
        </p>
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
        <label htmlFor="cost-name" className="text-sm font-semibold text-ink">
          Your name
        </label>
        <input
          id="cost-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => updateField("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "cost-name-error" : undefined}
          className={`${fieldClasses} ${errors.name ? "border-red-500" : "border-muted-soft"}`}
        />
        <FieldError id="cost-name-error" message={errors.name} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cost-email" className="text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="cost-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => updateField("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "cost-email-error" : "cost-email-hint"}
          className={`${fieldClasses} ${errors.email ? "border-red-500" : "border-muted-soft"}`}
        />
        {errors.email ? (
          <FieldError id="cost-email-error" message={errors.email} />
        ) : (
          <span id="cost-email-hint" className="text-[13px] text-muted-strong">
            Your quote is sent here.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="cost-notes" className="text-sm font-semibold text-ink">
          Anything else I should know? <span className="font-normal text-muted-strong">Optional</span>
        </label>
        <textarea
          id="cost-notes"
          name="notes"
          rows={3}
          value={values.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "cost-notes-error" : undefined}
          className={`${fieldClasses} resize-y ${errors.notes ? "border-red-500" : "border-muted-soft"}`}
        />
        <FieldError id="cost-notes-error" message={errors.notes} />
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
            Get my written quote <span aria-hidden="true">→</span>
          </>
        )}
      </button>

      <p className="text-[13px] leading-relaxed text-muted-strong">
        I only use your details to reply about your quote.{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
          Privacy policy
        </Link>
      </p>

      <button
        type="button"
        onClick={startAgain}
        className="tap-area w-fit border-b-[1.5px] border-ink pb-0.5 text-sm font-semibold text-ink transition-colors hover:border-accent-text hover:text-accent-text"
      >
        Start again
      </button>
    </form>
  );
}
