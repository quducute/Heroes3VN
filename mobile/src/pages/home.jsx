import { Pressable, View, Image, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import { P, openUrl, B, Note, PageLink, A, Section } from "../components/ui";
import { versions, versionIcons } from "@shared/data/versions.js";
import { CHOOSE_GUIDE } from "@shared/data/choose.jsx";
import {
  DISCORD_URL,
  YOUTUBE_URL,
  SUPPORT_FB_URL,
} from "@shared/data/social.js";
import { UPCOMING_ITEM, versionOf } from "./index";
import { CardLatest } from "../components/ModLatest";
import { CopyButton } from "../components/CopyButton";
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

function HomeBanner({ icon, title, children, url, buttonText, buttonIcon }) {
  return (
    <View className={cls.supportCard}>
      <View className={cls.supportHead}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.gold} />
        <Text className={cls.supportTitle}>{title}</Text>
      </View>
      <P className={cls.supportDesc}>{children}</P>
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
        <Text className={cls.heroTitle}>Heroes III Việt Nam by Gogetto</Text>
        <P className={cls.heroText}>
          Tool lưu trữ link tải/mua <B>Heroes 3</B> mọi phiên bản kèm hướng dẫn
          cài đặt.
        </P>
      </View>

      <Note>
        <P>
          Mọi link trong tool đều mở bằng trình duyệt mặc định của máy, yêu cầu
          Windows 10/11 để chơi ổn định và cài sẵn{" "}
          <A href="https://www.win-rar.com/download.html">
            <B>WinRAR</B>
          </A>{" "}
          hoặc{" "}
          <A href="https://www.7-zip.org/download.html">
            <B>7-Zip</B>
          </A>{" "}
          để giải nén.
          {"\n"}
          Nếu dùng macOS, Linux, Android hoặc iOS thì có thể chơi bằng{" "}
          <PageLink to="vcmi">
            <B>VCMI</B>
          </PageLink>
          .
        </P>
      </Note>

      <View className={cls.versionList}>
        {versions.map((v) => (
          <VersionCard
            key={v.id}
            item={{
              id: v.id,
              name: v.name,
              subtitle: v.subtitle,
              summary: v.summary,
              accent: v.accent,
              img: versionIcons[v.id],
              cta: "Xem link tải & hướng dẫn",
            }}
            onPress={() => onNavigate(v.id)}
          />
        ))}
        <VersionCard
          item={{
            ...UPCOMING_ITEM,
            summary: UPCOMING_ITEM.desc,
            latest: (
              <Text className={cls.versionLatest}>Heroes 3 Remake • DoR</Text>
            ),
            cta: "Xem thông tin",
          }}
          onPress={() => onNavigate(UPCOMING_ITEM.id)}
        />
      </View>

      <HomeBanner
        icon="monitor-share"
        title="Cần người hỗ trợ cài đặt?"
        url={SUPPORT_FB_URL}
        buttonText="Inbox Gogetto"
        buttonIcon="facebook"
      >
        Bác nào làm theo hướng dẫn mà vẫn chưa cài được, cứ nhắn tin Facebook
        cho em - em sẽ hỗ trợ cài trực tiếp từ xa qua{" "}
        <A href="https://www.ultraviewer.net/vi/download.html">
          <B>UltraViewer</B>
        </A>
        , hoàn toàn miễn phí.
      </HomeBanner>

      <Section title="Lý do tool ra đời">
        <View className={cls.storyBox}>
          <P>
            Trong cộng đồng Heroes 3 tại Việt Nam, ngày nào cũng có người hỏi:
            &quot;Tải Heroes 3 ở đâu?&quot;, &quot;<B>HotA</B> với <B>ERA</B>{" "}
            khác gì nhau?&quot;, &quot;Cài <B>VCMI</B> như thế nào?&quot;...
            Link tải/mua thì nằm rải rác, đa phần viết bằng tiếng Anh hoặc tiếng
            Nga và thiếu hướng dẫn cài đặt. Vì vậy tool này ra đời để gom tất cả
            về một chỗ: link tải/mua chính thức của mọi phiên bản Heroes 3 kèm
            hướng dẫn cài đặt từng bước bằng tiếng Việt.
          </P>
          <P>
            Đây là dự án phi lợi nhuận làm tặng cộng đồng, không liên quan đến
            Ubisoft hay bất kỳ tổ chức nào.
          </P>
        </View>
      </Section>

      <Section title="Nên chọn bản nào?">
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
                <Image source={versionIcons[g.id]} className={cls.chooseIcon} />
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
        title="YouTube Channel"
        url={YOUTUBE_URL}
        buttonText="Xem kênh"
        buttonIcon="youtube"
      >
        Theo dõi kênh YouTube chính thức của Heroes 3 VN.
      </HomeBanner>

      <HomeBanner
        icon="account-group"
        title="Server Discord"
        url={DISCORD_URL}
        buttonText="Tham gia server"
        buttonIcon="forum"
      >
        Tham gia máy chủ Discord chính thức của Heroes 3 VN.
      </HomeBanner>
    </View>
  );
}
