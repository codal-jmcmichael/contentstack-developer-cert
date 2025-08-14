import { HomePage } from "@/components";
import { HomePageProvider } from "@/contexts/HomePageProvider";
import { getSongs, getGenres } from "@/lib/api";

export default async function Home() {
  const songs = await getSongs();
  const genres = await getGenres();

  if (!songs || !genres) {
    return <div>Error loading data</div>;
  }

  return (
    <HomePageProvider>
      <HomePage songs={songs} genres={genres} />
    </HomePageProvider>
  );
}
