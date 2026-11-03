import { useRef, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme";
import { P, openUrl } from "../components/ui";
import donateQr from "@shared/assets/images/donate.webp";
import { SECRET_URL } from "@shared/data/social.js";
import { DONATE } from "@shared/data/donate.js";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { cls } from "../styles";

export function DonateScreen() {
  const tapsRef = useRef(0);
  const [showSecret, setShowSecret] = useState(false);
  const onQrTap = () => {
    tapsRef.current += 1;
    if (tapsRef.current >= 3) {
      tapsRef.current = 0;
      setShowSecret(true);
    }
  };
  return (
    <View className={cls.donateWrap}>
      <View className={cls.donateCard}>
        <View className={cls.donateHead}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={18}
            color={colors.gold}
          />
          <Text className={cls.donateTitle}>{DONATE.title}</Text>
        </View>
        <Pressable onPress={onQrTap}>
          <Image
            source={donateQr}
            className={cls.donateQr}
            resizeMode="contain"
            accessibilityLabel={DONATE.qrAlt}
          />
        </Pressable>
        <Text className={cls.donateThanks}>{DONATE.thanks}</Text>
      </View>
      <ConfirmDialog
        visible={showSecret}
        title={DONATE.secretTitle}
        icon={
          <MaterialCommunityIcons
            name="party-popper"
            size={20}
            color={colors.gold}
          />
        }
        message={<P>{DONATE.secretMessage}</P>}
        confirmText={DONATE.secretConfirm}
        cancelText={DONATE.secretCancel}
        onConfirm={() => {
          openUrl(SECRET_URL);
          setShowSecret(false);
        }}
        onCancel={() => setShowSecret(false)}
      />
    </View>
  );
}
