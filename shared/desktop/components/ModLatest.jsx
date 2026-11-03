import { fetchModLatest } from "@app/lib/update.js";
import { useModLatest as useLatest } from "../../lib/useModLatest.js";
import { CARD_LATEST, MOD_LATEST, MOD_LATEST_PART } from "../lib/cls.js";

const useModLatest = (id) => useLatest(fetchModLatest, id);

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
