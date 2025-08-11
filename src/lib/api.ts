import ContentStack from "@/lib/contentStackClient";
import type { Artist } from "@/types/contentStack/generated";
import { BaseEntry } from "@contentstack/delivery-sdk";

/*
 * Create a union type that combines Artist and BaseEntry.
 * This allows us to include metadata from ContentStack
 * and see metadata types in TypeScript.
 */
export type ArtistWithMetadata = Artist & BaseEntry;

export const getArtists = async (): Promise<ArtistWithMetadata[]> => {
  const response = await ContentStack.contentType("artist")
    .entry()
    .includeMetadata()
    .find<ArtistWithMetadata>();

  const artists = response?.entries;

  if (!artists || !artists.length) {
    throw new Error("No artists found.");
  }

  return artists;
};

export const getArtistByName = async (
  name: string
): Promise<ArtistWithMetadata> => {
  const response = await ContentStack.contentType("artist")
    .entry()
    .query({ query: { name: name } })
    .find<ArtistWithMetadata>();

  const artist = response?.entries?.[0];

  if (!artist) {
    throw new Error(`Artist with name "${name}" not found.`);
  }

  return artist;
};
