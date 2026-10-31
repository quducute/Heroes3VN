import { Note, KeybindsTable, A, PageLink } from "../components/ui.jsx";
import hdIcon from "../assets/icons/hd.webp";
import { KEYBINDS_BASE, KEYBINDS_HD } from "../data/keybinds.js";

const keybindRows = (groups) => groups.reduce((n, g) => n + g.rows.length, 0);

const KEYBIND_COUNT = keybindRows(KEYBINDS_BASE) + keybindRows(KEYBINDS_HD);

export const keybindsPage = {
  id: "keybinds",
  name: "Phím tắt Heroes 3",
  subtitle: "Bảng tổng hợp phím tắt",
  icon: hdIcon,
  accent: "goldenrod",
  badge: { text: `${KEYBIND_COUNT} phím tắt`, title: "Số phím tắt" },
  content: (
    <>
      <Note title="Lưu ý">
        Có 2 bảng: bảng đầu là các phím tắt/thao tác chuột được bổ sung khi cài{" "}
        <PageLink to="complete">
          <b>HD Patch</b>
        </PageLink>
        ; bảng sau là phím tắt của <b>bản gốc</b> (<b>Complete/SoD</b>,{" "}
        <b>ERA/WoG</b>, <b>HotA</b>). Đối với bản{" "}
        <PageLink to="vcmi">
          <b>VCMI</b>
        </PageLink>{" "}
        có thể sẽ khác đôi chút.
      </Note>

      <h2 className="section-title">Bảng 1 - Bổ sung khi cài HD Patch</h2>
      <KeybindsTable groups={KEYBINDS_HD} />
      <p className="cheat-source">
        Nguồn:{" "}
        <A href="https://sites.google.com/site/heroes3hd/eng/functionality">
          HoMM3 HD
        </A>
        .
      </p>

      <h2 className="section-title">Bảng 2 - Phím tắt bản gốc</h2>
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
