"use client";

import { Suspense } from "react";
import { useAnalytics } from "@/lib/utils/analytics";

function AnalyticsInner() {
  useAnalytics();
  return null;
}

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
