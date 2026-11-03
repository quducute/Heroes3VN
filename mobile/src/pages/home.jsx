import { Pressable, View, Image, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import { P, openUrl, Note, Section, CopyButton } from "../components/ui";
import { versions } from "@shared/data/versions.js";
import { CHOOSE_GUIDE } from "@shared/data/choose.jsx";
import {
  HOME,
  HOME_BANNERS,
  HOME_STORY,
  homeNote,
} from "@shared/data/content/home.jsx";
import { UPCOMING_LATEST } from "@shared/data/content/upcoming.jsx";
import { UPCOMING_ITEM, versionOf } from "./index";
import { CardLatest } from "../components/ModLatest";
import { cls } from "../styles";

function VersionCard({ item, onPress }) {
  return (
    <Pressable
      className={cls.versionCard}
      style={{ borderTopColor: item.accent }}
      onPress={onPress}
    >
      <View className={cls.versionHead}>
        <Image
          source={item.img}
          className={cls.versionIcon}
          resizeMode="contain"
        />
        <View className={cls.versionTitles}>
          <Text className={cls.versionName} style={{ color: item.accent }}>
            {item.name}
          </Text>
          <Text className={cls.versionSub}>{item.subtitle}</Text>
        </View>
      </View>
      {item.latest ?? <CardLatest id={item.id} accent={item.accent} />}
      <P className={cls.versionSummary}>{item.summary}</P>
      <View className={cls.versionCta}>
        <Text className={cls.versionCtaText} style={{ color: item.accent }}>
          {item.cta}
        </Text>
        <MaterialCommunityIcons
          name="arrow-right"
          size={15}
          color={item.accent}
        />
      </View>
    </Pressable>
  );
}

const LINKS_OPEN = "bằng trình duyệt mặc định của máy";

function HomeBanner({ icon, banner, buttonIcon }) {
  const { title, desc, url, buttonText } = banner;
  return (
    <View className={cls.supportCard}>
      <View className={cls.supportHead}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.gold} />
        <Text className={cls.supportTitle}>{title}</Text>
      </View>
      <P className={cls.supportDesc}>{desc}</P>
      <View className={cls.supportBtnRow}>
        <CopyButton text={url} />
        <Pressable className={cls.supportBtn} onPress={() => openUrl(url)}>
          <MaterialCommunityIcons
            name={buttonIcon}
            size={15}
            color={mix("goldenrod", 0.15)}
          />
          <Text className={cls.supportBtnText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function HomeScreen({ onNavigate }) {
  return (
    <View>
      <View className={cls.hero}>
        <Text className={cls.heroTitle}>{HOME.title}</Text>
        <P className={cls.heroText}>{HOME.tagline}</P>
      </View>

      <Note>
        <P>{homeNote(LINKS_OPEN)}</P>
      </Note>

      <View className={cls.versionList}>
        {versions.map((v) => (
          <VersionCard
            key={v.id}
            item={{ ...v, img: v.icon, cta: HOME.versionCta }}
            onPress={() => onNavigate(v.id)}
          />
        ))}
        <VersionCard
          item={{
            ...UPCOMING_ITEM,
            summary: UPCOMING_ITEM.desc,
            latest: (
              <Text className={cls.versionLatest}>{UPCOMING_LATEST}</Text>
            ),
            cta: HOME.upcomingCta,
          }}
          onPress={() => onNavigate(UPCOMING_ITEM.id)}
        />
      </View>

      <HomeBanner
        icon="monitor-share"
        banner={HOME_BANNERS.support}
        buttonIcon="facebook"
      />

      <Section title={HOME.storyTitle}>
        <View className={cls.storyBox}>
          {HOME_STORY.map((p) => (
            <P key={p.key}>{p.text}</P>
          ))}
        </View>
      </Section>

      <Section title={HOME.chooseTitle}>
        {CHOOSE_GUIDE.map((g) => {
          const v = versionOf(g.id);
          return (
            <Pressable
              key={g.id}
              className={cls.chooseCard}
              style={{ borderLeftColor: v.accent }}
              onPress={() => onNavigate(g.id)}
            >
              <View className={cls.chooseHead}>
                <Image source={v.icon} className={cls.chooseIcon} />
                <Text className={cls.chooseName} style={{ color: v.accent }}>
                  {v.name}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={18}
                  color={colors.muted}
                />
              </View>
              <P className={cls.chooseDesc}>{g.desc}</P>
            </Pressable>
          );
        })}
      </Section>

      <HomeBanner
        icon="youtube"
        banner={HOME_BANNERS.youtube}
        buttonIcon="youtube"
      />

      <HomeBanner
        icon="account-group"
        banner={HOME_BANNERS.discord}
        buttonIcon="forum"
      />
    </View>
  );
}
