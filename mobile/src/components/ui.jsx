import React, { createContext, useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Linking,
  Image,
  Modal,
  TextInput,
  Share,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, mix } from "../theme";
import {
  filterCheats,
  filterFaq,
  filterKeybinds,
  SEARCH_EMPTY,
} from "@shared/lib/search.js";
import { useCopy } from "@shared/lib/useCopy.js";
import { keyParts } from "@shared/lib/keys.js";
import {
  PINNED_SECTION,
  cheatPin,
  countPinned,
  keybindPin,
  pinFirst,
  pinKeybinds,
} from "@shared/lib/pins.js";
import { usePrefs } from "./prefs";
import { sectionAnchor } from "@shared/lib/anchor.js";
import { ConfirmDialog } from "./ConfirmDialog";

export { mix } from "../theme";

export function openUrl(url) {
  Linking.openURL(url).catch(() => {});
}

const useClipboard = (ms) => useCopy(ms, Clipboard.setStringAsync);

export function CopyButton({ text, compact }) {
  const [copied, copy] = useClipboard();
  const on = compact ? s.iconBtnOn : s.copyBtnOn;
  const off = compact ? s.iconBtn : s.copyBtn;
  return (
    <Pressable
      className={copied ? on : off}
      onPress={() => copy(text)}
      hitSlop={6}
    >
      <MaterialCommunityIcons
        name={copied ? "check" : "content-copy"}
        size={compact ? 15 : 16}
        color={copied ? colors.green : colors.gold}
      />
    </Pressable>
  );
}

export function ShareButton({ name, url }) {
  const [copied, copy] = useClipboard();
  const share = async () => {
    try {
      await Share.share({ title: name, message: url });
    } catch {
      copy(url);
    }
  };
  return (
    <Pressable
      className={s.shareBtn}
      onPress={share}
      accessibilityRole="button"
      accessibilityLabel={`Chia sẻ trang ${name}`}
    >
      <MaterialCommunityIcons
        name={copied ? "check" : "share-variant-outline"}
        size={13}
        color={copied ? colors.green : colors.goldBright}
      />
      <Text className={s.shareBtnText}>
        {copied ? "Đã copy link" : "Chia sẻ"}
      </Text>
    </Pressable>
  );
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

export function Br() {
  return "\n";
}

export function Source({ children }) {
  return <P className={s.source}>{children}</P>;
}

export function TableTitle({ children }) {
  return <Text className={s.tableTitle}>{children}</Text>;
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

export const SectionLinkContext = createContext(null);

function SectionLink({ url }) {
  const [copied, copy] = useClipboard();
  return (
    <Pressable
      className={s.sectionLink}
      onPress={() => copy(url)}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={copied ? "Đã copy link" : "Copy link mục này"}
    >
      <MaterialCommunityIcons
        name={copied ? "check" : "link-variant"}
        size={17}
        color={copied ? colors.green : colors.muted}
      />
    </Pressable>
  );
}

export function Section({ id, title, children }) {
  const linkOf = useContext(SectionLinkContext);
  const anchor = sectionAnchor(title, id);
  const url = anchor ? linkOf?.(anchor) : null;
  return (
    <View className={s.section}>
      {title ? (
        <View className={s.sectionHead}>
          <Text className={s.sectionTitle}>{title}</Text>
          {url ? <SectionLink url={url} /> : null}
        </View>
      ) : null}
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
        <CopyButton text={url} compact />
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

const SearchContext = createContext("");

export function Searchable({ placeholder, children }) {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={query}>
      <View className={s.search}>
        <MaterialCommunityIcons name="magnify" size={18} color={colors.muted} />
        <TextInput
          className={s.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />
        {query ? (
          <Pressable
            className={s.searchClear}
            onPress={() => setQuery("")}
            hitSlop={8}
          >
            <MaterialCommunityIcons
              name="close"
              size={16}
              color={colors.muted}
            />
          </Pressable>
        ) : null}
      </View>
      {children}
    </SearchContext.Provider>
  );
}

function PinButton({ id }) {
  const { pins, togglePin } = usePrefs();
  const on = pins.includes(id);
  return (
    <Pressable
      className={s.pinBtn}
      onPress={() => togglePin(id)}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={on ? "Bỏ ghim" : "Ghim lên đầu danh sách"}
      accessibilityState={{ selected: on }}
    >
      <MaterialCommunityIcons
        name={on ? "pin" : "pin-outline"}
        size={16}
        color={on ? colors.goldBright : colors.muted}
      />
    </Pressable>
  );
}

export function PinReset({ ids, prefix, unit }) {
  const { pins, unpinAll } = usePrefs();
  const [confirm, setConfirm] = useState(false);
  const count = countPinned(pins, ids);
  if (!count) return null;
  return (
    <View className={s.pinBar}>
      <View className={s.pinInfo}>
        <MaterialCommunityIcons
          name="pin"
          size={14}
          color={colors.goldBright}
        />
        <Text className={s.pinInfoText}>
          Đã ghim <Text className={s.pinCount}>{count}</Text> {unit}
        </Text>
      </View>
      <Pressable className={s.pinResetBtn} onPress={() => setConfirm(true)}>
        <MaterialCommunityIcons
          name="pin-off-outline"
          size={14}
          color={colors.gold}
        />
        <Text className={s.pinResetText}>Bỏ ghim tất cả</Text>
      </Pressable>
      <ConfirmDialog
        visible={confirm}
        title="Bỏ ghim"
        icon={
          <MaterialCommunityIcons
            name="pin-off-outline"
            size={18}
            color={colors.gold}
          />
        }
        message={
          <P>
            Bỏ ghim toàn bộ <B>{count}</B> {unit} trên trang này?
          </P>
        }
        confirmText="Bỏ ghim"
        confirmIcon="pin-off-outline"
        onConfirm={() => {
          setConfirm(false);
          unpinAll(prefix);
        }}
        onCancel={() => setConfirm(false)}
      />
    </View>
  );
}

function SearchEmpty() {
  return <Text className={s.searchEmpty}>{SEARCH_EMPTY}</Text>;
}

function CheatCode({ code }) {
  const [copied, copy] = useClipboard(1200);
  return (
    <Pressable
      className={copied ? s.cheatCodeOn : s.cheatCode}
      onPress={() => copy(code)}
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
  const { pins } = usePrefs();
  const shown = filterCheats(
    pinFirst(rows, cheatPin, pins),
    useContext(SearchContext),
  );
  return (
    <>
      <View className={s.cheatHead}>
        <Text className={s.cheatHeadCol}>
          Theo thứ tự từng dòng: [Complete/SoD, HotA, Chronicles] [ERA/WoG]
          [VCMI]
        </Text>
        <Text className={s.cheatHeadColRight}>Tác dụng</Text>
      </View>
      <View className={s.cheatTable}>
        {shown.length === 0 ? <SearchEmpty /> : null}
        {shown.map((r, i) => {
          const id = cheatPin(r);
          let row = i % 2 === 1 ? s.cheatRowAlt : s.cheatRow;
          if (pins.includes(id)) row = s.cheatRowPinned;
          return (
            <View className={row} key={r.effect}>
              <View className={s.cheatCodes}>
                <CheatCell value={r.complete} />
                <CheatCell value={r.wog} />
                <CheatCell value={r.vcmi} />
              </View>
              <Text className={s.cheatEffect}>{r.effect}</Text>
              <PinButton id={id} />
            </View>
          );
        })}
      </View>
    </>
  );
}

function KeyCombo({ keys }) {
  return (
    <View className={s.kbdCombo}>
      {keyParts(keys).map(({ key, text, sep }) => {
        if (sep)
          return (
            <Text key={key} className={s.kbdSep}>
              {text}
            </Text>
          );
        return (
          <View key={key} className={s.kbd}>
            <Text className={s.kbdText}>{text}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function KeybindsTable({ groups }) {
  const { pins } = usePrefs();
  const shown = filterKeybinds(
    pinKeybinds(groups, pins),
    useContext(SearchContext),
  );
  return (
    <View>
      {shown.length === 0 ? <SearchEmpty /> : null}
      {shown.map((g) => (
        <View className={s.kbGroup} key={g.section}>
          {g.section === PINNED_SECTION ? (
            <View className={s.kbSectionPinned}>
              <MaterialCommunityIcons
                name="pin"
                size={14}
                color={colors.gold}
              />
              <Text className={s.kbSectionPinnedText}>{g.section}</Text>
            </View>
          ) : (
            <Text className={s.kbSection}>{g.section}</Text>
          )}
          {g.rows.map((row, i) => (
            <View
              className={i % 2 === 1 ? s.kbRowAlt : s.kbRow}
              key={row[0] + row[1]}
            >
              <View className={s.kbKeys}>
                <KeyCombo keys={row[0]} />
              </View>
              <Text className={s.kbFn}>{row[1]}</Text>
              <PinButton id={keybindPin(row)} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export function Faq({ items }) {
  const [open, setOpen] = useState(null);
  const shown = filterFaq(items, useContext(SearchContext));
  return (
    <View>
      {shown.length === 0 ? <SearchEmpty /> : null}
      {shown.map((it) => {
        const isOpen = open === it.q;
        return (
          <View className={s.faqItem} key={it.q}>
            <Pressable
              className={s.faqQ}
              onPress={() => setOpen(isOpen ? null : it.q)}
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
  para: "text-fg fs-14.5 lh-5.5 font-roboto",
  bold: "text-fg font-roboto-bold",
  italic: "font-roboto-italic",
  iconShot: "w-55 self-center",
  code: "font-roboto text-gold-bright bg-gold/12 fs-13",
  link: "text-gold-bright underline font-roboto",
  section: "mt-4.5",
  sectionHead:
    "flex-row items-center gap-2 mb-2.5 border-l-3 border-l-gold pl-2.5",
  sectionTitle: "flex-1 text-gold fs-16 font-roboto-bold",
  sectionLink: "p-0.5",
  pinBtn: "pl-2 py-1",
  shareBtn:
    "flex-row items-center gap-1.5 py-1.5 px-3 rounded-full border border-line bg-panel2",
  shareBtnText: "text-gold-bright fs-12.5 font-roboto-bold",
  pinBar: "flex-row items-center justify-between gap-2 -mt-1 mb-3",
  pinInfo: "flex-row items-center gap-1.5",
  pinInfoText: "text-muted fs-13 font-roboto",
  pinCount: "text-gold-bright font-roboto-bold",
  pinResetBtn:
    "flex-row items-center gap-1.5 px-3 h-8.5 rounded-sm border border-line bg-panel2",
  pinResetText: "text-fg fs-13 font-roboto-bold",
  quote: "border-l-3 border-l-gold bg-gold/8 p-3 rounded-sm mt-2",
  quoteText: "text-fg fs-14.5 lh-5.5 font-roboto-italic",
  note: "bg-gold/6 border border-line rounded-md p-3 mt-3",
  noteHead: "flex-row items-center mb-1.5",
  noteTitle: "text-gold ml-1.5 fs-14 font-roboto-bold",
  formula: "items-center py-3 mt-2",
  formulaText: "text-gold-bright fs-17 text-center font-roman",
  linkRow: "bg-panel border border-line rounded-md p-3 mb-2.5",
  linkInfo: "mb-2.5",
  linkLabel: "text-fg fs-15 font-roboto-bold",
  linkDesc: "text-muted fs-13.5 lh-5 mt-1 font-roboto",
  linkUrl: "text-gold fs-12 mt-1.5 opacity-80 font-roboto",
  linkBtns: "flex-row items-center gap-2",
  iconBtn:
    "w-9.5 h-9.5 rounded-sm border border-line items-center justify-center bg-panel2",
  iconBtnOn:
    "w-9.5 h-9.5 rounded-sm border border-ok items-center justify-center bg-panel2",
  copyBtn:
    "w-10 h-10 rounded-sm border border-line bg-panel2 items-center justify-center",
  copyBtnOn:
    "w-10 h-10 rounded-sm border border-ok bg-panel2 items-center justify-center",
  openBtn:
    "flex-1 flex-row items-center justify-center gap-1.5 h-9.5 rounded-sm bg-gold-bright",
  openBtnText: "text-ink fs-14 font-roboto-bold",
  steps: "mt-1.5",
  stepsTitle: "text-fg mb-2 fs-14.5 font-roboto-bold",
  step: "flex-row mb-2.5",
  stepNum:
    "w-6 h-6 rounded-xl bg-gold/14 items-center justify-center mr-2.5 mt-px",
  stepNumText: "text-gold-bright fs-12 font-roboto-bold",
  stepBody: "flex-1",
  sysreq: "border border-line rounded-md overflow-hidden",
  sysreqRow: "flex-row border-b border-b-line",
  sysreqLabel: "w-27.5 text-muted fs-13.5 p-2.5 bg-gold/8 font-roboto-bold",
  sysreqValue: "flex-1 text-fg fs-13.5 p-2.5 font-roboto",
  shotGrid: "flex-row flex-wrap justify-center",
  shotGridItem: "mb-3 w-[48.5%] mx-[0.75%]",
  shot: "mb-3",
  shotImg: "w-full rounded-md border border-line",
  shotImgGrid: "w-full h-37.5 rounded-md border border-line",
  shotCap: "text-muted fs-12.5 lh-4 mt-1.5 text-center font-roboto",
  shotCapGrid: "text-muted fs-12.5 lh-4 mt-1.5 text-center font-roboto h-12",
  lightbox: "flex-1 bg-black/85 items-center justify-center",
  lightboxFrame: "w-[92%] h-[75%] items-center justify-center",
  lightboxImg: "w-full flex-1 border border-gold rounded-md",
  lightboxCap: "text-fg fs-13 text-center mt-2.5 font-roboto",
  lightboxClose:
    "absolute -top-4 -right-2 w-9 h-9 rounded-[18px] border border-gold bg-panel items-center justify-center",
  cheatHead: "flex-row mt-3 mb-1 px-2",
  cheatHeadCol: "text-gold fs-11 w-37.5 font-roboto-bold",
  cheatHeadColRight:
    "text-gold fs-11 w-37.5 font-roboto-bold flex-1 text-right",
  tableTitle:
    "text-gold fs-16 mt-4.5 mb-2.5 border-l-3 border-l-gold pl-2.5 font-roboto-bold",
  source: "text-muted fs-12.5 lh-5.5 font-roboto-italic mt-2",
  search:
    "flex-row items-center gap-2 mt-3 mb-3 px-3 h-11 bg-panel border border-line rounded-md",
  searchInput: "flex-1 h-11 p-0 outline-none text-fg fs-14.5 font-roboto",
  searchClear: "p-1",
  searchEmpty: "text-muted fs-14 text-center py-5 font-roboto",
  cheatTable: "border border-line rounded-md overflow-hidden",
  cheatRow: "flex-row p-2 items-center",
  cheatRowAlt: "flex-row p-2 items-center bg-white/2",
  cheatRowPinned: "flex-row p-2 items-center bg-gold/8",
  cheatCodes: "w-37.5 gap-1",
  cheatCell: "flex-row items-center flex-wrap gap-1",
  cheatCode:
    "flex-row items-center gap-1 bg-gold/10 rounded-[5px] px-1.5 py-0.75 self-start",
  cheatCodeOn:
    "flex-row items-center gap-1 bg-ok/18 rounded-[5px] px-1.5 py-0.75 self-start",
  cheatCodeText: "font-roboto-bold text-gold-bright fs-11.5",
  cheatNone: "text-muted font-roboto",
  cheatCellNote: "text-muted fs-10 font-roboto-italic",
  cheatEffect: "flex-1 text-fg fs-12.5 pl-2.5 lh-4.5 font-roboto",
  kbGroup: "mb-4",
  kbSection: "text-gold fs-14 mb-2 bg-gold/8 p-2 rounded-sm font-roboto-bold",
  kbSectionPinned:
    "flex-row items-center gap-1.5 mb-2 bg-gold/8 p-2 rounded-sm",
  kbSectionPinnedText: "text-gold fs-14 font-roboto-bold",
  kbRow: "flex-row py-1.75 px-1 items-center",
  kbKeys: "w-32.5 flex-row flex-wrap items-center",
  kbFn: "flex-1 text-fg fs-13 lh-4.5 pl-2 font-roboto",
  kbdCombo: "flex-1 min-w-0 flex-row flex-wrap items-center gap-0.75",
  kbd: "max-w-full shrink bg-panel2 border border-line rounded-[4px] px-1.25 py-0.5",
  kbdText: "text-gold-bright fs-11 font-roboto-bold",
  kbdSep: "text-muted fs-11 mx-px font-roboto",
  faqItem: "border border-line rounded-md mb-2 overflow-hidden bg-panel",
  faqQ: "flex-row items-center justify-between p-3.5 gap-2.5",
  faqQText: "flex-1 text-fg fs-14.5 lh-5 font-roboto-bold",
  faqA: "p-3.5 pt-1 border-t border-t-line gap-2",
  kbRowAlt: "flex-row py-1.75 px-1 items-center bg-white/2",
};
