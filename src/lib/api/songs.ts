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
    .query()
    .where("title", QueryOperation.MATCHES, name);
};

const lyricsQuery = (lyrics: string) => {
  return DeliveryClient.contentType("song")
    .entry()
    .query()
    .where("lyrics", QueryOperation.MATCHES, lyrics);
};

const artistQuery = (artist: string) => {
  // Define the query instance
  const query = DeliveryClient.contentType("artist")
    .entry()
    .query()
    .regex("title", artist, "i");

  // Pass the query instance to the whereIn clause
  return DeliveryClient.contentType("song")
    .entry()
    .query()
    .whereIn("reference_artist", query);
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
 * Fetch songs based on search terms and genre.
 * @param input The search terms to filter songs.
 * @param genre The genre to filter songs.
 * @returns A promise that resolves to an array of songs matching the criteria.
 */
export const getSongsByTermsAndGenre = async (
  input: string,
  genre: string
): Promise<Song[]> => {
  const trimmedInput = input.trim();

  try {
    const query = DeliveryClient.contentType("song")
      .entry()
      .includeReference("reference_album")
      .includeReference("reference_artist")
      .query()
      .where(
        "taxonomies.music",
        TaxonomyQueryOperation.EQ_BELOW,
        toSnakeCase(genre || "genre")
      );

    if (trimmedInput) {
      query.or(
        lyricsQuery(trimmedInput),
        nameQuery(trimmedInput),
        artistQuery(trimmedInput)
      );
    }

    const response = await query.find<Song>();
    return response?.entries ?? [];
  } catch (error) {
    console.error(`Error fetching songs with input: ${input}`);
    return [];
  }
};
