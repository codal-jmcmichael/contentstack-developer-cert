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
  slug: Artist["url"]
): Promise<ArtistWithMetadata | undefined> => {
  console.log("Fetching artist with slug:", slug);

  try {
    /*
     * The .regex() method is used here to match the slug within the
     * URL field of the artist entries. This allows for more flexible
     * matching, especially since the artists contain prefixes like
     * "artists/kendrick-lamar" in their URLs—so we're just matching
     * the "kendrick-lamar" part to keep the prefix flexible.
     */
    const query = await ContentStack.contentType("artist")
      .entry()
      .query()
      .regex("url", slug)
      .find<ArtistWithMetadata>();

    const artist = query?.entries?.[0];

    return artist;
  } catch (error) {
    console.error(`Error fetching artist by slug "${slug}":`, error);
  }

  return undefined;
};
