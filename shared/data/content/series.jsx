import { Note, P, Section, LinkRow } from "@ui";
import { SERIES_BUNDLES, SERIES_GROUPS } from "../series.jsx";

function seriesButtonText(url) {
  if (url.includes("gog.com")) return "Mua trên GOG";
  if (url.includes("store.steampowered.com")) return "Mua trên Steam";
  return "Mở link";
}

function SeriesLinks({ links }) {
  return links.map((l) => (
    <LinkRow
      key={l.url}
      label={l.label}
      desc={l.desc}
      url={l.url}
      buttonText={seriesButtonText(l.url)}
    />
  ));
}

export const SERIES_CONTENT = (
  <>
    <Note>
      <P>
        Đây là trang tổng hợp link tải/mua các bản game khác trong cùng series
        Heroes of Might and Magic, cũng như một số mod hay của chúng. Hướng dẫn
        cài đặt xem tại trang download của từng mod.
      </P>
    </Note>
    {SERIES_GROUPS.map((g) => (
      <Section key={g.title} title={g.title}>
        {g.note ? (
          <Note title="Không nên mua">
            <P>{g.note}</P>
          </Note>
        ) : null}
        <SeriesLinks links={g.links} />
      </Section>
    ))}
    <Section title="Mua theo Bundle (tiết kiệm hơn)">
      <SeriesLinks links={SERIES_BUNDLES} />
    </Section>
  </>
);
