import { getSongs } from "@/lib/api";

const SongsList = async () => {
  const songs = await getSongs();

  if (!songs || songs.length === 0) {
    return <p>No songs found.</p>;
  }

  return (
    <div>
      <ul className="flex flex-col gap-3">
        {songs?.map((song) => (
          <li key={song.uid}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
