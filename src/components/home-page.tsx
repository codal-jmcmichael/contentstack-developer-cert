import { SongsList, GenresList } from "@/components";
import { Genre, SongWithMetadata } from "@/lib/api";

export interface HomePageProps {
  songs: SongWithMetadata[];
  genres: Genre[];
}

const HomePage = (props: HomePageProps) => {
  const { songs, genres } = props;

  return (
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
  );
};

export default HomePage;
