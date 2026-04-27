"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Analytics hook — fires a page view event on every route change.
 * Swap the console.log calls with your analytics provider
 * (e.g., Google Analytics, Plausible, PostHog) when ready.
 */
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    // Replace this with your analytics provider call, e.g.:
    // gtag("config", process.env.NEXT_PUBLIC_GA_ID, { page_path: url });
    // plausible("pageview", { props: { url } });
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics] Page view:", url);
    }
  }, [pathname, searchParams]);
}
