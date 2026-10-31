import { Note, PageLink, CheatTable, A } from "../components/ui.jsx";
import cheatIcon from "../assets/icons/cheat.webp";
import { CHEATS } from "../data/cheats.js";

const CHEAT_COUNT = CHEATS.length;

export const cheatPage = {
  id: "cheat",
  name: "Mã cheat Heroes 3",
  subtitle: "Bảng tổng hợp mã cheat",
  icon: cheatIcon,
  accent: "goldenrod",
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
