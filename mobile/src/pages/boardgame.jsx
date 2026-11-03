import { View } from "react-native";
import { Section, P, SysReq, B, LinkRow } from "../components/ui";

export function BoardgameScreen() {
  return (
    <View>
      <Section title="Giới thiệu">
        <P>
          <B>Heroes of Might &amp; Magic III: The Board Game</B> là phiên bản
          board game chính thức của Heroes 3, do Archon Studio (Ba Lan) phát
          triển với bản quyền từ Ubisoft. Game giữ đúng tinh thần bản PC: chọn
          phe, khám phá bản đồ, xây thành, chiêu mộ quân, phát triển tướng rồi
          lao vào những trận đánh quyết định.
        </P>
        <SysReq
          items={[
            {
              label: "Nhà phát triển",
              value:
                "Archon Studio (bản quyền Ubisoft), hợp tác cùng HotA Crew",
            },
            { label: "Số người chơi", value: "1-4 người" },
            { label: "Thời gian", value: "Khoảng 90 phút/ván" },
            { label: "Độ tuổi", value: "14+" },
            { label: "Chế độ chơi", value: "Đối kháng, hợp tác, chơi đơn" },
            {
              label: "Ngôn ngữ",
              value: "Tiếng Anh, Ba Lan, Đức, Pháp, Tây Ban Nha",
            },
          ]}
        />
      </Section>
      <Section title="Lối chơi">
        <P>
          <B>Khám phá bản đồ:</B> ván đấu bắt đầu với bản đồ bị sương mù che
          phủ, chỉ thấy khu vực quanh thành. Bản đồ được ghép dần từ các mảnh
          hình lục giác khi tướng đi khám phá.
        </P>
        <P>
          <B>Xây thành:</B> thu thập tài nguyên, tính toán kinh tế và xây công
          trình trên bảng thành hai lớp.
        </P>
        <P>
          <B>Chiêu mộ quân:</B> mỗi loại quân là một lá bài, lật sang mặt
          hologram để nâng cấp.
        </P>
        <P>
          <B>Phát triển tướng:</B> trang bị bảo vật, học phép từ bốn trường phái
          phép thuật, lên cấp để học và nâng kỹ năng, mỗi tướng có chuyên môn
          riêng.
        </P>
        <P>
          <B>Chiến đấu:</B> đánh trên chiến trường mở rộng với bộ mô hình
          (miniature), hoặc chỉ dùng bài trên bảng combat rút gọn cho nhanh.
        </P>
        <P>
          <B>Giải đấu:</B> có sẵn sách luật giải đấu (Tournament Book) cho ai
          thích đấu với bạn bè.
        </P>
      </Section>
      <Section title="Hộp game và các phần mở rộng">
        <SysReq
          items={[
            {
              label: "Hộp cơ bản",
              value:
                "Gồm Castle, Necropolis, Dungeon cùng 6 mô hình tướng, 3 bảng thành, 1 bảng combat, 20 mảnh bản đồ, 256 lá bài, 8 xúc xắc riêng, sách luật, sách nhiệm vụ và sách giải đấu.",
            },
            {
              label: "Kickstarter 2022",
              value:
                "Thêm Rampart, Fortress, Inferno, Tower, được sự ủng hộ đông đảo từ cộng đồng.",
            },
            {
              label: "Gamefound 2024",
              value:
                "Thêm Stronghold, Conflux và Cove (làm cùng HotA Crew, dựa trên phe Cove của HotA), kèm hầm ngầm, đảo, tàu thuyền và cổng dịch chuyển.",
            },
            {
              label: "Gamefound 2026",
              value:
                "Thêm Factory, Bulwark (2 phe từ HotA) và Forge - phe bị bỏ dở của Heroes 3, thiết kế cùng Gregory Fulton, một trong những người làm Heroes 3 gốc. Nâng tổng số lên 13 thành, Archon gọi đây có thể là đợt cuối cùng.",
            },
          ]}
        />
      </Section>
      <Section title="Đặt mua">
        <LinkRow
          label="Trang chính thức của Archon Studio"
          desc="Đặt mua box gốc và các box mở rộng."
          url="https://archon-studio.com/homm3boardgame"
          buttonText="Đặt mua"
        />
      </Section>
      <Section title="Chơi online">
        <LinkRow
          label="Heroes 3 The Board Game Online"
          desc="Bản online do tác giả người Việt phát triển (phi lợi nhuận), chơi nhiều người ngay trên trình duyệt mà không cần cài đặt."
          url="https://heroes-3-board-game-multi.vercel.app"
          buttonText="Mở link"
        />
        <LinkRow
          label="Facebook tác giả: Nguyen Thai Binh"
          url="https://www.facebook.com/thaibinh.nguyen.58"
          buttonText="Xem Facebook"
        />
      </Section>
    </View>
  );
}
