import { View } from "react-native";
import { Note, P, Section, LinkRow } from "../components/ui";
import { SERIES_GROUPS, SERIES_BUNDLES } from "../data/series";

function seriesButtonText(url) {
  if (url.includes("gog.com")) return "Mua trên GOG";
  if (url.includes("store.steampowered.com")) return "Mua trên Steam";
  return "Mở link";
}

export function SeriesScreen() {
  return (
    <View>
      <Note>
        <P>
          Đây là trang tổng hợp link tải/mua các bản game khác trong cùng series
          Heroes of Might and Magic, cũng như một số mod hay của chúng. Hướng
          dẫn cài đặt xem tại trang download của từng mod.
        </P>
      </Note>
      {SERIES_GROUPS.map((g) => (
        <Section key={g.title} title={g.title}>
          {g.note ? (
            <Note title="Không nên mua">
              <P>{g.note}</P>
            </Note>
          ) : null}
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
    </View>
  );
}
