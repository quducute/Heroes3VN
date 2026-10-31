import { useState, useEffect } from "react";
import { fetchModLatest } from "../lib/update.js";

function useModLatest(id) {
  const [result, setResult] = useState({ id: null, info: null });
  useEffect(() => {
    let alive = true;
    if (!id) return;
    fetchModLatest(id)
      .then((info) => alive && setResult({ id, info }))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [id]);
  const latest = result.id === id ? result.info : null;
  if (!latest) return [];
  return Array.isArray(latest) ? latest : [latest];
}

export function ModLatest({ id }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <div className="mod-latest" title="Version mới nhất từ trang phát hành">
      {items.map((it, i) => (
        <span key={it.label || "latest"} className="mod-latest-part">
          {i > 0 && <span className="mod-latest-sep">•</span>}
          {it.label || "Bản mới nhất"}: <b>{it.version}</b>
          {it.date && <span className="mod-latest-date"> ({it.date})</span>}
        </span>
      ))}
    </div>
  );
}

export function CardLatest({ id }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <div className="card-latest">
      {items.map((it, i) => (
        <span key={it.label || "latest"}>
          {i > 0 && " • "}
          {items.length > 1 && it.label ? `${it.label}: ` : "Mới nhất: "}
          <b>{it.version}</b>
        </span>
      ))}
    </div>
  );
}
