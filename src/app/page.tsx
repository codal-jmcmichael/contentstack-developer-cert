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
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex flex-wrap gap-3">
            <GenresList genres={genres} />
          </div>

          <div className="flex flex-wrap gap-3">
            <SongsList songs={songs} />
          </div>
        </main>
      </div>
    </HomePageProvider>
  );
}
