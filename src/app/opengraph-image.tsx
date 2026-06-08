import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo/metadata";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ADA Lift & Ramp Installation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#fde047",
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Licensed · Insured · ADA Specialists
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
          Florida Platform Lift Pros
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#bfdbfe",
            marginTop: 32,
            maxWidth: 980,
            lineHeight: 1.25,
          }}
        >
          Vertical platform lifts, stair lifts, vehicle lifts, and ADA ramps across South & Southwest Florida.
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "auto",
            color: "#fde047",
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.phone}</div>
          <div style={{ display: "flex", fontSize: 24, color: "#bfdbfe" }}>
            floridaplatformliftpros.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
