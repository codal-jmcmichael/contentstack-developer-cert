"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHomePageContext } from "@/contexts/HomePageProvider";
import { Term } from "@contentstack/management/types/stack/taxonomy/terms";
import { useEffect } from "react";

interface GenresListProps {
  genres: Term[];
}

const GenresList = (props: GenresListProps) => {
  const { genres } = props;
  const { selectedGenre, setSelectedGenre } = useHomePageContext();

  useEffect(() => {
    console.log("Selected genre changed:", selectedGenre);
  }, [selectedGenre]);

  if (!genres || genres.length === 0) {
    return <p>No genres found.</p>;
  }

  return (
    <div>
      <ul className="flex gap-3">
        {genres?.map((genre, index) => (
          <>
            {index === 0 && (
              <Button
                variant={selectedGenre === "all" ? "default" : "secondary"}
                onClick={() => setSelectedGenre("all")}
                className="text-lg"
              >
                All
              </Button>
            )}

            <Button
              key={`${genre.uid}-${index}`}
              variant={selectedGenre === genre.uid ? "default" : "secondary"}
              onClick={() => setSelectedGenre(genre.name)}
              asChild
            >
              <Badge
                variant={selectedGenre === genre.uid ? "default" : "secondary"}
                className="text-lg"
              >
                {genre.name}
              </Badge>
            </Button>
          </>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
