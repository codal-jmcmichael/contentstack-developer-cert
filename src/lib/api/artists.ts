import { DeliveryClient } from "@/lib/clients";
import { Artist } from "@/types/contentStack/generated";
import { BaseEntry } from "@contentstack/delivery-sdk";

// TODO: Consolidate these methods into a single "getEntriesByContentType"
// or "getEntriesByUid" method that takes the content type as a parameter
// and returns the appropriate type. This will reduce code duplication and
// make it easier to add new content types in the future.

export type ArtistWithMetadata = Artist & BaseEntry;

/**
 *
 * @returns A list of artists from the Contentstack delivery API.
 * This function fetches all entries of the "artist" content type.
 * It returns an array of artists with their metadata.
 */
export const getArtists = async (): Promise<
  ArtistWithMetadata[] | undefined
> => {
  try {
    const response = await DeliveryClient.contentType("artist")
      .entry()
      .find<ArtistWithMetadata>();

    return response.entries;
  } catch (error) {
    console.error("Error fetching artists:", error);
  }

  return [];
};

/**
 *
 * @param slug The slug of the artist to fetch.
 * The slug is typically the URL-friendly version of the artist's name.
 * For example, "kendrick-lamar" for the URL "/artists/kendrick-lamar".
 * @returns
 */
export const getArtistByName = async (
  slug: Artist["url"]
): Promise<ArtistWithMetadata | undefined> => {
  try {
    /*
     * The .regex() method is used here to match the slug within the
     * URL field of the artist entries. We're just matching the
     * "kendrick-lamar" part of "/artists/kendrick-lamar" to keep the
     * "/artists/..." prefix flexible.
     */
    const query = await DeliveryClient.contentType("artist")
      .entry()
      .query()
      .regex("url", slug)
      .find<ArtistWithMetadata>();

    const artist = query?.entries?.[0];

    return artist;
  } catch (error) {
    console.error(`Error fetching artist by slug "${slug}":`, error);
  }

  return undefined;
};
