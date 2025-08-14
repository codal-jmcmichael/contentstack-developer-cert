import { DeliveryClient } from "@/lib/clients";
import type { Album } from "@/types/contentStack/generated";
import { BaseEntry } from "@contentstack/delivery-sdk";

export type AlbumWithMetadata = Album & BaseEntry;

export const getAlbums = async (): Promise<AlbumWithMetadata[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("album")
      .entry()
      .find<AlbumWithMetadata>();

    return response.entries;
  } catch (error) {
    console.error("Error fetching albums:", error);
  }

  return [];
};

export const getAlbumByUid = async (
  uid: AlbumWithMetadata["uid"]
): Promise<AlbumWithMetadata | undefined> => {
  try {
    const response = await DeliveryClient.contentType("contentTypeUid")
      .entry()
      .query({ uid })
      .find<AlbumWithMetadata>();

    console.log("Fetched album:", response);

    return response.entries?.[0];
  } catch (error) {
    console.error("Error fetching entry by UID:", error);
  }

  return undefined;
};
