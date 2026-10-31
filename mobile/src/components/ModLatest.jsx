import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { fetchModLatest } from "../lib/update";
import { styles } from "../styles";
import { fonts } from "../theme";

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
    <View style={styles.latest}>
      {items.map((it) => (
        <Text
          key={it.label || "latest"}
          style={styles.latestText}
          numberOfLines={1}
        >
          {items.length > 1 && it.label ? `${it.label}: ` : "Mới nhất: "}
          <Text style={styles.latestVer}>{it.version}</Text>
          {it.date ? ` (${it.date})` : ""}
        </Text>
      ))}
    </View>
  );
}

export function CardLatest({ id, accent }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <Text style={styles.versionLatest} numberOfLines={2}>
      {items.map((it, i) => (
        <Text key={it.label || i}>
          {i > 0 ? "  •  " : ""}
          {items.length > 1 && it.label ? `${it.label}: ` : "Mới nhất: "}
          <Text style={{ color: accent, fontFamily: fonts.bold }}>
            {it.version}
          </Text>
        </Text>
      ))}
    </Text>
  );
}
