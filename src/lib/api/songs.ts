import { DeliveryClient } from "@/lib/clients";
import { Song } from "@/types/contentStack/generated";

export const getSongs = async (): Promise<Song[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .includeMetadata()
      .find<Song>();

    return response.entries;
  } catch (error) {
    console.error("Error fetching songs:", error);
  }

  return [];
};
