import ContentStack from "@/lib/contentStackClient";

export const getArtists = async (): Promise<any> => {
  const reponse = await ContentStack.contentType("artist").entry().find();

  if (!reponse) {
    throw new Error("Failed to fetch artists");
  }

  return reponse;
};
