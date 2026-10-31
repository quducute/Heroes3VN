import { useState } from "react";
import { Alert, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import { getCacheSize, clearCache } from "../lib/cache";
import { formatBytes } from "../lib/format";
import { loadSettings, saveSettings, resetSettings } from "../lib/settings";
import { APP_VERSION } from "../lib/version";
import { PAGE_OPTIONS, validPage } from "./index";
import { styles } from "../styles";

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
            <MaterialCommunityIcons
              name="update"
              size={14}
              color={mix("goldenrod", 0.15)}
            />
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
              color={mix("goldenrod", 0.15)}
            />
            <Text style={styles.setBtnText}>Xoá cache</Text>
          </Pressable>
          <Pressable
            style={[styles.setBtn, styles.setBtnFlex]}
            onPress={onReset}
          >
            <MaterialCommunityIcons
              name="restore"
              size={14}
              color={mix("goldenrod", 0.15)}
            />
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
