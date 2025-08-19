import { getSongByName } from "@/lib/api";
import { Song } from "@/types/contentStack/generated";

export default async function SongsPage({
  params,
}: {
  params: { slug: Song["url"] };
}) {
  const { slug } = params;
  const song = await getSongByName(slug);

  if (!song) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p className="text-lg">Song not found.</p>
      </div>
    );
  }

  const songDescription = song.description;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold">{song?.title}</h1>
      {songDescription && (
        <div
          className="flex flex-col items-center gap-2 [&_p]:text-sm"
          dangerouslySetInnerHTML={{ __html: songDescription }}
        ></div>
      )}
    </div>
  );
}
