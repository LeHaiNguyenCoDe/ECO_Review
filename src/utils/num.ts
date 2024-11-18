/**
 * Returns the decimal part of a number.
 * 
 * @param num - The number to get the decimal part from.
 * @returns The decimal part of the number.
 */
const getDecimalPart = (num: number): number => {
  return num - Math.floor(num);
};

/**
 * Rounds a number to the nearest half.
 *
 * @param num - The number to round.
 * @returns The rounded number.
 */
const roundNumberToNearestHalf = (num: number): number => {
  return Math.round(num * 2) / 2;
};

export { roundNumberToNearestHalf, getDecimalPart };
