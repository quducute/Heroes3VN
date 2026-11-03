import { View, Image, Text } from "react-native";
import { Section, P, SysReq, LinkRow } from "../components/ui";
import { UPCOMING } from "@shared/data/content/upcoming.jsx";
import { cls } from "../styles";

function UpcomingHead({ img, name }) {
  return (
    <View className={cls.upHead}>
      <Image source={img} className={cls.upIcon} resizeMode="cover" />
      <View className="flex-1">
        <Text className={cls.upName}>{name}</Text>
      </View>
    </View>
  );
}

export function UpcomingScreen() {
  return (
    <View>
      {UPCOMING.map((u) => (
        <Section key={u.title} title={u.title}>
          <UpcomingHead img={u.icon} name={u.name} />
          <P>{u.intro}</P>
          <SysReq items={u.info} />
          <LinkRow {...u.link} />
        </Section>
      ))}
    </View>
  );
}
