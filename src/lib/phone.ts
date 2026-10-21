/** Formats a UK mobile like "07883066944" for display as "07883 066944". */
export function formatUkPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return /^07\d{9}$/.test(digits) ? `${digits.slice(0, 5)} ${digits.slice(5)}` : phone;
}

/** Digits-only `tel:` target, so the display spacing never reaches the dialler. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
