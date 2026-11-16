import { useState } from "react";
import "./_group.css";

const pages = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "events", label: "Bridal & Events" },
  { id: "about", label: "About & Contact" },
  { id: "notFound", label: "404" },
] as const;

export function Current() {
  const [page, setPage] = useState<(typeof pages)[number]["id"]>("home");
  return (
    <div className="current-pages">
      <nav aria-label="Preview current website pages" className="current-tabs">
        {pages.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={page === item.id}
            onClick={() => setPage(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <iframe
        key={page}
        className="current-page-frame"
        title={`Current Hazel Beauty Studio ${pages.find((item) => item.id === page)?.label} page`}
        src={`/__mockup/current-site/${page}.html`}
      />
    </div>
  );
}
