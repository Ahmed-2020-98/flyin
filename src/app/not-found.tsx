import Link from "next/link";

// Top-level not-found for requests that don't resolve to a locale. It renders
// its own document because there is no root layout above the [locale] segment.
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#f5f8fc",
          color: "#0f1e2e",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ fontSize: "3rem", fontWeight: 800, color: "#0f57a3" }}>
            404
          </p>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            The page you're looking for could not be found.
          </p>
          <Link
            href="/en"
            style={{
              background: "#0f57a3",
              color: "#fff",
              padding: "0.7rem 1.4rem",
              borderRadius: "0.6rem",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Go to homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
