import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getGenres } from "@/lib/api";

const GenresList = async () => {
  const genres = await getGenres();

  if (!genres || genres.length === 0) {
    return <p>No genres found.</p>;
  }

  return (
    <div>
      <ul className="flex gap-3">
        {genres?.map((genre) => (
          <Button key={genre} variant="secondary" asChild>
            <Badge variant="secondary" className="text-lg">
              {genre}
            </Badge>
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default GenresList;
