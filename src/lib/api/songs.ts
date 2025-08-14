import { DeliveryClient } from "@/lib/clients";
import { sanitizeMethods } from "@/lib/helpers/sanitizeMethods";
import { Song } from "@/types/contentStack/generated";

/**
 *
 * @returns A list of songs from the Contentstack delivery API.
 * This function fetches all entries of the "song" content type.
 */
export const getSongs = async (): Promise<Song[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .includeMetadata()
      .find<Song>();

    return sanitizeMethods(response.entries) || [];
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
};
