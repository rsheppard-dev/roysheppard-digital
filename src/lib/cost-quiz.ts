/**
 * The website cost quiz: questions, price ranges and scoring.
 * Shared by the quiz on /website-cost and by /api/website-cost, which re-scores the answers
 * itself so the email Roy receives never relies on what the browser claims the result was.
 *
 * The ranges are Roy's published starting points. The quiz never invents a figure inside them:
 * it only says whether the answers point to the lower end, the middle or the upper end.
 */

export type PathId = "shop" | "business" | "redesign" | "features";

export type QuizOption = {
  id: string;
  label: string;
  /** How much this answer adds to the size of the job: 0 is the simplest option. */
  points: number;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

/** A fixed price band for the lower, middle or upper answers, used where the work varies too much for a sliding estimate. */
export type QuizTier = { from: number; to: number };

export type QuizPath = {
  id: PathId;
  label: string;
  description: string;
  /** Typical price range in pounds, as published on the cost pages. */
  from: number;
  to: number;
  /** Lower, middle and upper bands. When set, the result shows the band the answers fall in instead of a sliding estimate. */
  tiers?: [QuizTier, QuizTier, QuizTier];
  questions: QuizQuestion[];
};

const PAGE_COUNT_OPTIONS: QuizOption[] = [
  { id: "few", label: "A few pages (up to 5)", points: 0 },
  { id: "fuller", label: "A fuller site (6 to 10 pages)", points: 1 },
  { id: "large", label: "A large site (more than 10 pages)", points: 2 },
];

export const QUIZ_PATHS: QuizPath[] = [
  {
    id: "business",
    label: "A website for my business",
    description: "Showing what you do and bringing in enquiries.",
    from: 1200,
    to: 5000,
    questions: [
      { id: "size", prompt: "How big does the website need to be?", options: PAGE_COUNT_OPTIONS },
      {
        id: "features",
        prompt: "Does it need to do more than show information?",
        options: [
          { id: "info", label: "No, information and a contact form", points: 0 },
          { id: "forms", label: "Yes, such as bookings or quote requests", points: 1 },
          { id: "custom", label: "Yes, something specific to how my business works", points: 2 },
        ],
      },
      {
        id: "content",
        prompt: "How ready are your text and photos?",
        options: [
          { id: "ready", label: "They're ready to use", points: 0 },
          { id: "some", label: "Some are ready", points: 1 },
          { id: "help", label: "I need help with most of it", points: 2 },
        ],
      },
    ],
  },
  {
    id: "redesign",
    label: "A redesign of my current website",
    description: "A new look and better results from a site you already have.",
    from: 1200,
    to: 4000,
    questions: [
      { id: "size", prompt: "How big is your current website?", options: PAGE_COUNT_OPTIONS },
      {
        id: "change",
        prompt: "What needs to change?",
        options: [
          { id: "look", label: "The look and feel", points: 0 },
          { id: "lookworks", label: "The look and how it works", points: 1 },
          { id: "newfeatures", label: "The look, how it works and some new features", points: 2 },
        ],
      },
      {
        id: "content",
        prompt: "How much of the current content can stay?",
        options: [
          { id: "most", label: "Most of it", points: 0 },
          { id: "some", label: "Some of it needs rewriting", points: 1 },
          { id: "little", label: "Most of it needs rewriting", points: 2 },
        ],
      },
    ],
  },
  {
    id: "shop",
    label: "An online shop",
    description: "Selling your products online.",
    from: 2000,
    to: 6000,
    questions: [
      {
        id: "products",
        prompt: "How many products will you sell?",
        options: [
          { id: "small", label: "Up to 20", points: 0 },
          { id: "medium", label: "20 to 200", points: 1 },
          { id: "large", label: "More than 200", points: 2 },
        ],
      },
      {
        id: "selling",
        prompt: "How are your products sold?",
        options: [
          { id: "simple", label: "One price for each product", points: 0 },
          { id: "options", label: "Sizes, colours or other options", points: 1 },
          { id: "complex", label: "Made to order, bundles or subscriptions", points: 2 },
        ],
      },
      {
        id: "delivery",
        prompt: "How does delivery and payment work?",
        options: [
          { id: "uk", label: "UK delivery with one simple rule", points: 0 },
          { id: "rules", label: "Different rules by weight, place or country", points: 1 },
          { id: "trade", label: "I sell to the public and to businesses", points: 2 },
        ],
      },
      {
        id: "tools",
        prompt: "Does the shop need to connect to other tools?",
        options: [
          { id: "none", label: "No, just the shop", points: 0 },
          { id: "one", label: "One, such as a courier or my accounts", points: 1 },
          { id: "several", label: "Several, such as stock, accounts and couriers", points: 2 },
        ],
      },
      {
        id: "existing",
        prompt: "Do you already sell online?",
        options: [
          { id: "new", label: "No, this is a new shop", points: 0 },
          { id: "moving", label: "Yes, my products need moving across", points: 1 },
        ],
      },
    ],
  },
  {
    id: "features",
    label: "New features for my existing website",
    description: "Adding bookings, logins or something specific to how your business works.",
    from: 300,
    to: 5000,
    tiers: [
      { from: 300, to: 800 },
      { from: 800, to: 2500 },
      { from: 2500, to: 5000 },
    ],
    questions: [
      {
        id: "what",
        prompt: "What do you want to add?",
        options: [
          { id: "simple", label: "A form or simple tool, such as an enquiry form", points: 0 },
          { id: "standard", label: "Bookings, payments or customer accounts", points: 1 },
          { id: "specific", label: "Something specific to how my business works", points: 2 },
        ],
      },
      {
        id: "count",
        prompt: "How many separate features is that?",
        options: [
          { id: "one", label: "Just one", points: 0 },
          { id: "few", label: "Two or three", points: 1 },
          { id: "many", label: "Four or more, or a full system", points: 2 },
        ],
      },
      {
        id: "tools",
        prompt: "Does it need to connect to other tools?",
        options: [
          { id: "none", label: "No, it stands on its own", points: 0 },
          { id: "one", label: "One, such as a courier or my accounts", points: 1 },
          { id: "several", label: "Several, such as stock, accounts and couriers", points: 2 },
        ],
      },
      {
        id: "built",
        prompt: "How is your website built?",
        options: [
          { id: "custom", label: "It was custom-built", points: 0 },
          { id: "builder", label: "With a website builder such as Wix or Squarespace", points: 1 },
          { id: "unsure", label: "I'm not sure", points: 0 },
        ],
      },
    ],
  },
];

export type QuizAnswers = Record<string, string>;

export type QuizPosition = "lower" | "middle" | "upper";

export type QuizResult = {
  path: QuizPath;
  /** The full typical range for this kind of site. */
  from: number;
  to: number;
  /** The narrower estimate the answers point to, always inside from..to. */
  estimateFrom: number;
  estimateTo: number;
  position: QuizPosition;
  /** 0 (simplest answers) to 1 (most involved answers). */
  fraction: number;
};

export function getPath(id: unknown): QuizPath | undefined {
  return QUIZ_PATHS.find((path) => path.id === id);
}

export function formatPounds(value: number): string {
  return `£${value.toLocaleString("en-GB")}`;
}

export function formatRange(range: { from: number; to: number }): string {
  return `${formatPounds(range.from)} to ${formatPounds(range.to)}`;
}

/** Plain-language position for the result sentence and the email. */
export const POSITION_LABEL: Record<QuizPosition, string> = {
  lower: "lower end",
  middle: "middle",
  upper: "upper end",
};

/** Scores a full set of answers. Returns null if any question is unanswered or an answer isn't a real option. */
export function scoreQuiz(pathId: unknown, answers: unknown): QuizResult | null {
  const path = getPath(pathId);
  if (!path || typeof answers !== "object" || answers === null) return null;
  const given = answers as Record<string, unknown>;

  let points = 0;
  let max = 0;
  for (const question of path.questions) {
    const option = question.options.find((o) => o.id === given[question.id]);
    if (!option) return null;
    points += option.points;
    max += Math.max(...question.options.map((o) => o.points));
  }

  const fraction = max === 0 ? 0 : points / max;
  const position: QuizPosition = fraction < 0.34 ? "lower" : fraction < 0.67 ? "middle" : "upper";

  // Paths with fixed bands show the band the answers fall in, and place the marker at the middle of that band.
  if (path.tiers) {
    const tier = path.tiers[position === "lower" ? 0 : position === "middle" ? 1 : 2];
    const middle = (tier.from + tier.to) / 2;
    const bandFraction = (middle - path.from) / (path.to - path.from);
    return { path, from: path.from, to: path.to, estimateFrom: tier.from, estimateTo: tier.to, position, fraction: bandFraction };
  }

  // A window two fifths as wide as the full range, slid along it by how involved the answers are.
  const span = path.to - path.from;
  const window = span * 0.4;
  const low = path.from + fraction * (span - window);
  const estimateFrom = Math.round(low / 100) * 100;
  const estimateTo = Math.round((low + window) / 100) * 100;

  return { path, from: path.from, to: path.to, estimateFrom, estimateTo, position, fraction };
}

/** "Question: answer" lines for the email to Roy. Only real questions and options are ever included. */
export function describeAnswers(path: QuizPath, answers: QuizAnswers): { question: string; answer: string }[] {
  return path.questions.map((question) => ({
    question: question.prompt,
    answer: question.options.find((o) => o.id === answers[question.id])?.label ?? "",
  }));
}

export type QuoteRequestValues = {
  name: string;
  email: string;
  notes: string;
};

export type QuoteRequestErrors = Partial<Record<keyof QuoteRequestValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 120, email: 200, notes: 2000 };

/** Shared client/server validation for the "send me a written quote" step. */
export function validateQuoteRequest(values: QuoteRequestValues): QuoteRequestErrors {
  const errors: QuoteRequestErrors = {};

  const name = values.name.trim();
  if (!name) errors.name = "Enter your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  const email = values.email.trim();
  if (!email) errors.email = "Enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  if (values.notes.trim().length > LIMITS.notes) errors.notes = `Keep this under ${LIMITS.notes} characters.`;

  return errors;
}

export function hasQuoteRequestErrors(errors: QuoteRequestErrors): boolean {
  return Object.keys(errors).length > 0;
}
