import { useState, useRef, useCallback, useEffect } from "react";
import {
  Alert,
  Pressable,
  Image,
  View,
  Text,
  ScrollView,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Roboto_400Regular } from "@expo-google-fonts/roboto/400Regular";
import { Roboto_400Regular_Italic } from "@expo-google-fonts/roboto/400Regular_Italic";
import { Roboto_500Medium } from "@expo-google-fonts/roboto/500Medium";
import { Roboto_700Bold } from "@expo-google-fonts/roboto/700Bold";
import { LuxuriousRoman_400Regular } from "@expo-google-fonts/luxurious-roman/400Regular";
import {
  useSafeAreaInsets,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { VN as VN_FLAG_SVG } from "country-flag-icons/string/3x2";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./src/theme";
import { NavContext, openUrl } from "./src/components/ui";
import { versions } from "./src/data/versions";
import {
  fetchLatestRelease,
  compareVersions,
  LATEST_RELEASE_URL,
} from "./src/lib/update";
import { loadSettings } from "./src/lib/settings";
import brandLogo from "./src/assets/images/logo.webp";
import appIcon from "./assets/icon.png";
import { APP_VERSION } from "./src/lib/version";
import {
  NAV,
  SETTINGS_ITEM,
  UPCOMING_ITEM,
  findNav,
  validPage,
} from "./src/pages/index";
import { UpcomingScreen } from "./src/pages/upcoming";
import { HomeScreen } from "./src/pages/home";
import { VersionScreen } from "./src/pages/version";
import { WebScreen } from "./src/pages/web";
import { SeriesScreen } from "./src/pages/series";
import { BoardgameScreen } from "./src/pages/boardgame";
import { CheatScreen } from "./src/pages/cheat";
import { KeybindsScreen } from "./src/pages/keybinds";
import { FaqScreen } from "./src/pages/faq";
import { SettingsScreen } from "./src/pages/settings";
import { DonateScreen } from "./src/pages/donate";
import { ScrollButtons } from "./src/components/ScrollButtons";
import { styles } from "./src/styles";

SplashScreen.preventAutoHideAsync().catch(() => {});

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
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Về trang chủ"
            onPress={() => go("home")}
          >
            <Image
              source={brandLogo}
              style={styles.barLogo}
              resizeMode="contain"
            />
          </Pressable>
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
              <Text style={styles.updateVer}>{update.version}</Text> - bấm để
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
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_700Bold,
    LuxuriousRoman_400Regular,
  });
  const ready = fontsLoaded || Boolean(fontError);

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;
  return (
    <SafeAreaProvider>
      <AppInner />
    </SafeAreaProvider>
  );
}
