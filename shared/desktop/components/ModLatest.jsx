import { useState, useEffect } from "react";
import { fetchModLatest } from "@app/lib/update.js";
import { CARD_LATEST, MOD_LATEST, MOD_LATEST_PART } from "../lib/cls.js";

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
    <div className={MOD_LATEST} title="Version mới nhất từ trang phát hành">
      {items.map((it, i) => (
        <span key={it.label || "latest"} className={MOD_LATEST_PART}>
          {i > 0 && <span className="text-muted mx-1.75 phone:hidden">•</span>}
          {it.label || "Bản mới nhất"}: <b>{it.version}</b>
          {it.date && <span className="text-muted"> ({it.date})</span>}
        </span>
      ))}
    </div>
  );
}

export function CardLatest({ id }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <div className={CARD_LATEST}>
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
