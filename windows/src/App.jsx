import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ArrowRight,
  Info,
  Heart,
  Users,
  RefreshCw,
  Download,
  ThumbsUp,
  ExternalLink,
  ScreenShare,
  PartyPopper,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
  ScrollText,
  Settings,
  Monitor,
  House,
  Trash2,
  RotateCcw,
  SlidersHorizontal,
  Check,
  Menu,
} from "lucide-react";
import { versions } from "./data/versions.jsx";
import { CHANGELOG_URLS } from "./data/links.js";
import {
  Section,
  LinkRow,
  A,
  Modal,
  Faq,
  Note,
  CheatTable,
  KeybindsTable,
  ConfirmModal,
  SysReq,
  NavContext,
  PageLink,
} from "./components/ui.jsx";
import { version as appVersion } from "../package.json";

const IS_WEB = !window.h3vn;
import donateQr from "./assets/images/donate.webp";
import webIcon from "./assets/icons/heroes.webp";
import seriesIcon from "./assets/icons/series.webp";
import faqIcon from "./assets/icons/faq.webp";
import cheatIcon from "./assets/icons/cheat.webp";
import hdIcon from "./assets/icons/hd.webp";
import dorIcon from "./assets/icons/dor.webp";
import remakeIcon from "./assets/icons/remake.webp";
import boardgameIcon from "./assets/icons/boardgame.webp";
import brandLogo from "./assets/images/logo.webp";
import { VN as VietnamFlag } from "country-flag-icons/react/3x2";
import {
  fetchLatestRelease,
  compareVersions,
  fetchModLatest,
  clearModCache,
  LATEST_RELEASE_URL,
  REPO_URL,
} from "./update.js";

function useModLatest(id) {
  const [latest, setLatest] = useState(null);
  useEffect(() => {
    let alive = true;
    setLatest(null);
    fetchModLatest(id)
      .then((info) => {
        if (alive) setLatest(info);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [id]);
  if (!latest) return [];
  return Array.isArray(latest) ? latest : [latest];
}

function ModLatest({ id }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <div className="mod-latest" title="Version mới nhất từ trang phát hành">
      {items.map((it, i) => (
        <span key={it.label || "latest"} className="mod-latest-part">
          {i > 0 && <span className="mod-latest-sep">•</span>}
          {it.label || "Bản mới nhất"}: <b>{it.version}</b>
          {it.date && <span className="mod-latest-date"> ({it.date})</span>}
        </span>
      ))}
    </div>
  );
}

function CardLatest({ id }) {
  const items = useModLatest(id);
  if (items.length === 0) return null;
  return (
    <div className="card-latest">
      {items.map((it, i) => (
        <span key={it.label || "latest"}>
          {i > 0 && " • "}
          {items.length > 1 && it.label ? `${it.label}: ` : "Mới nhất: "}
          <b>{it.version}</b>
        </span>
      ))}
    </div>
  );
}

const SUPPORT_FB_URL = "https://www.facebook.com/qudu.Gogetto";
const GROUP_FB_URL = "https://www.facebook.com/groups/hero3";
const DISCORD_URL = "https://discord.gg/XM2EWmYF3u";
function UpcomingHead({ icon, name, sub }) {
  return (
    <div className="upcoming-head">
      <img src={icon} alt="" />
      <div>
        <div className="upcoming-name">{name}</div>
        <div className="upcoming-sub">{sub}</div>
      </div>
    </div>
  );
}

const upcomingPage = {
  id: "upcoming",
  name: "Sắp ra mắt",
  subtitle: "Dự kiến 2027",
  icon: dorIcon,
  accent: "#3f9fd0",
  summary:
    "Thông tin các bản Heroes 3 sắp ra mắt: Heroes 3 Remake của Ubisoft và dự án Day of Reckoning (DoR).",
  badge: { text: "2 bản sắp ra mắt", title: "Số bản sắp ra mắt" },
  content: (
    <>
      <Section title="Heroes 3 Remake">
        <UpcomingHead
          icon={remakeIcon}
          name="Heroes of Might and Magic III Remake"
          sub="Ubisoft — dự kiến 2027"
        />
        <p className="hint">
          Bản làm lại chính thức của Heroes 3 do Ubisoft phát triển, gồm game
          gốc cùng cả 2 bản mở rộng, dựng lại hoàn toàn bằng 3D và hỗ trợ độ
          phân giải 4K.
        </p>
        <SysReq
          items={[
            { label: "Nhà phát triển", value: "Ubisoft" },
            { label: "Dự kiến ra mắt", value: "2027" },
            { label: "Nền tảng", value: "Windows (Steam)" },
          ]}
        />
        <LinkRow
          label="Trang game trên Steam"
          desc="Có thể thêm game vào Wishlist để nhận thông báo khi game ra mắt."
          url="https://store.steampowered.com/app/3809850/Heroes_of_Might_and_Magic_III_Remake"
          buttonText="Xem trên Steam"
        />
      </Section>
      <Section title="Day of Reckoning (DoR)">
        <UpcomingHead icon={dorIcon} name="Day of Reckoning" sub="DoR" />
        <p className="hint">
          Một dự án Heroes 3 mới đang được phát triển. Thông tin mới nhất về DoR
          được cập nhật trên diễn đàn Heroes Community.
        </p>
        <LinkRow
          label="Thread giới thiệu DoR trên Heroes Community"
          url="http://heroescommunity.com/viewthread.php3?TID=47267" // NOSONAR
          buttonText="Xem thông tin"
        />
      </Section>
    </>
  ),
};

const CHOOSE_GUIDE = [
  {
    id: "complete",
    desc: "Dành cho những người chơi cũ ưa thích lối chơi cổ điển và hoài niệm, đồng thời người chơi mới cũng có thể dễ dàng tiếp cận với Complete nhờ tính chất đơn giản dễ chơi của nó.",
  },
  {
    id: "hota",
    desc: "Dành cho những người thích có thêm thành mới và đánh PvP online; HotA vẫn giữ lối chơi cổ điển nhưng những thứ quá mất cân bằng ở Complete đã bị giảm sức mạnh, đồng thời hệ thống Template cũng được làm lại để người chơi dễ dàng cài đặt hơn.",
  },
  {
    id: "era",
    desc: "Dành cho những người thích vọc vạch, tuỳ biến lối chơi theo ý mình thông qua cách chỉnh WoG Options và Mod List; rất khó tiếp cận với người mới vì độ phức tạp và hơi loạn; cùng với lý do đó khiến cho ERA chỉ phù hợp với môi trường đánh PvE offline.",
  },
  {
    id: "vcmi",
    desc: "Dành cho những người chơi trên điện thoại hoặc các hệ điều hành khác không chỉ mỗi Windows; lối chơi của VCMI cũng có tính tuỳ biến nhờ Mod List riêng nhưng không cao bằng so với ERA.",
  },
  {
    id: "chronicles",
    desc: "Dành cho những người thích chơi Heroes 3 theo cốt truyện; tuy nhiên vì lối chơi đã bị dập khuôn phải đi theo một đường nên tính chiến thuật của Chronicles không cao bằng các bản còn lại.",
  },
];

const WEB_GROUPS = [
  {
    title: "Trang GitHub của Heroes 3 VN",
    links: [
      {
        label: "Heroes 3 VN by Gogetto",
        desc: "Theo dõi cập nhật, báo lỗi hoặc góp ý cho em tại đây.",
        url: "https://github.com/quducute/Heroes3VN",
      },
    ],
  },
  {
    title: "Information",
    links: [
      {
        label: "Heroes 3 Wiki",
        desc: "Bách khoa toàn thư về Heroes 3, người chơi có thể tra cứu thông tin tướng, skill tướng, phép, quái, đồ, thành... (English).",
        url: "https://heroes.thelazy.net",
      },
      {
        label: "WoG Portal",
        desc: "Trang cộng đồng chuyên đăng tin tức, mod và tài liệu về ERA.",
        url: "https://heroes3wog.net",
      },
    ],
  },
  {
    title: "Forum",
    links: [
      {
        label: "Heroes Community",
        desc: "Diễn đàn cộng đồng Heroes lớn và lâu đời nhất, nơi thảo luận chiến thuật, tin tức, map, mod... (English).",
        url: "http://heroescommunity.com", // NOSONAR
      },
      {
        label: "VCMI Forum",
        desc: "Diễn đàn chính thức của VCMI, nơi thảo luận và báo lỗi liên quan đến engine VCMI.",
        url: "https://forum.vcmi.eu",
      },
    ],
  },
  {
    title: "Maps",
    links: [
      {
        label: "Maps4Heroes",
        desc: (
          <>
            Kho map khổng lồ cho Heroes 3, lọc được theo kích cỡ map, phiên bản,
            lượt tải, đánh giá. Cách cài map xem ở{" "}
            <PageLink to="faq">mục FAQ</PageLink>.
          </>
        ),
        url: "https://www.maps4heroes.com/heroes3/maps.php",
      },
      {
        label: "Image to h3m",
        desc: "Tool chuyển ảnh đời thực thành map Heroes 3 (.h3m) ngay trên trình duyệt.",
        url: "https://imagetoh3m.netlify.app",
      },
    ],
  },
  {
    title: "Tools for Modding",
    links: [
      {
        label: "HoMM3 Explorer",
        desc: "Tool xem và trích xuất tài nguyên game (ảnh, animation, âm thanh, map, save...) ngay trên trình duyệt.",
        url: "https://laserlicht.github.io/homm3-explorer",
      },
      {
        label: "GrayFace Tools",
        desc: "Bộ tool mod game của GrayFace dành cho bác nào thích vọc vạch: MMArchive, Def Tool...",
        url: "https://grayface.github.io/wog",
      },
    ],
  },
  {
    title: "Graphics",
    links: [
      {
        label: "Aphra's Heroes Hub",
        desc: "Trang cung cấp hình ảnh Heroes 3 ở định dạng HD, có mod hình ảnh tướng và quân HD cho ERA.",
        url: "https://sites.google.com/view/aphrasheroessite/home",
      },
    ],
  },
];

const WEB_COUNT = WEB_GROUPS.reduce((n, g) => n + g.links.length, 0);

const webPage = {
  id: "web",
  name: "Tài nguyên hữu ích",
  subtitle: "Nguồn tổng hợp",
  icon: webIcon,
  accent: "#c9a227",
  summary: "Tổng hợp các trang tài nguyên hữu ích cho người chơi Heroes 3.",
  badge: {
    text: `${WEB_COUNT} tài nguyên`,
    title: "Số tài nguyên trong danh sách",
  },
  content: (
    <>
      {WEB_GROUPS.map((g) => (
        <Section key={g.title} title={g.title}>
          {g.links.map((l) => (
            <LinkRow
              key={l.url}
              label={l.label}
              desc={l.desc}
              url={l.url}
              buttonText="Mở web"
            />
          ))}
        </Section>
      ))}
    </>
  ),
};

const SERIES_GROUPS = [
  {
    title: "Heroes 1",
    links: [
      {
        label: "Bản cài GOG",
        url: "https://www.gog.com/en/game/heroes_of_might_and_magic",
      },
    ],
  },
  {
    title: "Heroes 2",
    links: [
      {
        label: "Bản cài Gold GOG",
        url: "https://www.gog.com/en/game/heroes_of_might_and_magic_2_gold_edition",
      },
      {
        label: "fheroes2",
        desc: "Engine viết lại Heroes 2, chạy được trên đa nền tảng.",
        url: "https://ihhub.github.io/fheroes2/INSTALL.html",
      },
      {
        label: "The Succession Wars Mod",
        desc: "Tái hiện lại Heroes 2 dưới dạng một mod của Heroes 3 ERA.",
        url: "https://www.moddb.com/mods/h3sw/downloads",
      },
    ],
  },
  {
    title: "Heroes 3 HD Edition (Ubisoft)",
    note: (
      <>
        HD Edition chỉ là bản làm lại đồ hoạ của bản gốc Restoration of Erathia
        (1999), không có 2 bản mở rộng Armageddon's Blade và Shadow of Death nên
        thiếu thành Conflux, các campaign, đồ ghép (combination artifacts) và
        Random Map Generator. Bản này cũng không chạy được HotA, ERA, HD Patch
        hay phần lớn mod và map của cộng đồng, và gần như không ai chơi online
        trên bản này. Nên mua{" "}
        <PageLink to="complete">bản Complete trên GOG</PageLink> (đủ các phần mở
        rộng) rồi cài thêm HD Patch miễn phí để có đồ hoạ độ phân giải cao và
        màn hình rộng.
      </>
    ),
    links: [
      {
        label: "Bản cài Steam (không nên mua)",
        desc: "Xem lý do không nên mua ở ghi chú phía trên.",
        url: "https://store.steampowered.com/app/297000/Heroes_of_Might__Magic_III__HD_Edition",
      },
      {
        label: "HDE Mod",
        desc: "Mod không chính thức cho HD Edition: sửa nhiều lỗi crash và bổ sung Random Map Generator (cần có bản Complete/SoD).",
        url: "https://github.com/potmdehex/homm3tools/releases/tag/1.22",
      },
    ],
  },
  {
    title: "Heroes 4",
    links: [
      {
        label: "Bản cài Complete GOG",
        url: "https://www.gog.com/en/game/heroes_of_might_and_magic_4_complete",
      },
      {
        label: "Arena Mod",
        desc: "Heroes 4 với đồ hoạ HD và online lobby, có thể lựa chọn chơi giữa bản gốc HD và bản cân bằng lại game Arena HD.",
        url: "https://heroes4.net/arena",
      },
    ],
  },
  {
    title: "Heroes 5",
    links: [
      {
        label: "Bản cài GOG",
        url: "https://www.gog.com/en/game/heroes_bundle",
      },
      {
        label: "Bản cài Steam",
        url: "https://store.steampowered.com/app/15170/Heroes_of_Might__Magic_V",
      },
      {
        label: "Heroes 5.5",
        desc: "Bản mod thêm rất nhiều thứ hay ho cho Heroes 5.",
        url: "https://www.moddb.com/mods/might-magic-heroes-55/downloads",
      },
      {
        label: "Heroes 5.5 Frax",
        desc: "Addon mở rộng của mod Heroes 5.5, thêm nhiều thứ hay ho hơn nữa.",
        url: "https://www.moddb.com/mods/might-magic-heroes-55x/downloads",
      },
    ],
  },
  {
    title: "Heroes 6",
    links: [
      {
        label: "Bản cài Steam",
        url: "https://store.steampowered.com/app/48220/Might__Magic_Heroes_VI",
      },
    ],
  },
  {
    title: "Heroes 7",
    links: [
      {
        label: "Bản cài Steam",
        url: "https://store.steampowered.com/app/321960/Might__Magic_Heroes_VII",
      },
      {
        label: "Bản mở rộng độc lập Trial by Fire",
        desc: "Bản mở rộng độc lập (Standalone Expansion) tức là không cần mua Heroes 7 gốc vẫn chơi được, khác với các DLC thông thường yêu cầu phải có game gốc.",
        url: "https://store.steampowered.com/app/445310/Might_and_Magic_Heroes_VII__Trial_by_Fire",
      },
      {
        label: "Heroes 7.5",
        desc: "Bản mod thêm rất nhiều thứ hay ho cho Heroes 7.",
        url: "https://www.moddb.com/mods/heroes-of-might-and-magic-75/downloads",
      },
    ],
  },
  {
    title: "Heroes Olden Era",
    links: [
      {
        label: "Bản cài Steam",
        url: "https://store.steampowered.com/app/3105440/Heroes_of_Might_and_Magic_Olden_Era",
      },
      {
        label: "Patch Việt hoá (Cánh Cụt Team)",
        url: "https://canhcutteam.com/games/heroes-of-might-and-magic-olden-era",
      },
    ],
  },
];

const SERIES_BUNDLES = [
  {
    label: "GOG",
    desc: "Bao gồm Heroes 1, 2, 3, 4 và 5.",
    url: "https://www.gog.com/en/game/heroes_bundle",
  },
  {
    label: "Steam",
    desc: "Bao gồm Heroes 5, 6 và 7.",
    url: "https://store.steampowered.com/bundle/5584/Heroes_of_Might_and_Magic_Collection",
  },
];

function seriesButtonText(url) {
  if (url.includes("gog.com")) return "Mua trên GOG";
  if (url.includes("store.steampowered.com")) return "Mua trên Steam";
  return "Mở link";
}

const seriesPage = {
  id: "series",
  name: "Game cùng series HoMM",
  subtitle: "Heroes of Might and Magic",
  icon: seriesIcon,
  accent: "#c9a227",
  content: (
    <>
      <Note>
        Đây là trang tổng hợp link tải/mua các bản game khác trong cùng series
        Heroes of Might and Magic, cũng như một số mod hay của chúng. Hướng dẫn
        cài đặt xem tại trang download của từng mod.
      </Note>
      {SERIES_GROUPS.map((g) => (
        <Section key={g.title} title={g.title}>
          {g.note && <Note title="Không nên mua">{g.note}</Note>}
          {g.links.map((l) => (
            <LinkRow
              key={l.url}
              label={l.label}
              desc={l.desc}
              url={l.url}
              buttonText={seriesButtonText(l.url)}
            />
          ))}
        </Section>
      ))}
      <Section title="Mua theo Bundle (tiết kiệm hơn)">
        {SERIES_BUNDLES.map((l) => (
          <LinkRow
            key={l.url}
            label={l.label}
            desc={l.desc}
            url={l.url}
            buttonText={seriesButtonText(l.url)}
          />
        ))}
      </Section>
    </>
  ),
};

const FAQ_ITEMS = [
  {
    q: "Tại sao lại cần Windows 10/11 trong khi Heroes 3 là game cũ, Windows 7 có chơi được không?",
    a: (
      <>
        Đối với Heroes 3 Complete và HD Patch thì Windows 7 vẫn chạy được, nhưng
        với các phiên bản sau này như HotA và ERA thì chúng đều dùng những thư
        viện mới, trong đó có một số cái không còn hỗ trợ trên Windows 7.
        Windows 7 đã bị Microsoft ngừng hỗ trợ từ lâu nên rất hay phát sinh lỗi
        vặt, vì vậy em khuyến nghị <b>Windows 10/11</b> để chơi ổn định nhất.
      </>
    ),
  },
  {
    q: "Máy tôi cài game xong cứ báo lỗi thiếu DLL không chơi được, cách fix như thế nào?",
    a: (
      <div className="faq-lines">
        <div>
          Phần lớn lỗi thiếu DLL khi chơi Heroes 3 (ví dụ{" "}
          <code>MSVCP140.dll</code>, <code>VCRUNTIME140.dll</code>,{" "}
          <code>d3dx9_43.dll</code>) là do máy chưa cài đủ các thư viện mà game
          và các bản mod cần. Bác xử lý lần lượt như sau:
        </div>
        <div>
          <b>1.</b> Cài bản Visual C++ Redistributable gộp đủ các phiên bản:{" "}
          <A href="https://www.tinyplease.com/vcpp">tinyplease.com/vcpp</A>.
        </div>
        <div>
          <b>2.</b> Cài DirectX End-User Runtime của Microsoft:{" "}
          <A href="https://www.microsoft.com/en-us/download/details.aspx?id=35">
            microsoft.com
          </A>
          .
        </div>
        <div>
          <b>3.</b> Chạy Windows Update để cập nhật Windows lên bản mới nhất.
        </div>
        <div>
          Không nên tải từng file DLL lẻ trên mạng về chép vào thư mục game vì
          dễ gây lỗi khác hoặc nhiễm virus. Nếu đã làm hết các bước trên mà vẫn
          lỗi thì mới nên tính đến việc cài lại Windows.
        </div>
      </div>
    ),
  },
  {
    q: "Tôi chỉ chơi các bản mod như HotA, ERA, VCMI thì có cần mua Complete không?",
    a: (
      <>
        Câu trả lời là có, HotA và ERA cần game gốc để lấy tài nguyên nên bắt
        buộc phải có <b>Complete/SoD</b> làm nền. VCMI tuy là engine riêng nhưng
        vẫn cần dữ liệu (hình ảnh, âm thanh) trích xuất từ file game gốc. Mua{" "}
        <A href="https://www.gog.com/en/game/heroes_of_might_and_magic_3_complete_edition">
          Complete trên GOG
        </A>{" "}
        một lần là dùng được cho tất cả. Bản Complete trên Steam cũng dùng được
        cho HotA và ERA, nhưng <b>VCMI chỉ nhận bản GOG</b> nên vẫn khuyên mua
        bản GOG.
      </>
    ),
  },
  {
    q: "Mua Heroes 3 trên Steam được không hay bắt buộc phải mua trên GOG?",
    a: (
      <div className="faq-lines">
        <div>
          <b>Complete, HotA, ERA:</b> dùng được cả bản Steam lẫn GOG, nhưng em
          vẫn khuyên mua bản GOG (bộ cài offline, không DRM).
        </div>
        <div>
          <b>VCMI</b> và <b>Patch HD cho Chronicles:</b> chỉ dùng được file cài
          của GOG, bản Steam không dùng được.
        </div>
        <div>
          Vì vậy nếu mua mới thì nên mua{" "}
          <PageLink to="complete">Heroes 3 Complete trên GOG</PageLink> để dùng
          được cho mọi phiên bản.
        </div>
      </div>
    ),
  },
  {
    q: "HD Patch là gì và tại sao lại cần nó?",
    a: (
      <>
        HD Patch (HoMM3 HD Mod) là bản vá đồ hoạ cho Heroes 3. Game gốc ra đời
        từ năm 1999 nên chỉ chạy ở độ phân giải rất thấp (800×600), khi mở trên
        màn hình đời mới sẽ bị mờ và không tương thích hoàn toàn với các hệ điều
        hành hiện tại. HD Patch giúp game chạy mượt trên Windows 10/11, hiển thị
        đúng độ phân giải màn hình 16:9, hỗ trợ màn rộng (widescreen), chơi ở
        chế độ cửa sổ, phóng to giao diện cùng nhiều tiện ích khác. Quan trọng
        hơn, nó còn có thêm <b>Multiplayer online lobby</b> để chơi qua mạng với
        người khác. Ngoài ra HD Patch cũng bổ sung thêm rất nhiều tính năng cho
        game như là thêm <PageLink to="keybinds">phím tắt</PageLink>, cho phép
        chọn Template khi tạo Random Map và rất nhiều tính năng khác. HotA và
        ERA đã tích hợp sẵn HD Patch khi cài đặt, còn với Complete thì sẽ phải
        tự cài <PageLink to="complete">HD Patch</PageLink> thủ công.
      </>
    ),
  },
  {
    q: "Nên chọn phiên bản nào để chơi?",
    a: (
      <>
        Tuỳ theo sở thích cá nhân để chọn phiên bản phù hợp. Bác xem so sánh các
        phiên bản Heroes 3 đầy đủ ở mục{" "}
        <PageLink to="home">
          <i>“Nên chọn bản nào?”</i> ở trang chủ
        </PageLink>
        để có cái nhìn tổng quan hơn.
      </>
    ),
  },
  {
    q: "Có bản Heroes 3 tiếng Việt không?",
    a: (
      <>
        Có. HotA 1.8.1 đã có <b>Patch Việt hoá</b> by Bé Còi Team, link tải và
        hướng dẫn xem ở mục Việt hoá HotA trong{" "}
        <PageLink to="hota">trang HotA</PageLink>. Lưu ý patch chỉ dùng được cho
        đúng bản HotA 1.8.1.
      </>
    ),
  },
  {
    q: "Tại sao cần cài từng bản ra thư mục riêng mà không cài chung tất cả vào một thư mục cho gọn?",
    a: (
      <>
        Vì mỗi bản mod sửa và ghi đè các file của game gốc theo cách khác nhau.
        Nếu cài chung vào một thư mục, các file sẽ đè lên nhau gây xung đột,
        hỏng game hoặc lỗi không mở được. Cài mỗi bản (Complete, HotA, ERA...)
        ra một thư mục riêng để chúng độc lập, không ảnh hưởng lẫn nhau.
      </>
    ),
  },
  {
    q: "Map và Template khác nhau như thế nào và cách cài?",
    a: (
      <div className="faq-lines">
        <div>
          <b>Khác nhau:</b> Map (<code>.h3m</code>) là bản đồ dựng sẵn cố định —
          tải về chơi luôn; còn Template là “khuôn” để game tự sinh ra bản đồ
          ngẫu nhiên (Random Map).
        </div>
        <div>
          <b>Cài map</b> (<code>.h3m</code>): chép file <code>.h3m</code> vào
          thư mục <code>Maps</code> nằm trong thư mục cài game; map sẽ xuất hiện
          trong danh sách khi bác tạo ván <b>Single Scenario</b> mới. Khi tải
          map từ <PageLink to="web">Maps4Heroes</PageLink>, nhớ lọc đúng phiên
          bản mình đang chơi để map tương thích.
        </div>
        <div>
          <b>Map ERA:</b> một số map dành cho ERA được đóng gói dưới dạng{" "}
          <b>scenario mod</b>. Với loại này, bác nên đọc kỹ file{" "}
          <code>mod.json</code> hoặc file readme đi kèm để biết map yêu cầu
          phiên bản ERA nào và có xung đột với mod nào khác không trước khi cài.
        </div>
        <div>
          <b>Cài Template Complete và ERA</b> (<code>rmg.txt</code>): tạo một
          thư mục mang tên Template trong <code>_HD3_Data\Templates</code> rồi
          copy file <code>rmg.txt</code> vào đó; riêng Complete cần cài HD Patch
          thì mới có thư mục này. Hướng dẫn chi tiết xem ở{" "}
          <PageLink to="complete">trang Complete</PageLink> hoặc{" "}
          <PageLink to="era">trang ERA</PageLink>.
        </div>
        <div>
          <b>Cài Template HotA</b> (<code>.h3t</code>): copy file{" "}
          <code>.h3t</code> vào thư mục <code>HotA_RMGTemplates</code> trong thư
          mục game. Hướng dẫn chi tiết xem ở{" "}
          <PageLink to="hota">trang HotA</PageLink>.
        </div>
        <div>
          <b>Chọn Template trong game:</b> vào New Game → Single Scenario →
          Random Map, Template đã cài sẽ hiện trong danh sách ở mục Template.
        </div>
      </div>
    ),
  },
  {
    q: "Chơi PvP online với bạn bè hoặc đánh rank qua online lobby như thế nào và nên dùng phiên bản nào?",
    a: (
      <>
        Nên dùng <PageLink to="hota">HotA</PageLink> vì đây là bản có cộng đồng
        chơi online đông nhất. <b>Complete</b> cũng chơi online được nhưng ít
        người chơi hơn nhiều. Cài HD Patch, vào mục Multiplayer trong game, tạo
        tài khoản là vào được lobby online (bắt buộc phải cài HD Patch thì mới
        có online lobby), có cả xếp hạng (rank). Các Template được thiết kế cho
        môi trường đánh rank HotA là <b>Duel</b> và <b>Jebus Outcast</b>. Luật
        chơi và cách vào lobby đọc{" "}
        <A href="https://h3hota.com/en/rules">tại đây</A>.
      </>
    ),
  },
  {
    q: "Simultaneous Turns trong online lobby là gì và cách chỉnh nó khi đánh PvP online?",
    a: (
      <div className="faq-lines">
        <div>
          <b>Simultaneous Turns</b> (viết tắt Simturns hoặc ST) là chế độ cho
          phép tất cả người chơi đi lượt <b>cùng lúc</b> thay vì chờ lần lượt
          từng người, giúp rút ngắn rất nhiều thời gian ở giai đoạn đầu ván khi
          các bên chưa chạm mặt nhau.
        </div>
        <div>
          <b>Cách bật và chỉnh:</b> người tạo phòng (host) khi bắt đầu ván trong
          lobby bấm vào <b>More options</b>, rồi đặt mốc thời gian mà ST hết
          hiệu lực. Mốc này ghi theo dạng <b>tháng–tuần–ngày</b>, ví dụ{" "}
          <b>117</b> nghĩa là tháng 1, tuần 1, ngày 7. Qua mốc đó game tự chuyển
          về đi lượt tuần tự như bình thường.
        </div>
        <div>
          <b>Khi nào ST dừng:</b> ST tự ngắt khi hai người bắt đầu tương tác với
          nhau — tấn công tướng, thành hay mỏ của đối phương, hoặc cùng tranh
          một đối tượng trên bản đồ. Khi đó lượt quay về đi tuần tự, và người có
          cờ ưu tiên thấp hơn phải chơi lại lượt của mình từ đầu ngày (không cần
          lặp lại y hệt các nước trước điểm ngắt).
        </div>
        <div>
          <b>Thứ tự ưu tiên</b> tính theo thứ tự cờ trong Heroes 3: Đỏ → Xanh
          dương → Nâu → Xanh lá → Cam → Tím → Ngọc lam → Hồng. Ai cờ đứng trước
          thì được ưu tiên giữ lượt, người cờ đứng sau là người phải chơi lại
          khi ST ngắt.
        </div>
      </div>
    ),
  },
  {
    q: "Tài khoản chơi online của tôi bị cấm/khoá đánh rank, tại sao lại vậy và mở lại như thế nào?",
    a: (
      <>
        Nguyên nhân thường gặp là rời trận đánh rank giữa chừng (bỏ trận) nhiều
        lần, cố tình huỷ trận để tránh thua, gian lận hoặc có hành vi xấu với
        người chơi khác. Đa số lệnh cấm chỉ là tạm thời và tự hết hạn sau một
        thời gian. Nếu muốn khiếu nại hoặc xin mở lại sớm, bác vào{" "}
        <A href="https://discord.gg/eDkPSNf">cộng đồng HotA ở Discord</A> để
        liên hệ đội ngũ quản trị, đồng thời đọc kỹ{" "}
        <A href="https://h3hota.com/en/rules">luật chơi online của HotA</A> để
        tránh bị phạt lần sau.
      </>
    ),
  },
  {
    q: "Tại sao ERA không thể dùng để đánh PvP online?",
    a: (
      <>
        Do mỗi người có một cách chỉnh <b>WoG Options</b> và <b>Mod List</b>{" "}
        khác nhau dẫn đến hai máy không đồng bộ với nhau, đồng thời ERA chạy rất
        nặng vì phải xử lý các script liên tục nên không ổn định khi chơi qua
        mạng. Vì vậy ERA được thiết kế để chơi PvE offline hoặc hotseat (chơi
        lần lượt trên cùng một máy).
      </>
    ),
  },
  {
    q: "ERA có thêm hệ thống mod mà WoG cũ không có, vậy nó là gì và có nên cài mod không?",
    a: (
      <>
        ERA bổ sung <b>Mod Browser/Mod Manager</b> cho phép tải và bật/tắt từng
        mod dễ dàng ngay trong launcher. Bác nên cài thêm mod để làm phong phú
        nội dung, nhưng đừng bật quá nhiều mod nặng cùng lúc vì dễ xung đột gây
        lỗi. Nên cài vừa phải và đọc kỹ mô tả từng mod để biết nó xung đột với
        những mod nào và nên cài cùng mod nào.
      </>
    ),
  },
  {
    q: "Tôi chơi ERA rất hay bị lỗi, nguyên nhân là gì và báo lỗi ở đâu?",
    a: (
      <>
        Các nguyên nhân thường gặp: chưa cài đủ Visual C++ (xem ghi chú ở{" "}
        <PageLink to="era">trang ERA</PageLink>), bật quá nhiều mod xung đột
        nhau, đường dẫn cài game có dấu tiếng Việt. Bác thử gỡ bớt mod và cài
        lại VC++ trước. Cần hỏi hoặc báo lỗi thì lên mục bug reports trong{" "}
        <A href="https://discord.gg/bvfJGZe">cộng đồng ERA ở Discord</A>.
      </>
    ),
  },
  {
    q: "Bản Heroes 3 nào có quân nâng được lên bậc 3 và thêm rất nhiều đồ, quân mới?",
    a: (
      <>
        Đó chính là <PageLink to="era">ERA</PageLink>. Bản này có{" "}
        <b>Third Upgrades Mod (ResOunD)</b> cho phép nâng cấp quân lên bậc 3,
        thêm quân mới và đồ mới.
      </>
    ),
  },
  {
    q: "Chơi bản Heroes 3 nào để có thêm các thành mới?",
    a: (
      <div className="faq-lines">
        <div>
          <b>
            <PageLink to="hota">HotA</PageLink>:
          </b>{" "}
          3 thành mới là Cove, Factory và Bulwark.
        </div>
        <div>
          <PageLink to="era">
            <b>ERA</b>
          </PageLink>{" "}
          (cài thêm mod Land Of New Towns): 15 thành mới là Wonder Woods,
          Eldorado, Sand Town, Shadow Town, Neutral Town, Magic Forest, Druid
          Town, Bastion, Cove, Knight's Castle, Ice Castle, Elemental Palace,
          Pyramid, Techno Town và Mythology.
        </div>
        <div>
          <PageLink to="vcmi">
            <b>VCMI</b>
          </PageLink>{" "}
          (cài thêm các mod có tag Town): số lượng thành tuỳ thuộc vào số lượng
          mod có tag Town đã cài.
        </div>
      </div>
    ),
  },
  {
    q: "Heroes 3 ERA và Heroes of Might and Magic: Olden Era có phải là một không?",
    a: (
      <div className="faq-lines">
        <div>
          Không, đây là hai thứ hoàn toàn khác nhau, chỉ trùng nhau ở chữ “Era”.
        </div>
        <div>
          <b>Heroes 3 ERA</b> là nền tảng mod cho Heroes 3 (bản mà tool này
          hướng dẫn cài), phát triển lên từ WoG cũ được mở rộng thêm bằng mod.
        </div>
        <div>
          <b>Heroes of Might and Magic: Olden Era</b> là một game hoàn toàn mới
          do studio Unfrozen phát triển, Hooded Horse và Ubisoft phát hành (công
          bố năm 2024, ra mắt Early Access năm 2026), không liên quan gì đến
          engine của Heroes 3 hay ERA.
        </div>
      </div>
    ),
  },
  {
    q: "Tôi không có thời gian ngồi máy tính, làm thế nào để chơi trên điện thoại hoặc máy tính bảng?",
    a: (
      <>
        Bác dùng <PageLink to="vcmi">VCMI</PageLink> — engine chạy được trên cả
        Android và iOS. Cài app VCMI, rồi nạp dữ liệu từ bản{" "}
        <b>Heroes 3 Complete GOG</b> (bản Steam không dùng được) là chơi được
        Heroes 3 ngay trên điện thoại/máy tính bảng.
      </>
    ),
  },
  {
    q: "Tại sao lại nói VCMI không phải Heroes 3, tôi chơi thấy giống hệt Heroes 3 mà?",
    a: (
      <>
        Vì VCMI là một engine mã nguồn mở viết lại từ đầu để tái tạo Heroes 3,
        chứ không phải file game gốc của 3DO/New World Computing. Nó mượn lại dữ
        liệu (hình ảnh, âm thanh) của bản gốc nên nhìn giống hệt, nhưng phần
        “động cơ” bên trong là code hoàn toàn mới, nhờ vậy mới chạy được đa nền
        tảng và mở rộng thoải mái. Nói cách khác nó là bản tương thích, không
        phải Heroes 3 nguyên gốc.
      </>
    ),
  },
  {
    q: "WoG và HotA trong VCMI thiếu nhiều chức năng so với bản trên PC, có cách nào bổ sung không?",
    a: (
      <>
        VCMI có port lại WoG và HotA ở dạng mod cho VCMI nhưng chưa đầy đủ 100%
        như bản gốc trên PC. Phần còn thiếu đó không có cách nào bổ sung cả mà
        chỉ có thể đợi đội ngũ VCMI hoàn thiện dần.
      </>
    ),
  },
  {
    q: "Tại sao tôi không chơi được The Empire of the World (TEW) và một số custom map khác trên ERA?",
    a: (
      <>
        Các map như <b>The Empire of the World (TEW)</b> được làm dưới dạng{" "}
        <code>[Scenarios]</code> mod, không tương thích với bản ERA 3.9 cài từ
        Heroes Launcher. Để chơi, bác tải <b>ERA Old Version</b> (3.8 trở xuống)
        ở mục “ERA bản cũ” trong <PageLink to="era">tab ERA</PageLink>. Cách
        phân biệt: bản 3.9 trở lên có biểu tượng <b>con phượng hoàng lửa</b>,
        còn bản 3.8 trở xuống vẫn dùng biểu tượng <b>con mắt WoG</b>.
      </>
    ),
  },
];

const faqPage = {
  id: "faq",
  name: "Câu hỏi thường gặp",
  subtitle: "FAQ",
  icon: faqIcon,
  accent: "#c9a227",
  badge: { text: `${FAQ_ITEMS.length} câu hỏi`, title: "Số câu hỏi" },
  content: <Faq items={FAQ_ITEMS} />,
};

const CHEATS = [
  {
    complete: "nwctheone",
    wog: "nwctheone",
    vcmi: "vcmigod",
    effect:
      "Siêu cheat: mở toàn bộ bản đồ + 5 Archangel mỗi slot quân trống + di chuyển vô hạn + bay vĩnh viễn",
  },
  {
    complete: "nwcredpill",
    wog: "wogonering",
    vcmi: "vcmiwin",
    effect: "Thắng ngay lập tức",
  },
  {
    complete: "nwcbluepill",
    wog: "wogdarklord",
    vcmi: "vcmilose",
    effect: "Thua ngay lập tức",
  },
  {
    complete: null,
    wog: "wogfrodo",
    vcmi: "vcmideathpunch",
    effect: "Thắng ngay combat đang đánh",
  },
  {
    complete: null,
    wog: "wogdenethor",
    vcmi: null,
    effect: "Thua ngay combat đang đánh",
  },
  {
    complete: "nwcmorpheus",
    wog: "wogfellowship",
    vcmi: "vcmimorale",
    effect: "Morale tối đa (3 cánh chim)",
  },
  {
    complete: "nwcfollowthewhiterabbit",
    wog: "wogbilbo",
    vcmi: "vcmiluck",
    effect: "Luck tối đa (3 móng ngựa)",
  },
  {
    complete: "nwclotsofguns",
    wog: "wogoliphaunt",
    vcmi: "vcmimachines",
    effect:
      "Nhận Ballista (xe tên), Ammo Cart (xe đạn) và First Aid Tent (lều)",
  },
  {
    complete: "nwcagents",
    wog: "wogpathofthedead",
    vcmi: "vcmiblackknight",
    effect: "Thêm 10 Black Knight vào mỗi slot quân trống",
  },
  {
    complete: "nwctrinity",
    wog: "woggaladriel",
    vcmi: "vcmiarchangel",
    effect: "Thêm 5 Archangel vào mỗi slot quân trống",
  },
  {
    complete: "nwcthereisnospoon",
    wog: "wogsaruman",
    vcmi: "vcmispells",
    effect: "Sách phép + toàn bộ phép + 999 điểm phép",
  },
  {
    complete: null,
    wog: "woggandalf",
    vcmi: null,
    effect:
      "Sách phép + toàn bộ phép + 999 điểm phép (nhập khi đang trong combat)",
  },
  {
    complete: "nwcnebuchadnezzar",
    wog: "wogshadowfax",
    vcmi: "vcmimove",
    effect: "Di chuyển vô hạn",
  },
  {
    complete: "nwcneo",
    wog: "woggandalfwhite",
    vcmi: "vcmilevel",
    effect: "Tướng lên 1 cấp",
  },
  {
    complete: "nwctheconstruct",
    wog: "wogisengard",
    vcmi: "vcmiresources",
    effect: "+100.000 vàng và +100 mỗi loại tài nguyên",
  },
  {
    complete: "nwczion",
    wog: "wogminastirith",
    vcmi: "vcmibuild",
    effect: "Xây và nâng cấp toàn bộ công trình trong thành",
  },
  {
    complete: "nwcwhatisthematrix",
    wog: "wogeyeofsauron",
    vcmi: "vcmimap",
    effect: "Mở toàn bộ bản đồ",
  },
  {
    complete: "nwcignoranceisbliss",
    wog: "wogmordor",
    vcmi: "vcmihidemap",
    effect: "Che tối lại toàn bộ bản đồ",
  },
  {
    complete: "nwcoracle",
    wog: "wogpalantir",
    vcmi: "vcmiobelisk",
    effect: "Mở bản đồ ghép hình kho báu (Grail puzzle)",
  },
  {
    complete: "nwcphisherprice",
    wog: "wogsarumanofmanycolors",
    vcmi: "vcmicolor",
    effect: "Đổi giao diện sang bảng màu kiểu Heroes II",
  },
  {
    complete: "gosolo",
    wog: null,
    vcmi: null,
    effect: "Máy (AI) tự điều khiển người chơi hiện tại — bấm ESC để huỷ",
  },
  {
    complete: { code: "nwcarchitect", note: "chỉ HotA" },
    wog: null,
    vcmi: "vcmigrail",
    effect: "Nhận Grail (kho báu) vào ba lô của tướng",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmiskill",
    effect: "Cho kỹ năng phụ (vcmiskill <ID skill> <cấp thành thạo>)",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmiazure",
    effect: "Thêm 5000 Azure Dragon vào mỗi slot quân trống",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmicrystal",
    effect: "Thêm 5000 Crystal Dragon vào mỗi slot quân trống",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmifaerie",
    effect: "Thêm 5000 Faerie Dragon vào mỗi slot quân trống",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmiarmy",
    effect: "Triệu hồi loại quân bất kỳ (vcmiarmy <ID quân> <số lượng>)",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmiartifacts",
    effect: "Cho toàn bộ đồ (artifact)",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmiscrolls",
    effect: "Cho spell scroll của mọi phép",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmiteleport",
    effect: "Dịch chuyển tướng tới toạ độ (vcmiteleport <x> <y> <z tuỳ chọn>)",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmiexp",
    effect: "+10.000 kinh nghiệm (thêm số để chỉ định)",
  },
  {
    complete: null,
    wog: null,
    vcmi: "vcmigray",
    effect: "Đổi giao diện sang bảng màu xám (grayscale)",
  },
];

const CHEAT_COUNT = CHEATS.length;

const cheatPage = {
  id: "cheat",
  name: "Mã cheat Heroes 3",
  subtitle: "Bảng tổng hợp mã cheat",
  icon: cheatIcon,
  accent: "#c9a227",
  badge: { text: `${CHEAT_COUNT} mã cheat`, title: "Số mã cheat" },
  content: (
    <>
      <Note title="Cách dùng">
        Để nhập mã cheat, bấm phím <b>Tab</b> (hoặc bấm/chạm vào thanh trạng
        thái phía dưới) để mở khung chat trong game rồi gõ mã. Cách này áp dụng
        chung cho mọi phiên bản. Chỉ dùng mã cheat khi đánh PvE offline, không
        dùng khi đánh PvP online. Bấm vào mã để copy nhanh.
      </Note>
      <Note title="Riêng với ERA">
        Các mã ở bảng dưới là cách cheat truyền thống: gõ mã vào khung chat.
        Riêng ERA còn có mod <b>TrainerX</b> (có sẵn khi cài ERA mới nhất) cho
        phép cheat trực tiếp trong game qua menu cheat, chỉnh sâu vào tướng,
        quân, đồ, tài nguyên. Hướng dẫn chi tiết xem ở{" "}
        <PageLink to="era">trang ERA</PageLink>.
      </Note>
      <Note title="Siêu cheat">
        <div className="faq-lines">
          <div>
            <b>nwctheone:</b> cần cài HD Patch để có thể sử dụng (HotA và ERA đã
            tích hợp sẵn, <PageLink to="complete">Complete</PageLink> cần phải
            cài thủ công).
          </div>
          <div>
            <b>vcmigod:</b> mã riêng dành cho bản{" "}
            <PageLink to="vcmi">VCMI</PageLink> (VCMI không phải là Heroes 3 mà
            là một engine viết lại game nên không thể cài HD Patch, do đó họ tạo
            ra mã riêng).
          </div>
        </div>
      </Note>
      <CheatTable rows={CHEATS} />
      <p className="cheat-source">
        Nguồn:{" "}
        <A href="https://heroes.thelazy.net/index.php/Cheats">
          heroes.thelazy.net
        </A>{" "}
        và <A href="https://vcmi.eu/players/Cheat_Codes">vcmi.eu</A>.
      </p>
    </>
  ),
};

const KEYBINDS_BASE = [
  {
    section: "Màn hình phiêu lưu (Adventure Screen)",
    rows: [
      ["A", "Menu tuỳ chọn phụ (Xem bản đồ, Đào đất, Xem lại lượt đối thủ...)"],
      ["B", "Huỷ di chuyển"],
      ["C", "Niệm phép"],
      ["D", "Đào tìm Grail"],
      ["E", "Qua ngày"],
      ["G", "Mở Den of Thieves (xem thông tin đối thủ)"],
      ["H", "Chọn tướng kế tiếp"],
      ["I", "Thông tin màn đang chơi"],
      ["K", "Tổng quan vương quốc (thành, tướng, tài nguyên)"],
      ["L", "Load game"],
      ["M", "Cho tướng đi theo lộ trình đã chọn"],
      ["N", "Chơi lại màn đang chơi từ đầu"],
      ["O", "Tuỳ chọn hệ thống"],
      ["P", "Bản đồ ghép hình tìm kho báu Grail (Puzzle Map)"],
      ["Q", "Quest log"],
      ["R", "Hiện phạm vi Dimension Door quanh tâm màn hình"],
      ["S", "Save game"],
      ["T", "Chọn thành kế tiếp"],
      ["U", "Chuyển giữa lòng đất và mặt đất"],
      ["V", "Xem toàn bản đồ"],
      ["W", "Đánh thức tướng"],
      ["Z", "Cho tướng ngủ"],
      ["F5", "Thanh công cụ (bật lưới và các công cụ khác)"],
      ["1 / 2", "Chọn phương án trong hộp thoại có lựa chọn"],
      ["Enter", "Mở chi tiết tướng/thành"],
      ["Shift + Nhấp trái tướng", "Chọn tướng đó làm tướng hiện hành"],
      ["Space", "Vào lại chỗ tướng đang đứng"],
      ["Alt + Shift + Nhấp trái tướng", "Giải tán tướng"],
      ["Giữ Alt + rê chuột lên ô", "Xem số điểm di chuyển cần để tới ô đó"],
    ],
  },
  {
    section: "Màn hình trao đổi giữa 2 tướng (Heroes Meeting Screen)",
    rows: [
      ["Q", "Đổi cả quân và đồ"],
      ["X / F11", "Đổi đồ"],
      ["Z / F10", "Đổi quân"],
    ],
  },
  {
    section: "Màn hình quản lý tướng (Hero Management)",
    rows: [["Shift + Nhấp ô trang bị", "Hiện đồ phù hợp trong ba lô cho ô đó"]],
  },
  {
    section: "Màn hình thành (Town Screen)",
    rows: [
      ["T", "Quán rượu (Tavern)"],
      ["S / Space", "Đổi tướng"],
      ["Z / F10", "Đổi đội quân đồn trú (garrison)"],
      ["D", "Sau khi nhấp một stack quân: chọn ô để chia stack"],
      ["M", "Khi tuyển quân: chọn số lượng tối thiểu/tối đa"],
      [
        "1 / 2 + Space",
        "Trong Tavern: chọn tướng bằng 1/2 rồi tuyển bằng Space",
      ],
      [
        "1–4 + Space",
        "Trong University: chọn kỹ năng bằng số rồi mua bằng Space/Enter",
      ],
      [
        "1–8 + Space",
        "Trong bảng tuyển quân: chọn lính bằng số rồi tuyển bằng Space",
      ],
      ["Alt + Shift + Nhấp trái tướng", "Giải tán tướng"],
      ["Mũi tên ↑/↓", "Chuyển sang thành trước/sau"],
    ],
  },
  {
    section: "Màn hình chiến đấu (Combat Screen)",
    rows: [
      ["A", "Tự động đánh (Autocombat)"],
      ["C", "Mở sách phép"],
      ["C (trong sách phép)", "Chuyển sang tab phép chiến đấu"],
      ["A (trong sách phép)", "Chuyển sang tab phép bản đồ phiêu lưu"],
      ["Mũi tên ←/→ (trong sách phép)", "Lật trang sách phép"],
      ["Esc / Enter (trong sách phép)", "Thoát sách phép"],
      ["D / Space", "Phòng thủ"],
      ["W", "Chờ (Wait)"],
      ["F", "Phép của quái (ví dụ Faerie Dragon)"],
      ["G", "Đòn đánh diện rộng hoặc phép của quái"],
      ["H", "Mở nhật ký chiến đấu (Esc/Space/Enter để đóng)"],
      ["I", "Bật/tắt bảng chỉ số tướng"],
      ["O", "Mở menu Tuỳ chọn chiến đấu"],
      ["L (trong Tuỳ chọn chiến đấu)", "Tải game"],
      ["M (trong Tuỳ chọn chiến đấu)", "Về Menu chính"],
      ["R (trong Tuỳ chọn chiến đấu)", "Chơi lại màn (Restart)"],
      [
        "Esc / Enter / Space (trong Tuỳ chọn chiến đấu)",
        "Thoát Tuỳ chọn chiến đấu",
      ],
      ["R", "Bỏ chạy (Retreat)"],
      ["S", "Đầu hàng (Surrender)"],
      ["T", "Xem thông tin stack quân hiện tại"],
      ["Z", "Bật/tắt thanh thứ tự lượt đi"],
      ["Alt", "Đổi giữa chế độ đánh và di chuyển"],
      ["Mũi tên ↑/↓", "Cuộn thông báo chiến đấu"],
      ["F6", "Bật/tắt lưới ô (hex grid)"],
      ["F7", "Bật/tắt bóng con trỏ chuột"],
      ["F8", "Bật/tắt bóng phạm vi di chuyển"],
    ],
  },
];

const KEYBINDS_HD = [
  {
    section: "Màn hình phiêu lưu (Adventure Screen)",
    rows: [
      [
        "Alt + Nhấp biểu tượng tướng/thành",
        "Đưa tướng/thành lên đầu danh sách",
      ],
      [
        "Chuột giữa / F5",
        "Mở menu nhanh (chợ, hội trộm, quick combat, vùng Dimension Door, xem lại lượt, bật lưới ô)",
      ],
      [
        "Rê chuột lên chân dung tướng",
        "Xem số điểm di chuyển còn lại của tướng",
      ],
      [
        "Nhấp phải cột xanh cạnh chân dung tướng",
        "Xem số điểm di chuyển còn lại của tướng (dạng số)",
      ],
      ["B", "Mở chợ (Marketplace)"],
      ["G", "Mở hội trộm (Thieves' Guild)"],
      ["Lăn chuột", "Cuộn danh sách thành"],
    ],
  },
  {
    section: "Màn hình trao đổi giữa 2 tướng (Heroes Meeting Screen)",
    rows: [
      ["F10", "Đổi toàn bộ quân giữa 2 tướng"],
      ["Giữ Alt khi chuyển quân", "Chuyển toàn bộ quân trừ 1 lính của stack"],
      ["Giữ Ctrl khi chuyển quân", "Chuyển 1 lính sang ô trống"],
      ["Giữ Shift khi chuyển quân", "Chuyển 1 lính sang ô có cùng loại lính"],
      ["Mũi tên →", "Đóng cửa sổ và chọn tướng bên phải"],
      ["Lăn chuột", "Cuộn xem đồ trong ba lô"],
    ],
  },
  {
    section: "Quản lý quân nhanh (Quick Army Management)",
    rows: [
      [
        "Shift + Nhấp quân",
        "Chia stack theo tỉ lệ thông minh (bỏ qua lính lẻ)",
      ],
      ["Alt + Nhấp quân", "Gộp tất cả stack cùng loại"],
      ["Alt + Shift + Nhấp quân", "Giải tán stack đang chọn"],
      ["Ctrl + Nhấp quân", "Tách 1 lính sang ô trống"],
      ["Ctrl + Shift + Nhấp quân", "Tách 1 lính ra tất cả ô trống"],
      ["Ctrl + Alt + Nhấp quân", "Chuyển stack sang tướng kia"],
      ["Ctrl + Alt + Shift + Nhấp quân", "Chuyển toàn bộ quân sang tướng"],
    ],
  },
  {
    section: "Quản lý đồ nhanh (Quick Artifacts Management)",
    rows: [
      ["Ctrl + Nhấp đồ", "Chuyển đồ sang tướng kia và mặc luôn"],
      ["Shift + Nhấp đồ", "Chuyển đồ vào ba lô của tướng kia"],
      ["Alt + Nhấp đồ", "Chuyển đồ giữa ô trang bị và ba lô"],
    ],
  },
  {
    section: "Bộ trang bị (Costumes)",
    rows: [
      ["Ctrl + 1–9", "Lưu bộ trang bị (chỉ ở màn tướng)"],
      ["1–9", "Trang bị bộ đã lưu (dùng ở màn tướng và phiêu lưu)"],
      ["0", "Trang bị lại bộ vừa dùng trước đó (tự lưu khi đổi costume)"],
      ["Shift trái + 1–9", "Trang bị bộ chồng lên trang bị đang mặc"],
    ],
  },
  {
    section: "Màn hình thành (Town Screen)",
    rows: [
      ["B", "Mở chợ (Marketplace)"],
      ["G", "Mở hội trộm (Thieves' Guild)"],
      ["F10", "Đổi quân với đội đồn trú"],
      ["Space", "Đổi tướng, hoặc chuyển tướng vào/ra đội đồn trú"],
      ["Nhấp biểu tượng thành", "Mua nhanh toàn bộ quân có sẵn"],
      ["Ctrl + Nhấp biểu tượng thành", "Mua toàn bộ quân, bỏ qua xác nhận"],
      [
        "Alt + Nhấp biểu tượng thành",
        "Mua toàn bộ quân (chưa nâng cấp), bỏ qua xác nhận",
      ],
      ["Nhấp biểu tượng lính", "Mua nhanh loại lính đó"],
      ["Ctrl + Nhấp biểu tượng lính", "Mua loại lính đó, bỏ qua xác nhận"],
      [
        "Alt + Nhấp biểu tượng lính",
        "Mua loại lính đó (chưa nâng cấp), bỏ qua xác nhận",
      ],
    ],
  },
  {
    section: "Màn hình chiến đấu (Combat Screen)",
    rows: [
      ["L", "Tải game đã lưu"],
      ["Q", "Kết thúc trận ngay (như auto, không phép, không animation)"],
      [
        "Shift + rê chuột lên quân",
        "Xem tốc độ có tính các quân khác trên sân",
      ],
      ["Ctrl + rê chuột lên quân", "Xem tốc độ bỏ qua các quân khác"],
      [
        "Nhấp chuột vào quân khi bố trận (Tactics)",
        "Chọn quân để sắp xếp vị trí",
      ],
    ],
  },
  {
    section: "Khác (Miscellaneous)",
    rows: [
      ["Chuột giữa / F5 (ở menu chính)", "Mở System Options"],
      ["Ctrl + C / Ctrl + V", "Copy/dán chữ"],
      ["Shift + Ins / Ctrl + Ins", "Dán/copy chữ (tổ hợp thay thế)"],
      ["Lăn chuột", "Điều khiển mọi thanh cuộn (danh sách, ba lô...)"],
      [
        "Nhấp đúp",
        "Chọn kỹ năng phụ khi lên cấp, hoặc chọn mục trong hộp thoại",
      ],
    ],
  },
];

const keybindRows = (groups) => groups.reduce((n, g) => n + g.rows.length, 0);
const KEYBIND_COUNT = keybindRows(KEYBINDS_BASE) + keybindRows(KEYBINDS_HD);

const keybindsPage = {
  id: "keybinds",
  name: "Phím tắt Heroes 3",
  subtitle: "Bảng tổng hợp phím tắt",
  icon: hdIcon,
  accent: "#c9a227",
  badge: { text: `${KEYBIND_COUNT} phím tắt`, title: "Số phím tắt" },
  content: (
    <>
      <Note title="Lưu ý">
        Có 2 bảng: bảng đầu là các phím tắt/thao tác chuột được bổ sung khi cài{" "}
        <b>HD Patch</b>; bảng sau là phím tắt của <b>bản gốc</b> (Complete/SoD,
        ERA/WoG, HotA). Đối với bản VCMI có thể sẽ khác đôi chút.
      </Note>

      <h2 className="section-title">Bảng 1 — Bổ sung khi cài HD Patch</h2>
      <KeybindsTable groups={KEYBINDS_HD} />
      <p className="cheat-source">
        Nguồn:{" "}
        <A href="https://sites.google.com/site/heroes3hd/eng/functionality">
          HoMM3 HD
        </A>
        .
      </p>

      <h2 className="section-title">Bảng 2 — Phím tắt bản gốc</h2>
      <KeybindsTable groups={KEYBINDS_BASE} />
      <p className="cheat-source">
        Nguồn:{" "}
        <A href="https://heroes.thelazy.net/index.php/Keybinds">
          heroes.thelazy.net
        </A>
        .
      </p>
    </>
  ),
};

const boardgamePage = {
  id: "boardgame",
  name: "Heroes 3 The Board Game",
  subtitle: "Chơi online hoặc mua box",
  icon: boardgameIcon,
  accent: "#c9a227",
  content: (
    <>
      <Section title="Giới thiệu">
        <p className="hint">
          Heroes of Might &amp; Magic III: The Board Game là phiên bản board
          game chính thức của Heroes 3, do Archon Studio (Ba Lan) phát triển với
          bản quyền từ Ubisoft. Game giữ đúng tinh thần bản PC: chọn phe, khám
          phá bản đồ, xây thành, chiêu mộ quân, phát triển tướng rồi lao vào
          những trận đánh quyết định.
        </p>
        <SysReq
          items={[
            {
              label: "Nhà phát triển",
              value:
                "Archon Studio (bản quyền Ubisoft), hợp tác cùng HotA Crew",
            },
            { label: "Số người chơi", value: "1–4 người" },
            { label: "Thời gian", value: "Khoảng 90 phút/ván" },
            { label: "Độ tuổi", value: "14+" },
            { label: "Chế độ chơi", value: "Đối kháng, hợp tác, chơi đơn" },
            {
              label: "Ngôn ngữ",
              value: "Tiếng Anh, Ba Lan, Đức, Pháp, Tây Ban Nha",
            },
          ]}
        />
      </Section>
      <Section title="Lối chơi">
        <p className="hint">
          <b>Khám phá bản đồ:</b> ván đấu bắt đầu với bản đồ bị sương mù che
          phủ, chỉ thấy khu vực quanh thành. Bản đồ được ghép dần từ các mảnh
          hình lục giác khi tướng đi khám phá.
        </p>
        <p className="hint">
          <b>Xây thành:</b> thu thập tài nguyên, tính toán kinh tế và xây công
          trình trên bảng thành hai lớp.
        </p>
        <p className="hint">
          <b>Chiêu mộ quân:</b> mỗi loại quân là một lá bài, lật sang mặt
          hologram để nâng cấp.
        </p>
        <p className="hint">
          <b>Phát triển tướng:</b> trang bị bảo vật, học phép từ bốn trường phái
          phép thuật, lên cấp để học và nâng kỹ năng, mỗi tướng có chuyên môn
          riêng.
        </p>
        <p className="hint">
          <b>Chiến đấu:</b> đánh trên chiến trường mở rộng với bộ mô hình
          (miniature), hoặc chỉ dùng bài trên bảng combat rút gọn cho nhanh.
        </p>
        <p className="hint">
          <b>Giải đấu:</b> có sẵn sách luật giải đấu (Tournament Book) cho ai
          thích đấu với bạn bè.
        </p>
      </Section>
      <Section title="Hộp game và các phần mở rộng">
        <SysReq
          items={[
            {
              label: "Hộp cơ bản",
              value:
                "Gồm Castle, Necropolis, Dungeon cùng 6 mô hình tướng, 3 bảng thành, 1 bảng combat, 20 mảnh bản đồ, 256 lá bài, 8 xúc xắc riêng, sách luật, sách nhiệm vụ và sách giải đấu.",
            },
            {
              label: "Kickstarter 2022",
              value:
                "Thêm Rampart, Fortress, Inferno, Tower, được sự ủng hộ đông đảo từ cộng đồng.",
            },
            {
              label: "Gamefound 2024",
              value:
                "Thêm Stronghold, Conflux và Cove (làm cùng HotA Crew, dựa trên phe Cove của HotA), kèm hầm ngầm, đảo, tàu thuyền và cổng dịch chuyển.",
            },
            {
              label: "Gamefound 2026",
              value:
                "Thêm Factory, Bulwark (2 phe từ HotA) và Forge – phe bị bỏ dở của Heroes 3, thiết kế cùng Gregory Fulton, một trong những người làm Heroes 3 gốc. Nâng tổng số lên 13 thành, Archon gọi đây có thể là đợt cuối cùng.",
            },
          ]}
        />
      </Section>
      <Section title="Đặt mua">
        <LinkRow
          label="Trang chính thức của Archon Studio"
          desc="Đặt mua box gốc và các box mở rộng."
          url="https://archon-studio.com/homm3boardgame"
          buttonText="Đặt mua"
        />
      </Section>
      <Section title="Chơi online">
        <LinkRow
          label="Heroes 3 The Board Game Online"
          desc="Bản online do tác giả người Việt phát triển (phi lợi nhuận), chơi nhiều người ngay trên trình duyệt mà không cần cài đặt."
          url="https://hamthefirt.xyz"
          buttonText="Mở link"
        />
        <LinkRow
          label="Facebook tác giả: Nguyen Thai Binh"
          url="https://www.facebook.com/thaibinh.nguyen.58"
          buttonText="Xem Facebook"
        />
      </Section>
    </>
  ),
};

const EXTRA_PAGES = [
  upcomingPage,
  webPage,
  keybindsPage,
  cheatPage,
  faqPage,
  seriesPage,
  boardgamePage,
];

const HOME_TITLE = "Heroes 3 VN by Gogetto";
const BASE_PATH = new URL(import.meta.url).pathname
  .split("/")
  .slice(0, -2)
  .concat("")
  .join("/");
const PAGE_PATHS = new Map(
  [...versions, ...EXTRA_PAGES].map((p) => [p.id, p.path ?? p.id]),
);
const PATH_IDS = new Map(
  [...PAGE_PATHS].flatMap(([id, path]) => [
    [id, id],
    [path.toLowerCase(), id],
  ]),
);

function pathOf(id) {
  return BASE_PATH + (PAGE_PATHS.has(id) ? PAGE_PATHS.get(id) + "/" : "");
}

function pageFromPath() {
  const path = location.pathname
    .slice(BASE_PATH.length)
    .split("/")
    .filter(Boolean)
    .join("/")
    .toLowerCase();
  return PATH_IDS.get(path) ?? "home";
}

function startupPage() {
  const id = new URLSearchParams(location.search).get("page");
  return PAGE_PATHS.has(id) ? id : "home";
}

const PAGE_OPTIONS = [
  { id: "home", name: "Trang chủ" },
  ...versions,
  ...EXTRA_PAGES,
];

function UpdateModal({ update, onClose }) {
  return (
    <Modal
      title="Kiểm tra cập nhật"
      icon={<RefreshCw size={18} />}
      onClose={onClose}
    >
      {update.status === "checking" && (
        <p className="donate-note">Đang kiểm tra phiên bản mới nhất...</p>
      )}
      {update.status === "update" && (
        <>
          <div className="update-versions">
            <div className="update-version-row">
              <span className="update-version-label">Phiên bản đang dùng</span>
              <span className="update-version-value">v{appVersion}</span>
            </div>
            <div className="update-version-row">
              <span className="update-version-label">Phiên bản mới nhất</span>
              <span className="update-version-value update-version-new">
                v{update.latest}
              </span>
            </div>
          </div>
          {update.notes && (
            <div className="update-changelog">
              <div className="update-changelog-title">
                Thay đổi v{update.latest}:
              </div>
              <div className="update-changelog-body">{update.notes}</div>
            </div>
          )}
          <div className="update-actions">
            <a
              className="btn"
              href={LATEST_RELEASE_URL}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={14} /> Tải bản mới
            </a>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Để sau
            </button>
          </div>
        </>
      )}
      {update.status === "latest" && (
        <>
          <p className="donate-note">
            Bác đang dùng phiên bản mới nhất (<b>v{appVersion}</b>).{" "}
            <ThumbsUp size={14} />
          </p>
          <div className="update-actions">
            <a className="btn" href={REPO_URL} target="_blank" rel="noreferrer">
              <ExternalLink size={14} /> Trang GitHub của tool
            </a>
          </div>
        </>
      )}
      {update.status === "error" && (
        <p className="donate-note">
          Không kiểm tra được cập nhật. Hãy kiểm tra kết nối mạng rồi thử lại.
        </p>
      )}
    </Modal>
  );
}

function DonateModal({ onClose }) {
  const tapsRef = useRef(0);
  const [showSecret, setShowSecret] = useState(false);
  const onQrTap = () => {
    tapsRef.current += 1;
    if (tapsRef.current >= 3) {
      tapsRef.current = 0;
      setShowSecret(true);
    }
  };
  return (
    <Modal
      title="Donate — VietinBank"
      icon={<Heart size={18} />}
      onClose={onClose}
    >
      <button
        type="button"
        className="donate-qr-btn"
        onClick={onQrTap}
        aria-label="QR Donate VietinBank"
      >
        <img className="donate-qr" src={donateQr} alt="QR Donate VietinBank" />
      </button>
      <p className="donate-note">Quét mã QR bằng app ngân hàng để ủng hộ em.</p>
      <p className="donate-thanks">Cảm ơn các bác đã sử dụng Heroes 3 VN!</p>
      {showSecret && (
        <ConfirmModal
          title="Thông báo"
          icon={<PartyPopper size={18} />}
          confirmText="Xem thử"
          cancelText="Thôi"
          confirmIcon={<ExternalLink size={14} />}
          onConfirm={() =>
            window.open(
              "https://justpaste.it/h3torrminatorr",
              "_blank",
              "noopener,noreferrer",
            )
          }
          onClose={() => setShowSecret(false)}
        >
          Chúc mừng, bác vừa khám phá ra tính năng ẩn của tool!
        </ConfirmModal>
      )}
    </Modal>
  );
}

const WINDOW_SIZE_OPTIONS = [
  {
    value: "1280x720",
    label: "1280 × 720 (HD, mặc định)",
    width: 1280,
    height: 720,
  },
  { value: "1366x768", label: "1366 × 768", width: 1366, height: 768 },
  { value: "1600x900", label: "1600 × 900 (HD+)", width: 1600, height: 900 },
  {
    value: "1920x1080",
    label: "1920 × 1080 (Full HD)",
    width: 1920,
    height: 1080,
  },
  { value: "maximized", label: "Phóng to toàn màn hình" },
];

function formatBytes(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function SettingsModal({ onClose, onCheckUpdate }) {
  const bridge = window.h3vn;
  const [windowSize, setWindowSize] = useState(null);
  const [workArea, setWorkArea] = useState(null);
  const [sizeSaved, setSizeSaved] = useState(false);
  const [defaultPage, setDefaultPage] = useState(null);
  const [pageSaved, setPageSaved] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [cacheSize, setCacheSize] = useState(null);
  const [cacheStatus, setCacheStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bridge?.getSettings) return;
    bridge
      .getSettings()
      .then((res) => {
        setWindowSize(res.settings.windowSize);
        setDefaultPage(
          PAGE_PATHS.has(res.settings.defaultPage)
            ? res.settings.defaultPage
            : "home",
        );
        setWorkArea(res.workArea);
      })
      .catch(() => setError("Không đọc được cài đặt."));
    bridge
      .getCacheSize()
      .then(setCacheSize)
      .catch(() => {});
  }, [bridge]);

  const onSizeChange = async (e) => {
    const { value } = e.target;
    setWindowSize(value);
    setSizeSaved(false);
    setResetDone(false);
    try {
      await bridge.setWindowSize(value);
      setSizeSaved(true);
    } catch {
      setError("Không lưu được kích thước cửa sổ.");
    }
  };

  const onPageChange = async (e) => {
    const { value } = e.target;
    setDefaultPage(value);
    setPageSaved(false);
    setResetDone(false);
    try {
      await bridge.setDefaultPage(value);
      setPageSaved(true);
    } catch {
      setError("Không lưu được tab mặc định.");
    }
  };

  const onReset = async () => {
    try {
      const settings = await bridge.resetSettings();
      setWindowSize(settings.windowSize);
      setDefaultPage(settings.defaultPage);
      setSizeSaved(false);
      setPageSaved(false);
      setCacheStatus(null);
      setResetDone(true);
    } catch {
      setError("Không đặt lại được cài đặt.");
    }
  };

  const onClearCache = async () => {
    setResetDone(false);
    setCacheStatus("clearing");
    try {
      const freed = await bridge.clearCache();
      clearModCache();
      setCacheSize(0);
      setCacheStatus(`Đã xoá ${formatBytes(freed)} cache.`);
    } catch {
      setCacheStatus(null);
      setError("Không xoá được cache.");
    }
  };

  return (
    <Modal title="Settings" icon={<Settings size={18} />} onClose={onClose}>
      <div className="settings">
        <div className="settings-item">
          <div className="settings-label">
            <RefreshCw size={15} /> Cập nhật tool
          </div>
          <div className="settings-row">
            <span className="settings-value">
              Phiên bản đang dùng: <b>v{appVersion}</b>
            </span>
            <button type="button" className="btn" onClick={onCheckUpdate}>
              <RefreshCw size={14} /> Check update
            </button>
          </div>
          <div className="settings-hint">
            Tool cũng tự kiểm tra bản mới mỗi lần mở.
          </div>
        </div>
        {bridge?.getSettings ? (
          <>
            <div className="settings-item">
              <label className="settings-label" htmlFor="settings-window-size">
                <Monitor size={15} /> Kích thước cửa sổ mặc định
              </label>
              <select
                id="settings-window-size"
                className="settings-select"
                value={windowSize ?? ""}
                disabled={windowSize === null}
                onChange={onSizeChange}
              >
                {WINDOW_SIZE_OPTIONS.map((o) => {
                  const tooBig =
                    workArea &&
                    o.width &&
                    (o.width > workArea.width || o.height > workArea.height);
                  return (
                    <option key={o.value} value={o.value} disabled={tooBig}>
                      {o.label}
                      {tooBig ? " — lớn hơn màn hình" : ""}
                    </option>
                  );
                })}
              </select>
              <div className="settings-hint">
                {sizeSaved ? (
                  <span className="settings-ok">
                    <Check size={13} /> Đã lưu và áp dụng ngay.
                  </span>
                ) : (
                  "Áp dụng ngay và được nhớ cho những lần mở tool sau."
                )}
              </div>
            </div>
            <div className="settings-item">
              <label className="settings-label" htmlFor="settings-default-page">
                <House size={15} /> Tab mặc định khi mở tool
              </label>
              <select
                id="settings-default-page"
                className="settings-select"
                value={defaultPage ?? ""}
                disabled={defaultPage === null}
                onChange={onPageChange}
              >
                {PAGE_OPTIONS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="settings-hint">
                {pageSaved ? (
                  <span className="settings-ok">
                    <Check size={13} /> Đã lưu, áp dụng từ lần mở tool sau.
                  </span>
                ) : (
                  "Tab hiển thị đầu tiên mỗi lần mở tool."
                )}
              </div>
            </div>
            <div className="settings-item">
              <div className="settings-label">
                <SlidersHorizontal size={15} /> Cài đặt khác
              </div>
              <div className="settings-row">
                <span className="settings-value">
                  Cache:{" "}
                  <b>{cacheSize === null ? "..." : formatBytes(cacheSize)}</b>
                </span>
                <div className="settings-actions">
                  <button
                    type="button"
                    className="btn"
                    disabled={cacheStatus === "clearing"}
                    onClick={onClearCache}
                  >
                    <Trash2 size={14} /> Xoá cache
                  </button>
                  <button type="button" className="btn" onClick={onReset}>
                    <RotateCcw size={14} /> Đặt lại
                  </button>
                </div>
              </div>
              <div className="settings-hint">
                {resetDone || (cacheStatus && cacheStatus !== "clearing") ? (
                  <span className="settings-ok">
                    <Check size={13} />{" "}
                    {resetDone
                      ? "Đã đặt lại cài đặt về mặc định."
                      : cacheStatus}
                  </span>
                ) : (
                  <>
                    Xoá cache khi tool hiển thị sai version.
                    <br />
                    Đặt lại: cửa sổ 1280 × 720, tab mặc định là Trang chủ.
                  </>
                )}
              </div>
            </div>
          </>
        ) : null}
        {error && <p className="settings-error">{error}</p>}
      </div>
    </Modal>
  );
}

function Sidebar({ page, setPage, onCheckUpdate }) {
  const [showDonate, setShowDonate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  return (
    <aside className="sidebar">
      <button
        type="button"
        className={"brand" + (page === "home" ? " active" : "")}
        onClick={() => setPage("home")}
      >
        <img className="brand-logo" src={brandLogo} alt="Heroes 3 VN" />
        <span className="brand-meta">
          <VietnamFlag className="vn-flag" title="Việt Nam" />{" "}
          <span className="brand-version">v{appVersion}</span>
        </span>
      </button>
      <nav>
        <div className="nav-group">Các phiên bản Heroes 3</div>
        {versions.map((v) => (
          <button
            key={v.id}
            type="button"
            className={"nav-item" + (page === v.id ? " active" : "")}
            style={{ "--accent": v.accent }}
            onClick={() => setPage(v.id)}
          >
            <span className="nav-icon">
              <img src={v.icon} alt="" />
            </span>
            <span>
              <span className="nav-name">{v.name}</span>
              <span className="nav-sub">{v.subtitle}</span>
            </span>
          </button>
        ))}
        <button
          type="button"
          className={"nav-item" + (page === upcomingPage.id ? " active" : "")}
          style={{ "--accent": upcomingPage.accent }}
          onClick={() => setPage(upcomingPage.id)}
        >
          <span className="nav-icon">
            <img src={upcomingPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{upcomingPage.name}</span>
            <span className="nav-sub">{upcomingPage.subtitle}</span>
          </span>
        </button>
        <div className="nav-group">Khác</div>
        <button
          type="button"
          className={"nav-item" + (page === webPage.id ? " active" : "")}
          style={{ "--accent": webPage.accent }}
          onClick={() => setPage(webPage.id)}
        >
          <span className="nav-icon">
            <img src={webPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{webPage.name}</span>
            <span className="nav-sub">{webPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === keybindsPage.id ? " active" : "")}
          style={{ "--accent": keybindsPage.accent }}
          onClick={() => setPage(keybindsPage.id)}
        >
          <span className="nav-icon">
            <img src={keybindsPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{keybindsPage.name}</span>
            <span className="nav-sub">{keybindsPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === cheatPage.id ? " active" : "")}
          style={{ "--accent": cheatPage.accent }}
          onClick={() => setPage(cheatPage.id)}
        >
          <span className="nav-icon">
            <img src={cheatPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{cheatPage.name}</span>
            <span className="nav-sub">{cheatPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === faqPage.id ? " active" : "")}
          style={{ "--accent": faqPage.accent }}
          onClick={() => setPage(faqPage.id)}
        >
          <span className="nav-icon">
            <img src={faqPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{faqPage.name}</span>
            <span className="nav-sub">{faqPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === seriesPage.id ? " active" : "")}
          style={{ "--accent": seriesPage.accent }}
          onClick={() => setPage(seriesPage.id)}
        >
          <span className="nav-icon">
            <img src={seriesPage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{seriesPage.name}</span>
            <span className="nav-sub">{seriesPage.subtitle}</span>
          </span>
        </button>
        <button
          type="button"
          className={"nav-item" + (page === boardgamePage.id ? " active" : "")}
          style={{ "--accent": boardgamePage.accent }}
          onClick={() => setPage(boardgamePage.id)}
        >
          <span className="nav-icon">
            <img src={boardgamePage.icon} alt="" />
          </span>
          <span>
            <span className="nav-name">{boardgamePage.name}</span>
            <span className="nav-sub">{boardgamePage.subtitle}</span>
          </span>
        </button>
      </nav>
      <div className="sidebar-footer">
        <button
          type="button"
          className="side-btn"
          onClick={() => setShowDonate(true)}
        >
          <Heart size={16} /> Donate VietinBank
        </button>
        {IS_WEB ? (
          <a
            className="side-btn"
            href={LATEST_RELEASE_URL}
            target="_blank"
            rel="noreferrer"
          >
            <Download size={16} /> Tải app Heroes 3 VN
          </a>
        ) : (
          <button
            type="button"
            className="side-btn"
            onClick={() => setShowSettings(true)}
          >
            <Settings size={16} /> Settings
          </button>
        )}
      </div>
      {showDonate && <DonateModal onClose={() => setShowDonate(false)} />}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onCheckUpdate={onCheckUpdate}
        />
      )}
    </aside>
  );
}

function Home({ setPage }) {
  return (
    <div className="page page-home">
      <header className="hero">
        <h1>Heroes III Việt Nam by Gogetto</h1>
        <p>
          Tool lưu trữ link tải/mua <b>Heroes 3</b> mọi phiên bản kèm hướng dẫn
          cài đặt.
        </p>
        <div className="home-note">
          <Info size={16} />{" "}
          <span>
            {IS_WEB
              ? "Mọi link trong tool đều mở trong tab mới"
              : "Mọi link trong tool đều mở bằng trình duyệt mặc định của máy"}
            , yêu cầu <PageLink to="faq">Windows 10/11</PageLink> để chơi ổn
            định và cài sẵn{" "}
            <A href="https://www.win-rar.com/download.html">WinRAR</A> hoặc{" "}
            <A href="https://www.7-zip.org/download.html">7-Zip</A> để giải nén.
          </span>
        </div>
      </header>
      <div className="card-grid">
        {versions.map((v) => (
          <button
            key={v.id}
            type="button"
            className="card"
            style={{ "--accent": v.accent }}
            onClick={() => setPage(v.id)}
          >
            <div className="card-icon">
              <img src={v.icon} alt="" />
            </div>
            <div className="card-name">{v.name}</div>
            <div className="card-sub">{v.subtitle}</div>
            <CardLatest id={v.id} />
            <p className="card-summary">{v.summary}</p>
            <div className="card-cta">
              Xem link tải &amp; hướng dẫn <ArrowRight size={14} />
            </div>
          </button>
        ))}
        <button
          type="button"
          className="card"
          style={{ "--accent": upcomingPage.accent }}
          onClick={() => setPage(upcomingPage.id)}
        >
          <div className="card-icon">
            <img src={upcomingPage.icon} alt="" />
          </div>
          <div className="card-name">{upcomingPage.name}</div>
          <div className="card-sub">{upcomingPage.subtitle}</div>
          <div className="card-latest">Heroes 3 Remake • DoR</div>
          <p className="card-summary">{upcomingPage.summary}</p>
          <div className="card-cta">
            Xem thông tin <ArrowRight size={14} />
          </div>
        </button>
      </div>
      <section className="support-banner">
        <div className="support-icon">
          <ScreenShare size={30} />
        </div>
        <div className="support-info">
          <div className="support-title">Cần người hỗ trợ cài đặt?</div>
          <p className="support-desc">
            Bác nào làm theo hướng dẫn mà vẫn chưa cài được, cứ nhắn tin
            Facebook cho em — em sẽ hỗ trợ cài trực tiếp từ xa qua{" "}
            <b>
              <A href="https://www.ultraviewer.net/vi/download.html">
                UltraViewer
              </A>
            </b>
            {", hoàn toàn miễn phí."}
          </p>
        </div>
        <a
          className="btn"
          href={SUPPORT_FB_URL}
          target="_blank"
          rel="noreferrer"
        >
          Inbox Gogetto <ExternalLink size={14} />
        </a>
      </section>
      <section className="choose">
        <h2 className="choose-title">Nên chọn bản nào?</h2>
        <div className="choose-list">
          {CHOOSE_GUIDE.map((g) => {
            const v = versions.find((x) => x.id === g.id);
            return (
              <button
                key={g.id}
                type="button"
                className="choose-row"
                style={{ "--accent": v.accent }}
                onClick={() => setPage(v.id)}
              >
                <img src={v.icon} alt="" />
                <span className="choose-name">{v.name}</span>
                <span className="choose-desc">{g.desc}</span>
                <ArrowRight size={15} />
              </button>
            );
          })}
        </div>
      </section>
      <section className="story">
        <h2 className="choose-title">Lý do tool ra đời</h2>
        <div className="story-box">
          <p>
            Trong group Heroes 3 VN, ngày nào cũng có người hỏi những câu quen
            thuộc: <i>“Tải Heroes 3 ở đâu?”</i>,{" "}
            <i>“HotA với ERA khác gì nhau?”</i>, <i>“Cài VCMI như thế nào?”</i>
            {"... Link tải/mua thì đến từ nhiều nguồn và rất khó tìm, "}
            phần lớn các trang đó cũng đều viết bằng tiếng Anh hoặc tiếng Nga
            rất khó tiếp cận.
          </p>
          <p>
            Kể cả đã tìm được link tải/mua chuẩn, nhiều người vẫn không biết
            cách cài đặt thế nào vì các trang đó không hề có hướng dẫn chi tiết
            hoặc có nhưng rất sơ sài.
          </p>
          <p>
            Vì vậy tool này ra đời để gom tất cả về một chỗ: link tải/mua chính
            thức của mọi phiên bản Heroes 3 cùng hướng dẫn cài đặt từng bước
            bằng tiếng Việt để bất kỳ ai cũng có thể tự cài đặt và tận hưởng tựa
            game huyền thoại này.
          </p>
          <p>
            Tool này là dự án phi lợi nhuận làm tặng cộng đồng, không liên quan
            đến Ubisoft hay bất kỳ tổ chức nào.
          </p>
        </div>
      </section>
      <section className="support-banner">
        <div className="support-icon">
          <Users size={30} />
        </div>
        <div className="support-info">
          <div className="support-title">Group Facebook</div>
          <p className="support-desc">
            Tham gia nhóm Facebook chính thức của Heroes 3 VN.
          </p>
        </div>
        <a className="btn" href={GROUP_FB_URL} target="_blank" rel="noreferrer">
          Tham gia group <ExternalLink size={14} />
        </a>
      </section>
      <section className="support-banner">
        <div className="support-icon">
          <Users size={30} />
        </div>
        <div className="support-info">
          <div className="support-title">Server Discord</div>
          <p className="support-desc">
            Tham gia máy chủ Discord chính thức của Heroes 3 VN.
          </p>
        </div>
        <a className="btn" href={DISCORD_URL} target="_blank" rel="noreferrer">
          Tham gia server <ExternalLink size={14} />
        </a>
      </section>
    </div>
  );
}

function PageIcon({ version }) {
  return <img src={version.icon} alt="" />;
}

function ScrollButtons({ scrollRef, page }) {
  const [open, setOpen] = useState(false);
  const [canUp, setCanUp] = useState(false);
  const [canDown, setCanDown] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setCanUp(scrollTop > 20);
      setCanDown(scrollTop + clientHeight < scrollHeight - 20);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollRef, page]);

  useEffect(() => setOpen(false), [page]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const scrollTo = (top) =>
    scrollRef.current?.scrollTo({ top, behavior: "smooth" });

  return (
    <div className={`scroll-menu${open ? " open" : ""}`} ref={menuRef}>
      <button
        type="button"
        className="scroll-btn scroll-btn-sm"
        title="Lên đầu trang"
        aria-label="Lên đầu trang"
        disabled={!canUp}
        onClick={() => scrollTo(0)}
      >
        <ArrowUp size={18} />
      </button>
      <button
        type="button"
        className="scroll-btn scroll-btn-sm"
        title="Xuống cuối trang"
        aria-label="Xuống cuối trang"
        disabled={!canDown}
        onClick={() => scrollTo(scrollRef.current?.scrollHeight ?? 0)}
      >
        <ArrowDown size={18} />
      </button>
      <button
        type="button"
        className="scroll-btn scroll-toggle"
        title="Cuộn trang"
        aria-label="Menu cuộn trang"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <ChevronsUpDown size={20} />
      </button>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(() =>
    IS_WEB ? pageFromPath() : startupPage(),
  );
  const [update, setUpdate] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef(null);
  const go = useCallback((id) => {
    setPage(id);
    setMenuOpen(false);
    if (IS_WEB && location.pathname !== pathOf(id)) {
      history.pushState(null, "", pathOf(id));
    }
  }, []);
  const version =
    versions.find((v) => v.id === page) ||
    EXTRA_PAGES.find((p) => p.id === page) ||
    null;

  useEffect(() => {
    if (!IS_WEB) return;
    const path = pathOf(pageFromPath());
    if (location.pathname !== path) {
      history.replaceState(null, "", path + location.search + location.hash);
    }
    const onPop = () => setPage(pageFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (IS_WEB) {
      document.title = version ? `Heroes 3 VN | ${version.name}` : HOME_TITLE;
    }
  }, [version]);

  const checkUpdate = useCallback(async (manual) => {
    if (manual) setUpdate({ status: "checking" });
    try {
      const { version: latest, notes } = await fetchLatestRelease();
      if (compareVersions(appVersion, latest) < 0) {
        setUpdate({ status: "update", latest, notes });
      } else if (manual) {
        setUpdate({ status: "latest", latest });
      }
    } catch {
      if (manual) setUpdate({ status: "error" });
    }
  }, []);

  useEffect(() => {
    if (!IS_WEB) checkUpdate(false);
  }, [checkUpdate]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <NavContext.Provider value={go}>
      <div className={"layout" + (menuOpen ? " menu-open" : "")}>
        <header className="mobile-bar">
          <div className="mobile-bar-side">
            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Mở menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={22} />
            </button>
          </div>
          <button
            type="button"
            className="mobile-brand"
            onClick={() => go("home")}
          >
            <img src={brandLogo} alt="Heroes 3 VN" />
          </button>
          <div className="mobile-bar-side mobile-bar-right">
            <VietnamFlag className="mobile-flag" title="Việt Nam" />
            <span className="mobile-version">v{appVersion}</span>
          </div>
        </header>
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Đóng menu"
          tabIndex={-1}
          onClick={() => setMenuOpen(false)}
        />
        <Sidebar
          page={page}
          setPage={go}
          onCheckUpdate={() => checkUpdate(true)}
        />
        {update && (
          <UpdateModal update={update} onClose={() => setUpdate(null)} />
        )}
        <main className="content" key={page} ref={contentRef}>
          {version ? (
            <div className="page" style={{ "--accent": "var(--gold)" }}>
              <header className="page-header">
                <div className="page-icon">
                  <PageIcon version={version} />
                </div>
                <div>
                  <h1>{version.name}</h1>
                  <div className="page-sub">{version.subtitle}</div>
                </div>
                <div className="page-header-side">
                  {version.badge ? (
                    <div className="mod-latest" title={version.badge.title}>
                      <span className="mod-latest-part">
                        {version.badge.text}
                      </span>
                    </div>
                  ) : (
                    <ModLatest id={version.id} />
                  )}
                  {CHANGELOG_URLS[version.id] && (
                    <a
                      className="changelog-btn"
                      href={CHANGELOG_URLS[version.id]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ScrollText size={14} /> Changelog
                    </a>
                  )}
                </div>
              </header>
              {version.content}
            </div>
          ) : (
            <Home setPage={go} />
          )}
        </main>
        <ScrollButtons scrollRef={contentRef} page={page} />
      </div>
    </NavContext.Provider>
  );
}
