import { DeliveryClient } from "@/lib/clients";
import type { Album } from "@/types/contentStack/generated";
import { QueryOperation } from "@contentstack/delivery-sdk";

/**
 *
 * @returns A list of albums from the Contentstack delivery API.
 * This function fetches all entries of the "album" content type.
 */
export const getAlbums = async (): Promise<Album[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("album")
      .entry()
      .find<Album>();
    return response.entries ?? [];
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};

/**
 *
 * @param uid The UID of the album to fetch.
 * @returns A promise that resolves to the album entry if found, or undefined if not found.
 * This function fetches the album entry from the Contentstack delivery API
 * using the provided UID.
 */
export const getAlbumByUid = async (
  uid: string
): Promise<Album | undefined> => {
  try {
    const response = await DeliveryClient.contentType("album")
      .entry()
      .includeMetadata()
      .query()
      .where("uid", QueryOperation.MATCHES, uid)
      .find<Album>();
    return response?.entries?.[0] ?? undefined;
  } catch (error) {
    console.error(`Error fetching album by UID "${uid}":`, error);
    return undefined;
  }
};
