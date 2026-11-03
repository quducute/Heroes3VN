import { PAGES } from "../../data/pages.jsx";
import {
  KEYBINDS_CONTENT,
  KEYBIND_COUNT,
} from "../../data/content/keybinds.jsx";

export const keybindsPage = {
  ...PAGES.keybinds,
  badge: { text: `${KEYBIND_COUNT} phím tắt`, title: "Số phím tắt" },
  content: KEYBINDS_CONTENT,
};
