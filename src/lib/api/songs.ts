import { DeliveryClient } from "@/lib/clients";
import { Album, Song } from "@/types/contentStack/generated";
import { TaxonomyData } from "@contentstack/management/types/stack/taxonomy";

/**
 *
 * @returns A list of songs from the Contentstack delivery API.
 * This function fetches all entries of the "song" content type.
 */
export const getSongs = async (): Promise<Song[] | undefined> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .find<Song>();
    return response.entries || [];
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

type AlbumWithTaxonomies = Album & {
  taxonomies?: TaxonomyData[];
};

export type SongWithAlbumData = Song & {
  reference_album?: AlbumWithTaxonomies[];
};

/**
 *
 * @returns A list of songs with their associated album data.
 * This function fetches all entries of the "song" content type and includes
 * the album data by resolving the reference to the album UID.
 */
export const getSongsWithAlbumData = async (): Promise<
  SongWithAlbumData[] | undefined
> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .includeMetadata()
      .includeReference("reference_album")
      .find<SongWithAlbumData>();
    return response.entries || [];
  } catch (error) {
    console.error("Error fetching songs with album data:", error);
    return [];
  }
};
