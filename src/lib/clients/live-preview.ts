import ContentstackLivePreview from "@contentstack/live-preview-utils";

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: true,
    enable: true,
    mode: "builder",
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH,
    },
    editButton: { enable: true },
  });
}

export default initLivePreview;
