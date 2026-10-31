import { View, Image, Text } from "react-native";
import { Section, P, SysReq, LinkRow, B } from "../components/ui";
import dorIcon from "../assets/icons/dor.webp";
import remakeIcon from "../assets/icons/remake.webp";
import { styles } from "../styles";

function UpcomingHead({ img, name, sub }) {
  return (
    <View style={styles.upHead}>
      <Image source={img} style={styles.upIcon} resizeMode="cover" />
      <View style={{ flex: 1 }}>
        <Text style={styles.upName}>{name}</Text>
        <Text style={styles.upSub}>{sub}</Text>
      </View>
    </View>
  );
}

export function UpcomingScreen() {
  return (
    <View>
      <Section title="Heroes 3 Remake">
        <UpcomingHead
          img={remakeIcon}
          name="Heroes of Might and Magic III Remake"
          sub="Ubisoft - dự kiến 2027"
        />
        <P>
          Bản làm lại chính thức của Heroes 3 do Ubisoft phát triển, gồm game
          gốc cùng cả 2 bản mở rộng, dựng lại hoàn toàn bằng 3D và hỗ trợ độ
          phân giải 4K.
        </P>
        <SysReq
          items={[
            { label: "Nhà phát triển", value: "Ubisoft" },
            { label: "Dự kiến ra mắt", value: "2027" },
            { label: "Nền tảng", value: "Windows (Steam)" },
          ]}
        />
        <LinkRow
          label="Trang game trên Steam"
          desc="Có thể thêm game vào Wishlist để nhận thông báo khi game ra mắt."
          url="https://store.steampowered.com/app/3809850/Heroes_of_Might_and_Magic_III_Remake"
          buttonText="Xem trên Steam"
        />
      </Section>
      <Section title="Day of Reckoning (DoR)">
        <UpcomingHead img={dorIcon} name="Day of Reckoning" sub="DoR" />
        <P>
          Một dự án Heroes 3 mới đang được phát triển. Thông tin mới nhất về{" "}
          <B>DoR</B> được cập nhật trên diễn đàn Heroes Community.
        </P>
        <LinkRow
          label="Thread giới thiệu DoR trên Heroes Community"
          url="http://heroescommunity.com/viewthread.php3?TID=47267" // NOSONAR
          buttonText="Xem thông tin"
        />
      </Section>
    </View>
  );
}
