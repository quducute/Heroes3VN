import { Faq } from "../components/ui.jsx";
import faqIcon from "../assets/icons/faq.webp";
import { FAQ_ITEMS } from "../data/faq.jsx";

export const faqPage = {
  id: "faq",
  name: "Câu hỏi thường gặp",
  subtitle: "FAQ",
  icon: faqIcon,
  accent: "goldenrod",
  badge: { text: `${FAQ_ITEMS.length} câu hỏi`, title: "Số câu hỏi" },
  content: <Faq items={FAQ_ITEMS} />,
};
