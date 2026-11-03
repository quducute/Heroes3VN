import { useState } from "react";
import { Alert, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import { getCacheSize, clearCache } from "../lib/cache";
import { formatBytes } from "@shared/lib/format.js";
import { SETTINGS as S } from "@shared/data/settings.js";
import { loadSettings, saveSettings, resetSettings } from "../lib/settings";
import { APP_VERSION } from "../lib/version";
import { PAGE_OPTIONS, validPage } from "./index";
import { cls } from "../styles";

export function SettingsScreen({ onCheckUpdate }) {
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
      Alert.alert(S.title, S.defaultPageError);
    }
  };

  const onClearCache = () => {
    try {
      const freed = clearCache();
      setStatus(S.cacheCleared(formatBytes(freed)));
    } catch {
      setStatus(S.cacheError);
    }
    setCacheSize(getCacheSize());
  };

  const onReset = () => {
    try {
      setDefaultPage(validPage(resetSettings().defaultPage));
      setPageSaved(false);
      setStatus(S.resetDone);
    } catch {
      setStatus(S.resetError);
    }
  };

  const pageName = PAGE_OPTIONS.find((o) => o.id === defaultPage)?.name;

  return (
    <View>
      <View className={cls.setItem}>
        <View className={cls.setHead}>
          <MaterialCommunityIcons name="update" size={16} color={colors.gold} />
          <Text className={cls.setTitle}>{S.updateTitle}</Text>
        </View>
        <View className={cls.setRow}>
          <Text className={cls.setValue}>
            {S.currentVersion}
            <Text className={cls.setBold}>v{APP_VERSION}</Text>
          </Text>
          <Pressable className={cls.setBtn} onPress={onCheckUpdate}>
            <MaterialCommunityIcons
              name="update"
              size={14}
              color={mix("goldenrod", 0.15)}
            />
            <Text className={cls.setBtnText}>{S.checkUpdate}</Text>
          </Pressable>
        </View>
        <Text className={cls.setHint}>{S.autoCheck}</Text>
      </View>

      <View className={cls.setItem}>
        <View className={cls.setHead}>
          <MaterialCommunityIcons
            name="home-outline"
            size={16}
            color={colors.gold}
          />
          <Text className={cls.setTitle}>{S.defaultPageTitle}</Text>
        </View>
        <Pressable
          className={cls.setSelect}
          onPress={() => setPickerOpen((o) => !o)}
        >
          <Text className={cls.setSelectText}>{pageName}</Text>
          <MaterialCommunityIcons
            name={pickerOpen ? "chevron-up" : "chevron-down"}
            size={18}
            color={colors.muted}
          />
        </Pressable>
        {pickerOpen ? (
          <View className={cls.setOptions}>
            {PAGE_OPTIONS.map((o) => {
              const active = o.id === defaultPage;
              return (
                <Pressable
                  key={o.id}
                  className={active ? cls.setOptionActive : cls.setOption}
                  onPress={() => onPickPage(o.id)}
                >
                  <Text
                    className={
                      active ? cls.setOptionTextActive : cls.setOptionText
                    }
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
          <View className={cls.setOkRow}>
            <MaterialCommunityIcons
              name="check"
              size={13}
              color={colors.green}
            />
            <Text className={cls.setOk}>{S.defaultPageSaved}</Text>
          </View>
        ) : (
          <Text className={cls.setHint}>{S.defaultPageHint}</Text>
        )}
      </View>

      <View className={cls.setItem}>
        <View className={cls.setHead}>
          <MaterialCommunityIcons name="tune" size={16} color={colors.gold} />
          <Text className={cls.setTitle}>{S.otherTitle}</Text>
        </View>
        <Text className={cls.setValue}>
          {S.cache}
          <Text className={cls.setBold}>{formatBytes(cacheSize)}</Text>
        </Text>
        <View className={cls.setActions}>
          <Pressable className={cls.setBtnFlex} onPress={onClearCache}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={14}
              color={mix("goldenrod", 0.15)}
            />
            <Text className={cls.setBtnText}>{S.clearCache}</Text>
          </Pressable>
          <Pressable className={cls.setBtnFlex} onPress={onReset}>
            <MaterialCommunityIcons
              name="restore"
              size={14}
              color={mix("goldenrod", 0.15)}
            />
            <Text className={cls.setBtnText}>{S.reset}</Text>
          </Pressable>
        </View>
        {status ? (
          <View className={cls.setOkRow}>
            <MaterialCommunityIcons
              name="check"
              size={13}
              color={colors.green}
            />
            <Text className={cls.setOk}>{status}</Text>
          </View>
        ) : (
          <Text className={cls.setHint}>
            {S.cacheHint}
            {"\n"}Đặt lại: tab mặc định là Trang chủ.
          </Text>
        )}
      </View>
    </View>
  );
}
