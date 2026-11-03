import { View, Image, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme";
import { openUrl } from "../components/ui";
import { CHANGELOG_URLS } from "@shared/data/links.js";
import { ModLatest } from "../components/ModLatest";
import { cls } from "../styles";

export function VersionScreen({ version }) {
  return (
    <View>
      <View className={cls.vHead} style={{ borderColor: version.accent }}>
        <Image source={version.icon} className={cls.vIcon} />
        <View className="flex-1 min-w-0">
          <Text className={cls.vName}>{version.name}</Text>
          <Text className={cls.vSub}>{version.subtitle}</Text>
        </View>
      </View>
      <View className={cls.vMeta}>
        <ModLatest id={version.id} />
        {CHANGELOG_URLS[version.id] ? (
          <Pressable
            className={cls.changelogBtn}
            onPress={() => openUrl(CHANGELOG_URLS[version.id])}
          >
            <MaterialCommunityIcons
              name="text-box-outline"
              size={13}
              color={colors.goldBright}
            />
            <Text className={cls.changelogBtnText}>Changelog</Text>
          </Pressable>
        ) : null}
      </View>
      {version.content}
    </View>
  );
}
