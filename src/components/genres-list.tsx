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
          <Button
            key={`${genre.uid}-${index}`}
            variant={genre.uid === selectedGenre ? "default" : "secondary"}
            onClick={() => setSelectedGenre(genre.name)}
            asChild
          >
            <Badge
              variant={genre.uid === selectedGenre ? "default" : "secondary"}
              className="text-lg"
            >
              {genre.name}
            </Badge>
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
