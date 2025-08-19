"use client";

import { useHomePageContext } from "@/contexts/HomePageProvider";
import {
  isSongWithReferenceData,
  SongWithReferenceData,
  toSnakeCase,
} from "@/lib/helpers";
import { Song, TaxonomyEntry } from "@/types/contentStack/generated";
import Image from "next/image";
import Link from "next/link";

export interface SongsListProps {
  songs: Song[];
}

const SongsList = (props: SongsListProps) => {
  const { songs } = props;
  const { selectedGenre } = useHomePageContext();

  const songsWithData: SongWithReferenceData[] = songs.filter(
    isSongWithReferenceData
  );

  if (songsWithData.length === 0) {
    return <p>No songs found.</p>;
  }

  const filteredSongs =
    selectedGenre === "all"
      ? songsWithData
      : songsWithData.filter((song) => {
          const targetTerm = toSnakeCase(selectedGenre);
          const taxonomies = song.reference_album?.[0]?.taxonomies;

          if (!taxonomies) return false;

          const taxArray = Array.isArray(taxonomies)
            ? taxonomies
            : [taxonomies];
          return taxArray.some(
            (tax) => (tax as TaxonomyEntry).term_uid === targetTerm
          );
        });

  if (filteredSongs.length === 0) {
    return <p>No songs found for the selected genre.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {filteredSongs.map((song, index) => {
        const album = song.reference_album![0];
        const artist = song.reference_artist![0];

        const albumCoverSrc = album.cover_art?.url;
        const songTitle = song.title;
        const songUrl = song.url;
        const artistTitle = artist.title;
        const artistUrl = artist.url;

        return (
          <li key={`${songTitle}-${index}`} className="flex items-center gap-4">
            {albumCoverSrc && (
              <Image
                src={`${albumCoverSrc}?width=200&height=200`}
                alt={songTitle}
                width={72}
                height={72}
                className="rounded"
                priority
              />
            )}

            <div className="flex flex-col gap-1">
              {songUrl ? (
                <Link href={songUrl} className="text-lg hover:underline">
                  {songTitle}
                </Link>
              ) : (
                <p className="text-lg">{songTitle}</p>
              )}

              {artistUrl ? (
                <Link className="text-sm hover:underline" href={artistUrl}>
                  {artistTitle}
                </Link>
              ) : (
                <span className="text-sm">{artistTitle}</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SongsList;
