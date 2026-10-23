import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  Alert,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { VN as VN_FLAG_SVG } from "country-flag-icons/string/3x2";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radius } from "./src/theme";
import {
  Section,
  LinkRow,
  Note,
  CheatTable,
  KeybindsTable,
  Faq,
  SysReq,
  P,
  B,
  A,
  openUrl,
  copyText,
  NavContext,
  PageLink,
} from "./src/components/ui";
import { versions, versionIcons } from "./src/data/versions";
import { CHOOSE_GUIDE } from "./src/data/choose";
import { WEB_GROUPS } from "./src/data/web";
import { SERIES_GROUPS, SERIES_BUNDLES } from "./src/data/series";
import { CHEATS } from "./src/data/cheats";
import { KEYBINDS_BASE, KEYBINDS_HD } from "./src/data/keybinds";
import { FAQ_ITEMS } from "./src/data/faq";
import { CHANGELOG_URLS } from "./src/data/links";
import {
  fetchModLatest,
  fetchLatestRelease,
  compareVersions,
  LATEST_RELEASE_URL,
} from "./src/lib/update";
import { getCacheSize, clearCache, formatBytes } from "./src/lib/cache";
import { loadSettings, saveSettings, resetSettings } from "./src/lib/settings";
import brandLogo from "./src/assets/images/logo.webp";
import appIcon from "./assets/icon.png";
import donateQr from "./src/assets/images/donate.webp";
import dorIcon from "./src/assets/icons/dor.webp";
import remakeIcon from "./src/assets/icons/remake.webp";
import webIcon from "./src/assets/icons/heroes.webp";
import hdIcon from "./src/assets/icons/hd.webp";
import cheatIcon from "./src/assets/icons/cheat.webp";
import faqIcon from "./src/assets/icons/faq.webp";
import seriesIcon from "./src/assets/icons/series.webp";
import boardgameIcon from "./src/assets/icons/boardgame.webp";
import appConfig from "./app.json";

const APP_VERSION = appConfig.expo.version;
const DISCORD_URL = "https://discord.gg/XM2EWmYF3u";
const GROUP_FB_URL = "https://www.facebook.com/groups/hero3";
const SUPPORT_FB_URL = "https://www.facebook.com/qudu.Gogetto";
const SECRET_URL = "https://justpaste.it/h3torrminatorr";

const UPCOMING_ITEM = {
  id: "upcoming",
  name: "Sắp ra mắt",
  img: dorIcon,
  accent: "#3f9fd0",
  desc: "Thông tin các bản Heroes 3 sắp ra mắt: Heroes 3 Remake của Ubisoft và dự án Day of Reckoning (DoR).",
};

const VERSION_ITEMS = [
  ...versions.map((v) => ({
    id: v.id,
    name: v.name,
    img: versionIcons[v.id],
    accent: v.accent,
    isVersion: true,
  })),
  UPCOMING_ITEM,
];

const TOOL_ITEMS = [
  { id: "web", name: "Tài nguyên hữu ích", img: webIcon },
  { id: "keybinds", name: "Phím tắt Heroes 3", img: hdIcon },
  { id: "cheat", name: "Mã cheat Heroes 3", img: cheatIcon },
  { id: "faq", name: "Câu hỏi thường gặp", img: faqIcon },
  { id: "series", name: "Game cùng series HoMM", img: seriesIcon },
  { id: "boardgame", name: "Heroes 3 The Board Game", img: boardgameIcon },
];

const NAV = [
  { id: "home", name: "Trang chủ", icon: "home-outline" },
  {
    group: "versions",
    name: "Các phiên bản Heroes 3",
    icon: "layers-outline",
    items: VERSION_ITEMS,
  },
  {
    group: "tools",
    name: "Khác",
    icon: "view-grid-outline",
    items: TOOL_ITEMS,
  },
  { id: "donate", name: "Donate", icon: "heart-outline" },
];

const SETTINGS_ITEM = { id: "settings", name: "Settings", icon: "cog-outline" };

const findNav = (id) =>
  [...NAV, ...VERSION_ITEMS, ...TOOL_ITEMS, SETTINGS_ITEM].find(
    (n) => n.id === id,
  );

const versionOf = (id) => versions.find((v) => v.id === id);

const PAGE_OPTIONS = [
  { id: "home", name: "Trang chủ" },
  ...VERSION_ITEMS,
  ...TOOL_ITEMS,
];

const validPage = (id) => (PAGE_OPTIONS.some((o) => o.id === id) ? id : "home");

function useModLatest(id) {
  const [latest, setLatest] = useState(null);
  useEffect(() => {
    let alive = true;
    setLatest(null);
    if (!id) return;
    fetchModLatest(id)
      .then((info) => alive && setLatest(info))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [id]);
  if (!latest) return [];
  return Array.isArray(latest) ? latest : [latest];
}

function ModLatest({ id }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <View style={styles.latest}>
      {items.map((it) => (
        <Text
          key={it.label || "latest"}
          style={styles.latestText}
          numberOfLines={1}
        >
          {items.length > 1 && it.label ? `${it.label}: ` : "Mới nhất: "}
          <Text style={styles.latestVer}>{it.version}</Text>
          {it.date ? ` (${it.date})` : ""}
        </Text>
      ))}
    </View>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    if (await copyText(text)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  return (
    <Pressable
      style={[styles.copyBtn, copied && styles.copyBtnOn]}
      onPress={onCopy}
      hitSlop={6}
    >
      <MaterialCommunityIcons
        name={copied ? "check" : "content-copy"}
        size={16}
        color={copied ? colors.green : colors.gold}
      />
    </Pressable>
  );
}

function ConfirmDialog({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Mở link",
  cancelText = "Huỷ",
  icon,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.confirmBackdrop} onPress={onCancel}>
        <Pressable style={styles.confirmBox} onPress={() => {}}>
          <View style={styles.confirmHead}>
            {icon || (
              <MaterialCommunityIcons
                name="open-in-new"
                size={18}
                color={colors.gold}
              />
            )}
            <Text style={styles.confirmTitle}>{title}</Text>
          </View>
          <View style={styles.confirmBody}>{message}</View>
          <View style={styles.confirmActions}>
            <Pressable style={styles.confirmGhost} onPress={onCancel}>
              <Text style={styles.confirmGhostText}>{cancelText}</Text>
            </Pressable>
            <Pressable style={styles.confirmBtn} onPress={onConfirm}>
              <MaterialCommunityIcons
                name="open-in-new"
                size={14}
                color="#201a08"
              />
              <Text style={styles.confirmBtnText}>{confirmText}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function UpcomingHead({ img, name, sub }) {
  return (
    <View style={styles.upHead}>
      <Image source={img} style={styles.upIcon} resizeMode="cover" />
      <View style={{ flex: 1 }}>
        <Text style={styles.upName}>{name}</Text>
        <Text style={styles.upSub}>{sub}</Text>
      </View>
    </View>
  );
}

function UpcomingScreen() {
  return (
    <View>
      <Section title="Heroes 3 Remake">
        <UpcomingHead
          img={remakeIcon}
          name="Heroes of Might and Magic III Remake"
          sub="Ubisoft — dự kiến 2027"
        />
        <P>
          Bản làm lại chính thức của Heroes 3 do Ubisoft phát triển, gồm game
          gốc cùng cả 2 bản mở rộng, dựng lại hoàn toàn bằng 3D và hỗ trợ độ
          phân giải 4K.
        </P>
        <SysReq
          items={[
            { label: "Nhà phát triển", value: "Ubisoft" },
            { label: "Dự kiến ra mắt", value: "2027" },
            { label: "Nền tảng", value: "Windows (Steam)" },
          ]}
        />
        <LinkRow
          label="Trang game trên Steam"
          desc="Có thể thêm game vào Wishlist để nhận thông báo khi game ra mắt."
          url="https://store.steampowered.com/app/3809850/Heroes_of_Might_and_Magic_III_Remake"
          buttonText="Xem trên Steam"
        />
      </Section>
      <Section title="Day of Reckoning (DoR)">
        <UpcomingHead img={dorIcon} name="Day of Reckoning" sub="DoR" />
        <P>
          Một dự án Heroes 3 mới đang được phát triển. Thông tin mới nhất về DoR
          được cập nhật trên diễn đàn Heroes Community.
        </P>
        <LinkRow
          label="Thread giới thiệu DoR trên Heroes Community"
          url="http://heroescommunity.com/viewthread.php3?TID=47267" // NOSONAR
          buttonText="Xem thông tin"
        />
      </Section>
    </View>
  );
}

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

function CardLatest({ id, accent }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <Text style={styles.versionLatest} numberOfLines={2}>
      {items.map((it, i) => (
        <Text key={it.label || i}>
          {i > 0 ? "  •  " : ""}
          {items.length > 1 && it.label ? `${it.label}: ` : "Mới nhất: "}
          <Text style={{ color: accent, fontWeight: "700" }}>{it.version}</Text>
        </Text>
      ))}
    </Text>
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
          <MaterialCommunityIcons name={buttonIcon} size={15} color="#201a08" />
          <Text style={styles.supportBtnText}>{buttonText}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function HomeScreen({ onNavigate }) {
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
          <A href="https://www.win-rar.com/download.html">WinRAR</A> hoặc{" "}
          <A href="https://www.7-zip.org/download.html">7-Zip</A> để giải nén.
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
        cho em — em sẽ hỗ trợ cài trực tiếp từ xa qua{" "}
        <A href="https://www.ultraviewer.net/vi/download.html">UltraViewer</A>,
        hoàn toàn miễn phí.
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
            thuộc: “Tải Heroes 3 ở đâu?”, “HotA với ERA khác gì nhau?”, “Cài
            VCMI như thế nào?”... Link tải/mua thì đến từ nhiều nguồn và rất khó
            tìm, phần lớn các trang đó cũng đều viết bằng tiếng Anh hoặc tiếng
            Nga rất khó tiếp cận.
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

function VersionScreen({ version }) {
  return (
    <View>
      <View style={[styles.vHead, { borderColor: version.accent }]}>
        <Image source={versionIcons[version.id]} style={styles.vIcon} />
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.vName}>{version.name}</Text>
          <Text style={styles.vSub}>{version.subtitle}</Text>
        </View>
      </View>
      <View style={styles.vMeta}>
        <ModLatest id={version.id} />
        {CHANGELOG_URLS[version.id] ? (
          <Pressable
            style={styles.changelogBtn}
            onPress={() => openUrl(CHANGELOG_URLS[version.id])}
          >
            <MaterialCommunityIcons
              name="text-box-outline"
              size={13}
              color={colors.goldBright}
            />
            <Text style={styles.changelogBtnText}>Changelog</Text>
          </Pressable>
        ) : null}
      </View>
      {version.content}
    </View>
  );
}

function WebScreen() {
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

function seriesButtonText(url) {
  if (url.includes("gog.com")) return "Mua trên GOG";
  if (url.includes("store.steampowered.com")) return "Mua trên Steam";
  return "Mở link";
}

function SeriesScreen() {
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

function BoardgameScreen() {
  return (
    <View>
      <Section title="Giới thiệu">
        <P>
          Heroes of Might &amp; Magic III: The Board Game là phiên bản board
          game chính thức của Heroes 3, do Archon Studio (Ba Lan) phát triển với
          bản quyền từ Ubisoft. Game giữ đúng tinh thần bản PC: chọn phe, khám
          phá bản đồ, xây thành, chiêu mộ quân, phát triển tướng rồi lao vào
          những trận đánh quyết định.
        </P>
        <SysReq
          items={[
            {
              label: "Nhà phát triển",
              value:
                "Archon Studio (bản quyền Ubisoft), hợp tác cùng HotA Crew",
            },
            { label: "Số người chơi", value: "1–4 người" },
            { label: "Thời gian", value: "Khoảng 90 phút/ván" },
            { label: "Độ tuổi", value: "14+" },
            { label: "Chế độ chơi", value: "Đối kháng, hợp tác, chơi đơn" },
            {
              label: "Ngôn ngữ",
              value: "Tiếng Anh, Ba Lan, Đức, Pháp, Tây Ban Nha",
            },
          ]}
        />
      </Section>
      <Section title="Lối chơi">
        <P>
          <B>Khám phá bản đồ:</B> ván đấu bắt đầu với bản đồ bị sương mù che
          phủ, chỉ thấy khu vực quanh thành. Bản đồ được ghép dần từ các mảnh
          hình lục giác khi tướng đi khám phá.
        </P>
        <P>
          <B>Xây thành:</B> thu thập tài nguyên, tính toán kinh tế và xây công
          trình trên bảng thành hai lớp.
        </P>
        <P>
          <B>Chiêu mộ quân:</B> mỗi loại quân là một lá bài, lật sang mặt
          hologram để nâng cấp.
        </P>
        <P>
          <B>Phát triển tướng:</B> trang bị bảo vật, học phép từ bốn trường phái
          phép thuật, lên cấp để học và nâng kỹ năng, mỗi tướng có chuyên môn
          riêng.
        </P>
        <P>
          <B>Chiến đấu:</B> đánh trên chiến trường mở rộng với bộ mô hình
          (miniature), hoặc chỉ dùng bài trên bảng combat rút gọn cho nhanh.
        </P>
        <P>
          <B>Giải đấu:</B> có sẵn sách luật giải đấu (Tournament Book) cho ai
          thích đấu với bạn bè.
        </P>
      </Section>
      <Section title="Hộp game và các phần mở rộng">
        <SysReq
          items={[
            {
              label: "Hộp cơ bản",
              value:
                "Gồm Castle, Necropolis, Dungeon cùng 6 mô hình tướng, 3 bảng thành, 1 bảng combat, 20 mảnh bản đồ, 256 lá bài, 8 xúc xắc riêng, sách luật, sách nhiệm vụ và sách giải đấu.",
            },
            {
              label: "Kickstarter 2022",
              value:
                "Thêm Rampart, Fortress, Inferno, Tower, được sự ủng hộ đông đảo từ cộng đồng.",
            },
            {
              label: "Gamefound 2024",
              value:
                "Thêm Stronghold, Conflux và Cove (làm cùng HotA Crew, dựa trên phe Cove của HotA), kèm hầm ngầm, đảo, tàu thuyền và cổng dịch chuyển.",
            },
            {
              label: "Gamefound 2026",
              value:
                "Thêm Factory, Bulwark (2 phe từ HotA) và Forge – phe bị bỏ dở của Heroes 3, thiết kế cùng Gregory Fulton, một trong những người làm Heroes 3 gốc. Nâng tổng số lên 13 thành, Archon gọi đây có thể là đợt cuối cùng.",
            },
          ]}
        />
      </Section>
      <Section title="Đặt mua">
        <LinkRow
          label="Trang chính thức của Archon Studio"
          desc="Đặt mua box gốc và các box mở rộng."
          url="https://archon-studio.com/homm3boardgame"
          buttonText="Đặt mua"
        />
      </Section>
      <Section title="Chơi online">
        <LinkRow
          label="Heroes 3 The Board Game Online"
          desc="Bản online do tác giả người Việt phát triển (phi lợi nhuận), chơi nhiều người ngay trên trình duyệt mà không cần cài đặt."
          url="https://hamthefirt.xyz"
          buttonText="Mở link"
        />
        <LinkRow
          label="Facebook tác giả: Nguyen Thai Binh"
          url="https://www.facebook.com/thaibinh.nguyen.58"
          buttonText="Xem Facebook"
        />
      </Section>
    </View>
  );
}

function CheatScreen() {
  return (
    <View>
      <Note title="Cách dùng">
        <P>
          Để nhập mã cheat, bấm phím <B>Tab</B> (hoặc bấm/chạm vào thanh trạng
          thái phía dưới) để mở khung chat trong game rồi gõ mã. Cách này áp
          dụng chung cho mọi phiên bản. Chỉ dùng mã cheat khi đánh PvE offline,
          không dùng khi đánh PvP online. Bấm vào mã để copy nhanh.
        </P>
      </Note>
      <Note title="Riêng với ERA">
        <P>
          Các mã ở bảng dưới là cách cheat truyền thống: gõ mã vào khung chat.
          Riêng ERA còn có mod <B>TrainerX</B> (có sẵn khi cài ERA mới nhất) cho
          phép cheat trực tiếp trong game qua menu cheat, chỉnh sâu vào tướng,
          quân, đồ, tài nguyên. Hướng dẫn chi tiết xem ở{" "}
          <PageLink to="era">trang ERA</PageLink>.
        </P>
      </Note>
      <Note title="Siêu cheat">
        <P>
          <B>nwctheone:</B> cần cài HD Patch để có thể sử dụng (HotA và ERA đã
          tích hợp sẵn, <PageLink to="complete">Complete</PageLink> cần phải cài
          thủ công).
        </P>
        <P>
          <B>vcmigod:</B> mã riêng dành cho bản{" "}
          <PageLink to="vcmi">VCMI</PageLink> (VCMI không phải là Heroes 3 mà là
          một engine viết lại game nên không thể cài HD Patch, do đó họ tạo ra
          mã riêng).
        </P>
      </Note>
      <View style={styles.cheatHead}>
        <Text style={styles.cheatHeadCol}>
          Theo thứ tự từng dòng: [Complete/SoD, HotA, Chronicles] [ERA/WoG]
          [VCMI]
        </Text>
        <Text style={[styles.cheatHeadCol, { flex: 1, textAlign: "right" }]}>
          Tác dụng
        </Text>
      </View>
      <CheatTable rows={CHEATS} />
      <P style={styles.source}>
        Nguồn:{" "}
        <A href="https://heroes.thelazy.net/index.php/Cheats">
          heroes.thelazy.net
        </A>{" "}
        và <A href="https://vcmi.eu/players/Cheat_Codes">vcmi.eu</A>.
      </P>
    </View>
  );
}

function KeybindsScreen() {
  return (
    <View>
      <Note>
        <P>
          Có 2 bảng: bảng đầu là các phím tắt/thao tác chuột được bổ sung khi
          cài <B>HD Patch</B>; bảng sau là phím tắt của <B>bản gốc</B>{" "}
          (Complete/SoD, ERA/WoG, HotA). Đối với bản VCMI có thể sẽ khác đôi
          chút.
        </P>
      </Note>
      <Text style={styles.kbTitle}>Bảng 1 — Bổ sung khi cài HD Patch</Text>
      <KeybindsTable groups={KEYBINDS_HD} />
      <P style={styles.source}>
        Nguồn:{" "}
        <A href="https://sites.google.com/site/heroes3hd/eng/functionality">
          HoMM3 HD
        </A>
        .
      </P>
      <Text style={styles.kbTitle}>Bảng 2 — Phím tắt bản gốc</Text>
      <KeybindsTable groups={KEYBINDS_BASE} />
      <P style={styles.source}>
        Nguồn:{" "}
        <A href="https://heroes.thelazy.net/index.php/Keybinds">
          heroes.thelazy.net
        </A>
        .
      </P>
    </View>
  );
}

function FaqScreen() {
  return (
    <View>
      <Faq items={FAQ_ITEMS} />
    </View>
  );
}

function SettingsScreen({ onCheckUpdate }) {
  const [cacheSize, setCacheSize] = useState(() => getCacheSize());
  const [defaultPage, setDefaultPage] = useState(() =>
    validPage(loadSettings().defaultPage),
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pageSaved, setPageSaved] = useState(false);
  const [status, setStatus] = useState(null);

  const onPickPage = (id) => {
    setPickerOpen(false);
    setDefaultPage(id);
    setStatus(null);
    try {
      saveSettings({ ...loadSettings(), defaultPage: id });
      setPageSaved(true);
    } catch {
      setPageSaved(false);
      Alert.alert("Settings", "Không lưu được tab mặc định.");
    }
  };

  const onClearCache = () => {
    try {
      const freed = clearCache();
      setStatus(`Đã xoá ${formatBytes(freed)} cache.`);
    } catch {
      setStatus("Không xoá được cache.");
    }
    setCacheSize(getCacheSize());
  };

  const onReset = () => {
    try {
      setDefaultPage(validPage(resetSettings().defaultPage));
      setPageSaved(false);
      setStatus("Đã đặt lại cài đặt về mặc định.");
    } catch {
      setStatus("Không đặt lại được cài đặt.");
    }
  };

  const pageName = PAGE_OPTIONS.find((o) => o.id === defaultPage)?.name;

  return (
    <View>
      <View style={styles.setItem}>
        <View style={styles.setHead}>
          <MaterialCommunityIcons name="update" size={16} color={colors.gold} />
          <Text style={styles.setTitle}>Cập nhật tool</Text>
        </View>
        <View style={styles.setRow}>
          <Text style={styles.setValue}>
            Phiên bản đang dùng:{" "}
            <Text style={styles.setBold}>v{APP_VERSION}</Text>
          </Text>
          <Pressable style={styles.setBtn} onPress={onCheckUpdate}>
            <MaterialCommunityIcons name="update" size={14} color="#201a08" />
            <Text style={styles.setBtnText}>Check update</Text>
          </Pressable>
        </View>
        <Text style={styles.setHint}>
          Tool cũng tự kiểm tra bản mới mỗi lần mở.
        </Text>
      </View>

      <View style={styles.setItem}>
        <View style={styles.setHead}>
          <MaterialCommunityIcons
            name="home-outline"
            size={16}
            color={colors.gold}
          />
          <Text style={styles.setTitle}>Tab mặc định khi mở tool</Text>
        </View>
        <Pressable
          style={styles.setSelect}
          onPress={() => setPickerOpen((o) => !o)}
        >
          <Text style={styles.setSelectText}>{pageName}</Text>
          <MaterialCommunityIcons
            name={pickerOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={colors.muted}
          />
        </Pressable>
        {pickerOpen ? (
          <View style={styles.setOptions}>
            {PAGE_OPTIONS.map((o) => {
              const active = o.id === defaultPage;
              return (
                <Pressable
                  key={o.id}
                  style={[styles.setOption, active && styles.setOptionActive]}
                  onPress={() => onPickPage(o.id)}
                >
                  <Text
                    style={[
                      styles.setOptionText,
                      active && styles.setOptionTextActive,
                    ]}
                  >
                    {o.name}
                  </Text>
                  {active ? (
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color={colors.goldBright}
                    />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
        {pageSaved ? (
          <View style={styles.setOkRow}>
            <MaterialCommunityIcons
              name="check"
              size={13}
              color={colors.green}
            />
            <Text style={styles.setOk}>
              Đã lưu, áp dụng từ lần mở tool sau.
            </Text>
          </View>
        ) : (
          <Text style={styles.setHint}>
            Tab hiển thị đầu tiên mỗi lần mở tool.
          </Text>
        )}
      </View>

      <View style={styles.setItem}>
        <View style={styles.setHead}>
          <MaterialCommunityIcons name="tune" size={16} color={colors.gold} />
          <Text style={styles.setTitle}>Cài đặt khác</Text>
        </View>
        <Text style={styles.setValue}>
          Cache: <Text style={styles.setBold}>{formatBytes(cacheSize)}</Text>
        </Text>
        <View style={styles.setActions}>
          <Pressable
            style={[styles.setBtn, styles.setBtnFlex]}
            onPress={onClearCache}
          >
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={14}
              color="#201a08"
            />
            <Text style={styles.setBtnText}>Xoá cache</Text>
          </Pressable>
          <Pressable
            style={[styles.setBtn, styles.setBtnFlex]}
            onPress={onReset}
          >
            <MaterialCommunityIcons name="restore" size={14} color="#201a08" />
            <Text style={styles.setBtnText}>Đặt lại</Text>
          </Pressable>
        </View>
        {status ? (
          <View style={styles.setOkRow}>
            <MaterialCommunityIcons
              name="check"
              size={13}
              color={colors.green}
            />
            <Text style={styles.setOk}>{status}</Text>
          </View>
        ) : (
          <Text style={styles.setHint}>
            Xoá cache khi tool hiển thị sai version.{"\n"}Đặt lại: tab mặc định
            là Trang chủ.
          </Text>
        )}
      </View>
    </View>
  );
}

function DonateScreen() {
  const tapsRef = useRef(0);
  const [showSecret, setShowSecret] = useState(false);
  const onQrTap = () => {
    tapsRef.current += 1;
    if (tapsRef.current >= 3) {
      tapsRef.current = 0;
      setShowSecret(true);
    }
  };
  return (
    <View style={styles.donateWrap}>
      <View style={styles.donateCard}>
        <View style={styles.donateHead}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={18}
            color={colors.gold}
          />
          <Text style={styles.donateTitle}>Donate — VietinBank</Text>
        </View>
        <Pressable onPress={onQrTap}>
          <Image
            source={donateQr}
            style={styles.donateQr}
            resizeMode="contain"
          />
        </Pressable>
        <P style={styles.donateNote}>
          Quét mã QR bằng app ngân hàng để ủng hộ em.
        </P>
        <Text style={styles.donateThanks}>
          Cảm ơn các bác đã sử dụng Heroes 3 VN!
        </Text>
      </View>
      <ConfirmDialog
        visible={showSecret}
        title="Thông báo"
        icon={
          <MaterialCommunityIcons
            name="party-popper"
            size={20}
            color={colors.gold}
          />
        }
        message={<P>Chúc mừng, bác vừa khám phá ra tính năng ẩn của tool!</P>}
        confirmText="Xem thử"
        cancelText="Thôi"
        onConfirm={() => {
          openUrl(SECRET_URL);
          setShowSecret(false);
        }}
        onCancel={() => setShowSecret(false)}
      />
    </View>
  );
}

function ScrollButtons({
  scrollRef,
  page,
  canUp,
  canDown,
  bottom,
  open,
  setOpen,
  frameRef,
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => setOpen(false), [page, setOpen]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [open, anim]);

  const smallStyle = useMemo(
    () => ({
      opacity: anim,
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 0],
          }),
        },
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
      ],
    }),
    [anim],
  );
  const rotate = useMemo(
    () =>
      anim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
      }),
    [anim],
  );

  return (
    <View
      style={[styles.scrollMenu, { bottom: 14 + bottom }]}
      pointerEvents="box-none"
      onLayout={(e) => {
        frameRef.current = e.nativeEvent.layout;
      }}
    >
      <Animated.View style={smallStyle} pointerEvents={open ? "auto" : "none"}>
        <Pressable
          style={[
            styles.scrollBtn,
            styles.scrollBtnSm,
            !canUp && styles.scrollBtnOff,
          ]}
          accessibilityLabel="Lên đầu trang"
          disabled={!canUp}
          onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
        >
          <MaterialCommunityIcons
            name="arrow-up"
            size={18}
            color={colors.goldBright}
          />
        </Pressable>
      </Animated.View>
      <Animated.View style={smallStyle} pointerEvents={open ? "auto" : "none"}>
        <Pressable
          style={[
            styles.scrollBtn,
            styles.scrollBtnSm,
            !canDown && styles.scrollBtnOff,
          ]}
          accessibilityLabel="Xuống cuối trang"
          disabled={!canDown}
          onPress={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          <MaterialCommunityIcons
            name="arrow-down"
            size={18}
            color={colors.goldBright}
          />
        </Pressable>
      </Animated.View>
      <Pressable
        style={[styles.scrollBtn, open && styles.scrollBtnOpen]}
        accessibilityLabel="Menu cuộn trang"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((o) => !o)}
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialCommunityIcons
            name="unfold-more-horizontal"
            size={20}
            color={colors.goldBright}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

function AppInner() {
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(() => validPage(loadSettings().defaultPage));
  const [drawer, setDrawer] = useState(false);
  const [update, setUpdate] = useState(null);
  const [updateHidden, setUpdateHidden] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const toggleGroup = (g) => setOpenGroups((s) => ({ ...s, [g]: !s[g] }));
  const scrollRef = useRef(null);
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);
  const [scrollMenuOpen, setScrollMenuOpen] = useState(false);
  const scrollMenuFrame = useRef(null);
  const closeScrollMenu = useCallback(
    (e) => {
      const f = scrollMenuFrame.current;
      const { pageX, pageY } = e.nativeEvent;
      const inside =
        f &&
        pageX >= f.x &&
        pageX <= f.x + f.width &&
        pageY >= f.y &&
        pageY <= f.y + f.height;
      if (scrollMenuOpen && !inside) setScrollMenuOpen(false);
      return false;
    },
    [scrollMenuOpen],
  );
  const metrics = useRef({ y: 0, view: 0, content: 0 });
  const updateScroll = useCallback((next) => {
    const m = Object.assign(metrics.current, next);
    setCanUp(m.y > 20);
    setCanDown(m.y + m.view < m.content - 20);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    updateScroll({ y: 0 });
  }, [page, updateScroll]);

  useEffect(() => {
    fetchLatestRelease()
      .then((rel) => {
        if (compareVersions(rel.version, APP_VERSION) > 0) setUpdate(rel);
      })
      .catch(() => {});
  }, []);

  const current = findNav(page) || {};
  const version = versions.find((v) => v.id === page);

  const go = useCallback((id) => {
    setPage(id);
    setDrawer(false);
  }, []);

  const checkUpdate = () => {
    setDrawer(false);
    fetchLatestRelease()
      .then((rel) => {
        if (compareVersions(rel.version, APP_VERSION) > 0) {
          setUpdate(rel);
          setUpdateHidden(false);
        } else {
          Alert.alert(
            "Cập nhật",
            `Bác đang dùng phiên bản mới nhất (v${APP_VERSION}).`,
          );
        }
      })
      .catch(() =>
        Alert.alert(
          "Cập nhật",
          "Không kiểm tra được cập nhật. Hãy kiểm tra kết nối mạng rồi thử lại.",
        ),
      );
  };

  const renderRow = (n, indent) => {
    const active = n.id === page;
    const onPress = () => go(n.id);
    return (
      <Pressable
        key={n.id}
        style={[
          styles.navItem,
          indent && styles.navItemIndent,
          active && styles.navItemActive,
        ]}
        onPress={onPress}
      >
        {n.img ? (
          <Image source={n.img} style={styles.navImg} />
        ) : (
          <View style={[styles.navDot, styles.navDotHollow]}>
            <MaterialCommunityIcons
              name={n.icon}
              size={14}
              color={colors.gold}
            />
          </View>
        )}
        <Text style={[styles.navName, active && styles.navNameActive]}>
          {n.name}
        </Text>
        {n.tag ? (
          <View style={styles.navTag}>
            <Text style={styles.navTagText}>{n.tag}</Text>
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <NavContext.Provider value={go}>
      <View
        style={styles.root}
        onStartShouldSetResponderCapture={closeScrollMenu}
      >
        <StatusBar style="light" />
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <View style={styles.barSide}>
            <Pressable onPress={() => setDrawer(true)} hitSlop={10}>
              <MaterialCommunityIcons
                name="menu"
                size={26}
                color={colors.gold}
              />
            </Pressable>
          </View>
          <Image
            source={brandLogo}
            style={styles.barLogo}
            resizeMode="contain"
          />
          <View style={[styles.barSide, styles.barSideRight]}>
            <SvgXml xml={VN_FLAG_SVG} width={26} height={17} />
            <Text style={styles.barVersion}>v{APP_VERSION}</Text>
          </View>
        </View>

        {update && !updateHidden ? (
          <Pressable
            style={styles.updateBar}
            onPress={() => openUrl(LATEST_RELEASE_URL)}
          >
            <MaterialCommunityIcons
              name="download"
              size={16}
              color={colors.goldBright}
            />
            <Text style={styles.updateText}>
              Đã có bản mới{" "}
              <Text style={styles.updateVer}>{update.version}</Text> — bấm để
              tải trên GitHub
            </Text>
            <Pressable onPress={() => setUpdateHidden(true)} hitSlop={10}>
              <MaterialCommunityIcons
                name="close"
                size={16}
                color={colors.muted}
              />
            </Pressable>
          </Pressable>
        ) : null}

        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={32}
          onScroll={(e) => updateScroll({ y: e.nativeEvent.contentOffset.y })}
          onLayout={(e) => updateScroll({ view: e.nativeEvent.layout.height })}
          onContentSizeChange={(_w, h) => updateScroll({ content: h })}
        >
          {page !== "home" && !version ? (
            <Text style={styles.pageTitle}>{current.name}</Text>
          ) : null}
          {page === "home" && <HomeScreen onNavigate={go} />}
          {version && <VersionScreen version={version} />}
          {page === "web" && <WebScreen />}
          {page === "series" && <SeriesScreen />}
          {page === "boardgame" && <BoardgameScreen />}
          {page === "cheat" && <CheatScreen />}
          {page === "keybinds" && <KeybindsScreen />}
          {page === "faq" && <FaqScreen />}
          {page === UPCOMING_ITEM.id && <UpcomingScreen />}
          {page === "donate" && <DonateScreen />}
          {page === SETTINGS_ITEM.id && (
            <SettingsScreen onCheckUpdate={checkUpdate} />
          )}
          <View style={{ height: 40 + insets.bottom }} />
        </ScrollView>

        <ScrollButtons
          scrollRef={scrollRef}
          page={page}
          canUp={canUp}
          canDown={canDown}
          bottom={insets.bottom}
          open={scrollMenuOpen}
          setOpen={setScrollMenuOpen}
          frameRef={scrollMenuFrame}
        />

        <Modal
          visible={drawer}
          transparent
          animationType="fade"
          onRequestClose={() => setDrawer(false)}
        >
          <Pressable
            style={styles.drawerBackdrop}
            onPress={() => setDrawer(false)}
          >
            <Pressable
              style={[styles.drawer, { paddingTop: insets.top + 10 }]}
              onPress={() => {}}
            >
              <View style={styles.drawerHead}>
                <Image
                  source={appIcon}
                  style={styles.drawerLogo}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.drawerTitle}>Heroes III Việt Nam</Text>
                  <Text style={styles.drawerBy}>by Gogetto</Text>
                </View>
              </View>
              <ScrollView
                style={styles.navList}
                showsVerticalScrollIndicator={false}
              >
                {NAV.map((n) => {
                  if (n.group) {
                    const open = openGroups[n.group];
                    return (
                      <View key={n.group}>
                        <Pressable
                          style={styles.navItem}
                          onPress={() => toggleGroup(n.group)}
                        >
                          <View style={[styles.navDot, styles.navDotHollow]}>
                            <MaterialCommunityIcons
                              name={n.icon}
                              size={14}
                              color={colors.gold}
                            />
                          </View>
                          <Text style={styles.navName}>{n.name}</Text>
                          <MaterialCommunityIcons
                            name={open ? "chevron-up" : "chevron-down"}
                            size={18}
                            color={colors.muted}
                          />
                        </Pressable>
                        {open ? n.items.map((v) => renderRow(v, true)) : null}
                      </View>
                    );
                  }
                  return renderRow(n, false);
                })}
              </ScrollView>
              <Pressable
                style={styles.drawerFooter}
                onPress={() => go(SETTINGS_ITEM.id)}
              >
                <MaterialCommunityIcons
                  name={SETTINGS_ITEM.icon}
                  size={16}
                  color={colors.gold}
                />
                <Text style={styles.drawerFooterText}>
                  {SETTINGS_ITEM.name}
                </Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </NavContext.Provider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppInner />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg2,
  },
  barSide: { flex: 1, justifyContent: "center", alignItems: "flex-start" },
  barSideRight: { alignItems: "flex-end", gap: 1 },
  barLogo: { width: 116, height: 34, marginHorizontal: 10 },
  barVersion: { color: colors.muted, fontSize: 10, fontWeight: "600" },

  confirmBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  confirmBox: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 18,
  },
  confirmHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  confirmTitle: { color: colors.gold, fontSize: 17, fontWeight: "700" },
  confirmBody: { marginBottom: 18 },
  confirmActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  confirmGhost: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmGhostText: { color: colors.text, fontWeight: "600", fontSize: 14 },
  confirmBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.goldBright,
  },
  confirmBtnText: { color: "#201a08", fontWeight: "700", fontSize: 14 },

  scroll: { flex: 1 },
  content: { padding: 16 },
  pageTitle: {
    color: colors.gold,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },

  scrollMenu: {
    position: "absolute",
    right: 14,
    alignItems: "center",
    gap: 10,
  },
  scrollBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel2,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },
  scrollBtnSm: { width: 38, height: 38, borderRadius: 19 },
  scrollBtnOpen: { borderColor: colors.gold },
  scrollBtnOff: { opacity: 0.4 },
  updateBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "rgba(201,162,39,0.14)",
    borderBottomWidth: 1,
    borderBottomColor: colors.gold,
  },
  updateText: { flex: 1, color: colors.text, fontSize: 13 },
  updateVer: { color: colors.goldBright, fontWeight: "700" },

  hero: { alignItems: "center", marginBottom: 14 },
  heroTitle: {
    color: colors.goldBright,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  heroText: { textAlign: "center", marginTop: 6, fontSize: 15 },
  versionList: { marginTop: 14, gap: 12 },
  versionCard: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopWidth: 3,
    borderRadius: radius.md,
    padding: 14,
    gap: 8,
  },
  versionHead: { flexDirection: "row", alignItems: "center", gap: 12 },
  versionIcon: { width: 40, height: 40, borderRadius: 8 },
  versionTitles: { flex: 1 },
  versionName: { fontSize: 17, fontWeight: "800" },
  versionSub: { color: colors.muted, fontSize: 12.5, marginTop: 1 },
  versionLatest: { color: colors.muted, fontSize: 12.5 },
  versionSummary: { color: colors.text, fontSize: 13.5, lineHeight: 20 },
  versionCta: { flexDirection: "row", alignItems: "center", gap: 6 },
  versionCtaText: { fontSize: 13, fontWeight: "700" },

  chooseCard: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 10,
  },
  chooseHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },
  chooseIcon: { width: 30, height: 30, borderRadius: 6 },
  chooseName: {
    flex: 1,
    color: colors.goldBright,
    fontWeight: "700",
    fontSize: 16,
  },
  chooseDesc: { color: colors.muted, fontSize: 13.5, lineHeight: 20 },

  storyBox: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    gap: 10,
  },
  supportCard: {
    marginTop: 18,
    backgroundColor: "rgba(201,162,39,0.06)",
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.md,
    padding: 14,
  },
  supportHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  supportTitle: { color: colors.gold, fontWeight: "700", fontSize: 15 },
  supportDesc: {
    color: colors.text,
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 12,
  },
  supportBtnRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  supportBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.goldBright,
  },
  supportBtnText: { color: "#201a08", fontWeight: "700", fontSize: 14 },
  copyBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel2,
    alignItems: "center",
    justifyContent: "center",
  },
  copyBtnOn: { borderColor: colors.green },

  vHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginBottom: 6,
  },
  vIcon: { width: 46, height: 46, borderRadius: 8 },
  vName: { color: colors.text, fontSize: 22, fontWeight: "800" },
  vSub: { color: colors.muted, fontSize: 13.5, marginTop: 2 },

  vMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  latest: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: colors.goldSoft,
  },
  latestText: { color: colors.text, fontSize: 12.5 },
  changelogBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel2,
  },
  changelogBtnText: {
    color: colors.goldBright,
    fontSize: 12.5,
    fontWeight: "700",
  },
  latestVer: { color: colors.goldBright, fontWeight: "700" },

  cheatHead: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  cheatHeadCol: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "700",
    width: 150,
  },

  kbTitle: {
    color: colors.gold,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
    paddingLeft: 10,
  },
  source: {
    color: colors.muted,
    fontSize: 12.5,
    marginTop: 8,
    fontStyle: "italic",
  },

  drawerBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
  },
  drawer: {
    width: "78%",
    maxWidth: 320,
    backgroundColor: colors.bg2,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    paddingBottom: 20,
  },
  drawerHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 14,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  drawerLogo: { width: 44, height: 44 },
  drawerTitle: { color: colors.goldBright, fontSize: 18, fontWeight: "800" },
  drawerBy: { color: colors.muted, fontSize: 12 },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  navItemIndent: { paddingLeft: 30 },
  navItemActive: { backgroundColor: colors.goldSoft },
  navDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  navDotHollow: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  navImg: { width: 28, height: 28, borderRadius: 6 },
  navName: { color: colors.text, fontSize: 14.5, flex: 1 },
  navNameActive: { color: colors.goldBright, fontWeight: "700" },
  navTag: {
    backgroundColor: "rgba(63,159,208,0.18)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  navTagText: { color: "#5fb6e0", fontSize: 10, fontWeight: "700" },
  navList: { flex: 1 },
  drawerFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
    marginHorizontal: 16,
    paddingVertical: 11,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.goldSoft,
  },
  drawerFooterText: { color: colors.gold, fontSize: 14, fontWeight: "700" },

  upHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  upIcon: { width: 52, height: 52, borderRadius: radius.sm },
  upName: { color: colors.goldBright, fontSize: 16, fontWeight: "700" },
  upSub: { color: colors.muted, fontSize: 12.5, marginTop: 2 },

  setItem: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 14,
    marginTop: 12,
  },
  setHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  setTitle: { color: colors.goldBright, fontSize: 15, fontWeight: "700" },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  setValue: { flex: 1, color: colors.text, fontSize: 13.5 },
  setBold: { fontWeight: "700" },
  setBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    width: 140,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.goldBright,
  },
  setBtnText: { color: "#201a08", fontWeight: "700", fontSize: 13.5 },
  setHint: {
    color: colors.muted,
    fontSize: 12.5,
    lineHeight: 18,
    marginTop: 8,
  },
  setOkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },
  setOk: { color: colors.green, fontSize: 12.5 },
  setActions: { flexDirection: "row", gap: 10, marginTop: 10 },
  setBtnFlex: { flex: 1, width: undefined },
  setSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.panel2,
  },
  setSelectText: { color: colors.text, fontSize: 13.5 },
  setOptions: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.bg2,
    overflow: "hidden",
  },
  setOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  setOptionActive: { backgroundColor: colors.goldSoft2 },
  setOptionText: { color: colors.text, fontSize: 13.5 },
  setOptionTextActive: { color: colors.goldBright, fontWeight: "700" },

  donateWrap: { alignItems: "center", paddingTop: 12 },
  donateCard: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 20,
  },
  donateHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  donateTitle: { color: colors.gold, fontSize: 17, fontWeight: "700" },
  donateQr: {
    width: 240,
    height: 240,
    borderRadius: radius.md,
    backgroundColor: "#fff",
  },
  donateNote: {
    color: colors.text,
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
  },
  donateThanks: {
    color: colors.goldBright,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic",
  },
});
