import React, { createContext, useContext, useState } from "react";
import { View, Text, Pressable, Linking, Image, Modal } from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";

export { mix } from "../theme";

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

export function P({ children, className }) {
  return <Text className={className ?? s.para}>{children}</Text>;
}

export function B({ children }) {
  return <Text className={s.bold}>{children}</Text>;
}

export function I({ children }) {
  return <Text className={s.italic}>{children}</Text>;
}

export function Code({ children }) {
  return <Text className={s.code}>{children}</Text>;
}

export function Lines({ children }) {
  return <>{children}</>;
}

export function Hint({ children }) {
  return <P>{children}</P>;
}

export function Shots({ children }) {
  return <>{children}</>;
}

export function IconShot({ children }) {
  return <View className={s.iconShot}>{children}</View>;
}

export function ChapterList({ items }) {
  return <Steps items={items} />;
}

export const NavContext = createContext(null);

export function PageLink({ to, children }) {
  const navigate = useContext(NavContext);
  return (
    <Text className={s.link} onPress={() => navigate?.(to)}>
      {children}
    </Text>
  );
}

export function A({ href, children }) {
  return (
    <Text className={s.link} onPress={() => openUrl(href)}>
      {children || href}
    </Text>
  );
}

export function Section({ title, children }) {
  return (
    <View className={s.section}>
      {title ? <Text className={s.sectionTitle}>{title}</Text> : null}
      {children}
    </View>
  );
}

export function Quote({ children }) {
  return (
    <View className={s.quote}>
      <P className={s.quoteText}>{children}</P>
    </View>
  );
}

export function Note({ title = "Lưu ý", children }) {
  return (
    <View className={s.note}>
      <View className={s.noteHead}>
        <MaterialCommunityIcons
          name="information-outline"
          size={14}
          color={colors.gold}
        />
        <Text className={s.noteTitle}>{title}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
}

export function Formula({ children }) {
  return (
    <View className={s.formula}>
      <Text className={s.formulaText}>{children}</Text>
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
        <Text className={s.linkDesc}>{desc}</Text>
      ) : (
        <View>{desc}</View>
      );
  }
  return (
    <View className={s.linkRow}>
      <View className={s.linkInfo}>
        <Text className={s.linkLabel}>{label}</Text>
        {descNode}
        <Text className={s.linkUrl} numberOfLines={1}>
          {url}
        </Text>
      </View>
      <View className={s.linkBtns}>
        <Pressable
          className={copied ? s.iconBtnOn : s.iconBtn}
          onPress={onCopy}
          hitSlop={6}
        >
          <MaterialCommunityIcons
            name={copied ? "check" : "content-copy"}
            size={15}
            color={copied ? colors.green : colors.gold}
          />
        </Pressable>
        <Pressable className={s.openBtn} onPress={() => openUrl(url)}>
          <Text className={s.openBtnText}>{buttonText}</Text>
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
    <View className={s.steps}>
      {title ? <Text className={s.stepsTitle}>{title}</Text> : null}
      {items.map((it, i) => (
        <View className={s.step} key={typeof it === "string" ? it : it.key}>
          <View className={s.stepNum}>
            <Text className={s.stepNumText}>{i + 1}</Text>
          </View>
          <View className={s.stepBody}>
            {typeof it === "string" ? <P>{it}</P> : it}
          </View>
        </View>
      ))}
    </View>
  );
}

export function SysReq({ items }) {
  return (
    <View className={s.sysreq}>
      {items.map((it) => (
        <View className={s.sysreqRow} key={it.label}>
          <Text className={s.sysreqLabel}>{it.label}</Text>
          <Text className={s.sysreqValue}>{it.value}</Text>
        </View>
      ))}
    </View>
  );
}

function shotSize(boxW, ratio) {
  return boxW
    ? { width: boxW, height: boxW / ratio }
    : { width: "100%", aspectRatio: ratio };
}

function imageRatio(e) {
  const src = e?.nativeEvent?.source;
  return src?.width && src?.height ? src.width / src.height : null;
}

const SHOT = {
  grid: { wrap: "shotGridItem", img: "shotImgGrid", cap: "shotCapGrid" },
  single: { wrap: "shot", img: "shotImg", cap: "shotCap" },
};

export function Screenshot({ src, caption, grid }) {
  const v = SHOT[grid ? "grid" : "single"];
  const [zoom, setZoom] = useState(false);
  const [ratio, setRatio] = useState(16 / 9);
  const [boxW, setBoxW] = useState(0);
  return (
    <View
      className={s[v.wrap]}
      onLayout={grid ? undefined : (e) => setBoxW(e.nativeEvent.layout.width)}
    >
      <Pressable onPress={() => setZoom(true)}>
        <Image
          source={src}
          className={s[v.img]}
          style={grid ? undefined : shotSize(boxW, ratio)}
          resizeMode={grid ? "cover" : "contain"}
          onLoad={(e) => {
            const next = grid ? null : imageRatio(e);
            if (next) setRatio(next);
          }}
        />
      </Pressable>
      {caption ? (
        <Text className={s[v.cap]} numberOfLines={grid ? 3 : undefined}>
          {caption}
        </Text>
      ) : null}
      <Modal
        visible={zoom}
        transparent
        animationType="fade"
        onRequestClose={() => setZoom(false)}
      >
        <View className={s.lightbox}>
          <Pressable
            className="absolute inset-0"
            onPress={() => setZoom(false)}
          />
          <View className={s.lightboxFrame}>
            <Image
              source={src}
              className={s.lightboxImg}
              resizeMode="contain"
            />
            {caption ? <Text className={s.lightboxCap}>{caption}</Text> : null}
            <Pressable
              className={s.lightboxClose}
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
  return <View className={s.shotGrid}>{items}</View>;
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
    <Pressable
      className={copied ? s.cheatCodeOn : s.cheatCode}
      onPress={onCopy}
    >
      <Text className={s.cheatCodeText}>{code}</Text>
      <MaterialCommunityIcons
        name={copied ? "check" : "content-copy"}
        size={11}
        color={copied ? colors.green : colors.muted}
      />
    </Pressable>
  );
}

function CheatCell({ value }) {
  if (!value) return <Text className={s.cheatNone}>-</Text>;
  const { code, note } = typeof value === "string" ? { code: value } : value;
  return (
    <View className={s.cheatCell}>
      <CheatCode code={code} />
      {note ? <Text className={s.cheatCellNote}>{note}</Text> : null}
    </View>
  );
}

export function CheatTable({ rows }) {
  return (
    <View className={s.cheatTable}>
      {rows.map((r, i) => (
        <View
          className={i % 2 === 1 ? s.cheatRowAlt : s.cheatRow}
          key={r.effect}
        >
          <View className={s.cheatCodes}>
            <CheatCell value={r.complete} />
            <CheatCell value={r.wog} />
            <CheatCell value={r.vcmi} />
          </View>
          <Text className={s.cheatEffect}>{r.effect}</Text>
        </View>
      ))}
    </View>
  );
}

function KeyCombo({ keys }) {
  const parts = keys.split(/( [+/] )/);
  const starts = parts.map((_, i) => parts.slice(0, i).join("").length);
  return (
    <View className={s.kbdCombo}>
      {parts.map((p, i) => {
        const key = `${starts[i]}-${p}`;
        const sep = p.trim();
        if (sep === "+" || sep === "/")
          return (
            <Text key={key} className={s.kbdSep}>
              {sep}
            </Text>
          );
        return (
          <View key={key} className={s.kbd}>
            <Text className={s.kbdText}>{sep}</Text>
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
        <View className={s.kbGroup} key={g.section}>
          <Text className={s.kbSection}>{g.section}</Text>
          {g.rows.map(([keys, fn], i) => (
            <View
              className={i % 2 === 1 ? s.kbRowAlt : s.kbRow}
              key={keys + fn}
            >
              <View className={s.kbKeys}>
                <KeyCombo keys={keys} />
              </View>
              <Text className={s.kbFn}>{fn}</Text>
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
          <View className={s.faqItem} key={it.q}>
            <Pressable
              className={s.faqQ}
              onPress={() => setOpen(isOpen ? null : i)}
            >
              <Text className={s.faqQText}>{it.q}</Text>
              <MaterialCommunityIcons
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={18}
                color={colors.gold}
              />
            </Pressable>
            {isOpen ? <View className={s.faqA}>{it.a}</View> : null}
          </View>
        );
      })}
    </View>
  );
}

const s = {
  para: "text-fg text-[14.5px] leading-5.5 font-roboto",
  bold: "text-fg font-roboto-bold",
  italic: "font-roboto-italic",
  iconShot: "w-55 self-center",
  code: "font-mono text-gold-bright bg-gold/12 text-[13px]",
  link: "text-gold-bright underline font-roboto",
  section: "mt-4.5",
  sectionTitle:
    "text-gold text-[16px] mb-2.5 border-l-3 border-l-gold pl-2.5 font-roboto-bold",
  quote: "border-l-3 border-l-gold bg-gold/8 p-3 rounded-sm mt-2",
  quoteText: "text-fg text-[14.5px] leading-5.5 font-roboto-italic",
  note: "bg-gold/6 border border-line rounded-md p-3 mt-3",
  noteHead: "flex-row items-center mb-1.5",
  noteTitle: "text-gold ml-1.5 text-[14px] font-roboto-bold",
  formula: "items-center py-3 mt-2",
  formulaText: "text-gold-bright text-[17px] text-center font-roman",
  linkRow: "bg-panel border border-line rounded-md p-3 mb-2.5",
  linkInfo: "mb-2.5",
  linkLabel: "text-fg text-[15px] font-roboto-bold",
  linkDesc: "text-muted text-[13.5px] leading-5 mt-1 font-roboto",
  linkUrl: "text-gold text-[12px] mt-1.5 opacity-80 font-roboto",
  linkBtns: "flex-row items-center gap-2",
  iconBtn:
    "w-9.5 h-9.5 rounded-sm border border-line items-center justify-center bg-panel2",
  iconBtnOn:
    "w-9.5 h-9.5 rounded-sm border border-ok items-center justify-center bg-panel2",
  openBtn:
    "flex-1 flex-row items-center justify-center gap-1.5 h-9.5 rounded-sm bg-gold-bright",
  openBtnText: "text-ink text-[14px] font-roboto-bold",
  steps: "mt-1.5",
  stepsTitle: "text-fg mb-2 text-[14.5px] font-roboto-bold",
  step: "flex-row mb-2.5",
  stepNum:
    "w-6 h-6 rounded-xl bg-gold/14 items-center justify-center mr-2.5 mt-px",
  stepNumText: "text-gold-bright text-[12px] font-roboto-bold",
  stepBody: "flex-1",
  sysreq: "border border-line rounded-md overflow-hidden",
  sysreqRow: "flex-row border-b border-b-line",
  sysreqLabel:
    "w-27.5 text-muted text-[13.5px] p-2.5 bg-gold/8 font-roboto-bold",
  sysreqValue: "flex-1 text-fg text-[13.5px] p-2.5 font-roboto",
  shotGrid: "flex-row flex-wrap justify-center",
  shotGridItem: "mb-3 w-[48.5%] mx-[0.75%]",
  shot: "mb-3",
  shotImg: "w-full rounded-md border border-line",
  shotImgGrid: "w-full h-37.5 rounded-md border border-line",
  shotCap: "text-muted text-[12.5px] leading-4 mt-1.5 text-center font-roboto",
  shotCapGrid:
    "text-muted text-[12.5px] leading-4 mt-1.5 text-center font-roboto h-12",
  lightbox: "flex-1 bg-black/85 items-center justify-center",
  lightboxFrame: "w-[92%] h-[75%] items-center justify-center",
  lightboxImg: "w-full flex-1 border border-gold rounded-md",
  lightboxCap: "text-fg text-[13px] text-center mt-2.5 font-roboto",
  lightboxClose:
    "absolute -top-4 -right-2 w-9 h-9 rounded-[18px] border border-gold bg-panel items-center justify-center",
  cheatTable: "border border-line rounded-md overflow-hidden",
  cheatRow: "flex-row p-2 items-center",
  cheatRowAlt: "flex-row p-2 items-center bg-white/2",
  cheatCodes: "w-37.5 gap-1",
  cheatCell: "flex-row items-center flex-wrap gap-1",
  cheatCode:
    "flex-row items-center gap-1 bg-gold/10 rounded-[5px] px-1.5 py-0.75 self-start",
  cheatCodeOn:
    "flex-row items-center gap-1 bg-ok/18 rounded-[5px] px-1.5 py-0.75 self-start",
  cheatCodeText: "font-mono text-gold-bright text-[11.5px]",
  cheatNone: "text-muted font-roboto",
  cheatCellNote: "text-muted text-[10px] font-roboto-italic",
  cheatEffect: "flex-1 text-fg text-[12.5px] pl-2.5 leading-4.5 font-roboto",
  kbGroup: "mb-4",
  kbSection:
    "text-gold text-[14px] mb-2 bg-gold/8 p-2 rounded-sm font-roboto-bold",
  kbRow: "flex-row py-1.75 px-1 items-center",
  kbKeys: "w-32.5 flex-row flex-wrap items-center",
  kbFn: "flex-1 text-fg text-[13px] leading-4.5 pl-2 font-roboto",
  kbdCombo: "flex-row flex-wrap items-center gap-0.75",
  kbd: "bg-panel2 border border-line rounded-[4px] px-1.25 py-0.5",
  kbdText: "text-gold-bright text-[11px] font-mono",
  kbdSep: "text-muted text-[11px] mx-px font-roboto",
  faqItem: "border border-line rounded-md mb-2 overflow-hidden bg-panel",
  faqQ: "flex-row items-center justify-between p-3.5 gap-2.5",
  faqQText: "flex-1 text-fg text-[14.5px] leading-5 font-roboto-bold",
  faqA: "p-3.5 pt-1 border-t border-t-line gap-2",
  kbRowAlt: "flex-row py-1.75 px-1 items-center bg-white/2",
};
