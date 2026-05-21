import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Generated favicon — "T" monogram in accent color on dark background. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#08090a",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#8b8df0",
          fontFamily: "sans-serif",
        }}
      >
        T
      </div>
    ),
    { ...size }
  );
}
