import { getArtists } from "@/lib/api";

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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold">Artists</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.title} className="mb-4">
            <h2 className="text-xl font-semibold">{artist.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
