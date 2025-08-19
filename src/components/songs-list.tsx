"use client";

import { useHomePageContext } from "@/contexts/HomePageProvider";
import { toSnakeCase } from "@/lib/helpers";
import { SongWithReferenceData } from "@/lib/api/songs";
import Image from "next/image";

export interface SongsListProps {
  songs: SongWithReferenceData[];
}

const SongsList = (props: SongsListProps) => {
  const { songs } = props;
  const { selectedGenre } = useHomePageContext();

  console.log("SongsList songs:", songs);

  if (!songs || songs.length === 0) {
    return <p>No songs found.</p>;
  }

  let filteredSongs = songs;
  if (selectedGenre !== "all") {
    filteredSongs = selectedGenre
      ? songs.filter(
          (song) =>
            song?.reference_album?.[0]?.taxonomies?.[0]?.term_uid ===
            toSnakeCase(selectedGenre)
        )
      : songs;
  }

  if (filteredSongs.length === 0) {
    return <p>No songs found for the selected genre.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {filteredSongs?.map((song, index) => {
        const albumCoverSrc = song?.reference_album?.[0]?.cover_art?.url || "";
        const songTitle = song.title || "Unknown Title";
        const songArtist =
          song?.reference_artist?.[0]?.title || "Unknown Artist";

        return (
          <li className="flex items-center gap-4" key={`${songTitle}-${index}`}>
            {albumCoverSrc && (
              <Image
                src={`${albumCoverSrc}?width=300&height=300`}
                alt={songTitle}
                width={72}
                height={72}
                className="rounded"
              />
            )}
            <div className="flex flex-col gap-1">
              <p className="text-lg">{songTitle}</p>
              <span className="text-sm">{songArtist}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SongsList;
