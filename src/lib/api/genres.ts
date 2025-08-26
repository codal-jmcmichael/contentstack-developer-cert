import { ManagementClient } from "@/lib/clients";
import { Term } from "@contentstack/management/types/stack/taxonomy/terms";

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
    console.log(response);
    return response?.terms || [];
  } catch (error) {
    console.error("Error fetching genres: ", error);
    return [];
  }
};
