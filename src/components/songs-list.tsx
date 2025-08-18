"use client";

import { useHomePageContext } from "@/contexts/HomePageProvider";
import { toSnakeCase } from "@/lib/helpers";
import { SongWithAlbumData } from "@/lib/api/songs";

export interface SongsListProps {
  songs: SongWithAlbumData[];
}

const SongsList = (props: SongsListProps) => {
  const { songs } = props;
  const { selectedGenre } = useHomePageContext();

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
    <div>
      <ul className="flex flex-col gap-3">
        {filteredSongs?.map((song, index) => (
          <li key={`${song.title}-${index}`}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
