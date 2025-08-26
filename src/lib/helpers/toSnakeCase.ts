/**
 * Converts a string from various formats to snake_case.
 *
 * @param term The input string to convert.
 * @returns The converted snake_case string.
 */
export const toSnakeCase = (term: string): string => {
  if (!term) return "";

  return (
    String(term)
      .replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
      .replace(/([a-z\d])([A-Z])/g, "$1_$2")
      .replace(/[\s-]+/g, "_")
      .toLowerCase()
  );
};
