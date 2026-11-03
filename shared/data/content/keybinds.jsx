import {
  Note,
  P,
  B,
  PageLink,
  KeybindsTable,
  A,
  Source,
  TableTitle,
  Searchable,
} from "@ui";
import { KEYBINDS_BASE, KEYBINDS_HD } from "../keybinds.js";

const keybindRows = (groups) => groups.reduce((n, g) => n + g.rows.length, 0);

export const KEYBIND_COUNT =
  keybindRows(KEYBINDS_BASE) + keybindRows(KEYBINDS_HD);

export const KEYBINDS_CONTENT = (
  <>
    <Note>
      <P>
        Có 2 bảng: bảng đầu là các phím tắt/thao tác chuột được bổ sung khi cài{" "}
        <PageLink to="complete">
          <B>HD Patch</B>
        </PageLink>
        ; bảng sau là phím tắt của <B>bản gốc</B> (<B>Complete/SoD</B>,{" "}
        <B>ERA/WoG</B>, <B>HotA</B>). Đối với bản{" "}
        <PageLink to="vcmi">
          <B>VCMI</B>
        </PageLink>{" "}
        có thể sẽ khác đôi chút.
      </P>
    </Note>

    <Searchable placeholder="Tìm theo phím hoặc chức năng">
      <TableTitle>Bảng 1 - Bổ sung khi cài HD Patch</TableTitle>
      <KeybindsTable groups={KEYBINDS_HD} />
      <Source>
        Nguồn:{" "}
        <A href="https://sites.google.com/site/heroes3hd/eng/functionality">
          HoMM3 HD
        </A>
        .
      </Source>

      <TableTitle>Bảng 2 - Phím tắt bản gốc</TableTitle>
      <KeybindsTable groups={KEYBINDS_BASE} />
      <Source>
        Nguồn:{" "}
        <A href="https://heroes.thelazy.net/index.php/Keybinds">
          heroes.thelazy.net
        </A>
        .
      </Source>
    </Searchable>
  </>
);
