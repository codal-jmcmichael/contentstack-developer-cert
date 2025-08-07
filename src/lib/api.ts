import ContentStack from "@/lib/contentStackClient";
import type { Artist } from "@/types/contentStack/generated";
import { FindResponse } from "@contentstack/delivery-sdk";

export const getArtists = async (): Promise<FindResponse<Artist[]>> => {
  const reponse = await ContentStack.contentType("artist")
    .entry()
    .find<Artist[]>();

  if (!reponse) {
    throw new Error("Failed to fetch artists");
  }

  return reponse;
};

export const getArtistByName = async (
  name: string
): Promise<FindResponse<Artist>> => {
  const response = await ContentStack.contentType("artist")
    .entry()
    .query({ query: { name: name } })
    .find<Artist>();

  if (!response) {
    throw new Error(`Failed to fetch artist with name: ${name}`);
  }

  return response;
};
