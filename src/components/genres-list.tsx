import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HomePageProps } from "@/components";

export interface GenresListProps {
  genres: HomePageProps["genres"];
}

const GenresList = (props: GenresListProps) => {
  const { genres } = props;

  if (!genres || genres.length === 0) {
    return <p>No genres found.</p>;
  }

  return (
    <div>
      <ul className="flex gap-3">
        {genres?.map((genre, index) => (
          <Button
            key={`${genre.uid}-${index}`}
            variant="secondary"
            // onClick={() => setSelectedGenre(genre.name)}
            asChild
          >
            <Badge variant="secondary" className="text-lg">
              {genre.name}
            </Badge>
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
