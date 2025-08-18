/**
 * Converts a string to snake_case.
 * Replaces spaces and hyphens with underscores and converts to lowercase.
 * Example: "Hip-Hop" -> "hip_hop"
 * @param str The string to convert.
 * @returns The snake_cased string.
 */
export const toSnakeCase = (str: string | null | undefined): string => {
  if (!str) return "";
  return str
    .replace(/\s+/g, "_") // Replace one or more spaces with an underscore
    .replace(/-/g, "_") // Replace hyphens with an underscore
    .toLowerCase();
};
