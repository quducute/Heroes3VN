import { useState } from "react";
import { Alert, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import { getCacheSize, clearCache } from "../lib/cache";
import { formatBytes } from "@shared/lib/format.js";
import { FONT_SIZES, SETTINGS as S } from "@shared/data/settings.js";
import { loadSettings, saveSettings } from "../lib/settings";
import { usePrefs } from "../components/prefs";
import { APP_VERSION } from "../lib/version";
import { PAGE_OPTIONS, validPage } from "./index";
import { cls } from "../styles";

function Picker({
  icon,
  title,
  options,
  value,
  onPick,
  saved,
  savedText,
  hint,
}) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.id === value)?.name;
  const pick = (id) => {
    setOpen(false);
    onPick(id);
  };
  return (
    <View className={cls.setItem}>
      <View className={cls.setHead}>
        <MaterialCommunityIcons name={icon} size={16} color={colors.gold} />
        <Text className={cls.setTitle}>{title}</Text>
      </View>
      <Pressable className={cls.setSelect} onPress={() => setOpen((o) => !o)}>
        <Text className={cls.setSelectText}>{current}</Text>
        <MaterialCommunityIcons
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color={colors.muted}
        />
      </Pressable>
      {open ? (
        <View className={cls.setOptions}>
          {options.map((o) => {
            const active = o.id === value;
            return (
              <Pressable
                key={o.id}
                className={active ? cls.setOptionActive : cls.setOption}
                onPress={() => pick(o.id)}
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
      {saved ? (
        <View className={cls.setOkRow}>
          <MaterialCommunityIcons name="check" size={13} color={colors.green} />
          <Text className={cls.setOk}>{savedText}</Text>
        </View>
      ) : (
        <Text className={cls.setHint}>{hint}</Text>
      )}
    </View>
  );
}

const FONT_OPTIONS = FONT_SIZES.map((f) => ({ id: f.value, name: f.label }));

export function SettingsScreen({ onCheckUpdate }) {
  const prefs = usePrefs();
  const [fontSaved, setFontSaved] = useState(false);
  const [cacheSize, setCacheSize] = useState(() => getCacheSize());
  const [defaultPage, setDefaultPage] = useState(() =>
    validPage(loadSettings().defaultPage),
  );
  const [pageSaved, setPageSaved] = useState(false);
  const [status, setStatus] = useState(null);

  const onPickPage = (id) => {
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

  const onPickFont = (id) => {
    setStatus(null);
    const ok = prefs.setFontSize(id);
    setFontSaved(ok);
    if (!ok) Alert.alert(S.title, S.fontSizeError);
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
      setDefaultPage(validPage(prefs.reset().defaultPage));
      setPageSaved(false);
      setFontSaved(false);
      setStatus(S.resetDone);
    } catch {
      setStatus(S.resetError);
    }
  };

  return (
    <View>
      <View className={cls.setItem}>
        <View className={cls.setHead}>
          <MaterialCommunityIcons name="update" size={16} color={colors.gold} />
          <Text className={cls.setTitle}>{S.updateTitle}</Text>
        </View>
        <View className={cls.setRow}>
          <Text className={cls.setValue} numberOfLines={1}>
            {S.currentVersion}
            <Text className={cls.setBold}>v{APP_VERSION}</Text>
          </Text>
          <Pressable
            className={cls.setBtn}
            onPress={onCheckUpdate}
            accessibilityRole="button"
            accessibilityLabel={S.checkUpdate}
          >
            <MaterialCommunityIcons
              name="update"
              size={18}
              color={mix("goldenrod", 0.15)}
            />
          </Pressable>
        </View>
        <Text className={cls.setHint}>{S.autoCheck}</Text>
      </View>

      <Picker
        icon="home-outline"
        title={S.defaultPageTitle}
        options={PAGE_OPTIONS}
        value={defaultPage}
        onPick={onPickPage}
        saved={pageSaved}
        savedText={S.defaultPageSaved}
        hint={S.defaultPageHint}
      />

      <Picker
        icon="format-size"
        title={S.fontSizeTitle}
        options={FONT_OPTIONS}
        value={prefs.fontSize}
        onPick={onPickFont}
        saved={fontSaved}
        savedText={S.fontSizeSaved}
        hint={S.fontSizeHint}
      />

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
            {"\n"}
            {S.resetPageHint}
          </Text>
        )}
      </View>
    </View>
  );
}
