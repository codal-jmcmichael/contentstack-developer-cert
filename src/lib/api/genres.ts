import { ManagementClient } from "@/lib/clients";
import { Taxonomy } from "@/types/contentStack/generated";
import { Term } from "@contentstack/management/types/stack/taxonomy/terms";
import { Taxonomy as ManagementTaxonomy } from "@contentstack/management/types/stack/taxonomy";

/**
 *
 * @returns A list of genres from the Contentstack management API.
 * This function fetches the "Genres" taxonomy and its terms.
 * It returns an array of terms representing different genres.
 */
export const getGenres = async (): Promise<
  Taxonomy["taxonomy_uid"][] | undefined
> => {
  try {
    const allTaxonomiesResponse = await ManagementClient.taxonomy()
      .query()
      .find();

    // Find the specific "Genres" taxonomy from the list of all taxonomies
    const genresTaxonomy = allTaxonomiesResponse.items.find(
      (tax: ManagementTaxonomy) => tax.name.toLowerCase() === "genres"
    );

    if (!genresTaxonomy) {
      console.error('Taxonomy with the name "Genres" was not found.');
      return;
    }

    // Use the UID of the "Genres" taxonomy to fetch its terms in a new query
    const termsResponse = await ManagementClient.taxonomy(genresTaxonomy.uid) // Scope the query to the "Genres" taxonomy
      .terms()
      .query()
      .find();

    if (!termsResponse || !termsResponse.items) {
      console.error("No terms found in the 'Genres' taxonomy.");
      return;
    }

    return termsResponse.items.map((term: Term) => term.name);
  } catch (error) {
    console.error("Error fetching genres from taxonomy:", error);
    return;
  }
};
