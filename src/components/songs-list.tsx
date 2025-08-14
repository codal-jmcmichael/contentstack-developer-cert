import { HomePageProps } from "@/components/home-page";

export interface SongsListProps {
  songs: HomePageProps["songs"];
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
          <li key={`${song.uid}-${index}`}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
