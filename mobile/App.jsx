import "./global.css";
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
import { versions } from "@shared/data/versions.js";
import {
  fetchLatestRelease,
  compareVersions,
  LATEST_RELEASE_URL,
} from "./src/lib/update";
import { loadSettings } from "./src/lib/settings";
import brandLogo from "@shared/assets/images/logo.webp";
import appIcon from "./assets/icon.png";
import { APP_VERSION } from "./src/lib/version";
import {
  NAV,
  SECRET_ITEM,
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
import { SecretScreen } from "./src/pages/secret";
import { ScrollButtons } from "./src/components/ScrollButtons";
import { cls } from "./src/styles";

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
        className={
          cls[`navItem${indent ? "Indent" : ""}${active ? "Active" : ""}`]
        }
        onPress={onPress}
      >
        {n.img ? (
          <Image source={n.img} className={cls.navImg} />
        ) : (
          <View className={cls.navDotHollow}>
            <MaterialCommunityIcons
              name={n.icon}
              size={14}
              color={colors.gold}
            />
          </View>
        )}
        <Text className={active ? cls.navNameActive : cls.navName}>
          {n.name}
        </Text>
        {n.tag ? (
          <View className={cls.navTag}>
            <Text className={cls.navTagText}>{n.tag}</Text>
          </View>
        ) : null}
      </Pressable>
    );
  };

  return (
    <NavContext.Provider value={go}>
      <View
        className={cls.root}
        onStartShouldSetResponderCapture={closeScrollMenu}
      >
        <StatusBar style="light" />
        <View className={cls.header} style={{ paddingTop: insets.top + 10 }}>
          <View className={cls.barSide}>
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
              className={cls.barLogo}
              resizeMode="contain"
            />
          </Pressable>
          <View className={cls.barSideRight}>
            <SvgXml xml={VN_FLAG_SVG} width={26} height={17} />
            <Text className={cls.barVersion}>v{APP_VERSION}</Text>
          </View>
        </View>

        {update && !updateHidden ? (
          <Pressable
            className={cls.updateBar}
            onPress={() => openUrl(LATEST_RELEASE_URL)}
          >
            <MaterialCommunityIcons
              name="download"
              size={16}
              color={colors.goldBright}
            />
            <Text className={cls.updateText}>
              Đã có bản mới{" "}
              <Text className={cls.updateVer}>{update.version}</Text> - bấm để
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
          className={cls.scroll}
          contentContainerClassName={cls.content}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={32}
          onScroll={(e) => updateScroll({ y: e.nativeEvent.contentOffset.y })}
          onLayout={(e) => updateScroll({ view: e.nativeEvent.layout.height })}
          onContentSizeChange={(_w, h) => updateScroll({ content: h })}
        >
          {page !== "home" && !version ? (
            <Text className={cls.pageTitle}>
              {current.title ?? current.name}
            </Text>
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
          {page === SECRET_ITEM.id && <SecretScreen />}
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
            className={cls.drawerBackdrop}
            onPress={() => setDrawer(false)}
          >
            <Pressable
              className={cls.drawer}
              style={{ paddingTop: insets.top + 10 }}
              onPress={() => {}}
            >
              <View className={cls.drawerHead}>
                <Image
                  source={appIcon}
                  className={cls.drawerLogo}
                  resizeMode="contain"
                />
                <View>
                  <Text className={cls.drawerTitle}>Heroes III Việt Nam</Text>
                  <Text className={cls.drawerBy}>by Gogetto</Text>
                </View>
              </View>
              <ScrollView
                className={cls.navList}
                showsVerticalScrollIndicator={false}
              >
                {NAV.map((n) => {
                  if (n.group) {
                    const open = openGroups[n.group];
                    return (
                      <View key={n.group}>
                        <Pressable
                          className={cls.navItem}
                          onPress={() => toggleGroup(n.group)}
                        >
                          <View className={cls.navDotHollow}>
                            <MaterialCommunityIcons
                              name={n.icon}
                              size={14}
                              color={colors.gold}
                            />
                          </View>
                          <Text className={cls.navName}>{n.name}</Text>
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
                className={cls.drawerFooter}
                onPress={() => go(SETTINGS_ITEM.id)}
              >
                <MaterialCommunityIcons
                  name={SETTINGS_ITEM.icon}
                  size={16}
                  color={colors.gold}
                />
                <Text className={cls.drawerFooterText}>
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
