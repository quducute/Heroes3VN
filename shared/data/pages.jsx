import { B, mix } from "@ui";
import dorIcon from "@shared/assets/icons/dor.webp";
import webIcon from "@shared/assets/icons/heroes.webp";
import hdIcon from "@shared/assets/icons/hd.webp";
import cheatIcon from "@shared/assets/icons/cheat.webp";
import faqIcon from "@shared/assets/icons/faq.webp";
import seriesIcon from "@shared/assets/icons/series.webp";
import boardgameIcon from "@shared/assets/icons/boardgame.webp";

export const PAGES = {
  upcoming: {
    id: "upcoming",
    name: "Sắp ra mắt",
    subtitle: "Dự kiến 2027",
    icon: dorIcon,
    accent: mix("deepskyblue", 0.84),
    summary: (
      <>
        Thông tin các bản Heroes 3 sắp ra mắt: <B>Heroes 3 Remake</B> của
        Ubisoft và dự án <B>Day of Reckoning</B> (<B>DoR</B>).
      </>
    ),
  },
  web: {
    id: "web",
    name: "Tài nguyên hữu ích",
    subtitle: "Nguồn tổng hợp",
    icon: webIcon,
    accent: "goldenrod",
    summary: "Tổng hợp các trang tài nguyên hữu ích cho người chơi Heroes 3.",
  },
  keybinds: {
    id: "keybinds",
    name: "Phím tắt Heroes 3",
    subtitle: "Bảng tổng hợp phím tắt",
    icon: hdIcon,
    accent: "goldenrod",
  },
  cheat: {
    id: "cheat",
    name: "Mã cheat Heroes 3",
    subtitle: "Bảng tổng hợp mã cheat",
    icon: cheatIcon,
    accent: "goldenrod",
  },
  faq: {
    id: "faq",
    name: "Câu hỏi thường gặp",
    subtitle: "FAQ",
    icon: faqIcon,
    accent: "goldenrod",
  },
  series: {
    id: "series",
    name: "Game cùng series HoMM",
    subtitle: "Heroes of Might and Magic",
    icon: seriesIcon,
    accent: "goldenrod",
  },
  boardgame: {
    id: "boardgame",
    name: "Heroes 3 The Board Game",
    subtitle: "Chơi online hoặc mua box",
    icon: boardgameIcon,
    accent: "goldenrod",
  },
};

export const TOOL_PAGE_IDS = [
  "web",
  "keybinds",
  "cheat",
  "faq",
  "series",
  "boardgame",
];
