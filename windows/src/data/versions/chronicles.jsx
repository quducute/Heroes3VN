import { Fragment } from "react";
import {
  Quote,
  Note,
  PageLink,
  Section,
  SysReq,
  LinkRow,
  Steps,
} from "../../components/ui.jsx";
import iconChronicles from "../../assets/icons/chronicles.webp";
import { SYSREQ_BASE } from "./shared.jsx";

export const chronicles = {
  id: "chronicles",
  path: "Chronicles",
  name: "Chronicles",
  subtitle: "Campaign series",
  icon: iconChronicles,
  accent: "color-mix(in srgb, burlywood 89%, black)",
  summary:
    "Series Heroes 3 campaign gồm 8 chapters với cốt truyện liên kết chặt chẽ, cài Patch HD cho Chronicles để có thêm chapter thứ 9.",
  content: (
    <>
      <Quote>
        &quot;Một series Heroes 3 campaign được ra mắt vào cuối năm 2000 bao gồm
        8 chapters với cốt truyện liên kết với nhau chặt chẽ.&quot;
      </Quote>
      <Note title="Chỉ dùng được bản GOG">
        Patch HD cho Chronicles chỉ dùng được file cài của{" "}
        <b>Heroes Chronicles GOG</b> và{" "}
        <PageLink to="complete">Heroes 3 Complete GOG</PageLink>, bản Steam
        không dùng được.
      </Note>

      <Section title="Danh sách 8 chapters">
        <ol className="chapter-list">
          <li>Warlords of the Wastelands</li>
          <li>Conquest of the Underworld</li>
          <li>Masters of the Elements</li>
          <li>Clash of the Dragons</li>
          <li>The World Tree</li>
          <li>The Fiery Moon</li>
          <li>Revolt of the Beastmasters</li>
          <li>The Sword of Frost</li>
        </ol>
        <Note title="Chapter thứ 9">
          Khi cài Patch HD cho Chronicles sẽ có thêm chapter thứ 9:{" "}
          <b>The Glory of War</b>.
        </Note>
      </Section>

      <Section title="Cấu hình tối thiểu">
        <SysReq items={SYSREQ_BASE} />
      </Section>

      <Section title="Link game">
        <LinkRow
          label="8 chapters đầu của Chronicles (GOG)"
          url="https://www.gog.com/en/game/heroes_chronicles_all_chapters"
          buttonText="Mua trên GOG"
        />
        <LinkRow
          label="Patch HD và chapter 9 cho Chronicles (ModDB)"
          url="https://www.moddb.com/mods/heroes-chronicles-fully-compability-hdmod/downloads"
        />
      </Section>

      <Section title="Hướng dẫn cài">
        <Steps
          items={[
            "Sau khi mua game trên GOG thì sẽ có 8 file setup tương ứng với 8 chapters, chapter thứ 9 cần cài thêm Patch HD.",
            <Fragment key="chronicles-hd-step">
              Đối với Patch HD, yêu cầu máy phải cài thêm cả{" "}
              <PageLink to="complete">Heroes 3 Complete GOG</PageLink>. Khi đã
              cài Complete rồi thì cài Patch HD vào thư mục Complete, nó sẽ tự
              nhận diện các thư mục còn lại của 8 chapters Chronicles.
            </Fragment>,
          ]}
        />
      </Section>

      <Section title="Chơi Chronicles trên VCMI">
        <p>
          Ngoài bản gốc, bác còn có thể chơi Heroes Chronicles bằng engine{" "}
          <PageLink to="vcmi">VCMI</PageLink> (chơi được trên điện thoại và
          nhiều hệ điều hành khác). Yêu cầu đã cài VCMI đầy đủ kèm dữ liệu{" "}
          <PageLink to="complete">Complete GOG</PageLink>.
        </p>
        <Steps
          items={[
            "Mở VCMI Launcher, bấm nút Install file rồi chọn (các) file cài GOG đã mua để VCMI tự trích xuất dữ liệu.",
            "Chờ VCMI xử lý xong (có thể khá lâu, nhất là trên điện thoại, và cần dung lượng trống tạm thời), rồi vào mục chọn campaign trong game là chơi được.",
            "VCMI sẽ không cài được chapter thứ 9 (The Glory of War) vì Patch HD cho Chronicles không hỗ trợ VCMI. Nếu muốn chơi chapter 9 thì phải cài bản gốc trên Windows.",
          ]}
        />
        <Note>
          Các bước chi tiết cho từng nền tảng xem tại trang hướng dẫn chính thức
          của VCMI.
        </Note>
        <LinkRow
          label="Hướng dẫn cài Chronicles cho VCMI"
          url="https://vcmi.eu/players/Heroes_Chronicles/"
        />
      </Section>
    </>
  ),
};
