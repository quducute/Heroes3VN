import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { alpha, colors } from "../theme";
import { SECRET, parseInline } from "@shared/data/secret.js";

const ALERTS = {
  NOTE: { label: "Lưu ý", tone: "cornflowerblue", icon: "information-outline" },
  TIP: { label: "Gợi ý", tone: "mediumseagreen", icon: "lightbulb-outline" },
  IMPORTANT: {
    label: "Quan trọng",
    tone: "mediumpurple",
    icon: "message-alert-outline",
  },
};

const s = {
  title: "text-gold-bright text-[18px] text-center font-roman mb-3",
  para: "text-fg text-[14.5px] leading-5.5 font-roboto",
  bold: "text-gold-bright font-roboto-bold",
  italic: "font-roboto-italic",
  heading: "text-gold-bright text-[16px] font-roboto-bold",
  blocks: "gap-3",
  alert: "border-l-3 rounded-r-md px-3 py-2.5",
  alertHead: "flex-row items-center gap-1.5 mb-1",
  alertLabel: "text-[14px] font-roboto-bold",
  listItem: "flex-row gap-2 pl-1",
  bullet: "text-gold text-[14.5px] leading-5.5 font-roboto-bold",
  hint: "border border-gold/35 rounded-md bg-gold/5 overflow-hidden mt-3",
  hintHead: "flex-row items-center justify-between gap-2.5 p-3.5",
  hintTitle: "flex-1 text-gold-bright text-[15px] font-roboto-bold",
  hintBody: "p-3.5 pt-3 border-t border-t-gold/20 gap-3",
};

function Inline({ text }) {
  return parseInline(text).map((seg) => {
    if (seg.bold)
      return (
        <Text key={seg.key} className={s.bold}>
          {seg.text}
        </Text>
      );
    if (seg.italic)
      return (
        <Text key={seg.key} className={s.italic}>
          {seg.text}
        </Text>
      );
    return seg.text;
  });
}

function Para({ text, className = s.para }) {
  return (
    <Text className={className}>
      <Inline text={text} />
    </Text>
  );
}

function Alert({ kind, text }) {
  const { label, tone, icon } = ALERTS[kind] ?? ALERTS.NOTE;
  return (
    <View
      className={s.alert}
      style={{ borderLeftColor: tone, backgroundColor: alpha(tone, 0.08) }}
    >
      <View className={s.alertHead}>
        <MaterialCommunityIcons name={icon} size={15} color={tone} />
        <Text className={s.alertLabel} style={{ color: tone }}>
          {label}
        </Text>
      </View>
      <Para text={text} />
    </View>
  );
}

function Block({ block }) {
  if (block.type === "heading")
    return <Para text={block.text} className={s.heading} />;
  if (block.type === "alert")
    return <Alert kind={block.kind} text={block.text} />;
  if (block.type === "list")
    return (
      <View className="gap-1">
        {block.items.map((item) => (
          <View className={s.listItem} key={item}>
            <Text className={s.bullet}>•</Text>
            <View className="flex-1">
              <Para text={item} />
            </View>
          </View>
        ))}
      </View>
    );
  return <Para text={block.text} />;
}

export function SecretScreen() {
  const [open, setOpen] = useState({});
  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  return (
    <View>
      <Text className={s.title}>{SECRET.title}</Text>
      <View className={s.blocks}>
        {SECRET.intro.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </View>
      {SECRET.hints.map((hint) => (
        <View className={s.hint} key={hint.id}>
          <Pressable
            className={s.hintHead}
            accessibilityRole="button"
            accessibilityState={{ expanded: Boolean(open[hint.id]) }}
            onPress={() => toggle(hint.id)}
          >
            <Text className={s.hintTitle}>{hint.title}</Text>
            <MaterialCommunityIcons
              name={open[hint.id] ? "chevron-up" : "chevron-down"}
              size={18}
              color={colors.gold}
            />
          </Pressable>
          {open[hint.id] ? (
            <View className={s.hintBody}>
              {hint.blocks.map((block) => (
                <Block key={block.id} block={block} />
              ))}
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
}
