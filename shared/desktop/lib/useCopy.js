import { useCallback, useEffect, useRef, useState } from "react";

export function useCopy(ms = 1500) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = useCallback(
    async (text) => {
      clearTimeout(timer.current);
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        setCopied(false);
        return false;
      }
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), ms);
      return true;
    },
    [ms],
  );
  return [copied, copy];
}
