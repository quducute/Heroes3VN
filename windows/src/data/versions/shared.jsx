import { Fragment } from "react";
import {
  Section,
  Steps,
  Screenshot,
  Note,
  PageLink,
  LinkRow,
} from "../../components/ui.jsx";
import caiTemplate from "../../assets/images/cai-template.webp";
import chonTemplate from "../../assets/images/chon-template.webp";
import inviteTavern from "../../assets/images/invite-tavern.webp";

export function TavernInvite() {
  return (
    <Section title="Mẹo: Bật chức năng mời tướng trong Tavern (nhà mua tướng)">
      <Steps
        items={[
          <Fragment key="shared-step-1">
            Mở <b>HD Launcher</b> rồi chuyển sang tab Tweaks.
          </Fragment>,
          <Fragment key="tavern-tweak">
            Tìm dòng <code>{"<UI.Tavern.InviteHero>"}</code> và sửa từ{" "}
            <code>0</code> sang <code>1</code>.
          </Fragment>,
          "Khi vào game mua tướng, trong Tavern sẽ có một ô để mời tướng xuất hiện tiếp theo, chọn con tướng muốn xuất hiện trong ô đấy và mua một con tướng đang có sẵn. Sau khi đã mua con tướng đang có sẵn đó thì con tướng đã mời sẽ xuất hiện vào ô vừa mua ở trong Tavern.",
        ]}
      />
      <div className="shot-grid">
        <Screenshot
          src={inviteTavern}
          caption="Tab Tweaks trong HD Launcher: sửa <UI.Tavern.InviteHero> thành 1"
        />
      </div>
    </Section>
  );
}

const RMG_PACK_URL =
  "https://drive.google.com/drive/folders/10AP3FCpHCn4hhrsPy14nqzVtBRGAcu0t?usp=sharing";

export const RMG_PLAY_STEP =
  "Vào game, chọn New Game → Single Scenario → Random Map, Template vừa cài sẽ hiện trong danh sách ở mục Template.";

export function TemplateGuide() {
  return (
    <>
      <Note title="Một số lưu ý">
        <div className="faq-lines">
          <div>
            Phân biệt rõ Random Map Template (<code>rmg.txt</code> hoặc{" "}
            <code>.h3t</code>) và File Map (<code>.h3m</code>), đây là{" "}
            <PageLink to="faq">hai khái niệm khác nhau</PageLink>.
          </div>
          <div>
            Các Template hỗ trợ tạo map size to (G, XH, H...) thường có tiền tố
            XXL ở đầu tên.
          </div>
          <div>
            Có thể cài nhiều Template cùng một lúc, miễn là các Template nằm ở
            thư mục riêng (đối với <code>rmg.txt</code>) và file riêng (đối với{" "}
            <code>.h3t</code>).
          </div>
        </div>
      </Note>
      <div className="shot-grid shot-stack">
        <Screenshot
          src={caiTemplate}
          caption="Hướng dẫn cài Random Map Template cho Complete, ERA và HotA"
        />
        <Screenshot
          src={chonTemplate}
          caption="Chọn Template trong màn hình Random Map Setup"
        />
      </div>
    </>
  );
}

export function RmgTemplates({ needsHd }) {
  return (
    <Section title="Random Map Templates">
      {needsHd && (
        <Note>
          Cần cài <b>HD Patch</b> thì mới có thư mục{" "}
          <code>_HD3_Data\Templates</code> và chọn được Template trong game.
        </Note>
      )}
      <LinkRow
        label="Tổng hợp Random Map Templates (8XM8, 8XM8a...)"
        desc={
          <>
            Gói Template dạng <code>rmg.txt</code>, dùng chung cho{" "}
            <b>Complete</b> và <b>ERA</b>.
          </>
        }
        url={RMG_PACK_URL}
      />
      <Steps
        items={[
          "Tải gói Random Map Templates ở link trên.",
          <Fragment key="rmg-extract">
            Chọn Template cần cài (ví dụ 8XM8, 8XM8a...) và giải nén để lấy file{" "}
            <code>rmg.txt</code> của Template đó.
          </Fragment>,
          <Fragment key="rmg-copy">
            Vào thư mục game, tìm thư mục <code>_HD3_Data\Templates</code>, tạo
            một thư mục mới mang tên Template (ví dụ <code>8XM8</code>) rồi copy
            file <code>rmg.txt</code> vào đó.
          </Fragment>,
          RMG_PLAY_STEP,
        ]}
      />
      <TemplateGuide />
    </Section>
  );
}

export const SYSREQ_BASE = [
  { label: "Hệ điều hành", value: "Windows 10/11" },
  { label: "CPU", value: "1.8 GHz trở lên" },
  { label: "RAM", value: "2 GB" },
  { label: "Đồ hoạ", value: "3D graphics card compatible with DirectX 9.0c" },
];
