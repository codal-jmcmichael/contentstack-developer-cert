import { GenresList, SongsList } from "@/components";
import { HomePageProvider } from "@/contexts/HomePageProvider";
import { getGenres, getSongsWithReferenceData } from "@/lib/api";

export default async function Home() {
  const songs = await getSongsWithReferenceData();
  const genres = await getGenres();

  if (!songs || !genres) {
    return <div>Error loading data</div>;
  }

  return (
    <HomePageProvider>
      <div className="font-sans flex flex-col items-stretch justify-stretch gap-8">
        <div className="flex flex-wrap gap-3">
          <GenresList genres={genres} />
        </div>

        <div className="flex flex-wrap items-start gap-3">
          <SongsList songs={songs} />
        </div>
      </div>
    </HomePageProvider>
  );
}
