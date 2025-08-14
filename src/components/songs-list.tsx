import { Song } from "@/types/contentStack/generated";

export interface SongsListProps {
  songs: Song[];
}

const SongsList = (props: SongsListProps) => {
  const { songs } = props;

  if (!songs || songs.length === 0) {
    return <p>No songs found.</p>;
  }

  return (
    <div>
      <ul className="flex flex-col gap-3">
        {songs?.map((song, index) => (
          <li key={`${song.title}-${index}`}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
