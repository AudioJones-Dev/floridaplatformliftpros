import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/metadata";

export const alt = `${siteConfig.name} — ADA platform lifts, ramps & accessibility across South & Southwest Florida`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRAND_900 = "#052539";
const BRAND_700 = "#093a52";
const BRAND_300 = "#7fb1cb";
const ACCENT_500 = "#e76f51";
const SURFACE_50 = "#faf8f4";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${BRAND_900} 0%, ${BRAND_700} 100%)`,
          color: SURFACE_50,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: ACCENT_500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.04em",
            }}
          >
            FL
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: BRAND_300,
            }}
          >
            floridaplatformliftpros.com
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            ADA Platform Lifts, Ramps &amp; Accessibility
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              lineHeight: 1.3,
              color: BRAND_300,
              maxWidth: 980,
            }}
          >
            {siteConfig.serviceAreaStatement}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: `2px solid ${BRAND_700}`,
          }}
        >
          <div style={{ fontSize: 30, fontWeight: 700, color: "#ffffff" }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 26px",
              borderRadius: 999,
              background: ACCENT_500,
              fontSize: 30,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            Call {siteConfig.phone}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
