import { DeliveryClient } from "@/lib/clients";
import { Album, Song } from "@/types/contentStack/generated";
import { TaxonomyQueryOperation } from "@contentstack/delivery-sdk";
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

/**
 * The below type extends the Song type to include reference data
 * for artists and albums, allowing us to fetch additional information
 * related to each song.
 */
export type ArtistData = {
  uid?: string;
  title?: string;
};

type AlbumData = Album & {
  uid?: string;
  taxonomies?: TaxonomyData[];
};

export type SongWithReferenceData = Song & {
  reference_artist?: ArtistData[];
  reference_album?: AlbumData[];
};

/**
 *
 * @returns A list of songs with their associated album data.
 * This function fetches all entries of the "song" content type and includes
 * the album data by resolving the reference to the album UID.
 */
export const getSongsWithAlbumData = async (): Promise<
  SongWithReferenceData[] | undefined
> => {
  try {
    const response = await DeliveryClient.contentType("song")
      .entry()
      .includeMetadata()
      .includeReference("reference_artist")
      .includeReference("reference_album")
      .find<SongWithReferenceData>();
    return response.entries || [];
  } catch (error) {
    console.error("Error fetching songs with album data:", error);
    return [];
  }
};
