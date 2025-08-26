import { ManagementClient } from "@/lib/clients";
import {
  Term,
  TermData,
} from "@contentstack/management/types/stack/taxonomy/terms";

export type Genre = Pick<TermData, "name" | "uid">;

/**
 *
 * @returns A list of genres from the Contentstack Management API.
 * This function fetches all terms of the `genre` taxonomy
 * and returns an array of results.
 */
export const getAllGenres = async (): Promise<Term[] | undefined> => {
  try {
    const response = await ManagementClient.taxonomy("music")
      .terms("genre")
      .descendants();
    return response?.terms || [];
  } catch (error) {
    console.error("Error fetching genres: ", error);
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
export const getGenreByUid = async (uid: string): Promise<Term | undefined> => {
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
