import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Modal,
  Image,
  Alert,
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
  P,
  B,
  A,
  openUrl,
  copyText,
} from "./src/components/ui";
import { versions, versionIcons } from "./src/data/versions";
import { CHOOSE_GUIDE } from "./src/data/choose";
import { WEB_GROUPS } from "./src/data/web";
import { SERIES_GROUPS, SERIES_BUNDLES } from "./src/data/series";
import { CHEATS } from "./src/data/cheats";
import { KEYBINDS_BASE, KEYBINDS_HD } from "./src/data/keybinds";
import { FAQ_ITEMS } from "./src/data/faq";
import {
  fetchModLatest,
  fetchLatestRelease,
  compareVersions,
  LATEST_RELEASE_URL,
} from "./src/lib/update";
import brandLogo from "./src/assets/images/logo.webp";
import appIcon from "./assets/adaptive-icon.png";
import donateQr from "./src/assets/images/donate.webp";
import dorIcon from "./src/assets/icons/dor.webp";
import webIcon from "./src/assets/icons/heroes.webp";
import hdIcon from "./src/assets/icons/hd.webp";
import cheatIcon from "./src/assets/icons/cheat.webp";
import faqIcon from "./src/assets/icons/faq.webp";
import seriesIcon from "./src/assets/icons/series.webp";
import appConfig from "./app.json";

const APP_VERSION = appConfig.expo.version;
const GROUP_FB_URL = "https://www.facebook.com/groups/hero3";
const SUPPORT_FB_URL = "https://www.facebook.com/qudu.Gogetto";
const DOR_URL = "http://heroescommunity.com/viewthread.php3?TID=47267"; // NOSONAR

const CHANGELOG_URLS = {
  complete:
    "https://drive.google.com/file/d/1OeNFzNy-m9ZDxe4ikGEGVqMrfVN-Nwbz/view",
  hota: "https://download.h3hota.com/upd/changelogs/eng.txt",
  era: "https://raw.githubusercontent.com/ERA-Projects/era-project-eng/refs/heads/main/CHANGELOG.md",
  vcmi: "https://raw.githubusercontent.com/vcmi/vcmi/refs/heads/develop/ChangeLog.md",
  chronicles: "https://www.forum.acidcave.net/topic.php?TID=3892",
};

const VERSION_ITEMS = [
  ...versions.map((v) => ({
    id: v.id,
    name: v.name,
    img: versionIcons[v.id],
    accent: v.accent,
    isVersion: true,
  })),
  {
    id: "dor",
    name: "Day of Reckoning",
    img: dorIcon,
    external: DOR_URL,
    tag: "Sắp ra mắt",
    accent: "#3f9fd0",
  },
];

const TOOL_ITEMS = [
  { id: "web", name: "Tài nguyên hữu ích", img: webIcon },
  { id: "keybinds", name: "Phím tắt trong game", img: hdIcon },
  { id: "cheat", name: "Cheat codes", img: cheatIcon },
  { id: "faq", name: "Câu hỏi thường gặp", img: faqIcon },
  { id: "series", name: "Game cùng series", img: seriesIcon },
];

const NAV = [
  { id: "home", name: "Trang chủ", icon: "home-outline" },
  {
    group: "versions",
    name: "Các phiên bản",
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

const findNav = (id) =>
  [...NAV, ...VERSION_ITEMS, ...TOOL_ITEMS].find((n) => n.id === id);

const versionOf = (id) => versions.find((v) => v.id === id);

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

function ChooseChip({ id, accent }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <View
      style={[
        styles.chooseChip,
        { backgroundColor: accent + "26", borderColor: accent },
      ]}
    >
      <Text
        style={[styles.chooseChipText, { color: accent }]}
        numberOfLines={1}
      >
        {items.map((it) => it.version).join("  •  ")}
      </Text>
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

function ConfirmDialog({ visible, title, message, onConfirm, onCancel }) {
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
            <MaterialCommunityIcons
              name="open-in-new"
              size={18}
              color={colors.gold}
            />
            <Text style={styles.confirmTitle}>{title}</Text>
          </View>
          <View style={styles.confirmBody}>{message}</View>
          <View style={styles.confirmActions}>
            <Pressable style={styles.confirmGhost} onPress={onCancel}>
              <Text style={styles.confirmGhostText}>Huỷ</Text>
            </Pressable>
            <Pressable style={styles.confirmBtn} onPress={onConfirm}>
              <MaterialCommunityIcons
                name="open-in-new"
                size={14}
                color="#201a08"
              />
              <Text style={styles.confirmBtnText}>Mở link</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function HomeScreen({ onNavigate, onDorPress }) {
  return (
    <View>
      <Section title="Giới thiệu">
        <P>
          Tool lưu trữ link tải/mua <B>Heroes of Might and Magic III</B> mọi
          phiên bản, kèm hướng dẫn cài đặt chi tiết bằng tiếng Việt. Chọn bản
          muốn chơi ở menu, bấm nút là ra đúng link tải/mua chính thức cùng
          hướng dẫn cài.
        </P>
      </Section>

      <Section title="Nên chọn bản nào">
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
                <Text style={styles.chooseName}>{v.name}</Text>
                <ChooseChip id={g.id} accent={v.accent} />
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

      <Section title="Sắp ra mắt">
        <Pressable
          style={[styles.chooseCard, { borderLeftColor: "#3f9fd0" }]}
          onPress={onDorPress}
        >
          <View style={styles.chooseHead}>
            <Image
              source={dorIcon}
              style={styles.chooseIcon}
              resizeMode="contain"
            />
            <Text style={styles.chooseName}>Day of Reckoning</Text>
            <View style={styles.dorTag}>
              <Text style={styles.dorTagText}>Sắp ra mắt</Text>
            </View>
            <MaterialCommunityIcons
              name="open-in-new"
              size={18}
              color="#3f9fd0"
            />
          </View>
          <P style={styles.chooseDesc}>
            Một dự án Heroes 3 mới sắp ra mắt. Bấm để xem thông tin mới nhất về
            DoR trên diễn đàn Heroes Community.
          </P>
        </Pressable>
      </Section>

      <Section title="Lý do tool ra đời">
        <View style={styles.storyBox}>
          <P>
            Trong group Heroes 3 Việt Nam, ngày nào cũng có người hỏi những câu
            quen thuộc: “Tải Heroes 3 ở đâu?”, “HotA với ERA khác gì nhau?”,
            “Cài VCMI như thế nào?”… Link tải/mua thì đến từ nhiều nguồn và rất
            khó tìm, phần lớn các trang đó cũng đều viết bằng tiếng Anh hoặc
            tiếng Nga rất khó tiếp cận.
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

      <View style={styles.supportCard}>
        <View style={styles.supportHead}>
          <MaterialCommunityIcons
            name="headphones"
            size={20}
            color={colors.gold}
          />
          <Text style={styles.supportTitle}>Cần hỗ trợ cài đặt?</Text>
        </View>
        <P style={styles.supportDesc}>
          Làm theo hướng dẫn mà vẫn chưa cài được? Cứ nhắn Facebook cho Gogetto
          — sẽ được hỗ trợ tận tình, hoàn toàn miễn phí.
        </P>
        <View style={styles.supportBtnRow}>
          <CopyButton text={SUPPORT_FB_URL} />
          <Pressable
            style={styles.supportBtn}
            onPress={() => openUrl(SUPPORT_FB_URL)}
          >
            <MaterialCommunityIcons name="facebook" size={15} color="#201a08" />
            <Text style={styles.supportBtnText}>Inbox Gogetto</Text>
          </Pressable>
        </View>
      </View>

      <Section title="Cộng đồng & Ủng hộ">
        <LinkRow
          label="Group Facebook Heroes 3 VN"
          url={GROUP_FB_URL}
          buttonText="Mở group"
        />
      </Section>

      <Note>
        <P>
          Tool chỉ lưu trữ link đến các nguồn chính thức (GOG, trang chủ của
          mod…), không phát tán file game lậu.
        </P>
      </Note>
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

function CheatScreen() {
  return (
    <View>
      <Note>
        <P>
          Cách dùng: mở màn chơi, gõ trực tiếp mã cheat (không cần mở ô nhập
          nào). Bấm vào mã để chép nhanh.
        </P>
      </Note>
      <Note title="Siêu cheat">
        <P>
          <B>nwctheone:</B> cần cài HD Patch để dùng (HotA và ERA đã tích hợp
          sẵn, Complete cần cài thủ công).
        </P>
        <P>
          <B>vcmigod:</B> mã riêng cho bản VCMI (VCMI là engine viết lại nên
          không cài được HD Patch, do đó có mã riêng).
        </P>
      </Note>
      <View style={styles.cheatHead}>
        <Text style={styles.cheatHeadCol}>
          Theo thứ tự từng dòng: [Complete/SoD và HotA] [ERA/WoG] [VCMI]
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
          Có 2 bảng: bảng đầu là phím tắt/thao tác chuột bổ sung khi cài{" "}
          <B>HD Patch</B>; bảng sau là phím tắt của <B>bản gốc</B>{" "}
          (Complete/SoD, HotA, Chronicles). Bản VCMI có thể khác đôi chút.
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

function DonateScreen() {
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
        <Image source={donateQr} style={styles.donateQr} resizeMode="contain" />
        <P style={styles.donateNote}>
          Quét mã QR bằng app ngân hàng để ủng hộ em.
        </P>
        <Text style={styles.donateThanks}>
          Cảm ơn các bác đã sử dụng Heroes 3 VN!
        </Text>
      </View>
    </View>
  );
}

function AppInner() {
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState("home");
  const [drawer, setDrawer] = useState(false);
  const [update, setUpdate] = useState(null);
  const [updateHidden, setUpdateHidden] = useState(false);
  const [confirmDor, setConfirmDor] = useState(false);
  const [openGroups, setOpenGroups] = useState({});
  const toggleGroup = (g) => setOpenGroups((s) => ({ ...s, [g]: !s[g] }));
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }, [page]);

  useEffect(() => {
    fetchLatestRelease()
      .then((rel) => {
        if (compareVersions(rel.version, APP_VERSION) > 0) setUpdate(rel);
      })
      .catch(() => {});
  }, []);

  const current = findNav(page) || {};
  const version = versions.find((v) => v.id === page);

  const go = (id) => {
    setPage(id);
    setDrawer(false);
  };

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
            `Bạn đang dùng phiên bản mới nhất (v${APP_VERSION}).`,
          );
        }
      })
      .catch(() =>
        Alert.alert("Cập nhật", "Không kiểm tra được cập nhật, thử lại sau."),
      );
  };

  const renderRow = (n, indent) => {
    const active = n.id === page;
    const onPress = () => {
      if (n.external) {
        setConfirmDor(true);
        setDrawer(false);
      } else {
        go(n.id);
      }
    };
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
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View style={styles.barSide}>
          <Pressable onPress={() => setDrawer(true)} hitSlop={10}>
            <MaterialCommunityIcons name="menu" size={26} color={colors.gold} />
          </Pressable>
        </View>
        <Image source={brandLogo} style={styles.barLogo} resizeMode="contain" />
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
            Đã có bản mới <Text style={styles.updateVer}>{update.version}</Text>{" "}
            — bấm để tải trên GitHub
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
      >
        {page !== "home" && !version ? (
          <Text style={styles.pageTitle}>{current.name}</Text>
        ) : null}
        {page === "home" && (
          <HomeScreen onNavigate={go} onDorPress={() => setConfirmDor(true)} />
        )}
        {version && <VersionScreen version={version} />}
        {page === "web" && <WebScreen />}
        {page === "series" && <SeriesScreen />}
        {page === "cheat" && <CheatScreen />}
        {page === "keybinds" && <KeybindsScreen />}
        {page === "faq" && <FaqScreen />}
        {page === "donate" && <DonateScreen />}
        <View style={{ height: 40 + insets.bottom }} />
      </ScrollView>

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
            <Pressable style={styles.drawerFooter} onPress={checkUpdate}>
              <MaterialCommunityIcons
                name="update"
                size={16}
                color={colors.gold}
              />
              <Text style={styles.drawerFooterText}>Kiểm tra cập nhật</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <ConfirmDialog
        visible={confirmDor}
        title="Day of Reckoning"
        message={
          <P>
            Bạn sắp mở trang giới thiệu <B>Day of Reckoning</B> trên diễn đàn
            Heroes Community bằng trình duyệt.
          </P>
        }
        onConfirm={() => {
          openUrl(DOR_URL);
          setConfirmDor(false);
        }}
        onCancel={() => setConfirmDor(false)}
      />
    </View>
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
  chooseChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    maxWidth: 150,
  },
  chooseChipText: { fontSize: 11, fontWeight: "700" },
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

  dorTag: {
    backgroundColor: "rgba(63,159,208,0.18)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dorTagText: { color: "#5fb6e0", fontSize: 10, fontWeight: "700" },

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
