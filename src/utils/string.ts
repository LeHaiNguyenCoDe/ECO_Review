/**
 * Capitalizes the first letter of each word in a string.
 * @param string - The input string.
 * @returns The input string with the first letter of each word capitalized.
 */
const capitalizeWords = (str: string): string => {
  const words = str.replace(/-/g, " ").split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  const capitalizedJoined = capitalizedWords.join(" ");
  return capitalizedJoined;
};

export { capitalizeWords };
