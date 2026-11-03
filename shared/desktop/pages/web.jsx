import { Section, LinkRow } from "../components/ui.jsx";
import { PAGES } from "../../data/pages.jsx";
import { WEB_GROUPS } from "../../data/web.jsx";

const WEB_COUNT = WEB_GROUPS.reduce((n, g) => n + g.links.length, 0);

export const webPage = {
  ...PAGES.web,
  badge: {
    text: `${WEB_COUNT} tài nguyên`,
    title: "Số tài nguyên trong danh sách",
  },
  content: (
    <>
      {WEB_GROUPS.map((g) => (
        <Section key={g.title} id={g.id} title={g.title}>
          {g.links.map((l) => (
            <LinkRow
              key={l.url}
              label={l.label}
              desc={l.desc}
              url={l.url}
              buttonText="Mở web"
            />
          ))}
        </Section>
      ))}
    </>
  ),
};
