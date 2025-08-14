import { getAlbumByUid, SongWithMetadata } from "@/lib/api";
import { hasReferencedEntryType } from "@/lib/helpers";

export const findSongGenre = async (song: SongWithMetadata) => {
  try {
    const referenceAlbum = song.reference_album;
    const referenceAlbumUid = hasReferencedEntryType(referenceAlbum)
      ? referenceAlbum.uid
      : null;

    if (!referenceAlbumUid) {
      throw new Error("No reference album UID found in song.");
    }

    const albumEntry = await getAlbumByUid(referenceAlbumUid);
    return albumEntry?.taxonomies;
  } catch (error) {
    console.error("Error finding song genre:", error);
    return null;
  }
};
