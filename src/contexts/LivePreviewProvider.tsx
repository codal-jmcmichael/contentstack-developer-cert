"use client";

import { useEffect } from "react";
import { initLivePreview } from "@/lib/clients";

export const LivePreviewProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const livePreviewEnabled = process.env.NEXT_PUBLIC_CONTENTSTACK_LIVE_PREVIEW;

  useEffect(() => {
    if (livePreviewEnabled === "true") {
      initLivePreview();
    }
  }, [livePreviewEnabled]);

  return <>{children}</>;
};
