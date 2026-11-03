import { useEffect, useState } from "react";

export function useModLatest(fetchModLatest, id) {
  const [result, setResult] = useState({ id: null, info: null });
  useEffect(() => {
    let alive = true;
    if (!id) return undefined;
    fetchModLatest(id)
      .then((info) => alive && setResult({ id, info }))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [fetchModLatest, id]);
  const latest = result.id === id ? result.info : null;
  if (!latest) return [];
  return Array.isArray(latest) ? latest : [latest];
}
