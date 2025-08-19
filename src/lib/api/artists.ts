import { DeliveryClient } from "@/lib/clients";
import { Artist } from "@/types/contentStack/generated";

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

type ArtistData = Artist & {
  uid: string;
};

/**
 *
 * @param slug The slug of the artist to fetch.
 * The slug is typically the URL-friendly version of the artist's name.
 * For example, "kendrick-lamar" for the URL "/artists/kendrick-lamar".
 * @returns
 */
export const getArtistByName = async (
  slug: ArtistData["url"]
): Promise<ArtistData | undefined> => {
  try {
    /*
     * The .regex() method is used here to match the slug within the
     * URL field of the artist entries. We're just matching the
     * "kendrick-lamar" part of "/artists/kendrick-lamar" to keep the
     * "/artists/..." prefix flexible.
     */
    const query = await DeliveryClient.contentType("artist")
      .entry()
      .includeMetadata()
      .query()
      .regex("url", slug)
      .find<ArtistData>();

    return query?.entries?.[0] ?? undefined;
  } catch (error) {
    console.error(`Error fetching artist by slug "${slug}":`, error);
    return undefined;
  }
};
