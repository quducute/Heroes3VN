import { Fragment } from "react";
import {
  Quote,
  Note,
  A,
  Section,
  SysReq,
  LinkRow,
  Screenshot,
  Steps,
  PageLink,
} from "../../components/ui.jsx";
import { HEROES_LAUNCHER_URL } from "../links.js";
import iconEra from "../../assets/icons/era.webp";
import menuSettings from "../../assets/images/menu-settings.webp";
import era1 from "../../assets/era/era-01-launcher-install.webp";
import era2 from "../../assets/era/era-02-select-folder.webp";
import era3 from "../../assets/era/era-03-install-new-folder.webp";
import era4 from "../../assets/era/era-04-launcher-play.webp";
import era5 from "../../assets/era/era-05-wog-options.webp";
import era6 from "../../assets/era/era-06-mod.webp";
import era7 from "../../assets/era/era-07-update-hd-vs-era.webp";
import era8 from "../../assets/era/era-08-trainerx.webp";
import era9 from "../../assets/era/era-09-old.webp";
import era10 from "../../assets/era/era-10-new.webp";
import { RmgTemplates, TavernInvite } from "./shared.jsx";

export const era = {
  id: "era",
  path: "ERA",
  name: "ERA",
  subtitle: "Tên cũ: WoG",
  icon: iconEra,
  accent: "slateblue",
  summary: (
    <>
      Hậu duệ của <b>WoG 3.58f</b> huyền thoại, fix các lỗi còn tồn đọng, thêm
      nhiều script mới và hệ thống <b>Mod Browser/Mod Manager</b>.
    </>
  ),
  content: (
    <>
      <Quote>
        &quot;Nói đến <b>In the Wake of Gods</b> hay <b>WoG</b> thì chắc là đã
        quá nổi tiếng rồi. Đây là một phiên bản huyền thoại đã từng có rất nhiều
        người chơi. Tuy nhiên, cái tên <b>WoG</b> đã dừng lại ở con số 3.58f để
        nhường chỗ cho cái tên mới là <b>ERA</b>. Để cho dễ hiểu thì <b>ERA</b>{" "}
        chính là phiên bản tiếp theo của <b>WoG 3.58f</b>. Nó fix các lỗi còn
        tồn đọng ở <b>WoG</b>, thêm nhiều script mới trong <b>WoG Options</b>{" "}
        mới và đặc biệt là giới thiệu hệ thống <b>Mod Browser/Mod Manager</b>{" "}
        giúp việc cài mod trở nên dễ dàng hơn.&quot;
      </Quote>
      <Note>
        Một vài mod nặng như <b>Third Upgrades Mod</b> yêu cầu cài{" "}
        <b>Visual C++ Redistributable</b> 2005, 2008, 2010, 2012, 2015-nay. Bác
        có thể tải trực tiếp từng phiên bản ở trang chủ Microsoft hoặc tải bản
        repack full ở đây:{" "}
        <A href="https://www.tinyplease.com/vcpp">tinyplease.com/vcpp</A>.
      </Note>

      <Section title="Cấu hình tối thiểu">
        <SysReq
          items={[
            { label: "Hệ điều hành", value: "Windows 10/11" },
            {
              label: "CPU",
              value: "1.8 GHz trở lên (nếu cài nhiều mod nặng nên có CPU khoẻ)",
            },
            { label: "RAM", value: "2 GB (4 GB+ nếu cài nhiều mod nặng)" },
            {
              label: "Đồ hoạ",
              value: "3D graphics card compatible with DirectX 9.0c",
            },
            {
              label: "Khác",
              value: "Cần Visual C++ Redistributable cho một số mod yêu cầu",
            },
          ]}
        />
      </Section>

      <Section title="Link game (yêu cầu đã cài Heroes 3 Complete, khuyên dùng bản GOG)">
        <LinkRow
          label="Bản cài qua Heroes Launcher"
          desc={
            <>
              Đây là nguồn chính thức duy nhất để cài <b>ERA</b>.
            </>
          }
          url={HEROES_LAUNCHER_URL}
          buttonText="Tải Launcher"
        />
        <div className="shot-grid shot-icon">
          <Screenshot
            src={era10}
            caption="Từ bản 3.9, ERA đã đổi sang dùng biểu tượng phượng hoàng lửa này thay cho con mắt WoG"
          />
        </div>
      </Section>

      <Section title="Nhạc menu của WoG">
        <LinkRow
          label="Nhạc menu của WoG"
          desc={
            <>
              Tải về giải nén vào thư mục <code>MP3</code> trong thư mục{" "}
              <b>ERA</b>.
            </>
          }
          url="https://drive.google.com/file/d/1nCrBC2T7yxfIIoRbxOgi15fXsy45CUH3/view?usp=sharing"
        />
      </Section>

      <Section title="Hướng dẫn cài qua Heroes Launcher">
        <Steps
          items={[
            <Fragment key="complete-step">
              Cài{" "}
              <PageLink to="complete">
                <b>Heroes 3 Complete</b>
              </PageLink>{" "}
              (khuyên dùng bản GOG, bản Steam cũng được) - nếu máy đã cài{" "}
              <b>Complete</b> rồi thì có thể bỏ qua bước này.
            </Fragment>,
            <Fragment key="era-step-1">
              Cài Launcher, mở lên, vào tab <b>ERA</b>, chọn Install.
            </Fragment>,
            <Fragment key="era-step-2">
              Chọn &quot;Select folder with Heroes 3&quot; rồi chọn đường dẫn
              đến thư mục đã cài <b>Complete</b>.
            </Fragment>,
            <Fragment key="era-step-3">
              Tick vào dòng &quot;Install <b>ERA</b> project to a new folder and
              copy the original game files&quot; để cài <b>ERA</b> ra thư mục
              riêng (nếu không tick, <b>ERA</b> sẽ bị cài đè vào thư mục{" "}
              <b>Complete</b> và có thể dẫn đến xung đột game).
            </Fragment>,
            <Fragment key="era-step-4">
              Vào Menu → Settings → Games, chuyển phần Check for updates thành
              Check and install để <b>ERA</b> tự động cập nhật khi có bản mới.
            </Fragment>,
            <Fragment key="era-step-5">
              Bấm Play để vào game. Lần đầu mở game, vào <b>WoG Options</b> bấm
              vào tab 1 và bấm nút Restore Default để đưa cài đặt về chuẩn{" "}
              <b>WoG</b>, sau đó mới chỉnh tuỳ ý rồi save lại (bấm theo ảnh bên
              dưới).
            </Fragment>,
            <Fragment key="era-step-6">
              Nên cài thêm một vài mod trong <b>Mod Browser</b> để trải nghiệm{" "}
              <b>ERA</b> hay hơn (đặc biệt là <b>Third Upgrades Mod</b>).
              Bật/tắt mod ở trong <b>Mod Manager</b>.
            </Fragment>,
          ]}
        />
        <div className="shot-grid">
          <Screenshot
            src={era1}
            caption="Bước 2: Vào tab ERA trong Heroes Launcher, bấm Install"
          />
          <Screenshot
            src={era2}
            caption='Bước 3: Chọn "Select folder with Heroes 3"'
          />
          <Screenshot
            src={era3}
            caption="Bước 4: Tick cài ra thư mục riêng rồi Start installation"
          />
          <Screenshot
            src={menuSettings}
            caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
          />
          <Screenshot src={era4} caption="Bước 6: Bấm Play để vào game" />
          <Screenshot
            src={era5}
            caption="Bước 6: WoG Options - vào tab 1, bấm Restore Default (2) rồi Save (3)"
          />
          <Screenshot
            src={era6}
            caption="Bước 7 (tuỳ chọn): Cài mod theo sở thích"
          />
        </div>
      </Section>

      <Section title="ERA bản cũ">
        <Note title="Khi nào cần dùng bản cũ?">
          Một số map của <b>ERA</b> như <b>The Empire of the World (TEW)</b>{" "}
          được làm dưới dạng <code>[Scenarios]</code> mod. Các mod này không
          tương thích với bản <b>ERA 3.9</b> cài từ <b>Heroes Launcher</b>, nên
          cần dùng phiên bản <b>3.8 trở xuống</b> để chơi. Cách phân biệt: bản
          3.9 trở lên đã đổi biểu tượng sang hình <b>con phượng hoàng lửa</b>,
          còn bản 3.8 trở xuống vẫn dùng biểu tượng <b>con mắt WoG</b>.
        </Note>
        <LinkRow
          label="ERA Old Version"
          desc="Dùng để chơi các map dạng [Scenarios] mod như The Empire of the World (TEW)."
          url="https://drive.google.com/file/d/1IZIBLuvfOc2LFgXyQuhmR6ul49HEeXE0/view?usp=sharing"
        />
        <Steps
          title="Hướng dẫn cài"
          items={[
            <Fragment key="era-step-7">
              Tải file cài <b>ERA Old Version</b> ở link trên về máy rồi mở lên.
            </Fragment>,
            <Fragment key="era-old-folder">
              Bấm nút Browse... rồi chọn một thư mục trống để cài (ví dụ
              D:\Games\Heroes 3 ERA Old Version). <b>Tuyệt đối không</b> cài đè
              lên <b>ERA/WoG</b>, <b>Complete/SoD</b>, <b>HotA</b> hay bất kỳ
              bản Heroes 3 nào đã cài sẵn.
            </Fragment>,
            "Bấm Install và chờ cài xong.",
          ]}
        />
        <div className="shot-grid">
          <Screenshot
            src={era9}
            caption="Trình cài đặt ERA Old Version (bản 3.8, kèm sẵn map TEW 2, 3, 4)"
          />
        </div>
      </Section>

      <Section title="Phân biệt update của HD Patch và update của ERA">
        <Note title="Đừng nhầm lẫn">
          Update của <b>ERA</b> khác với update tự động của <b>HD Patch</b> -
          update <b>HD Patch</b> <b>không</b> phải là update <b>ERA</b>.
        </Note>
        <Screenshot
          src={era7}
          caption="Update của HD Patch (trái) và update của ERA (phải)"
        />
      </Section>

      <RmgTemplates />

      <TavernInvite />

      <Section title="Cheat bằng mod TrainerX (riêng ERA)">
        <Note>
          <b>TrainerX</b> có sẵn khi cài <b>ERA</b> mới nhất, không cần cài
          thêm. Mod này cho phép cheat trực tiếp trong game qua menu cheat; các
          bản khác chỉ có cách gõ mã truyền thống, xem ở{" "}
          <PageLink to="cheat">trang Mã cheat Heroes 3</PageLink>.
        </Note>
        <Steps
          items={[
            "Bấm F2 và nhập tên tướng muốn chỉnh để chỉnh mọi thứ liên quan đến tướng đấy (Level, Skills, Spells, Đồ, Quân, Commander, Henchman, Tài nguyên...).",
            "Bấm F3 và click chuột phải vào các chỗ muốn chỉnh ngoài map để hiện menu cheat nâng cao (chỉ nên dùng F3 nếu bác hiểu mình đang làm gì, nếu không có thể dẫn đến hỏng map).",
            "Bấm F6 để hiện menu cheat phụ: Builder Mode để xây nhà liên tục trong 1 ngày và Change in-game Date để chỉnh ngày trong game.",
          ]}
        />
        <div className="shot-grid">
          <Screenshot
            src={era8}
            caption="Bảng chỉnh tướng của TrainerX (bấm F2)"
          />
        </div>
      </Section>

      <Section title="Cộng đồng">
        <LinkRow
          label="Discord ERA"
          url="https://discord.gg/bvfJGZe"
          buttonText="Tham gia"
        />
      </Section>
    </>
  ),
};
