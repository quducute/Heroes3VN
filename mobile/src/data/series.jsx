import { PageLink, B, P } from "../components/ui";

export const SERIES_GROUPS = [
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
        desc: (
          <P>
            Tái hiện lại Heroes 2 dưới dạng một mod của <B>Heroes 3 ERA</B>.
          </P>
        ),
        url: "https://www.moddb.com/mods/h3sw/downloads",
      },
    ],
  },
  {
    title: "Heroes 3 HD Edition (Ubisoft)",
    note: (
      <>
        <B>HD Edition</B> chỉ là bản làm lại đồ hoạ của bản gốc{" "}
        <B>Restoration of Erathia</B> (1999), không có 2 bản mở rộng{" "}
        <B>Armageddon&apos;s Blade</B> và <B>Shadow of Death</B> nên thiếu thành
        Conflux, các campaign, đồ ghép (combination artifacts) và Random Map
        Generator. Bản này cũng không chạy được <B>HotA</B>, <B>ERA</B>,{" "}
        <B>HD Patch</B> hay phần lớn mod và map của cộng đồng, và gần như không
        ai chơi online trên bản này. Nên mua{" "}
        <PageLink to="complete">
          bản <B>Complete</B> trên GOG
        </PageLink>{" "}
        (đủ các phần mở rộng) rồi cài thêm <B>HD Patch</B> miễn phí để có đồ hoạ
        độ phân giải cao và màn hình rộng.
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
        desc: (
          <P>
            Mod không chính thức cho <B>HD Edition</B>: sửa nhiều lỗi crash và
            bổ sung Random Map Generator (cần có bản <B>Complete/SoD</B>).
          </P>
        ),
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
        desc: (
          <P>
            Addon mở rộng của mod <B>Heroes 5.5</B>, thêm nhiều thứ hay ho hơn
            nữa.
          </P>
        ),
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

export const SERIES_BUNDLES = [
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
