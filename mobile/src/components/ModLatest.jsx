import { View, Text } from "react-native";
import { fetchModLatest } from "../lib/update";
import { useModLatest as useLatest } from "@shared/lib/useModLatest.js";
import { cls } from "../styles";

const useModLatest = (id) => useLatest(fetchModLatest, id);

export function ModLatest({ id }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <View className={cls.latest}>
      {items.map((it) => (
        <Text
          key={it.label || "latest"}
          className={cls.latestText}
          numberOfLines={1}
        >
          {items.length > 1 && it.label ? `${it.label}: ` : "Mới nhất: "}
          <Text className={cls.latestVer}>{it.version}</Text>
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
    <Text className={cls.versionLatest} numberOfLines={2}>
      {items.map((it, i) => (
        <Text key={it.label || i}>
          {i > 0 ? "  •  " : ""}
          {items.length > 1 && it.label ? `${it.label}: ` : "Mới nhất: "}
          <Text className="font-roboto-bold" style={{ color: accent }}>
            {it.version}
          </Text>
        </Text>
      ))}
    </Text>
  );
}
