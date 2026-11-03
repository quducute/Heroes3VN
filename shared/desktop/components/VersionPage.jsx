import { ScrollText } from "lucide-react";
import { CHANGELOG_URLS } from "../../data/links.js";
import { ModLatest } from "./ModLatest.jsx";
import {
  cx,
  MOD_LATEST,
  MOD_LATEST_PART,
  page as pageCls,
  PILL_BTN,
} from "../lib/cls.js";

export function VersionPage({ version, actions }) {
  const changelog = CHANGELOG_URLS[version.id];
  return (
    <div
      className={cx(pageCls(false), "[&>header+section]:mt-0")}
      style={{ "--accent": "goldenrod" }}
    >
      <header className="flex items-center flex-wrap gap-4 pb-4 mb-5 border-b-2 border-line phone:gap-3">
        <div className="flex">
          <img
            className="w-13 h-13 object-contain rounded-lg phone:w-10.5 phone:h-10.5"
            src={version.icon}
            alt=""
          />
        </div>
        <div>
          <h1 className="font-roman font-normal tracking-[1.5px] uppercase text-[32px] text-gold-bright phone:text-[24px]">
            {version.name}
          </h1>
          <div className="text-muted font-roman tracking-[1px]">
            {version.subtitle}
          </div>
        </div>
        <div
          className={cx(
            "ml-auto flex flex-wrap items-center justify-end gap-2 phone:w-full phone:max-w-none phone:ml-0 phone:justify-start",
            actions ? "max-w-135" : "max-w-115",
          )}
        >
          {version.badge ? (
            <div className={MOD_LATEST} title={version.badge.title}>
              <span className={MOD_LATEST_PART}>{version.badge.text}</span>
            </div>
          ) : (
            <ModLatest id={version.id} />
          )}
          {changelog && (
            <a
              className={PILL_BTN}
              href={changelog}
              target="_blank"
              rel="noreferrer"
            >
              <ScrollText size={14} /> Changelog
            </a>
          )}
          {actions}
        </div>
      </header>
      {version.content}
    </div>
  );
}
