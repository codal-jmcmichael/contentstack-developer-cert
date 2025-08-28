"use client";

import { useHomePageContext } from "@/contexts/HomePageProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const SongsList = () => {
  const { setSelectedGenre, songs } = useHomePageContext();

  useEffect(() => {
    setSelectedGenre(null);
  }, []);

  if (!songs?.length) {
    return <p>No songs found!</p>;
  }

  return (
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
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SongsList;
