import { Modal, Pressable, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import { styles } from "../styles";

export function ConfirmDialog({
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
                color={mix("goldenrod", 0.15)}
              />
              <Text style={styles.confirmBtnText}>{confirmText}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
