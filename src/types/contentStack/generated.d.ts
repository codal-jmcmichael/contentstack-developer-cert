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

export type TaxonomyEntry = Taxonomy & { term_uid: string };

export interface JSONRTENode {
  type: string;
  uid: string;
  _version: number;
  attrs: Record<string, any>;
  children?: JSONRTENode[];
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  src?: string;
  alt?: string;
  href?: string;
  target?: string;
  embed?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
  };
}

export interface CSLPAttribute {
  "data-cslp"?: string;
  "data-cslp-parent-field"?: string;
}
export type CSLPFieldMapping = CSLPAttribute | string;

export interface SystemFields {
  uid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: PublishDetails;
  title?: string;
}

export interface ModularBlocks extends SystemFields {
  songs: {
    songs_reference?: (Song | ReferencedEntry)[];
    $?: {
      songs_reference?: CSLPFieldMapping;
    };
  };
  artists: {
    artists_reference?: (Artist | ReferencedEntry)[];
    $?: {
      artists_reference?: CSLPFieldMapping;
    };
  };
  albums: {
    albums_reference?: (Album | ReferencedEntry)[];
    $?: {
      albums_reference?: CSLPFieldMapping;
    };
  };
  genres: {
    genres_reference?: (Genre | ReferencedEntry)[];
    $?: {
      genres_reference?: CSLPFieldMapping;
    };
  };
}

export interface Page extends SystemFields {
  _version?: number;
  title: string;
  url: string;
  modular_blocks?: ModularBlocks[];
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    modular_blocks?: CSLPFieldMapping;
  };
}

export interface Song extends SystemFields {
  _version?: number;
  title: string;
  url: string;
  description?: string;
  lyrics?: string;
  reference_artist?: (Artist | ReferencedEntry)[];
  reference_album?: (Album | ReferencedEntry)[];
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    description?: CSLPFieldMapping;
    lyrics?: CSLPFieldMapping;
    reference_artist?: CSLPFieldMapping;
    reference_album?: CSLPFieldMapping;
  };
}

export interface Album extends SystemFields {
  _version?: number;
  title: string;
  url?: string;
  release_date?: string | null;
  cover_art?: File | null;
  taxonomies?: Taxonomy | TaxonomyEntry[];
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    release_date?: CSLPFieldMapping;
    cover_art?: CSLPFieldMapping;
    taxonomies?: CSLPFieldMapping;
  };
}

export interface Artist extends SystemFields {
  _version?: number;
  title: string;
  url: string;
  featured_image?: File | null;
  rte_synopsis?: {
    type: string;
    uid: string;
    _version: number;
    attrs: Record<string, any>;
    children: JSONRTENode[];
  };
  $?: {
    title?: CSLPFieldMapping;
    url?: CSLPFieldMapping;
    featured_image?: CSLPFieldMapping;
    rte_synopsis?: CSLPFieldMapping;
  };
}
