"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useHomePageContext } from "@/contexts/HomePageProvider";
import { Term } from "@contentstack/management/types/stack/taxonomy/terms";

interface GenresListProps {
  genres: Term[];
}

const GenresList = (props: GenresListProps) => {
  const { genres } = props;
  const { selectedGenre, setSelectedGenre } = useHomePageContext();

  if (!genres || genres.length === 0) {
    return <p>No genres found.</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <ul className="flex gap-3">
        <Button
          key="all"
          variant={selectedGenre === null ? "default" : "secondary"}
          onClick={() => setSelectedGenre("")}
          asChild
        >
          <Badge
            variant={selectedGenre === null ? "default" : "secondary"}
            className="text-lg"
          >
            All
          </Badge>
        </Button>

        {genres.map((genre) => (
          <Button
            key={genre.uid}
            variant={selectedGenre === genre.name ? "default" : "secondary"}
            onClick={() => setSelectedGenre(genre.name)}
            asChild
          >
            <Badge
              variant={selectedGenre === genre.name ? "default" : "secondary"}
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
