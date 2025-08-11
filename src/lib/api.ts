import ContentStack from "@/lib/contentStackClient";
import { Artist } from "@/types/contentStack/generated";
import { BaseEntry } from "@contentstack/delivery-sdk";

export type ArtistWithMetadata = Artist & BaseEntry;

export const getArtists = async (): Promise<
  ArtistWithMetadata[] | undefined
> => {
  try {
    const response = await ContentStack.contentType("artist")
      .entry()
      .find<ArtistWithMetadata>();

    return response.entries;
  } catch (error) {
    console.error("Error fetching artists:", error);
  }

  return [];
};

export const getArtistByName = async (
  name: string
): Promise<ArtistWithMetadata | undefined> => {
  try {
    const response = await ContentStack.contentType("artist")
      .entry()
      .query({ query: { title: name } })
      .find<ArtistWithMetadata>();

    const artist = response?.entries?.[0];

    return artist;
  } catch (error) {
    console.error(`Error fetching artist by name "${name}":`, error);
  }

  return undefined;
};
