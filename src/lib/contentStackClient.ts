import contentstack from "@contentstack/delivery-sdk";

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT;

if (!apiKey) {
  throw new Error(
    "CONTENTSTACK_API_KEY is not defined in environment variables."
  );
}

if (!deliveryToken) {
  throw new Error(
    "CONTENTSTACK_DELIVERY_TOKEN is not defined in environment variables."
  );
}

if (!environment) {
  throw new Error(
    "CONTENTSTACK_ENVIRONMENT is not defined in environment variables."
  );
}

const ContentStack = contentstack.stack({
  apiKey,
  deliveryToken,
  environment,
});

export default ContentStack;
