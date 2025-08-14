import { ManagementClient } from "@/lib/clients";
import { sanitizeMethods } from "@/lib/helpers/sanitizeMethods";
import { Term } from "@contentstack/management/types/stack/taxonomy/terms";

/**
 *
 * @param uid The UID of the genre to fetch.
 * @returns A promise that resolves to the genre term if found, or undefined if not found.
 * This function fetches the genre term from the Contentstack management API
 * using the provided UID.
 */
export const getGenreByUid = async (uid: string): Promise<Term | undefined> => {
  try {
    const response = await ManagementClient.taxonomy("genres")
      .terms()
      .query({ uid })
      .find();

    return sanitizeMethods(response.items?.[0]) || undefined;
  } catch (error) {
    console.error("Error fetching genre by UID:", error);
  }
};

/**
 *
 * @returns A list of genres from the Contentstack management API.
 * This function fetches all terms of the "genres" taxonomy.
 * It returns an array of genres with their metadata.
 */
export const getGenres = async (): Promise<Term[] | undefined> => {
  try {
    const response = await ManagementClient.taxonomy("genres")
      .terms()
      .query()
      .find();

    return sanitizeMethods(response.items) || [];
  } catch (error) {
    console.error("Error fetching genres from taxonomy:", error);
    return;
  }
};
