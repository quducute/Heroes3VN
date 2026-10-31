import { useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme";
import { copyText } from "./ui";
import { styles } from "../styles";

export function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  return (
    <Pressable
      style={[styles.copyBtn, copied && styles.copyBtnOn]}
      onPress={onCopy}
      hitSlop={6}
    >
      <MaterialCommunityIcons
        name={copied ? "check" : "content-copy"}
        size={16}
        color={copied ? colors.green : colors.gold}
      />
    </Pressable>
  );
}
