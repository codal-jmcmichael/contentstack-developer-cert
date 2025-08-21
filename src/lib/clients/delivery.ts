import contentstack, { StackConfig } from "@contentstack/delivery-sdk";

const stackOptions: StackConfig = {
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
  branch: process.env.NEXT_PUBLIC_CONTENTSTACK_BRANCH || "main",
  live_preview: {
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW === "true",
    host: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_HOST!,
    preview_token: process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN!,
  },
};

const DeliveryClient = contentstack.stack(stackOptions);
export default DeliveryClient;
