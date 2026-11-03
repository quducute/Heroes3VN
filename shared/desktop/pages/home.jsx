import {
  Info,
  ArrowRight,
  ScreenShare,
  ExternalLink,
  TvMinimalPlay,
  Users,
} from "lucide-react";
import { versions } from "../../data/versions.js";
import { CardLatest } from "../components/ModLatest.jsx";
import {
  HOME,
  HOME_BANNERS,
  HOME_STORY,
  homeNote,
} from "../../data/content/home.jsx";
import { UPCOMING_LATEST } from "../../data/content/upcoming.jsx";
import { upcomingPage } from "./upcoming.jsx";
import { LINKS_OPEN } from "@app/platform.js";
import { CHOOSE_GUIDE } from "../../data/choose.jsx";
import { btn, CARD_LATEST, CHOOSE_TITLE, cx, page } from "../lib/cls.js";

const CARD =
  "flex flex-col items-start text-left no-underline bg-transparent bg-linear-170/srgb from-panel to-panel2 border border-line border-t-3 border-t-(--accent) rounded-[10px] px-4.5 py-5 text-fg cursor-pointer motion-safe:transition-[translate,box-shadow,border-color] hover:-translate-y-0.75 hover:shadow-[0_8px_24px_color-mix(in_srgb,black_45%,transparent)] hover:border-(--accent) h780:px-3.75 h780:py-3 h700:py-2.5";
const CARD_ICON = "w-11 h-11 object-contain rounded-lg h780:w-8 h780:h-8";
const CARD_NAME =
  "font-sans font-bold text-[19px] leading-[1.2] text-(--accent) mt-2 h780:text-[16px] h780:mt-1";
const CARD_SUB =
  "text-[12.5px] leading-[1.3] text-muted mb-2 h780:text-[11.5px] h780:mb-1";
const CARD_SUMMARY =
  "text-[13.5px] leading-normal text-fg opacity-90 h780:text-[12.5px]";
const CARD_CTA =
  "mt-auto pt-3 text-[13px] text-(--accent) font-semibold flex items-center gap-1.5 h780:pt-1.5 h780:text-[12px]";
const BANNER =
  "mt-3.5 flex items-center gap-4.5 px-5.5 py-4.5 bg-linear-170/srgb from-gold/14 to-gold/4 border border-gold rounded-[10px] shadow-[0_0_18px_color-mix(in_srgb,goldenrod_12%,transparent)] phone:flex-col phone:items-stretch phone:gap-3 phone:p-4";
const BANNER_COMPACT =
  "h760:mt-2.5 h760:px-5 h760:py-2.75 phone:h760:px-5 phone:h760:py-2.75";
const BANNER_ICON = "flex shrink-0 text-gold-bright";
const BANNER_TITLE = "text-[16.5px] font-bold text-gold-bright";
const BANNER_DESC = "mt-1 text-[13.5px] text-fg opacity-90";
const HALF = "min-h-screen flex flex-col tablet:min-h-0";

export function Home({ setPage }) {
  return (
    <div className={page(true)}>
      <div
        className={cx(
          HALF,
          "pt-8 pb-4 laptop:pt-6.5 h900:pt-5 h900:pb-2 h780:pt-2.5 h700:pt-1.5 h700:pb-1.5 tablet:pt-5.5 tablet:pb-0 phone:pt-4.5",
        )}
      >
        <header>
          <h1 className="font-roman font-normal tracking-[1.5px] uppercase text-[36px] text-gold-bright [text-shadow:0_2px_10px_color-mix(in_srgb,goldenrod_30%,transparent)] text-center h780:text-[24px] phone:text-[26px]">
            {HOME.title}
          </h1>
          <p className="mt-2.5 mx-auto mb-2 text-fg text-[17px] max-w-190 text-center [&_b]:text-gold-bright h780:text-[14px] h780:mt-1 h780:mb-2 phone:text-[15px]">
            {HOME.tagline}
          </p>
          <div className="mb-3.5 px-4 py-2.75 bg-gold/10 border border-gold rounded-lg text-fg text-[13.5px] flex items-center gap-2.5 [&>svg]:shrink-0 [&>svg]:text-gold-bright h780:py-1.25 h780:px-3.5 h780:mb-3 h700:mb-2.5 h780:text-[12.5px] phone:items-start">
            <Info size={16} /> <span>{homeNote(LINKS_OPEN)}</span>
          </div>
        </header>
        <div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4.5 h900:gap-3 h700:gap-2.5 phone:grid-cols-1 phone:gap-3">
          {versions.map((v) => (
            <button
              key={v.id}
              type="button"
              className={CARD}
              style={{ "--accent": v.accent }}
              onClick={() => setPage(v.id)}
            >
              <div className="flex">
                <img className={CARD_ICON} src={v.icon} alt="" />
              </div>
              <div className={CARD_NAME}>{v.name}</div>
              <div className={CARD_SUB}>{v.subtitle}</div>
              <CardLatest id={v.id} />
              <p className={CARD_SUMMARY}>{v.summary}</p>
              <div className={CARD_CTA}>
                {`${HOME.versionCta} `}
                <ArrowRight size={14} />
              </div>
            </button>
          ))}
          <button
            type="button"
            className={CARD}
            style={{ "--accent": upcomingPage.accent }}
            onClick={() => setPage(upcomingPage.id)}
          >
            <div className="flex">
              <img className={CARD_ICON} src={upcomingPage.icon} alt="" />
            </div>
            <div className={CARD_NAME}>{upcomingPage.name}</div>
            <div className={CARD_SUB}>{upcomingPage.subtitle}</div>
            <div className={CARD_LATEST}>{UPCOMING_LATEST}</div>
            <p className={CARD_SUMMARY}>{upcomingPage.summary}</p>
            <div className={CARD_CTA}>
              {`${HOME.upcomingCta} `}
              <ArrowRight size={14} />
            </div>
          </button>
        </div>
        <section className={BANNER}>
          <div className={BANNER_ICON}>
            <ScreenShare size={30} />
          </div>
          <div className="flex-1">
            <div className={BANNER_TITLE}>{HOME_BANNERS.support.title}</div>
            <p className={BANNER_DESC}>{HOME_BANNERS.support.desc}</p>
          </div>
          <a
            className={btn()}
            href={HOME_BANNERS.support.url}
            target="_blank"
            rel="noreferrer"
          >
            {`${HOME_BANNERS.support.buttonText} `}
            <ExternalLink size={14} />
          </a>
        </section>
      </div>
      <div
        className={cx(
          HALF,
          "pt-4 pb-7 h760:pb-4 h700:pt-2 h700:pb-2.5 tablet:pt-6 tablet:pb-11 phone:pb-10",
        )}
      >
        <section>
          <h2 className={CHOOSE_TITLE}>{HOME.storyTitle}</h2>
          <div className="bg-linear-170/srgb from-panel to-panel2 border border-line border-l-3 border-l-gold rounded-lg px-5 py-4 flex flex-col gap-2.5 text-[13.5px] [&_p]:text-fg [&_p]:opacity-92 h760:px-4.5 h760:py-2.5 h760:gap-1.75 h700:py-2">
            {HOME_STORY.map((p) => (
              <p key={p.key}>{p.text}</p>
            ))}
          </div>
        </section>
        <section className="mt-6 h760:mt-3 flex-1 flex flex-col">
          <h2 className={CHOOSE_TITLE}>{HOME.chooseTitle}</h2>
          <div className="flex-1 flex flex-col gap-2 h760:gap-1.5">
            {CHOOSE_GUIDE.map((g) => {
              const v = versions.find((x) => x.id === g.id);
              return (
                <button
                  key={g.id}
                  type="button"
                  className="flex-1 flex items-center gap-3 px-3.5 py-2.5 bg-linear-170/srgb from-panel to-panel2 border border-line border-l-3 border-l-(--accent) rounded-lg bg-transparent text-fg cursor-pointer text-left font-[inherit] transition-[border-color,background] hover:border-(--accent) hover:bg-none hover:bg-gold/6 h760:py-1.5 phone:grid phone:grid-cols-[28px_1fr_auto] phone:items-center phone:gap-y-2"
                  style={{ "--accent": v.accent }}
                  onClick={() => setPage(v.id)}
                >
                  <img
                    className="w-7 h-7 object-contain rounded-[5px] shrink-0 phone:col-start-1 phone:row-start-1"
                    src={v.icon}
                    alt=""
                  />
                  <span className="font-bold text-[14.5px] text-(--accent) min-w-35 shrink-0 phone:col-start-2 phone:row-start-1 phone:min-w-0">
                    {v.name}
                  </span>
                  <span className="flex-1 text-[13px] text-fg opacity-90 phone:col-span-full phone:row-start-2">
                    {g.desc}
                  </span>
                  <ArrowRight
                    className="text-(--accent) shrink-0 phone:col-start-3 phone:row-start-1"
                    size={15}
                  />
                </button>
              );
            })}
          </div>
        </section>
        <section className={cx(BANNER, BANNER_COMPACT)}>
          <div className={BANNER_ICON}>
            <TvMinimalPlay size={30} />
          </div>
          <div className="flex-1">
            <div className={BANNER_TITLE}>{HOME_BANNERS.youtube.title}</div>
            <p className={BANNER_DESC}>{HOME_BANNERS.youtube.desc}</p>
          </div>
          <a
            className={btn()}
            href={HOME_BANNERS.youtube.url}
            target="_blank"
            rel="noreferrer"
          >
            {`${HOME_BANNERS.youtube.buttonText} `}
            <ExternalLink size={14} />
          </a>
        </section>
        <section className={cx(BANNER, BANNER_COMPACT)}>
          <div className={BANNER_ICON}>
            <Users size={30} />
          </div>
          <div className="flex-1">
            <div className={BANNER_TITLE}>{HOME_BANNERS.discord.title}</div>
            <p className={BANNER_DESC}>{HOME_BANNERS.discord.desc}</p>
          </div>
          <a
            className={btn()}
            href={HOME_BANNERS.discord.url}
            target="_blank"
            rel="noreferrer"
          >
            {`${HOME_BANNERS.discord.buttonText} `}
            <ExternalLink size={14} />
          </a>
        </section>
      </div>
    </div>
  );
}
