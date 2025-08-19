type BuildTuple<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : BuildTuple<T, N, [...R, T]>;

type TuplePrefixes<T extends any[]> = T extends [any, ...infer Rest]
  ? T | TuplePrefixes<Rest extends any[] ? Rest : []>
  : [];

type MaxTuple<T, N extends number> = TuplePrefixes<BuildTuple<T, N>>;

export interface ReferencedEntry {
  uid: string;
  _content_type_uid: string;
}

export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  description?: string;
  dimension?: {
    height: number;
    width: number;
  };
  publish_details: PublishDetails;
}

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export interface Song {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** URL */
  url?: string;
  /** Description */
  description?: string;
  /** Lyrics */
  lyrics?: string;
  /** Reference (Artist) */
  reference_artist?: (Artist | ReferencedEntry)[];
  /** Reference (Album) */
  reference_album?: (Album | ReferencedEntry)[];
}

export interface Album {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** URL */
  url?: string;
  /** Release Date */
  release_date?: string | null;
  /** Cover Art */
  cover_art?: File | null;
  /** Genres */
  taxonomies?: Taxonomy[];
}

export interface Artist {
  /** Version */
  _version?: number;
  /** Name */
  title: string;
  /** URL */
  url: string;
  /** Featured Image */
  featured_image?: File | null;
  /** Synopsis */
  synopsis?: string;
}
