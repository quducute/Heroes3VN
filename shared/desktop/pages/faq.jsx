import { Faq, Searchable } from "../components/ui.jsx";
import { PAGES } from "../../data/pages.jsx";
import { FAQ_ITEMS, FAQ_SEARCH } from "../../data/faq.jsx";

export const faqPage = {
  ...PAGES.faq,
  badge: { text: `${FAQ_ITEMS.length} câu hỏi`, title: "Số câu hỏi" },
  content: (
    <Searchable placeholder={FAQ_SEARCH}>
      <Faq items={FAQ_ITEMS} />
    </Searchable>
  ),
};
