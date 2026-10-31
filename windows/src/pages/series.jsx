import { Note, Section, LinkRow } from "../components/ui.jsx";
import seriesIcon from "../assets/icons/series.webp";
import { SERIES_BUNDLES, SERIES_GROUPS } from "../data/series.jsx";

function seriesButtonText(url) {
  if (url.includes("gog.com")) return "Mua trên GOG";
  if (url.includes("store.steampowered.com")) return "Mua trên Steam";
  return "Mở link";
}

export const seriesPage = {
  id: "series",
  name: "Game cùng series HoMM",
  subtitle: "Heroes of Might and Magic",
  icon: seriesIcon,
  accent: "goldenrod",
  content: (
    <>
      <Note>
        Đây là trang tổng hợp link tải/mua các bản game khác trong cùng series
        Heroes of Might and Magic, cũng như một số mod hay của chúng. Hướng dẫn
        cài đặt xem tại trang download của từng mod.
      </Note>
      {SERIES_GROUPS.map((g) => (
        <Section key={g.title} title={g.title}>
          {g.note && <Note title="Không nên mua">{g.note}</Note>}
          {g.links.map((l) => (
            <LinkRow
              key={l.url}
              label={l.label}
              desc={l.desc}
              url={l.url}
              buttonText={seriesButtonText(l.url)}
            />
          ))}
        </Section>
      ))}
      <Section title="Mua theo Bundle (tiết kiệm hơn)">
        {SERIES_BUNDLES.map((l) => (
          <LinkRow
            key={l.url}
            label={l.label}
            desc={l.desc}
            url={l.url}
            buttonText={seriesButtonText(l.url)}
          />
        ))}
      </Section>
    </>
  ),
};
