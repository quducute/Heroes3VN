import { View, Text } from "react-native";
import { Note, P, B, KeybindsTable, A } from "../components/ui";
import { KEYBINDS_HD, KEYBINDS_BASE } from "../data/keybinds";
import { styles } from "../styles";

export function KeybindsScreen() {
  return (
    <View>
      <Note>
        <P>
          Có 2 bảng: bảng đầu là các phím tắt/thao tác chuột được bổ sung khi
          cài <B>HD Patch</B>; bảng sau là phím tắt của <B>bản gốc</B>{" "}
          (Complete/SoD, ERA/WoG, HotA). Đối với bản VCMI có thể sẽ khác đôi
          chút.
        </P>
      </Note>
      <Text style={styles.kbTitle}>Bảng 1 - Bổ sung khi cài HD Patch</Text>
      <KeybindsTable groups={KEYBINDS_HD} />
      <P style={styles.source}>
        Nguồn:{" "}
        <A href="https://sites.google.com/site/heroes3hd/eng/functionality">
          HoMM3 HD
        </A>
        .
      </P>
      <Text style={styles.kbTitle}>Bảng 2 - Phím tắt bản gốc</Text>
      <KeybindsTable groups={KEYBINDS_BASE} />
      <P style={styles.source}>
        Nguồn:{" "}
        <A href="https://heroes.thelazy.net/index.php/Keybinds">
          heroes.thelazy.net
        </A>
        .
      </P>
    </View>
  );
}
