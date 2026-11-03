import {
  ChevronDown,
  Info,
  Lightbulb,
  MessageSquareWarning,
} from "lucide-react";
import { Modal } from "./ui.jsx";
import { SECRET, parseInline } from "../../data/secret.js";
import pandora from "@shared/assets/icons/pandora.webp";

const ALERTS = {
  NOTE: { label: "Lưu ý", tone: "cornflowerblue", Icon: Info },
  TIP: { label: "Gợi ý", tone: "mediumseagreen", Icon: Lightbulb },
  IMPORTANT: {
    label: "Quan trọng",
    tone: "mediumpurple",
    Icon: MessageSquareWarning,
  },
};

function Segment({ seg }) {
  if (seg.bold) return <b>{seg.text}</b>;
  if (seg.italic) return <i>{seg.text}</i>;
  return seg.text;
}

function Inline({ text }) {
  return parseInline(text).map((seg) => <Segment key={seg.key} seg={seg} />);
}

function Alert({ kind, text }) {
  const { label, tone, Icon } = ALERTS[kind] ?? ALERTS.NOTE;
  return (
    <div
      className="border-l-3 border-l-(--tone) bg-(--tone)/8 rounded-r-md px-3.5 py-2.5"
      style={{ "--tone": tone }}
    >
      <div className="flex items-center gap-1.5 mb-1 font-semibold text-(--tone)">
        <Icon size={15} /> {label}
      </div>
      <p>
        <Inline text={text} />
      </p>
    </div>
  );
}

function Block({ block }) {
  if (block.type === "heading")
    return (
      <h3 className="text-[16px] font-bold text-gold-bright">
        <Inline text={block.text} />
      </h3>
    );
  if (block.type === "alert")
    return <Alert kind={block.kind} text={block.text} />;
  if (block.type === "list")
    return (
      <ul className="list-disc pl-5 flex flex-col gap-1 marker:text-gold">
        {block.items.map((item) => (
          <li key={item}>
            <Inline text={item} />
          </li>
        ))}
      </ul>
    );
  return (
    <p>
      <Inline text={block.text} />
    </p>
  );
}

export function SecretModal({ onClose }) {
  return (
    <Modal
      title="Hộp Pandora"
      icon={<img className="h-5.5 w-auto" src={pandora} alt="" />}
      onClose={onClose}
      wide
    >
      <div className="flex flex-col gap-3 text-[14px] leading-[1.65] text-fg [&_b]:text-gold-bright">
        <div className="text-center font-roman tracking-[1px] text-[19px] text-gold-bright">
          {SECRET.title}
        </div>
        {SECRET.intro.map((block) => (
          <Block key={block.id} block={block} />
        ))}
        {SECRET.hints.map((hint) => (
          <details
            className="group border border-gold/35 rounded-lg bg-gold/5 overflow-hidden"
            key={hint.id}
          >
            <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3 font-semibold text-[15px] text-gold-bright [&::-webkit-details-marker]:hidden hover:bg-gold/8 group-open:border-b group-open:border-b-gold/20">
              <span>{hint.title}</span>
              <ChevronDown
                className="shrink-0 text-gold motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180"
                size={18}
              />
            </summary>
            <div className="px-4 pt-3 pb-3.5 flex flex-col gap-3">
              {hint.blocks.map((block) => (
                <Block key={block.id} block={block} />
              ))}
            </div>
          </details>
        ))}
      </div>
    </Modal>
  );
}
