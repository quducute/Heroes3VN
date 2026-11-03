import { B } from "@ui";
import dorIcon from "@shared/assets/icons/dor.webp";
import remakeIcon from "@shared/assets/icons/remake.webp";

export const UPCOMING_LATEST = "Heroes 3 Remake • DoR";

export const UPCOMING = [
  {
    title: "Heroes 3 Remake",
    icon: remakeIcon,
    name: "Heroes of Might and Magic III Remake",
    intro:
      "Bản làm lại chính thức của Heroes 3 do Ubisoft phát triển, gồm game gốc cùng cả 2 bản mở rộng, dựng lại hoàn toàn bằng 3D và hỗ trợ độ phân giải 4K.",
    info: [
      { label: "Nhà phát triển", value: "Ubisoft" },
      { label: "Dự kiến ra mắt", value: "2027" },
      { label: "Nền tảng", value: "Windows (Steam)" },
    ],
    link: {
      label: "Trang game trên Steam",
      desc: "Có thể thêm game vào Wishlist để nhận thông báo khi game ra mắt.",
      url: "https://store.steampowered.com/app/3809850/Heroes_of_Might_and_Magic_III_Remake",
      buttonText: "Xem trên Steam",
    },
  },
  {
    title: "Day of Reckoning (DoR)",
    icon: dorIcon,
    name: "Day of Reckoning",
    intro: (
      <>
        Bản mod mở rộng cho Heroes 3 Complete do cộng đồng phát triển, thêm 3
        thành mới là <B>Palace</B> (tộc Tiên Tuyết), <B>Forge</B> và{" "}
        <B>Grotto</B> (tộc Tiên Bóng Tối), kèm quân thay thế cho cả các thành
        gốc. Toàn bộ nội dung cũ được giữ nguyên, hỗ trợ map editor và là dự án
        độc lập với HotA.
      </>
    ),
    info: [
      { label: "Nhà phát triển", value: "DoR Team (cộng đồng)" },
      { label: "Dự kiến ra mắt", value: "Chưa công bố" },
      {
        label: "Nền tảng",
        value: "Windows (mod mở rộng cho Heroes 3 Complete, tương tự HotA)",
      },
    ],
    link: {
      label: "Thread giới thiệu DoR trên Heroes Community",
      desc: "Thông tin mới nhất về DoR được cập nhật trên diễn đàn Heroes Community.",
      url: "http://heroescommunity.com/viewthread.php3?TID=47267", // NOSONAR
      buttonText: "Xem thông tin",
    },
  },
];
