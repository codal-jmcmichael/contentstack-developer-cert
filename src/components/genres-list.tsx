"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHomePageContext } from "@/contexts/HomePageProvider";
import { Genre } from "@/lib/api/genres";
import { useEffect } from "react";

interface GenresListProps {
  genres: Genre[];
}

const GenresList = (props: GenresListProps) => {
  const { genres } = props;
  const { selectedGenre, setSelectedGenre } = useHomePageContext();

  if (!genres || genres.length === 0) {
    return <p>No genres found.</p>;
  }

  useEffect(() => {
    if (!selectedGenre) setSelectedGenre(genres[0].name);
  }, [genres]);

  return (
    <div>
      <ul className="flex gap-3">
        {genres?.map((genre, index) => (
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
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
