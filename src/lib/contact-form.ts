export type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  projectDetails: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  projectDetails: 4000,
};

/** Shared client/server validation so both sides enforce the same rules. */
export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

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

  if (values.company.trim().length > LIMITS.company) {
    errors.company = `Keep this under ${LIMITS.company} characters.`;
  }

  const projectDetails = values.projectDetails.trim();
  if (!projectDetails) {
    errors.projectDetails = "Tell me a bit about your project.";
  } else if (projectDetails.length < 10) {
    errors.projectDetails = "A few more details would help. A sentence or two is fine.";
  } else if (projectDetails.length > LIMITS.projectDetails) {
    errors.projectDetails = `Keep this under ${LIMITS.projectDetails} characters.`;
  }

  return errors;
}

export function hasContactFormErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
