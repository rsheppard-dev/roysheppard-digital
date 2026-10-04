export type ReviewFormValues = {
  website: string;
  name: string;
  email: string;
  notes: string;
};

export type ReviewFormErrors = Partial<Record<keyof ReviewFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// A bare domain or a full address: yourbusiness.co.uk, www.example.com/page, https://example.com
const WEBSITE_PATTERN = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/\S*)?$/i;

const LIMITS = {
  website: 200,
  name: 120,
  email: 200,
  notes: 2000,
};

/** Shared client/server validation so both sides enforce the same rules. */
export function validateReviewForm(values: ReviewFormValues): ReviewFormErrors {
  const errors: ReviewFormErrors = {};

  const website = values.website.trim();
  if (!website) {
    errors.website = "Enter your website address.";
  } else if (website.length > LIMITS.website || !WEBSITE_PATTERN.test(website)) {
    errors.website = "Enter a website address, like yourbusiness.co.uk.";
  }

  const name = values.name.trim();
  if (!name) {
    errors.name = "Enter your name.";
  } else if (name.length > LIMITS.name) {
    errors.name = `Keep your name under ${LIMITS.name} characters.`;
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Enter your email address.";
  } else if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (values.notes.trim().length > LIMITS.notes) {
    errors.notes = `Keep this under ${LIMITS.notes} characters.`;
  }

  return errors;
}

export function hasReviewFormErrors(errors: ReviewFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
