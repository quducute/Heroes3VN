import React, { createContext, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Image,
  Modal,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { alpha, colors, fonts, mix, radius } from "../theme";

export function openUrl(url) {
  Linking.openURL(url).catch(() => {});
}

export async function copyText(text) {
  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch {
    return false;
  }
}

export function P({ children, style }) {
  return <Text style={[s.para, style]}>{children}</Text>;
}

export function B({ children }) {
  return <Text style={s.bold}>{children}</Text>;
}

export function Code({ children }) {
  return <Text style={s.code}>{children}</Text>;
}

export const NavContext = createContext(null);

export function PageLink({ to, children }) {
  const navigate = useContext(NavContext);
  return (
    <Text style={s.link} onPress={() => navigate?.(to)}>
      {children}
    </Text>
  );
}

export function A({ href, children }) {
  return (
    <Text style={s.link} onPress={() => openUrl(href)}>
      {children || href}
    </Text>
  );
}

export function Section({ title, children }) {
  return (
    <View style={s.section}>
      {title ? <Text style={s.sectionTitle}>{title}</Text> : null}
      {children}
    </View>
  );
}

export function Quote({ children }) {
  return (
    <View style={s.quote}>
      <P style={s.quoteText}>{children}</P>
    </View>
  );
}

export function Note({ title = "Lưu ý", children }) {
  return (
    <View style={s.note}>
      <View style={s.noteHead}>
        <MaterialCommunityIcons
          name="information-outline"
          size={14}
          color={colors.gold}
        />
        <Text style={s.noteTitle}>{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
}

export function Formula({ children }) {
  return (
    <View style={s.formula}>
      <Text style={s.formulaText}>{children}</Text>
    </View>
  );
}

export function LinkRow({ label, url, desc, buttonText = "Mở link" }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };
  let descNode = null;
  if (desc) {
    descNode =
      typeof desc === "string" ? (
        <Text style={s.linkDesc}>{desc}</Text>
      ) : (
        <View>{desc}</View>
      );
  }
  return (
    <View style={s.linkRow}>
      <View style={s.linkInfo}>
        <Text style={s.linkLabel}>{label}</Text>
        {descNode}
        <Text style={s.linkUrl} numberOfLines={1}>
          {url}
        </Text>
      </View>
      <View style={s.linkBtns}>
        <Pressable
          style={[s.iconBtn, copied && s.iconBtnOn]}
          onPress={onCopy}
          hitSlop={6}
        >
          <MaterialCommunityIcons
            name={copied ? "check" : "content-copy"}
            size={15}
            color={copied ? colors.green : colors.gold}
          />
        </Pressable>
        <Pressable style={s.openBtn} onPress={() => openUrl(url)}>
          <Text style={s.openBtnText}>{buttonText}</Text>
          <MaterialCommunityIcons
            name="open-in-new"
            size={13}
            color={mix("goldenrod", 0.15)}
          />
        </Pressable>
      </View>
    </View>
  );
}

export function Steps({ title, items }) {
  return (
    <View style={s.steps}>
      {title ? <Text style={s.stepsTitle}>{title}</Text> : null}
      {items.map((it, i) => (
        <View style={s.step} key={typeof it === "string" ? it : it.key}>
          <View style={s.stepNum}>
            <Text style={s.stepNumText}>{i + 1}</Text>
          </View>
          <View style={s.stepBody}>
            {typeof it === "string" ? <P>{it}</P> : it}
          </View>
        </View>
      ))}
    </View>
  );
}

export function SysReq({ items }) {
  return (
    <View style={s.sysreq}>
      {items.map((it) => (
        <View style={s.sysreqRow} key={it.label}>
          <Text style={s.sysreqLabel}>{it.label}</Text>
          <Text style={s.sysreqValue}>{it.value}</Text>
        </View>
      ))}
    </View>
  );
}

function shotImageStyle(grid, boxW, ratio) {
  if (grid) return [s.shotImgGrid];
  const size = boxW
    ? { width: boxW, height: boxW / ratio }
    : { width: "100%", aspectRatio: ratio };
  return [s.shotImg, size];
}

function imageRatio(e) {
  const src = e?.nativeEvent?.source;
  return src?.width && src?.height ? src.width / src.height : null;
}

export function Screenshot({ source, caption, grid }) {
  const [zoom, setZoom] = useState(false);
  const [ratio, setRatio] = useState(16 / 9);
  const [boxW, setBoxW] = useState(0);
  return (
    <View
      style={[s.shot, grid && s.shotGridItem]}
      onLayout={grid ? undefined : (e) => setBoxW(e.nativeEvent.layout.width)}
    >
      <Pressable onPress={() => setZoom(true)}>
        <Image
          source={source}
          style={shotImageStyle(grid, boxW, ratio)}
          resizeMode={grid ? "cover" : "contain"}
          onLoad={(e) => {
            const next = grid ? null : imageRatio(e);
            if (next) setRatio(next);
          }}
        />
      </Pressable>
      {caption ? (
        <Text
          style={[s.shotCap, grid && s.shotCapGrid]}
          numberOfLines={grid ? 3 : undefined}
        >
          {caption}
        </Text>
      ) : null}
      <Modal
        visible={zoom}
        transparent
        animationType="fade"
        onRequestClose={() => setZoom(false)}
      >
        <View style={s.lightbox}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setZoom(false)}
          />
          <View style={s.lightboxFrame}>
            <Image source={source} style={s.lightboxImg} resizeMode="contain" />
            {caption ? <Text style={s.lightboxCap}>{caption}</Text> : null}
            <Pressable
              style={s.lightboxClose}
              onPress={() => setZoom(false)}
              hitSlop={10}
            >
              <MaterialCommunityIcons
                name="close"
                size={20}
                color={colors.goldBright}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export function ShotGrid({ children }) {
  const items = React.Children.toArray(children).map((child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { grid: true })
      : child,
  );
  return <View style={s.shotGrid}>{items}</View>;
}

function CheatCode({ code }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    if (await copyText(code)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  };
  return (
    <Pressable style={[s.cheatCode, copied && s.cheatCodeOn]} onPress={onCopy}>
      <Text style={s.cheatCodeText}>{code}</Text>
      <MaterialCommunityIcons
        name={copied ? "check" : "content-copy"}
        size={11}
        color={copied ? colors.green : colors.muted}
      />
    </Pressable>
  );
}

function CheatCell({ value }) {
  if (!value) return <Text style={s.cheatNone}>-</Text>;
  const { code, note } = typeof value === "string" ? { code: value } : value;
  return (
    <View style={s.cheatCell}>
      <CheatCode code={code} />
      {note ? <Text style={s.cheatCellNote}>{note}</Text> : null}
    </View>
  );
}

export function CheatTable({ rows }) {
  return (
    <View style={s.cheatTable}>
      {rows.map((r, i) => (
        <View style={[s.cheatRow, i % 2 === 1 && s.cheatRowAlt]} key={r.effect}>
          <View style={s.cheatCodes}>
            <CheatCell value={r.complete} />
            <CheatCell value={r.wog} />
            <CheatCell value={r.vcmi} />
          </View>
          <Text style={s.cheatEffect}>{r.effect}</Text>
        </View>
      ))}
    </View>
  );
}

function KeyCombo({ keys }) {
  const parts = keys.split(/( [+/] )/);
  const starts = parts.map((_, i) => parts.slice(0, i).join("").length);
  return (
    <View style={s.kbdCombo}>
      {parts.map((p, i) => {
        const key = `${starts[i]}-${p}`;
        const sep = p.trim();
        if (sep === "+" || sep === "/")
          return (
            <Text key={key} style={s.kbdSep}>
              {sep}
            </Text>
          );
        return (
          <View key={key} style={s.kbd}>
            <Text style={s.kbdText}>{sep}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function KeybindsTable({ groups }) {
  return (
    <View>
      {groups.map((g) => (
        <View style={s.kbGroup} key={g.section}>
          <Text style={s.kbSection}>{g.section}</Text>
          {g.rows.map(([keys, fn], i) => (
            <View
              style={[s.kbRow, i % 2 === 1 && s.cheatRowAlt]}
              key={keys + fn}
            >
              <View style={s.kbKeys}>
                <KeyCombo keys={keys} />
              </View>
              <Text style={s.kbFn}>{fn}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export function Faq({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <View>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <View style={s.faqItem} key={it.q}>
            <Pressable
              style={s.faqQ}
              onPress={() => setOpen(isOpen ? null : i)}
            >
              <Text style={s.faqQText}>{it.q}</Text>
              <MaterialCommunityIcons
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.gold}
              />
            </Pressable>
            {isOpen ? <View style={s.faqA}>{it.a}</View> : null}
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  para: {
    color: colors.text,
    fontSize: 14.5,
    lineHeight: 22,
    fontFamily: fonts.regular,
  },
  bold: { color: colors.text, fontFamily: fonts.bold },
  code: {
    fontFamily: "monospace",
    color: colors.goldBright,
    backgroundColor: alpha("goldenrod", 0.12),
    fontSize: 13,
  },
  link: {
    color: colors.goldBright,
    textDecorationLine: "underline",
    fontFamily: fonts.regular,
  },

  section: { marginTop: 18 },
  sectionTitle: {
    color: colors.gold,
    fontSize: 16,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
    paddingLeft: 10,
    fontFamily: fonts.bold,
  },

  quote: {
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
    backgroundColor: colors.goldSoft,
    padding: 12,
    borderRadius: radius.sm,
    marginTop: 8,
  },
  quoteText: { color: colors.text, fontFamily: fonts.italic },

  note: {
    backgroundColor: alpha("goldenrod", 0.06),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    marginTop: 12,
  },
  noteHead: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  noteTitle: {
    color: colors.gold,
    marginLeft: 6,
    fontSize: 14,
    fontFamily: fonts.bold,
  },

  formula: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 8,
  },
  formulaText: {
    color: colors.goldBright,
    fontSize: 17,
    textAlign: "center",
    fontFamily: fonts.title,
  },

  linkRow: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: 12,
    marginBottom: 10,
  },
  linkInfo: { marginBottom: 10 },
  linkLabel: { color: colors.text, fontSize: 15, fontFamily: fonts.bold },
  linkDesc: {
    color: colors.muted,
    fontSize: 13.5,
    lineHeight: 20,
    marginTop: 4,
    fontFamily: fonts.regular,
  },
  linkUrl: {
    color: colors.gold,
    fontSize: 12,
    marginTop: 6,
    opacity: 0.8,
    fontFamily: fonts.regular,
  },
  linkBtns: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.panel2,
  },
  iconBtnOn: { borderColor: colors.green },
  openBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.goldBright,
  },
  openBtnText: {
    color: mix("goldenrod", 0.15),
    fontSize: 14,
    fontFamily: fonts.bold,
  },

  steps: { marginTop: 6 },
  stepsTitle: {
    color: colors.text,
    marginBottom: 8,
    fontSize: 14.5,
    fontFamily: fonts.bold,
  },
  step: { flexDirection: "row", marginBottom: 10 },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.goldSoft2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },
  stepNumText: {
    color: colors.goldBright,
    fontSize: 12,
    fontFamily: fonts.bold,
  },
  stepBody: { flex: 1 },

  sysreq: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  sysreqRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sysreqLabel: {
    width: 110,
    color: colors.muted,
    fontSize: 13.5,
    padding: 10,
    backgroundColor: colors.goldSoft,
    fontFamily: fonts.bold,
  },
  sysreqValue: {
    flex: 1,
    color: colors.text,
    fontSize: 13.5,
    padding: 10,
    fontFamily: fonts.regular,
  },

  shotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  shotGridItem: { width: "48.5%", marginHorizontal: "0.75%" },
  shot: { marginBottom: 12 },
  shotImg: {
    width: "100%",
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shotImgGrid: {
    width: "100%",
    height: 150,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  shotCap: {
    color: colors.muted,
    fontSize: 12.5,
    lineHeight: 16,
    marginTop: 6,
    textAlign: "center",
    fontFamily: fonts.regular,
  },
  shotCapGrid: { height: 48 },
  lightbox: {
    flex: 1,
    backgroundColor: alpha("black", 0.85),
    alignItems: "center",
    justifyContent: "center",
  },
  lightboxFrame: {
    width: "92%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
  },
  lightboxImg: {
    width: "100%",
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: radius.md,
  },
  lightboxCap: {
    color: colors.text,
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    fontFamily: fonts.regular,
  },
  lightboxClose: {
    position: "absolute",
    top: -16,
    right: -8,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: colors.panel,
    alignItems: "center",
    justifyContent: "center",
  },

  cheatTable: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  cheatRow: { flexDirection: "row", padding: 8, alignItems: "center" },
  cheatRowAlt: { backgroundColor: alpha("white", 0.02) },
  cheatCodes: { width: 150, gap: 4 },
  cheatCell: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
  cheatCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: alpha("goldenrod", 0.1),
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  cheatCodeOn: { backgroundColor: alpha("limegreen", 0.18) },
  cheatCodeText: {
    fontFamily: "monospace",
    color: colors.goldBright,
    fontSize: 11.5,
  },
  cheatNone: { color: colors.muted, fontFamily: fonts.regular },
  cheatCellNote: {
    color: colors.muted,
    fontSize: 10,
    fontFamily: fonts.italic,
  },
  cheatEffect: {
    flex: 1,
    color: colors.text,
    fontSize: 12.5,
    paddingLeft: 10,
    lineHeight: 18,
    fontFamily: fonts.regular,
  },

  kbGroup: { marginBottom: 16 },
  kbSection: {
    color: colors.gold,
    fontSize: 14,
    marginBottom: 8,
    backgroundColor: colors.goldSoft,
    padding: 8,
    borderRadius: radius.sm,
    fontFamily: fonts.bold,
  },
  kbRow: {
    flexDirection: "row",
    paddingVertical: 7,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  kbKeys: {
    width: 130,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  kbFn: {
    flex: 1,
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    paddingLeft: 8,
    fontFamily: fonts.regular,
  },
  kbdCombo: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 3,
  },
  kbd: {
    backgroundColor: colors.panel2,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  kbdText: { color: colors.goldBright, fontSize: 11, fontFamily: "monospace" },
  kbdSep: {
    color: colors.muted,
    fontSize: 11,
    marginHorizontal: 1,
    fontFamily: fonts.regular,
  },

  faqItem: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    marginBottom: 8,
    overflow: "hidden",
    backgroundColor: colors.panel,
  },
  faqQ: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    gap: 10,
  },
  faqQText: {
    flex: 1,
    color: colors.text,
    fontSize: 14.5,
    lineHeight: 20,
    fontFamily: fonts.bold,
  },
  faqA: {
    padding: 14,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
});
