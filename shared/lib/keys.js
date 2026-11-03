export function keyParts(keys) {
  let pos = 0;
  return keys.split(/( [+/] )/).map((part) => {
    const key = `${pos}-${part}`;
    pos += part.length;
    const text = part.trim();
    return { key, text, sep: text === "+" || text === "/" };
  });
}
