import * as contentStack from "@contentstack/management";
import { StackConfig } from "@contentstack/management/types/stack";

const stackOptions: StackConfig = {
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  management_token: process.env.NEXT_PUBLIC_CONTENTSTACK_MANAGEMENT_TOKEN!,
};

const ManagementClient = contentStack.client().stack(stackOptions);
export default ManagementClient;
