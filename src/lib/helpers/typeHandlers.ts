import { ReferencedEntry } from "@/types/contentStack/generated";

export const hasReferencedEntryType = (
  entry: any
): entry is ReferencedEntry => {
  return entry && typeof entry === "object" && "uid" in entry;
};
