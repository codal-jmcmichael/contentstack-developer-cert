import { getArtistByName } from "@/lib/api";
import { Artist } from "@/types/contentStack/generated";
import contentstack from "@contentstack/delivery-sdk";

export default async function ArtistsPage({
  params,
}: {
  params: Promise<{ slug: Artist["url"] }>;
}) {
  const { slug } = await params;
  const artist = await getArtistByName(slug);
  let synopsis = artist?.rte_synopsis;

  if (artist) {
    contentstack.Utils.jsonToHTML({
      entry: artist,
      paths: ["rte_synopsis"],
    });

    console.log("Artist data:", artist);
  }

  if (!artist) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p className="text-lg">Artist not found.</p>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold">{artist?.title}</h1>
      {/* {synopsis && <p>{synopsis}</p>} */}
    </div>
  );
}
