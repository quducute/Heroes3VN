import { useState, useEffect, useMemo, useContext } from "react";
import { Animated, View, Pressable, Platform, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../theme";
import { cls, shadow } from "../styles";
import { NavContext } from "./ui";
import pandora from "@shared/assets/icons/pandora.webp";

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
  const navigate = useContext(NavContext);
  const [anim] = useState(() => new Animated.Value(0));

  useEffect(() => setOpen(false), [page, setOpen]);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: Platform.OS !== "web",
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
      className={cls.scrollMenu}
      style={{ bottom: 14 + bottom }}
      pointerEvents="box-none"
      onLayout={(e) => {
        frameRef.current = e.nativeEvent.layout;
      }}
    >
      <Animated.View style={smallStyle} pointerEvents={open ? "auto" : "none"}>
        <Pressable
          className={canUp ? cls.scrollBtnSm : cls.scrollBtnOff}
          style={shadow}
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
          className={canDown ? cls.scrollBtnSm : cls.scrollBtnOff}
          style={shadow}
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
        className={open ? cls.scrollBtnOpen : cls.scrollBtn}
        style={shadow}
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
      <Pressable
        className={cls.scrollBtn}
        style={shadow}
        accessibilityLabel="Hộp Pandora"
        onPress={() => navigate("secret")}
      >
        <Image className="w-7 h-7" source={pandora} />
      </Pressable>
    </View>
  );
}
