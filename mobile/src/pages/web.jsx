import { View } from "react-native";
import { Section, LinkRow } from "../components/ui";
import { WEB_GROUPS } from "@shared/data/web.jsx";

export function WebScreen() {
  return (
    <View>
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
    </View>
  );
}
