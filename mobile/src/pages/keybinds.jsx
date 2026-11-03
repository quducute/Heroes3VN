import { View, Text } from "react-native";
import { Note, P, B, KeybindsTable, A, PageLink } from "../components/ui";
import { KEYBINDS_HD, KEYBINDS_BASE } from "@shared/data/keybinds.js";
import { cls } from "../styles";

export function KeybindsScreen() {
  return (
    <View>
      <Note>
        <P>
          Có 2 bảng: bảng đầu là các phím tắt/thao tác chuột được bổ sung khi
          cài{" "}
          <PageLink to="complete">
            <B>HD Patch</B>
          </PageLink>
          ; bảng sau là phím tắt của <B>bản gốc</B> (<B>Complete/SoD</B>,{" "}
          <B>ERA/WoG</B>, <B>HotA</B>). Đối với bản{" "}
          <PageLink to="vcmi">
            <B>VCMI</B>
          </PageLink>{" "}
          có thể sẽ khác đôi chút.
        </P>
      </Note>
      <Text className={cls.kbTitle}>Bảng 1 - Bổ sung khi cài HD Patch</Text>
      <KeybindsTable groups={KEYBINDS_HD} />
      <P className={cls.source}>
        Nguồn:{" "}
        <A href="https://sites.google.com/site/heroes3hd/eng/functionality">
          HoMM3 HD
        </A>
        .
      </P>
      <Text className={cls.kbTitle}>Bảng 2 - Phím tắt bản gốc</Text>
      <KeybindsTable groups={KEYBINDS_BASE} />
      <P className={cls.source}>
        Nguồn:{" "}
        <A href="https://heroes.thelazy.net/index.php/Keybinds">
          heroes.thelazy.net
        </A>
        .
      </P>
    </View>
  );
}
