import { GenresList, SongsList } from "@/components";
import { HomePageProvider } from "@/contexts/HomePageProvider";
import { getSongs, getGenres, getAlbumByUid } from "@/lib/api";
import { Song } from "@/types/contentStack/generated";

export type SongWithAlbumData = Song & {
  albumGenre: string;
};

export default async function Home() {
  const songs = await getSongs();
  const genres = await getGenres();

  if (!songs || !genres) {
    return <div>Error loading data</div>;
  }

  const songsWithAlbumData: SongWithAlbumData[] = await Promise.all(
    songs.map(async (song) => {
      const album = await getAlbumByUid(song.reference_album?.[0]?.uid);
      console.log(album?.taxonomies?.[0]?.term_uid);
      return {
        ...song,
        albumGenre: album?.taxonomies?.[0]?.term_uid,
      };
    })
  );

  return (
    <HomePageProvider>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex flex-wrap gap-3">
            <GenresList genres={genres} />
          </div>

          <div className="flex flex-wrap gap-3">
            <SongsList songs={songsWithAlbumData} />
          </div>
        </main>
      </div>
    </HomePageProvider>
  );
}
