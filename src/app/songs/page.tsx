import { getSongs } from "@/lib/api";
import Link from "next/link";

export default async function SongsPage() {
  const songs = await getSongs();

  if (!songs) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p>No songs found.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Songs</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.title} className="mb-4">
            {song.url ? (
              <Link
                href={song.url}
                className="underline hover:no-underline underline-offset-8"
              >
                <h2 className="text-xl">{song.title}</h2>
              </Link>
            ) : (
              <h2 className="text-xl">{song.title}</h2>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
