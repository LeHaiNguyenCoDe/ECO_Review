import { DateTime } from "next-auth/providers/kakao";

/**
 * Checks if a given date is outdated.
 *
 * @param date - The date to check.
 * @returns `true` if the date is outdated, `false` otherwise.
 */
const isOutdated = (date: DateTime) => {
  if (!date) return false;

  return new Date(date) > new Date();
};

/**
 * Returns the current date and time.
 *
 * @returns {Date} The current date and time.
 */
const now = (): Date => {
  return new Date();
};

export { isOutdated, now };
