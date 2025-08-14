import { DeliveryClient } from "@/lib/clients";
import { sanitizeMethods } from "@/lib/helpers/sanitizeMethods";
import type { Album } from "@/types/contentStack/generated";
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
      .query({ uid })
      .find<Album>();

    return sanitizeMethods(response.entries?.[0]) || undefined;
  } catch (error) {
    console.error("Error fetching entry by UID:", error);
  }
};

/**
 *
 * @returns A list of albums from the Contentstack delivery API.
 * This function fetches all entries of the "album" content type.
 */
export const getAlbums = async (): Promise<Album[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("album")
      .entry()
      .includeMetadata()
      .find<Album>();

    return sanitizeMethods(response.entries) || [];
  } catch (error) {
    console.error("Error fetching albums:", error);
  }

  return [];
};
