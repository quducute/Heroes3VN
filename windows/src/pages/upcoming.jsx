import { Section, SysReq, LinkRow } from "../components/ui.jsx";
import dorIcon from "../assets/icons/dor.webp";
import remakeIcon from "../assets/icons/remake.webp";

function UpcomingHead({ icon, name, sub }) {
  return (
    <div className="upcoming-head">
      <img src={icon} alt="" />
      <div>
        <div className="upcoming-name">{name}</div>
        <div className="upcoming-sub">{sub}</div>
      </div>
    </div>
  );
}

export const upcomingPage = {
  id: "upcoming",
  name: "Sắp ra mắt",
  subtitle: "Dự kiến 2027",
  icon: dorIcon,
  accent: "color-mix(in srgb, deepskyblue 84%, black)",
  summary:
    "Thông tin các bản Heroes 3 sắp ra mắt: Heroes 3 Remake của Ubisoft và dự án Day of Reckoning (DoR).",
  badge: { text: "2 bản sắp ra mắt", title: "Số bản sắp ra mắt" },
  content: (
    <>
      <Section title="Heroes 3 Remake">
        <UpcomingHead
          icon={remakeIcon}
          name="Heroes of Might and Magic III Remake"
          sub="Ubisoft - dự kiến 2027"
        />
        <p className="hint">
          Bản làm lại chính thức của Heroes 3 do Ubisoft phát triển, gồm game
          gốc cùng cả 2 bản mở rộng, dựng lại hoàn toàn bằng 3D và hỗ trợ độ
          phân giải 4K.
        </p>
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
        <UpcomingHead icon={dorIcon} name="Day of Reckoning" sub="DoR" />
        <p className="hint">
          Một dự án Heroes 3 mới đang được phát triển. Thông tin mới nhất về DoR
          được cập nhật trên diễn đàn Heroes Community.
        </p>
        <LinkRow
          label="Thread giới thiệu DoR trên Heroes Community"
          url="http://heroescommunity.com/viewthread.php3?TID=47267" // NOSONAR
          buttonText="Xem thông tin"
        />
      </Section>
    </>
  ),
};
