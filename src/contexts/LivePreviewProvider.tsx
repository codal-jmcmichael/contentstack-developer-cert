"use client";

import { useEffect } from "react";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export const LivePreviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const options = {
    enable: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT !== "production",
    cleanCslpOnProduction:
      process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT === "production",
    ssr: true,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT,
  };

  useEffect(() => {
    ContentstackLivePreview.init(options);
    console.log("Live Preview initialized");
  }, []);

  return <>{children}</>;
};
