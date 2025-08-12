import * as contentStack from "@contentstack/management";
import { StackConfig } from "@contentstack/management/types/stack";

/*
 * Ensure that all required environment variables are set.
 * This helps prevent runtime errors due to missing configuration.
 */
const requiredEnvVars = ["CONTENTSTACK_READ_MANAGEMENT_TOKEN"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(
      `Error: Missing required environment variable "${envVar}". Please check your .env.local file.`
    );
  }
}

const stackOptions: StackConfig = {
  api_key: process.env.CONTENTSTACK_API_KEY!,
  management_token: process.env.CONTENTSTACK_READ_MANAGAMENT_TOKEN!,
};

const ManagementClient = contentStack.client();
ManagementClient.stack(stackOptions);

export default ManagementClient;
