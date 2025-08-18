import { ManagementClient } from "@/lib/clients";
import { TermData } from "@contentstack/management/types/stack/taxonomy/terms";

export type Genre = Pick<TermData, "name" | "uid">;

/**
 *
 * @returns A list of genres from the Contentstack management API.
 * This function fetches all terms of the "genres" taxonomy.
 * It returns an array of genres with their metadata.
 */
export const getGenres = async (): Promise<Genre[] | undefined> => {
  try {
    const response = await ManagementClient.taxonomy("genres")
      .terms()
      .query()
      .find();

    return (
      response.items.map((term) => ({
        name: term.name,
        uid: term.uid,
      })) ?? []
    );
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

/**
 *
 * @param uid The UID of the genre to fetch.
 * @returns A promise that resolves to the genre term if found, or undefined if not found.
 * This function fetches the genre term from the Contentstack management API
 * using the provided UID.
 */
export const getGenreByUid = async (
  uid: string
): Promise<TermData | undefined> => {
  try {
    const response = await ManagementClient.taxonomy("genres")
      .term()
      .query({ uid })
      .find();
    return response.items?.[0] ?? undefined;
  } catch (error) {
    console.error(`Error fetching genre by UID "${uid}":`, error);
    return undefined;
  }
};
