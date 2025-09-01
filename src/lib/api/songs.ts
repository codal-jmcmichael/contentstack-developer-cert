import { DeliveryClient } from "@/lib/clients";
import { Song } from "@/types/contentStack/generated";
import {
  QueryOperation,
  TaxonomyQueryOperation,
} from "@contentstack/delivery-sdk";
import { toSnakeCase } from "../helpers";
import { PAGINATION_LIMIT } from "@/components";

const nameQuery = (input: string) => {
  return DeliveryClient.contentType("song")
    .entry()
    .query()
    .where("title", QueryOperation.MATCHES, input);
};

const lyricsQuery = (input: string) => {
  return DeliveryClient.contentType("song")
    .entry()
    .query()
    .where("lyrics", QueryOperation.MATCHES, input);
};

const artistQuery = (input: string) => {
  // Define the query instance
  const query = DeliveryClient.contentType("artist")
    .entry()
    .query()
    .where("title", QueryOperation.MATCHES, input);

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

export const SORT_OPTIONS = {
  RELEASE_DATE: "release_date",
  TITLE: "title",
} as const;

export type SortOptions = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

/**
 * Fetch songs based on search terms and genre.
 * @param input The search terms to filter songs.
 * @param genre The genre to filter songs.
 * @returns A promise that resolves to an array of songs matching the criteria.
 */
export const getSongsByTermsAndGenre = async (
  input: string,
  genre: string,
  page?: number,
  sortOptions?: SortOptions
): Promise<Song[]> => {
  const trimmedInput = input.trim();

  try {
    const query = DeliveryClient.contentType("song")
      .entry()
      .includeReference("reference_album")
      .includeReference("reference_artist")
      .query()
      .paginate({
        skip: page && page > 1 ? (page - 1) * PAGINATION_LIMIT : 0,
        limit: PAGINATION_LIMIT,
      })
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

    /* NOTE: I feel like this should work but the TypeScript API
     * doesn't explain how to apply sorting to reference fields. There's
     * no clear documentation on this.
     *
     * The backup solution would be to create a `release_date`
     * field on Song entries to sort directly.
     */
    if (sortOptions) {
      if (sortOptions === SORT_OPTIONS.RELEASE_DATE) {
        const referenceAlbumQuery = await DeliveryClient.contentType("album")
          .entry()
          .query();

        query
          .whereIn("reference_album", referenceAlbumQuery)
          .orderByAscending("release_date");
      }

      if (sortOptions === SORT_OPTIONS.TITLE) {
        query.orderByAscending("title");
      }
    }

    const response = await query.find<Song>();
    return response?.entries ?? [];
  } catch (error) {
    console.error(`Error fetching songs: ${error}`);
    return [];
  }
};
