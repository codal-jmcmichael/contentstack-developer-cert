import { DeliveryClient } from "@/lib/clients";
import { Song } from "@/types/contentStack/generated";
import { BaseEntry } from "@contentstack/delivery-sdk";

export type SongWithMetadata = Song & BaseEntry;

export const getSongs = async (): Promise<SongWithMetadata[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .find<SongWithMetadata>();

    return response.entries;
  } catch (error) {
    console.error("Error fetching songs:", error);
  }

  return [];
};
