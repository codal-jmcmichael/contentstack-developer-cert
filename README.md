# Codal ContentStack Exercise

## Guidelines

Use ContentStack to express relational data between content types and render them on the frontend in a mock exercise.

Create the following content types:

1. Song
   - Title
   - Slug (unique song identifier)
   - Description
   - Lyrics (body)
   - Album Art (featured image)
   - Artist (reference to Artist content type)
   - Genres (tags)
   - Release Date (published date)
   - Is Single (is featured)
2. Artist
   - Name
   - Bio
   - Photo (headshot)
   - Slug
3. Genre
   - Label (genre name)
   - Slug

## Frontend Components

- Use Next.js to render the music site.
- **Home Page**: Display a carded list of songs, with filters (e.g., by genre or artist) powered by the API.
- **Song Page**: Show all details for a song (title, lyrics, album art, artist, genres, etc.).

## API Usage & Frontend Integration

- Use the Content Delivery API to fetch music data.
- Filter songs by genre or slug using query parameters.
- Order songs by release date (newest first).
- Support pagination or infinite scroll on the song listing page.

## Preview & Draft Support

- Implement preview URLs for content editors (e.g., to preview a song before publishing).
- Respect draft/published status in frontend logic.

## Additional Skills & Environment

- Gain proficiency in content modeling (single vs. multi-entry types, referencing, validations).
- Use ContentStack APIs (CDA, CMA) and SDKs.
- Manage entries (create, edit, publish), assets (upload, organize), and content states.
- Set up a local environment and a dedicated GitHub branch for your work.

## Developer Instructions

### Types

Content types will be automatically generated via the
`pregen` script each time `npm run dev` is executed.

### First Time Setup 

1. Install dependencies

```bash
pnpm install
```

2. Install ContentStack CLI

```bash
npm install -g @contentstack/cli
```

3. Install tsgen plugin

```bash
csdx plugins:install contentstack-cli-tsgen
```

4. Add delivery token as an alias to the CLI 

```bash
csdx auth:tokens:add --delivery
```

5. Select a region

```bash
csdx config:set:region
```

### Development

1. Run the project

```bash
pnpm dev
```

Content types will be generated in a `generated.d.ts` file for you at runtime
