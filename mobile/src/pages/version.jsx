import { View, Image, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme";
import { openUrl } from "../components/ui";
import { versionIcons } from "../data/versions";
import { CHANGELOG_URLS } from "../data/links";
import { ModLatest } from "../components/ModLatest";
import { styles } from "../styles";

export function VersionScreen({ version }) {
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
