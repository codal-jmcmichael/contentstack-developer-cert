import contentstack, { StackConfig } from "@contentstack/delivery-sdk";

/*
 * Ensure that all required environment variables are set.
 * This helps prevent runtime errors due to missing configuration.
 */
const requiredEnvVars = [
  "CONTENTSTACK_API_KEY",
  "CONTENTSTACK_DELIVERY_TOKEN",
  "CONTENTSTACK_ENVIRONMENT",
  "CONTENTSTACK_PREVIEW_TOKEN",
  "CONTENTSTACK_PREVIEW_HOST",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(
      `Error: Missing required environment variable "${envVar}". Please check your .env.local file.`
    );
  }
}

const stackOptions: StackConfig = {
  apiKey: process.env.CONTENTSTACK_API_KEY!,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.CONTENTSTACK_ENVIRONMENT!,
  branch: process.env.CONTENTSTACK_BRANCH || "main",
  live_preview: {
    enable: process.env.CONTENTSTACK_LIVE_PREVIEW === "true",
    host: process.env.CONTENTSTACK_PREVIEW_HOST!,
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN!,
  },
};

const ContentStack = contentstack.stack(stackOptions);
export default ContentStack;
