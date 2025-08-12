import { DeliveryClient, ManagementClient } from "@/lib/clients";
import { Artist, Taxonomy } from "@/types/contentStack/generated";
import { BaseEntry } from "@contentstack/delivery-sdk";

export type ArtistWithMetadata = Artist & BaseEntry;

/**
 *
 * @returns A list of artists from the Contentstack delivery API.
 * This function fetches all entries of the "artist" content type.
 * It returns an array of artists with their metadata.
 */
export const getArtists = async (): Promise<
  ArtistWithMetadata[] | undefined
> => {
  try {
    const response = await DeliveryClient.contentType("artist")
      .entry()
      .find<ArtistWithMetadata>();

    return response.entries;
  } catch (error) {
    console.error("Error fetching artists:", error);
  }

  return [];
};

/**
 *
 * @param slug The slug of the artist to fetch.
 * The slug is typically the URL-friendly version of the artist's name.
 * For example, "kendrick-lamar" for the URL "/artists/kendrick-lamar".
 * @returns
 */
export const getArtistByName = async (
  slug: Artist["url"]
): Promise<ArtistWithMetadata | undefined> => {
  try {
    /*
     * The .regex() method is used here to match the slug within the
     * URL field of the artist entries. We're just matching the
     * "kendrick-lamar" part of "/artists/kendrick-lamar" to keep the
     * "/artists/..." prefix flexible.
     */
    const query = await DeliveryClient.contentType("artist")
      .entry()
      .query()
      .regex("url", slug)
      .find<ArtistWithMetadata>();

    const artist = query?.entries?.[0];

    return artist;
  } catch (error) {
    console.error(`Error fetching artist by slug "${slug}":`, error);
  }

  return undefined;
};

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
      (tax: any) => tax.name.toLowerCase() === "genres"
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

    return termsResponse.items.map((term: any) => term.uid);
  } catch (error) {
    console.error("Error fetching genres from taxonomy:", error);
    return;
  }
};
