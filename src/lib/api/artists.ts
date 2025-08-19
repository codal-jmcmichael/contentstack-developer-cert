import { DeliveryClient } from "@/lib/clients";
import { Artist } from "@/types/contentStack/generated";
import { QueryOperation } from "@contentstack/delivery-sdk";

/**
 *
 * @returns A list of artists from the Contentstack delivery API.
 * This function fetches all entries of the "artist" content type.
 * It returns an array of artists with their metadata.
 */
export const getArtists = async (): Promise<Artist[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("artist")
      .entry()
      .includeMetadata()
      .find<Artist>();
    return response.entries ?? [];
  } catch (error) {
    console.error("Error fetching artists:", error);
    return [];
  }
};

/**
 *
 * @param slug The slug of the artist to fetch.
 * The slug is typically the URL-friendly version of the artist's name.
 * For example, "kendrick-lamar" for the URL "/artists/kendrick-lamar".
 * @returns
 */
export const getArtistByName = async (
  slug: string
): Promise<Artist | undefined> => {
  try {
    const query = await DeliveryClient.contentType("artist")
      .entry()
      .includeMetadata()
      .query()
      .where("url", QueryOperation.MATCHES, slug)
      .find<Artist>();
    const result = query?.entries?.[0];
    return result ?? undefined;
  } catch (error) {
    console.error(`Error fetching artist by slug "${slug}":`, error);
    return undefined;
  }
};
