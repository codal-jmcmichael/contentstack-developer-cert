import { DeliveryClient } from "@/lib/clients";
import { Page } from "@/types/contentStack/generated";
import { QueryOperation } from "@contentstack/delivery-sdk";
import { addEditableTags } from "@contentstack/utils";

type PageWithUid = Page & { uid: string };

/**
 *
 * @param url The URL of the page to fetch.
 * The URL is typically the path of the page, such as "/" for the home page
 * or "/about" for the about page.
 * @returns A list of pages that match the given URL.
 */
export const getPageByUrl = async (url: string): Promise<Page | undefined> => {
  try {
    const response = await DeliveryClient.contentType("page")
      .entry()
      .includeReference("modular_blocks.songs.songs_reference")
      .includeReference("modular_blocks.artists.artists_reference")
      .includeReference("modular_blocks.albums.albums_reference")
      .query()
      .where("url", QueryOperation.EQUALS, url)
      .find<Page>();

    if (response?.entries) {
      const entry = response?.entries?.[0] as PageWithUid;

      if (
        entry &&
        process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === "true"
      ) {
        addEditableTags(entry, "page", true);
      }
    }

    return response.entries?.[0] || undefined;
  } catch (error) {
    console.error(`Error fetching page with ${url}: `, error);
    return undefined;
  }
};
