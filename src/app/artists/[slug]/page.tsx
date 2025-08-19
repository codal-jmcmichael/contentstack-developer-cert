import { getArtistByName } from "@/lib/api";
import { Artist } from "@/types/contentStack/generated";
import { jsonToHtml } from "@contentstack/json-rte-serializer";

export default async function ArtistsPage({
  params,
}: {
  params: { slug: Artist["url"] };
}) {
  const { slug } = params;
  const artist = await getArtistByName(slug);

  if (!artist) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p className="text-lg">Artist not found.</p>
      </div>
    );
  }

  const synopsisJSON = artist.rte_synopsis;
  const synopsisHTML = jsonToHtml(synopsisJSON);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold">{artist?.title}</h1>
      {synopsisHTML && (
        <div
          className="flex flex-col items-center gap-2 [&_p]:text-sm"
          dangerouslySetInnerHTML={{ __html: synopsisHTML }}
        ></div>
      )}
    </div>
  );
}
