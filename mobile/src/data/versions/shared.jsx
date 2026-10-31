import {
  Section,
  Steps,
  P,
  Code,
  Screenshot,
  Note,
  PageLink,
  LinkRow,
} from "../../components/ui";
import caiTemplate from "../../assets/images/cai-template.webp";
import chonTemplate from "../../assets/images/chon-template.webp";
import inviteTavern from "../../assets/images/invite-tavern.webp";

export function TavernInvite() {
  return (
    <Section title="Mẹo: Bật chức năng mời tướng trong Tavern (nhà mua tướng)">
      <Steps
        items={[
          "Mở HD Launcher rồi chuyển sang tab Tweaks.",
          <P key="tavern-tweak">
            Tìm dòng <Code>{"<UI.Tavern.InviteHero>"}</Code> và sửa từ{" "}
            <Code>0</Code> sang <Code>1</Code>.
          </P>,
          "Khi vào game mua tướng, trong Tavern sẽ có một ô để mời tướng xuất hiện tiếp theo, chọn con tướng muốn xuất hiện trong ô đấy và mua một con tướng đang có sẵn. Sau khi đã mua con tướng đang có sẵn đó thì con tướng đã mời sẽ xuất hiện vào ô vừa mua ở trong Tavern.",
        ]}
      />
      <Screenshot
        source={inviteTavern}
        caption="Tab Tweaks trong HD Launcher: sửa <UI.Tavern.InviteHero> thành 1"
      />
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
        <P>
          Phân biệt rõ Random Map Template (<Code>rmg.txt</Code> hoặc{" "}
          <Code>.h3t</Code>) và File Map (<Code>.h3m</Code>), đây là{" "}
          <PageLink to="faq">hai khái niệm khác nhau</PageLink>.
        </P>
        <P>
          Các Template hỗ trợ tạo map size to (G, XH, H...) thường có tiền tố
          XXL ở đầu tên.
        </P>
        <P>
          Có thể cài nhiều Template cùng một lúc, miễn là các Template nằm ở thư
          mục riêng (đối với <Code>rmg.txt</Code>) và file riêng (đối với{" "}
          <Code>.h3t</Code>).
        </P>
      </Note>
      <Screenshot
        source={caiTemplate}
        caption="Hướng dẫn cài Random Map Template cho Complete, ERA và HotA"
      />
      <Screenshot
        source={chonTemplate}
        caption="Chọn Template trong màn hình Random Map Setup"
      />
    </>
  );
}

export function RmgTemplates({ needsHd }) {
  return (
    <Section title="Random Map Templates">
      {needsHd ? (
        <Note>
          <P>
            Cần cài HD Patch thì mới có thư mục <Code>_HD3_Data\Templates</Code>{" "}
            và chọn được Template trong game.
          </P>
        </Note>
      ) : null}
      <LinkRow
        label="Tổng hợp Random Map Templates (8XM8, 8XM8a...)"
        desc={
          <P>
            Gói Template dạng <Code>rmg.txt</Code>, dùng chung cho Complete và
            ERA.
          </P>
        }
        url={RMG_PACK_URL}
      />
      <Steps
        items={[
          "Tải gói Random Map Templates ở link trên.",
          <P key="rmg-extract">
            Chọn Template cần cài (ví dụ 8XM8, 8XM8a...) và giải nén để lấy file{" "}
            <Code>rmg.txt</Code> của Template đó.
          </P>,
          <P key="rmg-copy">
            Vào thư mục game, tìm thư mục <Code>_HD3_Data\Templates</Code>, tạo
            một thư mục mới mang tên Template (ví dụ <Code>8XM8</Code>) rồi copy
            file <Code>rmg.txt</Code> vào đó.
          </P>,
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
