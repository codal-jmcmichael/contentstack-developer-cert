import { DeliveryClient } from "@/lib/clients";
import { LivePreviewQuery } from "@contentstack/delivery-sdk";

export const setLivePreviewQueryParams = (queryParams: LivePreviewQuery) => {
  console.log("Setting live preview query params:", queryParams);

  if (queryParams?.live_preview) {
    DeliveryClient.livePreviewQuery(queryParams);
  }
};
