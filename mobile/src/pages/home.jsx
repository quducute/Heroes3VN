import { Pressable, View, Image, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import { P, openUrl, B, Note, PageLink, A, Section } from "../components/ui";
import { versions, versionIcons } from "../data/versions";
import { CHOOSE_GUIDE } from "../data/choose";
import { DISCORD_URL, GROUP_FB_URL, SUPPORT_FB_URL } from "../data/social";
import { UPCOMING_ITEM, versionOf } from "./index";
import { CardLatest } from "../components/ModLatest";
import { CopyButton } from "../components/CopyButton";
import { styles } from "../styles";

function VersionCard({ item, onPress }) {
  return (
    <Pressable
      style={[styles.versionCard, { borderTopColor: item.accent }]}
      onPress={onPress}
    >
      <View style={styles.versionHead}>
        <Image
          source={item.img}
          style={styles.versionIcon}
          resizeMode="contain"
        />
        <View style={styles.versionTitles}>
          <Text style={[styles.versionName, { color: item.accent }]}>
            {item.name}
          </Text>
          <Text style={styles.versionSub}>{item.subtitle}</Text>
        </View>
      </View>
      {item.latest ?? <CardLatest id={item.id} accent={item.accent} />}
      <P style={styles.versionSummary}>{item.summary}</P>
      <View style={styles.versionCta}>
        <Text style={[styles.versionCtaText, { color: item.accent }]}>
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
    <View style={styles.supportCard}>
      <View style={styles.supportHead}>
        <MaterialCommunityIcons name={icon} size={20} color={colors.gold} />
        <Text style={styles.supportTitle}>{title}</Text>
      </View>
      <P style={styles.supportDesc}>{children}</P>
      <View style={styles.supportBtnRow}>
        <CopyButton text={url} />
        <Pressable style={styles.supportBtn} onPress={() => openUrl(url)}>
          <MaterialCommunityIcons
            name={buttonIcon}
            size={15}
            color={mix("goldenrod", 0.15)}
          />
          <Text style={styles.supportBtnText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function HomeScreen({ onNavigate }) {
  return (
    <View>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Heroes III Việt Nam by Gogetto</Text>
        <P style={styles.heroText}>
          Tool lưu trữ link tải/mua <B>Heroes 3</B> mọi phiên bản kèm hướng dẫn
          cài đặt.
        </P>
      </View>

      <Note>
        <P>
          Mọi link trong tool đều mở bằng trình duyệt mặc định của máy, yêu cầu{" "}
          <PageLink to="faq">Windows 10/11</PageLink> để chơi ổn định và cài sẵn{" "}
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

      <View style={styles.versionList}>
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
              <Text style={styles.versionLatest}>Heroes 3 Remake • DoR</Text>
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

      <Section title="Nên chọn bản nào?">
        {CHOOSE_GUIDE.map((g) => {
          const v = versionOf(g.id);
          return (
            <Pressable
              key={g.id}
              style={[styles.chooseCard, { borderLeftColor: v.accent }]}
              onPress={() => onNavigate(g.id)}
            >
              <View style={styles.chooseHead}>
                <Image source={versionIcons[g.id]} style={styles.chooseIcon} />
                <Text style={[styles.chooseName, { color: v.accent }]}>
                  {v.name}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={18}
                  color={colors.muted}
                />
              </View>
              <P style={styles.chooseDesc}>{g.desc}</P>
            </Pressable>
          );
        })}
      </Section>

      <Section title="Lý do tool ra đời">
        <View style={styles.storyBox}>
          <P>
            Trong group Heroes 3 VN, ngày nào cũng có người hỏi những câu quen
            thuộc: &quot;Tải Heroes 3 ở đâu?&quot;, &quot;<B>HotA</B> với{" "}
            <B>ERA</B> khác gì nhau?&quot;, &quot;Cài <B>VCMI</B> như thế
            nào?&quot;... Link tải/mua thì đến từ nhiều nguồn và rất khó tìm,
            phần lớn các trang đó cũng đều viết bằng tiếng Anh hoặc tiếng Nga
            rất khó tiếp cận.
          </P>
          <P>
            Kể cả đã tìm được link tải/mua chuẩn, nhiều người vẫn không biết
            cách cài đặt thế nào vì các trang đó không hề có hướng dẫn chi tiết
            hoặc có nhưng rất sơ sài.
          </P>
          <P>
            Vì vậy tool này ra đời để gom tất cả về một chỗ: link tải/mua chính
            thức của mọi phiên bản Heroes 3 cùng hướng dẫn cài đặt từng bước
            bằng tiếng Việt để bất kỳ ai cũng có thể tự cài đặt và tận hưởng tựa
            game huyền thoại này.
          </P>
          <P>
            Tool này là dự án phi lợi nhuận làm tặng cộng đồng, không liên quan
            đến Ubisoft hay bất kỳ tổ chức nào.
          </P>
        </View>
      </Section>

      <HomeBanner
        icon="account-group"
        title="Group Facebook"
        url={GROUP_FB_URL}
        buttonText="Tham gia group"
        buttonIcon="facebook"
      >
        Tham gia nhóm Facebook chính thức của Heroes 3 VN.
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
