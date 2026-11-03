import { Modal, Pressable, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import { cls } from "../styles";

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
      <Pressable className={cls.confirmBackdrop} onPress={onCancel}>
        <Pressable className={cls.confirmBox} onPress={() => {}}>
          <View className={cls.confirmHead}>
            {icon || (
              <MaterialCommunityIcons
                name="open-in-new"
                size={18}
                color={colors.gold}
              />
            )}
            <Text className={cls.confirmTitle}>{title}</Text>
          </View>
          <View className={cls.confirmBody}>{message}</View>
          <View className={cls.confirmActions}>
            <Pressable className={cls.confirmGhost} onPress={onCancel}>
              <Text className={cls.confirmGhostText}>{cancelText}</Text>
            </Pressable>
            <Pressable className={cls.confirmBtn} onPress={onConfirm}>
              <MaterialCommunityIcons
                name="open-in-new"
                size={14}
                color={mix("goldenrod", 0.15)}
              />
              <Text className={cls.confirmBtnText}>{confirmText}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
