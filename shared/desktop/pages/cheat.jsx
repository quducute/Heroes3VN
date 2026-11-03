import { PAGES } from "../../data/pages.jsx";
import { CHEAT_CONTENT, CHEAT_COUNT } from "../../data/content/cheat.jsx";

export const cheatPage = {
  ...PAGES.cheat,
  badge: { text: `${CHEAT_COUNT} mã cheat`, title: "Số mã cheat" },
  content: CHEAT_CONTENT,
};
