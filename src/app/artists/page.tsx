import { getArtists } from "@/lib/api";
import Link from "next/link";

export default async function ArtistsPage() {
  const artists = await getArtists();

  if (!artists) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p>No artists found.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.title} className="mb-4">
            {artist.url ? (
              <Link
                href={artist.url}
                className="underline hover:no-underline underline-offset-8"
              >
                <h2 className="text-xl">{artist.title}</h2>
              </Link>
            ) : (
              <h2 className="text-xl">{artist.title}</h2>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
