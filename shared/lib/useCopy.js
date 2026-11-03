import { useCallback, useEffect, useRef, useState } from "react";

const writeClipboard = (text) => navigator.clipboard.writeText(text);

export function useCopy(ms = 1500, write = writeClipboard) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = useCallback(
    async (text) => {
      clearTimeout(timer.current);
      try {
        await write(text);
      } catch {
        setCopied(false);
        return false;
      }
      setCopied(true);
      timer.current = setTimeout(() => setCopied(false), ms);
      return true;
    },
    [ms, write],
  );
  return [copied, copy];
}
