import { headers } from "next/headers";

import { GenresList, SongsList, SearchInput, Pagination } from "@/components";
import { HomePageProvider } from "@/contexts/HomePageProvider";
import { getAllGenres, getPageByUrl } from "@/lib/api";
import { DeliveryClient } from "@/lib/clients";
import { Page } from "@/types/contentStack/generated";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  await headers();
  let { live_preview, entry_uid, content_type_uid } = await searchParams;

  // TODO: Add this to middleware
  if (live_preview) {
    DeliveryClient.livePreviewQuery({
      live_preview,
      contentTypeUid: content_type_uid || "",
      entryUid: entry_uid || "",
    });
  }

  const page = await getPageByUrl("/");
  const genres = (await getAllGenres()) || [];

  if (!genres) {
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

        <SearchInput />
        <GenresList genres={genres} />
        <SongsList />
        <Pagination limit={3} />
      </>
    </HomePageProvider>
  );
}
