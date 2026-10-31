import { useState, useEffect, useMemo } from "react";
import { Animated, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme";
import { styles } from "../styles";

export function ScrollButtons({
  scrollRef,
  page,
  canUp,
  canDown,
  bottom,
  open,
  setOpen,
  frameRef,
}) {
  const [anim] = useState(() => new Animated.Value(0));

  useEffect(() => setOpen(false), [page, setOpen]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [open, anim]);

  const smallStyle = useMemo(
    () => ({
      opacity: anim,
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 0],
          }),
        },
        {
          scale: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
      ],
    }),
    [anim],
  );
  const rotate = useMemo(
    () =>
      anim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
      }),
    [anim],
  );

  return (
    <View
      style={[styles.scrollMenu, { bottom: 14 + bottom }]}
      pointerEvents="box-none"
      onLayout={(e) => {
        frameRef.current = e.nativeEvent.layout;
      }}
    >
      <Animated.View style={smallStyle} pointerEvents={open ? "auto" : "none"}>
        <Pressable
          style={[
            styles.scrollBtn,
            styles.scrollBtnSm,
            !canUp && styles.scrollBtnOff,
          ]}
          accessibilityLabel="Lên đầu trang"
          disabled={!canUp}
          onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
        >
          <MaterialCommunityIcons
            name="arrow-up"
            size={18}
            color={colors.goldBright}
          />
        </Pressable>
      </Animated.View>
      <Animated.View style={smallStyle} pointerEvents={open ? "auto" : "none"}>
        <Pressable
          style={[
            styles.scrollBtn,
            styles.scrollBtnSm,
            !canDown && styles.scrollBtnOff,
          ]}
          accessibilityLabel="Xuống cuối trang"
          disabled={!canDown}
          onPress={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          <MaterialCommunityIcons
            name="arrow-down"
            size={18}
            color={colors.goldBright}
          />
        </Pressable>
      </Animated.View>
      <Pressable
        style={[styles.scrollBtn, open && styles.scrollBtnOpen]}
        accessibilityLabel="Menu cuộn trang"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((o) => !o)}
      >
        <Animated.View style={{ transform: [{ rotate }] }}>
          <MaterialCommunityIcons
            name="unfold-more-horizontal"
            size={20}
            color={colors.goldBright}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}
