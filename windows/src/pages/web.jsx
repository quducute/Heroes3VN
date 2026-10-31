import { Section, LinkRow } from "../components/ui.jsx";
import webIcon from "../assets/icons/heroes.webp";
import { WEB_GROUPS } from "../data/web.jsx";

const WEB_COUNT = WEB_GROUPS.reduce((n, g) => n + g.links.length, 0);

export const webPage = {
  id: "web",
  name: "Tài nguyên hữu ích",
  subtitle: "Nguồn tổng hợp",
  icon: webIcon,
  accent: "goldenrod",
  summary: "Tổng hợp các trang tài nguyên hữu ích cho người chơi Heroes 3.",
  badge: {
    text: `${WEB_COUNT} tài nguyên`,
    title: "Số tài nguyên trong danh sách",
  },
  content: (
    <>
      {WEB_GROUPS.map((g) => (
        <Section key={g.title} title={g.title}>
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
