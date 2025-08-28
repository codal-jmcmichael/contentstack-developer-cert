import { DeliveryClient } from "@/lib/clients";
import { Song } from "@/types/contentStack/generated";
import {
  QueryOperation,
  TaxonomyQueryOperation,
} from "@contentstack/delivery-sdk";
import { toSnakeCase } from "../helpers";

const nameQuery = (name: string) => {
  return DeliveryClient.contentType("song")
    .entry()
    .includeReference("reference_album")
    .includeReference("reference_artist")
    .query()
    .where(
      "title",
      QueryOperation.MATCHES,
      name
    );
};

const lyricsQuery = (lyrics: string) => {
  return DeliveryClient.contentType("song")
    .entry()
    .includeReference("reference_album")
    .includeReference("reference_artist")
    .query()
    .where(
      "lyrics",
      QueryOperation.MATCHES,
      lyrics
    );
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
  genre: string | null
): Promise<Song[] | undefined> => {
  // If no genre is provided, default to "genre"
  // which will include all songs in the "genre" taxonomy
  if (!genre) genre = "genre";

  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .includeReference("reference_album")
      .includeReference("reference_artist")
      .query()
      .where(
        "taxonomies.music",
        TaxonomyQueryOperation.EQ_BELOW,
        toSnakeCase(genre)
      )
      .find<Song>();
    return response?.entries ?? [];
  } catch (error) {
    console.error(`Error fetching songs by ${genre}: `, error);
    return [];
  }
};

export const getSongsByNameOrLyrics = async (
  input: string
): Promise<Song[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .query()
      .or(lyricsQuery(input), nameQuery(input))
      .find<Song>();
    return response?.entries ?? [];
  } catch (error) {
    console.error(`Error fetching songs with input: ${input}`);
    return [];
  }
}
