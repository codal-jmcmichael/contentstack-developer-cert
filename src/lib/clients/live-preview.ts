import ContentstackLivePreview from "@contentstack/live-preview-utils";

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: true,
    enable: true,
    mode: "preview",
    stackDetails: {
      apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY,
      environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "main",
      branch: process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main",
    },
    clientUrlParams: {
      host: process.env.NEXT_PUBLIC_CONTENTSTACK_APP_HOST,
    },
    editButton: { enable: true },
  });
}

export default initLivePreview;
