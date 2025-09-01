"use client";

import { useHomePageContext } from "@/contexts/HomePageProvider";
import Image from "next/image";
import Link from "next/link";

const SongsList = () => {
  const { songs } = useHomePageContext();

  if (!songs?.length) {
    return <p>No songs found!</p>;
  }

  return (
    <div className="flex flex-wrap items-start gap-3">
      <ul className="flex flex-col gap-3">
        {songs.map((song: any) => {
          return (
            <li key={song.uid} className="flex items-center gap-4">
              {song.reference_album?.[0]?.cover_art?.url && (
                <Image
                  src={`${song.reference_album?.[0]?.cover_art?.url}?width=200&height=200`}
                  alt={song.title}
                  width={72}
                  height={72}
                  className="rounded"
                  priority
                />
              )}

              <div className="flex flex-col gap-1">
                {song.url ? (
                  <Link href={song.url} className="text-lg hover:underline">
                    {song.title}
                  </Link>
                ) : (
                  <p className="text-lg">{song.title}</p>
                )}

                {song.reference_artist?.[0]?.title ? (
                  <Link
                    className="text-sm hover:underline"
                    href={song.reference_artist?.[0]?.url}
                  >
                    {song.reference_artist?.[0]?.title}
                  </Link>
                ) : (
                  <span className="text-sm">
                    {song.reference_artist?.[0]?.title}
                  </span>
                )}

                {song.reference_album?.[0]?.release_date ? (
                  <p className="text-sm">
                    {song.reference_album?.[0]?.release_date}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SongsList;
