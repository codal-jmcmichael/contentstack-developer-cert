import ContentstackLivePreview from "@contentstack/live-preview-utils";

const requiredEnvVars = [
  "CONTENTSTACK_ENVIRONMENT",
  "CONTENTSTACK_PREVIEW_HOST",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(
      `Error: Missing required environment variable "${envVar}". Please check your .env.local file.`
    );
  }
}

const options = {
  enable: process.env.CONTENTSTACK_ENVIRONMENT !== "production",
  cleanCslpOnProduction: process.env.CONTENTSTACK_ENVIRONMENT === "production",
  ssr: true,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
};

const LivePreview = ContentstackLivePreview.init(options);
export default LivePreview;
