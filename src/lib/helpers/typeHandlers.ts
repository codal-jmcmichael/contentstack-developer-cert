import { Album, Artist, Song } from "@/types/contentStack/generated";

/**
 * Type guard to check if an object is a full Album and not a ReferencedEntry.
 */
export function isAlbum(item: any): item is Album {
  return item && typeof item === "object" && "taxonomies" in item;
}

/**
 * Type guard to check if an object is a full Artist and not a ReferencedEntry.
 */
export function isArtist(item: any): item is Artist {
  return item && typeof item === "object" && "title" in item;
}

/**
 * A stricter version of the Song type where references are guaranteed to be resolved.
 */
export type SongWithReferenceData = Omit<
  Song,
  "reference_album" | "reference_artist"
> & {
  reference_album?: Album[];
  reference_artist?: Artist[];
};

/**
 * Type guard to check if a Song has all its reference data resolved.
 */
export function isSongWithReferenceData(
  song: Song
): song is SongWithReferenceData {
  const album = song.reference_album?.[0];
  const artist = song.reference_artist?.[0];

  // A song is valid if it has an artist and an album with full data.
  return !!(album && isAlbum(album) && artist && isArtist(artist));
}
