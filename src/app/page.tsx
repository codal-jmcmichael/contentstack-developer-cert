import { Badge } from "@/components/ui/badge";
import { getGenres } from "@/lib/api";

export default async function Home() {
  const genres = await getGenres();

  if (!genres || genres.length === 0) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <p>No genres found.</p>
      </div>
    );
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {genres?.map((genre) => (
          <Badge key={genre} className="text-lg">
            {genre}
          </Badge>
        ))}

        <p>Welcome home!</p>
      </main>
    </div>
  );
}
