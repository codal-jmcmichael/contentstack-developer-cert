import { headers } from "next/headers";

import { GenresList, SongsList } from "@/components";
import { HomePageProvider } from "@/contexts/HomePageProvider";
import { getGenres, getPageByUrl, getSongsWithReferenceData } from "@/lib/api";
import { DeliveryClient } from "@/lib/clients";
import { Page } from "@/types/contentStack/generated";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  await headers();
  let { live_preview, entry_uid, content_type_uid } = await searchParams;

  if (live_preview) {
    DeliveryClient.livePreviewQuery({
      live_preview,
      contentTypeUid: content_type_uid || "",
      entryUid: entry_uid || "",
    });
  }

  const page = await getPageByUrl("/");

  const songs = await getSongsWithReferenceData();
  const genres = await getGenres();

  if (!songs || !genres) {
    return <div>Error loading data</div>;
  }

  return (
    <HomePageProvider>
      <>
        {page?.title ? (
          <h1
            className="text-4xl font-bold mb-4"
            {...((page?.$ && page.$?.title) as Page)}
          >
            {page?.title}
          </h1>
        ) : null}

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
