import type { AuthScreenFormId } from "./types";

export type AuthFieldValues = Record<string, string>;
export type AuthFieldErrors = Partial<Record<string, string>>;

function getTrimmedValue(values: AuthFieldValues, fieldId: string) {
  return values[fieldId]?.trim() ?? "";
}

function getPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhoneNumber(value: string) {
  const digits = getPhoneDigits(value);
  return digits.length >= 7 && digits.length <= 15;
}

function isValidDateOfBirth(value: string) {
  const match = value.trim().match(/^(\d{2})\s*\/\s*(\d{2})\s*\/\s*(\d{4})$/);

  if (!match) {
    return false;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const parsedDate = new Date(year, month - 1, day);
  const today = new Date();

  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day &&
    year >= 1900 &&
    parsedDate <= today
  );
}

function getPasswordError(value: string) {
  if (!value.trim()) {
    return "Password is required.";
  }

  if (value.trim().length < 6) {
    return "Password must be at least 6 characters.";
  }

  return undefined;
}

export function validateAuthField(
  formId: AuthScreenFormId,
  fieldId: string,
  values: AuthFieldValues,
) {
  const trimmedValue = getTrimmedValue(values, fieldId);
  const rawValue = values[fieldId] ?? "";

  switch (formId) {
    case "login":
    case "login-alt":
      if (fieldId === "email") {
        if (!trimmedValue) {
          return "Email or mobile number is required.";
        }

        if (!isValidEmail(trimmedValue) && !isValidPhoneNumber(rawValue)) {
          return "Enter a valid email or mobile number.";
        }
      }

      if (fieldId === "password") {
        return getPasswordError(rawValue);
      }

      return undefined;
    case "sign-up":
      if (fieldId === "full-name") {
        if (!trimmedValue) {
          return "Full name is required.";
        }

        if (trimmedValue.length < 2) {
          return "Enter your full name.";
        }
      }

      if (fieldId === "password") {
        return getPasswordError(rawValue);
      }

      if (fieldId === "email") {
        if (!trimmedValue) {
          return "Email is required.";
        }

        if (!isValidEmail(trimmedValue)) {
          return "Enter a valid email address.";
        }
      }

      if (fieldId === "mobile-number") {
        if (!trimmedValue) {
          return "Mobile number is required.";
        }

        if (!isValidPhoneNumber(rawValue)) {
          return "Enter a valid mobile number.";
        }
      }

      if (fieldId === "date-of-birth") {
        if (!trimmedValue) {
          return "Date of birth is required.";
        }

        if (!isValidDateOfBirth(rawValue)) {
          return "Use DD / MM / YYYY.";
        }
      }

      return undefined;
    case "set-password":
      if (fieldId === "password") {
        return getPasswordError(rawValue);
      }

      if (fieldId === "confirm-password") {
        if (!trimmedValue) {
          return "Confirm your password.";
        }

        if (rawValue !== (values.password ?? "")) {
          return "Passwords do not match.";
        }
      }

      return undefined;
    default:
      return undefined;
  }
}

export function validateAuthForm(
  formId: AuthScreenFormId,
  values: AuthFieldValues,
) {
  const errors: AuthFieldErrors = {};

  Object.keys(values).forEach((fieldId) => {
    const error = validateAuthField(formId, fieldId, values);

    if (error) {
      errors[fieldId] = error;
    }
  });

  return errors;
}
