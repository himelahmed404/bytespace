/** Small, dependency-free validators for the auth forms. Each returns an error message or "". */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;

export function validateEmail(value: string) {
  if (!value.trim()) return "Please enter your email.";
  return EMAIL_PATTERN.test(value.trim()) ? "" : "Please enter a valid email address.";
}

export function validatePassword(value: string) {
  if (!value) return "Please enter your password.";
  return value.length >= MIN_PASSWORD_LENGTH
    ? ""
    : `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
}

export function validateName(value: string) {
  return value.trim().length >= 2 ? "" : "Please enter your full name.";
}

/** Keeps only the fields that have an error. */
export function collectErrors<T extends Record<string, string>>(errors: T) {
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message)) as Partial<T>;
}
