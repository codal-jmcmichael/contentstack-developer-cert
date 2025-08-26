import { DeliveryClient } from "@/lib/clients";
import { Song } from "@/types/contentStack/generated";
import { QueryOperation, TaxonomyQueryOperation } from "@contentstack/delivery-sdk";

/**
 *
 * @returns A list of songs from the Contentstack delivery API.
 * This function fetches all entries of the "song" content type.
 */
export const getSongs = async (): Promise<Song[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .find<Song>();
    return response.entries || [];
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

/**
 *
 * @returns A list of songs with their associated album data.
 * This function fetches all entries of the "song" content type and includes
 * the album data by resolving the reference to the album UID.
 */
export const getSongsWithReferenceData = async (): Promise<
  Song[] | undefined
> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .includeMetadata()
      .includeReference("reference_artist")
      .includeReference("reference_album")
      .find<Song>();
    return response.entries || [];
  } catch (error) {
    console.error("Error fetching songs with album data:", error);
    return [];
  }
};

/**
 *
 * @param slug The slug of the song to fetch.
 * The slug is typically the URL-friendly version of the song's name.
 * For example, "humble" for the name "HUMBLE."
 * @returns
 */
export const getSongByName = async (
  slug: string
): Promise<Song | undefined> => {
  try {
    const query = await DeliveryClient.contentType("song")
      .entry()
      .includeMetadata()
      .query()
      .where("url", QueryOperation.MATCHES, slug)
      .find<Song>();
    return query?.entries?.[0] ?? undefined;
  } catch (error) {
    console.error(`Error fetching song by slug "${slug}":`, error);
    return undefined;
  }
};

/**
 * @param genre The genre associated with the song.
 * `Genre` is a taxonomy term used to categorize music and includes
 * sub-genres (e.g. `Indie`, `Rock`, `Hip-Hop`, etc.)
 *
 * @returns A nested array of entries including the given term
 * and its sub-terms
 */
export const getSongsByGenre = async (
  genre: string
): Promise<Song[] | undefined> => {
  try {
    const response = await DeliveryClient.taxonomy()
      .where("taxonomies.music", TaxonomyQueryOperation.EQ_BELOW, genre)
      .find<Song[]>();
    return response?.entries?.[0] ?? [];
  } catch (error) {
    console.error(`Error fetching songs by ${genre}: `, error);
    return [];
  }
};

