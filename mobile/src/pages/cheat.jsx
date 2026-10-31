import { View, Text } from "react-native";
import { Note, P, B, PageLink, CheatTable, A } from "../components/ui";
import { CHEATS } from "../data/cheats";
import { styles } from "../styles";

export function CheatScreen() {
  return (
    <View>
      <Note title="Cách dùng">
        <P>
          Để nhập mã cheat, bấm phím <B>Tab</B> (hoặc bấm/chạm vào thanh trạng
          thái phía dưới) để mở khung chat trong game rồi gõ mã. Cách này áp
          dụng chung cho mọi phiên bản. Chỉ dùng mã cheat khi đánh PvE offline,
          không dùng khi đánh PvP online. Bấm vào mã để copy nhanh.
        </P>
      </Note>
      <Note title="Riêng với ERA">
        <P>
          Các mã ở bảng dưới là cách cheat truyền thống: gõ mã vào khung chat.
          Riêng ERA còn có mod <B>TrainerX</B> (có sẵn khi cài ERA mới nhất) cho
          phép cheat trực tiếp trong game qua menu cheat, chỉnh sâu vào tướng,
          quân, đồ, tài nguyên. Hướng dẫn chi tiết xem ở{" "}
          <PageLink to="era">trang ERA</PageLink>.
        </P>
      </Note>
      <Note title="Siêu cheat">
        <P>
          <B>nwctheone:</B> cần cài HD Patch để có thể sử dụng (HotA và ERA đã
          tích hợp sẵn, <PageLink to="complete">Complete</PageLink> cần phải cài
          thủ công).
        </P>
        <P>
          <B>vcmigod:</B> mã riêng dành cho bản{" "}
          <PageLink to="vcmi">VCMI</PageLink> (VCMI không phải là Heroes 3 mà là
          một engine viết lại game nên không thể cài HD Patch, do đó họ tạo ra
          mã riêng).
        </P>
      </Note>
      <View style={styles.cheatHead}>
        <Text style={styles.cheatHeadCol}>
          Theo thứ tự từng dòng: [Complete/SoD, HotA, Chronicles] [ERA/WoG]
          [VCMI]
        </Text>
        <Text style={[styles.cheatHeadCol, { flex: 1, textAlign: "right" }]}>
          Tác dụng
        </Text>
      </View>
      <CheatTable rows={CHEATS} />
      <P style={styles.source}>
        Nguồn:{" "}
        <A href="https://heroes.thelazy.net/index.php/Cheats">
          heroes.thelazy.net
        </A>{" "}
        và <A href="https://vcmi.eu/players/Cheat_Codes">vcmi.eu</A>.
      </P>
    </View>
  );
}
