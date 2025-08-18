"use client";

import { useHomePageContext } from "@/contexts/HomePageProvider";
import { Song } from "@/types/contentStack/generated";
import { toSnakeCase } from "@/lib/helpers";

export interface SongsListProps {
  songs: Song[];
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
      ? songs.filter((song) => song.albumGenre === toSnakeCase(selectedGenre))
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
