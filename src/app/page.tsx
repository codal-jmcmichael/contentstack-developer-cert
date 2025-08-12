import GenresList from "@/components/genres-list";
import SongsList from "@/components/songs-list";

export default async function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-wrap gap-3">
          <GenresList />
        </div>

        <div className="flex flex-wrap gap-3">
          <SongsList />
        </div>
      </main>
    </div>
  );
}
