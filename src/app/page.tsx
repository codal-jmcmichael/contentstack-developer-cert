import { useSearchParams } from "next/navigation";

import { GenresList, SongsList } from "@/components";
import { HomePageProvider } from "@/contexts/HomePageProvider";
import { getGenres, getSongsWithReferenceData } from "@/lib/api";
import { setLivePreviewQueryParams } from "@/lib/helpers/setLivePreviewQueryParams";

export default async function Home() {
  const searchParams = useSearchParams();
  const livePreview = searchParams.get("live_preview");

  setLivePreviewQueryParams({
    live_preview: livePreview || "",
  });

  const songs = await getSongsWithReferenceData();
  const genres = await getGenres();

  if (!songs || !genres) {
    return <div>Error loading data</div>;
  }

  return (
    <HomePageProvider>
      <>
        <div className="flex flex-wrap gap-3">
          <GenresList genres={genres} />
        </div>

        <div className="flex flex-wrap items-start gap-3">
          <SongsList songs={songs} />
        </div>
      </>
    </HomePageProvider>
  );
}
