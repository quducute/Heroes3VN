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
  summary: (
    <>
      Series Heroes 3 campaign gồm 8 chapters với cốt truyện liên kết chặt chẽ,
      cài <b>Patch HD</b> cho <b>Chronicles</b> để có thêm chapter thứ 9.
    </>
  ),
  content: (
    <>
      <Quote>
        &quot;Một series Heroes 3 campaign được ra mắt vào cuối năm 2000 bao gồm
        8 chapters với cốt truyện liên kết với nhau chặt chẽ.&quot;
      </Quote>
      <Note title="Chỉ dùng được bản GOG">
        <b>Patch HD</b> cho <b>Chronicles</b> chỉ dùng được file cài của{" "}
        <b>Heroes Chronicles GOG</b> và{" "}
        <PageLink to="complete">
          <b>Heroes 3 Complete GOG</b>
        </PageLink>
        , bản Steam không dùng được.
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
          Khi cài <b>Patch HD</b> cho <b>Chronicles</b> sẽ có thêm chapter thứ
          9: <b>The Glory of War</b>.
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
            <Fragment key="chronicles-step-1">
              Sau khi mua game trên GOG thì sẽ có 8 file setup tương ứng với 8
              chapters, chapter thứ 9 cần cài thêm <b>Patch HD</b>.
            </Fragment>,
            <Fragment key="chronicles-hd-step">
              Đối với <b>Patch HD</b>, yêu cầu máy phải cài thêm cả{" "}
              <PageLink to="complete">
                <b>Heroes 3 Complete GOG</b>
              </PageLink>
              . Khi đã cài <b>Complete</b> rồi thì cài <b>Patch HD</b> vào thư
              mục <b>Complete</b>, nó sẽ tự nhận diện các thư mục còn lại của 8
              chapters <b>Chronicles</b>.
            </Fragment>,
          ]}
        />
      </Section>

      <Section title="Chơi Chronicles trên VCMI">
        <p>
          Ngoài bản gốc, bác còn có thể chơi <b>Heroes Chronicles</b> bằng
          engine{" "}
          <PageLink to="vcmi">
            <b>VCMI</b>
          </PageLink>{" "}
          (chơi được trên điện thoại và nhiều hệ điều hành khác). Yêu cầu đã cài{" "}
          <b>VCMI</b> đầy đủ kèm dữ liệu{" "}
          <PageLink to="complete">
            <b>Complete GOG</b>
          </PageLink>
          .
        </p>
        <Steps
          items={[
            <Fragment key="chronicles-step-2">
              Mở <b>VCMI Launcher</b>, bấm nút Install file rồi chọn (các) file
              cài GOG đã mua để <b>VCMI</b> tự trích xuất dữ liệu.
            </Fragment>,
            <Fragment key="chronicles-step-3">
              Chờ <b>VCMI</b> xử lý xong (có thể khá lâu, nhất là trên điện
              thoại, và cần dung lượng trống tạm thời), rồi vào mục chọn
              campaign trong game là chơi được.
            </Fragment>,
            <Fragment key="chronicles-step-4">
              <b>VCMI</b> sẽ không cài được chapter thứ 9 (The Glory of War) vì{" "}
              <b>Patch HD</b> cho <b>Chronicles</b> không hỗ trợ <b>VCMI</b>.
              Nếu muốn chơi chapter 9 thì phải cài bản gốc trên Windows.
            </Fragment>,
          ]}
        />
        <Note>
          Các bước chi tiết cho từng nền tảng xem tại trang hướng dẫn chính thức
          của <b>VCMI</b>.
        </Note>
        <LinkRow
          label="Hướng dẫn cài Chronicles cho VCMI"
          url="https://vcmi.eu/players/Heroes_Chronicles/"
        />
      </Section>
    </>
  ),
};
