import { useRef, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme";
import { P, openUrl } from "../components/ui";
import donateQr from "../assets/images/donate.webp";
import { SECRET_URL } from "../data/social";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { styles } from "../styles";

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
    <View style={styles.donateWrap}>
      <View style={styles.donateCard}>
        <View style={styles.donateHead}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={18}
            color={colors.gold}
          />
          <Text style={styles.donateTitle}>Donate - VietinBank</Text>
        </View>
        <Pressable onPress={onQrTap}>
          <Image
            source={donateQr}
            style={styles.donateQr}
            resizeMode="contain"
          />
        </Pressable>
        <P style={styles.donateNote}>
          Quét mã QR bằng app ngân hàng để ủng hộ em.
        </P>
        <Text style={styles.donateThanks}>
          Cảm ơn các bác đã sử dụng Heroes 3 VN!
        </Text>
      </View>
      <ConfirmDialog
        visible={showSecret}
        title="Thông báo"
        icon={
          <MaterialCommunityIcons
            name="party-popper"
            size={20}
            color={colors.gold}
          />
        }
        message={<P>Chúc mừng, bác vừa khám phá ra tính năng ẩn của tool!</P>}
        confirmText="Xem thử"
        cancelText="Thôi"
        onConfirm={() => {
          openUrl(SECRET_URL);
          setShowSecret(false);
        }}
        onCancel={() => setShowSecret(false)}
      />
    </View>
  );
}
