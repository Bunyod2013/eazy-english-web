import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EazyEnglish - Ingliz tilini o'yin orqali o'rganing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 900,
              color: "#111",
              display: "flex",
            }}
          >
            Eazy
            <span style={{ color: "#22c55e" }}>English</span>
          </div>
        </div>
        <div
          style={{
            fontSize: "36px",
            color: "#444",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Ingliz tilini o&apos;yin orqali o&apos;rganing
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "40px",
            fontSize: "24px",
            color: "#22c55e",
            fontWeight: 600,
          }}
        >
          <span>Bepul</span>
          <span>&#x2022;</span>
          <span>Qiziqarli</span>
          <span>&#x2022;</span>
          <span>Samarali</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
