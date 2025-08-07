import ContentStack from "@/lib/contentStackClient";

export const getArtists = async (): Promise<any> => {
  const reponse = await ContentStack.contentType("artist").entry().find();

  if (!reponse) {
    throw new Error("Failed to fetch artists");
  }

  return reponse;
};

export const getArtistByName = async (name: string): Promise<any> => {
  const response = await ContentStack.contentType("artist")
    .entry()
    .query({ query: { name: name } })
    .find();

  if (!response) {
    throw new Error(`Failed to fetch artist with name: ${name}`);
  }

  return response;
};
