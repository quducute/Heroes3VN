import md from "../../secret.md";

const ALERT = /^\[!(NOTE|TIP|IMPORTANT)\]$/;
const INLINE = /(\*\*[^*]+\*\*|_[^_]+_)/;

export const ALERT_KINDS = {
  NOTE: { label: "Lưu ý", tone: "cornflowerblue" },
  TIP: { label: "Gợi ý", tone: "mediumseagreen" },
  IMPORTANT: { label: "Quan trọng", tone: "mediumpurple" },
};

export function parseInline(text) {
  let offset = 0;
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((part) => {
      const key = String(offset);
      offset += part.length;
      if (part.length > 4 && part.startsWith("**") && part.endsWith("**"))
        return { key, text: part.slice(2, -2), bold: true };
      if (part.length > 2 && part.startsWith("_") && part.endsWith("_"))
        return { key, text: part.slice(1, -1), italic: true };
      return { key, text: part };
    });
}

function parseBlock(chunk, id) {
  const lines = chunk.split("\n");
  const first = lines[0];
  if (first.startsWith("### "))
    return { id, type: "heading", text: first.slice(4) };
  if (first.startsWith(">")) {
    const body = lines.map((l) => l.replace(/^> ?/, ""));
    const kind = ALERT.exec(body[0])?.[1];
    return {
      id,
      type: "alert",
      kind: kind ?? "NOTE",
      text: (kind ? body.slice(1) : body).join(" "),
    };
  }
  if (first.startsWith("- "))
    return { id, type: "list", items: lines.map((l) => l.slice(2)) };
  return { id, type: "paragraph", text: lines.join(" ") };
}

export function parseSecret(source) {
  const doc = { title: "", intro: [], hints: [] };
  let target = doc.intro;
  const chunks = source
    .replaceAll("\r", "")
    .split(/\n{2,}/)
    .map((c) => c.trim())
    .filter(Boolean);
  chunks.forEach((chunk, n) => {
    const id = `b${n}`;
    if (chunk.startsWith("# ")) doc.title = chunk.slice(2);
    else if (chunk.startsWith("## ")) {
      const hint = { id, title: chunk.slice(3), blocks: [] };
      doc.hints.push(hint);
      target = hint.blocks;
    } else target.push(parseBlock(chunk, id));
  });
  return doc;
}

export const SECRET = parseSecret(md);
