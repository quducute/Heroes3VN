import React from "react";
import {
  Quote,
  Note,
  Formula,
  Section,
  LinkRow,
  Steps,
  A,
  Screenshot,
  SysReq,
} from "../components/ui.jsx";

import { HEROES_LAUNCHER_URL } from "./links.js";

import iconComplete from "../assets/icons/complete.webp";
import iconHota from "../assets/icons/hota.webp";
import iconEra from "../assets/icons/era.webp";
import iconVcmi from "../assets/icons/vcmi.webp";
import iconChronicles from "../assets/icons/chronicles.webp";

import menuSettings from "../assets/images/menu-settings.webp";
import caiTemplate from "../assets/images/cai-template.webp";
import chonTemplate from "../assets/images/chon-template.webp";
import inviteTavern from "../assets/images/invite-tavern.webp";
import complete1 from "../assets/complete/complete-01-launcher-install.webp";
import complete2 from "../assets/complete/complete-02-select-folder.webp";
import complete3 from "../assets/complete/complete-03-install-new-folder.webp";
import hota1 from "../assets/hota/hota-01-launcher-install.webp";
import hota2 from "../assets/hota/hota-02-select-folder.webp";
import hota3 from "../assets/hota/hota-03-install-new-folder.webp";
import era1 from "../assets/era/era-01-launcher-install.webp";
import era2 from "../assets/era/era-02-select-folder.webp";
import era3 from "../assets/era/era-03-install-new-folder.webp";
import era4 from "../assets/era/era-04-wog-options.webp";
import era5 from "../assets/era/era-05-mod.webp";
import era6 from "../assets/era/era-06-update-hd-vs-era.webp";
import vcmi1 from "../assets/vcmi/vcmi-01-launcher-install.webp";
import vcmi2 from "../assets/vcmi/vcmi-02-select-folder.webp";
import vcmi3 from "../assets/vcmi/vcmi-03-install-new-folder.webp";

function TavernInvite() {
  return (
    <Section title="Mẹo: Bật chức năng mời tướng trong Tavern (nhà mua tướng)">
      <Steps
        items={[
          "Mở HD Patch sau đó chuyển sang tab Tweaks.",
          <>
            Tìm dòng <code>{"<UI.Tavern.InviteHero>"}</code> và sửa từ{" "}
            <code>0</code> sang <code>1</code>.
          </>,
          "Khi vào game mua tướng, trong Tavern sẽ có một ô để mời tướng xuất hiện tiếp theo, chọn con tướng muốn xuất hiện trong ô đấy và mua một con tướng đang có sẵn. Sau khi đã mua con tướng đang có sẵn đó thì con tướng bạn mời sẽ xuất hiện vào ô vừa mua ở trong Tavern.",
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

const RMG_PLAY_STEP =
  "Vào game, chọn New Game → Single Scenario → Random Map, Template vừa cài sẽ hiện trong danh sách ở mục Template.";

function TemplateGuide() {
  return (
    <>
      <Note title="Một số lưu ý">
        <div className="faq-lines">
          <div>
            Phân biệt rõ Random Map Template (<code>rmg.txt</code> hoặc{" "}
            <code>.h3t</code>) và File Map (<code>.h3m</code>), đây là hai khái
            niệm khác nhau.
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

function RmgTemplates({ needsHd }) {
  return (
    <Section title="Random Map Templates">
      {needsHd && (
        <Note>
          Cần cài HD Patch thì mới có thư mục <code>_HD3_Data\Templates</code>{" "}
          và chọn được Template trong game.
        </Note>
      )}
      <LinkRow
        label="Tổng hợp Random Map Templates (8xm8, 8xm8a, ...)"
        desc={
          <>
            Gói Template dạng <code>rmg.txt</code>, dùng chung cho Complete và
            ERA.
          </>
        }
        url={RMG_PACK_URL}
      />
      <Steps
        items={[
          "Tải gói Random Map Templates ở link trên.",
          <>
            Chọn Template cần cài (ví dụ 8xm8, 8xm8a...) và giải nén để lấy file{" "}
            <code>rmg.txt</code> của Template đó.
          </>,
          <>
            Vào thư mục game, tìm thư mục <code>_HD3_Data\Templates</code>, tạo
            một thư mục mới mang tên Template (ví dụ <code>8xm8</code>) rồi copy
            file <code>rmg.txt</code> vào đó.
          </>,
          RMG_PLAY_STEP,
        ]}
      />
      <TemplateGuide />
    </Section>
  );
}

const SYSREQ_BASE = [
  { label: "Hệ điều hành", value: "Windows 10/11" },
  { label: "CPU", value: "1.8 GHz trở lên" },
  { label: "RAM", value: "2 GB" },
  { label: "Đồ hoạ", value: "3D graphics card compatible with DirectX 9.0c" },
];

export const versions = [
  {
    id: "complete",
    name: "Complete",
    subtitle: "SoD + AB + RoE",
    icon: iconComplete,
    accent: "#4763b0",
    summary:
      "Phiên bản chuẩn chính thức cuối cùng, gồm game gốc và toàn bộ các bản mở rộng. Nền tảng để cài thêm bất kỳ thứ gì.",
    content: (
      <>
        <Quote>
          “Đây là phiên bản Heroes 3 chuẩn chính thức cuối cùng được phát hành
          bởi New World Computing Studio và The 3DO Company. Heroes 3 Complete
          bao gồm game gốc cùng với tất cả các phần mở rộng của nó là
          Armageddon's Blade và The Shadow of Death.”
        </Quote>
        <Note>
          Phiên bản Complete gần như không khác gì so với SoD, thứ duy nhất
          Complete hơn là số lượng Map và Campaign (vì nó bao gồm cả AB và SoD).
          Tóm lại:
          <Formula>Complete = SoD + AB + Game gốc RoE</Formula>
        </Note>

        <Section title="Cấu hình tối thiểu">
          <SysReq items={SYSREQ_BASE} />
        </Section>

        <Section title="Link game">
          <LinkRow
            label="Bản cài Complete GOG (rất nên dùng)"
            url="https://www.gog.com/en/game/heroes_of_might_and_magic_3_complete_edition"
            buttonText="Mua trên GOG"
          />
          <LinkRow
            label="Bản cài Complete Steam"
            url="https://store.steampowered.com/app/4921760/Heroes_Of_Might_And_Magic_III"
            buttonText="Mua trên Steam"
          />
          <LinkRow
            label="Bản cài full qua Heroes 3 Launcher (cần cài Complete trước)"
            desc="Cách nhanh để cài HD Patch và SoD SP Plugin mà không cần tải thủ công."
            url={HEROES_LAUNCHER_URL}
            buttonText="Tải Launcher"
          />
        </Section>

        <Section title="HD Patch (HoMM3 HD)">
          <Note>
            Nếu đã cài qua Heroes 3 Launcher (hướng dẫn phía dưới) thì HD Patch
            đã được cài sẵn, có thể bỏ qua mục này. HotA và ERA cũng đã tích hợp
            sẵn HD Patch.
          </Note>
          <LinkRow
            label="HD Patch (HoMM3 HD)"
            desc="Cài để có trải nghiệm hình ảnh tốt nhất, chơi online qua lobby và chia quân nhanh bằng phím tắt."
            url="https://sites.google.com/site/heroes3hd/eng/download"
          />
          <Steps
            items={[
              "Vào link trên tải bản HoMM3 HD mới nhất (file cài .exe).",
              "Chạy file cài và chọn đúng thư mục đã cài Complete.",
              "Mở HD Launcher (file HD_Launcher.exe trong thư mục game), chỉnh cài đặt tuỳ ý rồi bấm Play để vào game.",
            ]}
          />
        </Section>

        <Section title="Hướng dẫn cài qua Heroes 3 Launcher">
          <Note>
            Với Complete, Heroes 3 Launcher chỉ cài thêm HD Patch và SoD SP
            Plugin chứ <b>không</b> cài game — bạn vẫn phải mua Complete trước
            (khuyên dùng bản GOG, bản Steam cũng được).
          </Note>
          <Steps
            items={[
              "Cài Complete (khuyên dùng bản GOG, bản Steam cũng được) — nếu máy đã cài Complete rồi thì có thể bỏ qua bước này.",
              "Cài Launcher, mở lên, vào tab SoD, chọn Install.",
              "Chọn “Select folder with Heroes 3” rồi chọn đường dẫn đến thư mục đã cài Complete (các thành phần sẽ cài thêm bao gồm HD Patch, SoD SP plugin và trình sửa map Unleashed).",
              "Bấm Start installation để cài. Mặc định các plugin đang tắt — mở HD Launcher lên và bật SoD SP trong phần Plugins để dùng.",
              "Vào Menu → Settings → Games, chuyển phần Check for updates thành Check and install để Complete tự động cập nhật khi có bản mới.",
            ]}
          />
          <div className="shot-grid">
            <Screenshot
              src={complete1}
              caption="Bước 2: Vào tab SoD trong Heroes 3 Launcher, bấm Install"
            />
            <Screenshot
              src={complete2}
              caption="Bước 3: Chọn “Select folder with Heroes 3”"
            />
            <Screenshot
              src={complete3}
              caption="Bước 4: Chọn thư mục Complete rồi Start installation"
            />
            <Screenshot
              src={menuSettings}
              caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
            />
          </div>
        </Section>

        <RmgTemplates needsHd />

        <Section title="Plugin hay cho Complete (yêu cầu đã cài HD Patch)">
          <LinkRow
            label="SoD SP Plugin"
            desc="Thêm nhiều chức năng cho Complete/SoD, tuy nhiên bị cấm dùng khi chơi online."
            url="https://github.com/RoseKavalier/H3Plugins/releases/tag/sodsp"
          />
          <Steps
            title="Hướng dẫn cài SoD SP"
            items={[
              "Cài Complete/SoD và HD Patch.",
              <>
                Vào link trên tải file <code>SoD_SP.exe</code> về và cài vào thư
                mục chứa game.
              </>,
              "Mở HD Launcher lên và bật SoD SP trong phần Plugins.",
              <>
                Toàn bộ tính năng đọc ở đây:{" "}
                <A href="https://docs.google.com/document/d/1JlQ6TC97d_Bb1g_sDRpxTvkKHtyXgZ3qORG5LJS8tp8/edit">
                  Tài liệu tính năng SoD SP
                </A>
              </>,
            ]}
          />
          <LinkRow
            label="XXL Plugin"
            desc="Tạo được map đến size G như HotA và ERA."
            url="https://drive.google.com/file/d/1DAO6ttLg9Ka7w8zXxJ8SZqAIQrm-HK-t/view?usp=sharing"
          />
          <Steps
            title="Hướng dẫn cài XXL Plugin"
            items={[
              <>
                Tải về, giải nén và bỏ vào thư mục{" "}
                <code>HoMM 3 Complete\_HD3_Data\Packs</code>.
              </>,
              "Mở HD Launcher lên và bật XXL trong phần Plugins.",
            ]}
          />
        </Section>

        <TavernInvite />
      </>
    ),
  },

  {
    id: "hota",
    name: "Horn of the Abyss",
    subtitle: "HotA",
    icon: iconHota,
    accent: "#3ab0a1",
    summary:
      "Kế thừa lối chơi của Complete/SoD với nhiều cải tiến cân bằng và thêm 3 thành mới là Cove, Factory và Bulwark.",
    content: (
      <>
        <Quote>
          “Nói đến Horn of the Abyss hay HotA thì đây là một phiên bản kế thừa
          lối chơi truyền thống của Complete/SoD với nhiều cải tiến như cân bằng
          lại sức mạnh các thành, các skill, tạo map G, thêm đồ mới, skill mới,
          địa hình mới và thêm ba thành mới là Cove, Factory và Bulwark. HotA
          hiện đang được rất nhiều người sử dụng để chơi PvP online.”
        </Quote>
        <Note>
          Để chơi PvP online bạn cần có HD Patch (hiện HD Patch đã được tích hợp
          sẵn khi cài đặt HotA). Sau khi cài xong thì vào phần Multiplayer ở
          trong game, tạo tài khoản là chơi được luôn. Luật chơi HotA PvP online
          lobby đọc ở đây:{" "}
          <A href="https://h3hota.com/en/rules">h3hota.com/en/rules</A>. Ngoài
          ra, mỗi template online (như Duel và Jebus) sẽ có một luật riêng — nên
          tìm hiểu kỹ trước khi chơi.
        </Note>

        <Section title="Cấu hình tối thiểu">
          <SysReq items={SYSREQ_BASE} />
        </Section>

        <Section title="Link game (yêu cầu đã cài Heroes 3 Complete, khuyên dùng bản GOG)">
          <LinkRow
            label="Bản cài HotA GOG (rất nên dùng)"
            url="https://www.gog.com/en/game/heroes_of_might_and_magic_iii_horn_of_the_abyss"
            buttonText="Tải trên GOG"
          />
          <LinkRow
            label="Bản cài HotA Steam"
            url="https://store.steampowered.com/app/5061200/Heroes_of_Might_and_Magic_III_Horn_of_the_Abyss"
            buttonText="Tải trên Steam"
          />
          <LinkRow
            label="Bản cài qua Heroes 3 Launcher (nên dùng)"
            url={HEROES_LAUNCHER_URL}
            buttonText="Tải Launcher"
          />
          <LinkRow
            label="Bản cài từ trang chủ (không nên dùng)"
            url="https://h3hota.com/en/download"
          />
        </Section>

        <Section title="Việt hoá HotA">
          <LinkRow
            label="Patch Việt hoá HotA 1.8.1 by Bé Còi Team"
            desc={
              <>
                Tải về, giải nén bằng mật khẩu <code>h3@tv</code> rồi chạy file
                Setup để cài vào thư mục HotA. Chỉ dùng cho HotA 1.8.1, bản HotA
                mới hơn có thể bị lỗi.
              </>
            }
            url="https://www.mediafire.com/file/tv5udzxlb18gnmb/HotA_1.8.1_Vietnamese_Translation-1.0.2_Setup.rar/file"
          />
        </Section>

        <Section title="Hướng dẫn cài qua Heroes 3 Launcher">
          <Steps
            items={[
              "Cài Complete (khuyên dùng bản GOG, bản Steam cũng được) — nếu máy đã cài Complete rồi thì có thể bỏ qua bước này.",
              "Cài Launcher, mở lên, vào tab HotA, chọn Install.",
              "Chọn “Select folder with Heroes 3” rồi chọn đường dẫn đến thư mục đã cài Complete.",
              "Tick vào dòng “Install HotA to a new folder and copy the original game files” để cài HotA ra thư mục riêng (nếu không tick, HotA sẽ bị cài đè vào thư mục Complete và có thể dẫn đến xung đột game).",
              "Vào Menu → Settings → Games, chuyển phần Check for updates thành Check and install để HotA tự động cập nhật khi có bản mới.",
            ]}
          />
          <div className="shot-grid">
            <Screenshot
              src={hota1}
              caption="Bước 2: Vào tab HotA trong Heroes 3 Launcher, bấm Install"
            />
            <Screenshot
              src={hota2}
              caption="Bước 3: Chọn “Select folder with Heroes 3”"
            />
            <Screenshot
              src={hota3}
              caption="Bước 4: Tick cài ra thư mục riêng rồi Start installation"
            />
            <Screenshot
              src={menuSettings}
              caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
            />
          </div>
        </Section>

        <Section title="Công cụ hỗ trợ">
          <LinkRow
            label="Heroes 3 Assist"
            desc="Hỗ trợ tính toán dame theo công thức, có đầy đủ thông tin về quân, spell, skill, thành..."
            url="https://drive.google.com/file/d/1dxiSXtjcxa4zObavJLX_TdDLp2CA0962/view"
          />
          <LinkRow
            label="Heroes 3 Viewer"
            desc="Công cụ hỗ trợ cho streamer (bảng hiện thông tin tướng mà bạn hay thấy khi xem stream HotA)"
            url="https://gitlab.com/Grekern/h3roviewer/-/releases"
          />
        </Section>

        <Section title="Random Map Templates">
          <LinkRow
            label="Templates 8XM8 và 8XM8a cho HotA"
            url="https://drive.google.com/drive/folders/1z9xo-8DDZvvkkwQUSKQujPEB6tZYSaqm?usp=sharing"
          />
          <LinkRow
            label="Template mở khoá các tướng ẩn (edit lại từ 8XM8a)"
            url="https://drive.google.com/drive/folders/1HnK3XiRgk4FUsiogZhypsM6uxufWmxpJ?usp=sharing"
          />
          <LinkRow
            label="Template Vietnamese Diplomacy mới nhất"
            url="https://drive.google.com/drive/folders/1iYRJy5Rmdi7i4Kw82svoQuIy1aF7e57P?usp=sharing"
          />
          <LinkRow
            label="Template 1 tướng Duel và Jebus Outcast mới nhất (đánh online)"
            url="https://www.h3templates.com/templates"
          />
          <Steps
            items={[
              <>
                Tải Template dạng file <code>.h3t</code> ở các link trên (nếu là
                file nén thì giải nén ra).
              </>,
              <>
                Vào thư mục game, tìm thư mục <code>HotA_RMGTemplates</code> rồi
                copy file <code>.h3t</code> của Template vào đó.
              </>,
              RMG_PLAY_STEP,
            ]}
          />
          <TemplateGuide />
        </Section>

        <TavernInvite />

        <Section title="Cộng đồng">
          <LinkRow
            label="Discord HotA"
            url="https://discord.gg/eDkPSNf"
            buttonText="Tham gia"
          />
        </Section>
      </>
    ),
  },

  {
    id: "era",
    name: "ERA",
    subtitle: "Tên cũ: In the Wake of Gods (WoG)",
    icon: iconEra,
    accent: "#7349b9",
    summary:
      "Hậu duệ của WoG 3.58f huyền thoại, fix các lỗi còn tồn đọng, thêm nhiều script mới và hệ thống Mod Browser/Mod Manager.",
    content: (
      <>
        <Quote>
          “Nói đến In the Wake of Gods hay WoG thì chắc là đã quá nổi tiếng rồi.
          Đây là một phiên bản huyền thoại đã từng có rất nhiều người chơi. Tuy
          nhiên, cái tên WoG đã dừng lại ở con số 3.58f để nhường chỗ cho cái
          tên mới là ERA. Để cho dễ hiểu thì ERA chính là phiên bản tiếp theo
          của WoG 3.58f. Nó fix các lỗi còn tồn đọng ở WoG, thêm nhiều script
          mới trong WoG Options mới và đặc biệt là giới thiệu hệ thống Mod
          Browser/Mod Manager giúp việc cài mod trở nên dễ dàng hơn.”
        </Quote>
        <Note>
          Một vài mod nặng như Third Upgrades Mod yêu cầu cài Visual C++
          Redistributable 2005, 2008, 2010, 2012, 2015–nay. Bạn có thể tải trực
          tiếp từng phiên bản ở trang chủ Microsoft hoặc tải bản repack full ở
          đây: <A href="https://www.tinyplease.com/vcpp">tinyplease.com/vcpp</A>
        </Note>

        <Section title="Cấu hình tối thiểu">
          <SysReq
            items={[
              { label: "Hệ điều hành", value: "Windows 10/11" },
              {
                label: "CPU",
                value:
                  "1.8 GHz trở lên (nếu cài nhiều mod nặng nên có CPU khoẻ)",
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
            label="Bản cài qua Heroes 3 Launcher"
            desc="Đây là nguồn chính thức duy nhất để cài ERA."
            url={HEROES_LAUNCHER_URL}
            buttonText="Tải Launcher"
          />
        </Section>

        <Section title="Hướng dẫn cài qua Heroes 3 Launcher">
          <Steps
            items={[
              "Cài Complete (khuyên dùng bản GOG, bản Steam cũng được) — nếu máy đã cài Complete rồi thì có thể bỏ qua bước này.",
              "Cài Launcher, mở lên, vào tab ERA, chọn Install.",
              "Chọn “Select folder with Heroes 3” rồi chọn đường dẫn đến thư mục đã cài Complete.",
              "Tick vào dòng “Install ERA project to a new folder and copy the original game files” để cài ERA ra thư mục riêng (nếu không tick, ERA sẽ bị cài đè vào thư mục Complete và có thể dẫn đến xung đột game).",
              "Vào Menu → Settings → Games, chuyển phần Check for updates thành Check and install để ERA tự động cập nhật khi có bản mới.",
              "Bấm Play để mở game. Lần đầu mở game, vào WoG Options bấm vào tab 1 và bấm nút Restore Default để đưa cài đặt về chuẩn WoG, sau đó mới chỉnh tuỳ ý rồi save lại (bấm theo ảnh bên dưới).",
              "Nên cài thêm một vài mod trong Mod Browser để trải nghiệm ERA hay hơn (đặc biệt là Third Upgrades Mod). Bật/Tắt mod ở trong Mod Manager.",
            ]}
          />
          <div className="shot-grid">
            <Screenshot
              src={era1}
              caption="Bước 2: Vào tab ERA trong Heroes 3 Launcher, bấm Install"
            />
            <Screenshot
              src={era2}
              caption="Bước 3: Chọn “Select folder with Heroes 3”"
            />
            <Screenshot
              src={era3}
              caption="Bước 4: Tick cài ra thư mục riêng rồi Start installation"
            />
            <Screenshot
              src={menuSettings}
              caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
            />
            <Screenshot
              src={era4}
              caption="Bước 6: WoG Options — vào tab 1, bấm Restore Default (2) rồi Save (3)"
            />
            <Screenshot
              src={era5}
              caption="Bước 7 (tuỳ chọn): Cài mod theo sở thích"
            />
          </div>
        </Section>

        <Section title="Nhạc menu của WoG">
          <LinkRow
            label="Nhạc menu của WoG"
            desc={
              <>
                Tải về giải nén vào thư mục <code>MP3</code> trong thư mục ERA.
              </>
            }
            url="https://drive.google.com/file/d/1nCrBC2T7yxfIIoRbxOgi15fXsy45CUH3/view?usp=sharing"
          />
        </Section>

        <Section title="Phân biệt update của HD Patch và update của ERA">
          <Note title="Đừng nhầm lẫn">
            Update của ERA khác với update tự động của HD Patch — update HD
            Patch <b>không</b> phải là update ERA.
          </Note>
          <Screenshot
            src={era6}
            caption="Update của HD Patch (trái) và update của ERA (phải)"
          />
        </Section>

        <RmgTemplates />

        <TavernInvite />

        <Section title="Hướng dẫn sử dụng Cheats TrainerX trong ERA">
          <Steps
            items={[
              "Bấm F2 và nhập tên tướng muốn chỉnh để chỉnh mọi thứ liên quan đến tướng đấy (Level, Skills, Spells, Đồ, Quân, Commander, Henchman, Tài nguyên...).",
              "Bấm F3 và click chuột phải vào các chỗ muốn chỉnh ngoài map để hiện bảng Cheats nâng cao (chỉ nên dùng F3 nếu bạn hiểu mình đang làm gì, nếu không có thể dẫn đến hỏng map).",
              "Bấm F6 để hiện bảng Cheats phụ: Builder Mode để xây nhà liên tục trong 1 ngày và Change in-game Date để chỉnh ngày trong game.",
            ]}
          />
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
  },

  {
    id: "vcmi",
    name: "VCMI",
    subtitle: "Chơi trên đa nền tảng",
    icon: iconVcmi,
    accent: "#96602a",
    summary:
      "Engine mã nguồn mở viết lại Heroes 3, chạy được trên đa nền tảng bao gồm Windows, Linux, macOS, iOS, Android.",
    content: (
      <>
        <Quote>
          “Đây là một engine chơi mod mã nguồn mở hỗ trợ đa nền tảng như
          Windows, Linux, macOS, iOS, Android. Vì VCMI là một engine viết lại
          (tức là nó không phải là Heroes 3 mà là một tựa game khác mô phỏng lại
          Heroes 3) nên nó sẽ ít tính năng hơn các bản HotA hay ERA, tuy nhiên,
          điểm mạnh của nó là chơi được trên điện thoại và hệ thống mod của nó
          cũng khá đa dạng, dù độ hoàn thiện cũng chưa cao lắm.”
        </Quote>
        <Note title="Chỉ dùng được bản GOG">
          VCMI chỉ nạp được dữ liệu từ bản Heroes 3 Complete <b>GOG</b>, bản
          Steam không dùng được cho VCMI.
        </Note>
        <Note title="Lưu ý">
          VCMI không phải là Heroes 3, nó chỉ là một engine mã nguồn mở viết lại
          từ đầu để tái tạo Heroes 3 trên đa nền tảng.
        </Note>

        <Section title="Link game">
          <LinkRow
            label="VCMI mới nhất cho Windows, Linux, macOS, iOS, Android"
            desc="Chọn đúng hệ điều hành để tải."
            url="https://vcmi.eu/download"
          />
          <LinkRow
            label="Windows: bản cài qua Heroes 3 Launcher (nên dùng)"
            desc="Tự cài VCMI và copy dữ liệu từ Complete GOG sang để làm nền cho VCMI chạy. Cần cài Complete GOG trước."
            url={HEROES_LAUNCHER_URL}
            buttonText="Tải Launcher"
          />
          <LinkRow
            label="iOS: bản trên TestFlight (nên dùng)"
            desc="Tải TestFlight trên App Store trước."
            url="https://testflight.apple.com/join/pJWHSbmu"
          />
          <LinkRow
            label="Android: bản trên Google Play (nên dùng)"
            url="https://play.google.com/store/apps/details?id=is.xyz.vcmi"
          />
        </Section>

        <Section title="Hướng dẫn cài qua Heroes 3 Launcher (Windows)">
          <Note>
            Cách dễ nhất cho Windows: Heroes 3 Launcher sẽ cài VCMI và tự copy
            dữ liệu từ Complete GOG vào làm nền cho VCMI chạy, không cần chép
            thủ công. Cần đã cài Complete GOG trước.
          </Note>
          <Steps
            items={[
              "Cài Complete GOG — nếu máy đã cài Complete GOG rồi thì có thể bỏ qua bước này.",
              "Cài Launcher, mở lên, vào tab VCMI, chọn Install.",
              "Chọn “Select folder with Heroes 3” rồi chọn đường dẫn đến thư mục đã cài Complete GOG.",
              "Tick vào dòng “Install VCMI to a new folder and copy the original game files” để cài VCMI ra thư mục riêng (nếu không tick, VCMI sẽ bị cài đè vào thư mục Complete và có thể dẫn đến xung đột game).",
              "Vào Menu → Settings → Games, chuyển phần Check for updates thành Check and install để VCMI tự động cập nhật khi có bản mới.",
            ]}
          />
          <div className="shot-grid">
            <Screenshot
              src={vcmi1}
              caption="Bước 2: Vào tab VCMI trong Heroes 3 Launcher, bấm Install"
            />
            <Screenshot
              src={vcmi2}
              caption="Bước 3: Chọn “Select folder with Heroes 3”"
            />
            <Screenshot
              src={vcmi3}
              caption="Bước 4: Tick cài ra thư mục riêng rồi Start installation"
            />
            <Screenshot
              src={menuSettings}
              caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
            />
          </div>
        </Section>

        <Section title="Hướng dẫn cài thủ công (các hệ điều hành khác)">
          <Note title="Chuẩn bị dữ liệu game gốc">
            <div className="faq-lines">
              <div>
                VCMI chỉ là engine nên bắt buộc phải có dữ liệu (hình ảnh, âm
                thanh, map) của Heroes 3 Complete/SoD để chạy. Chuẩn bị sẵn{" "}
                <b>một trong hai</b> thứ sau:
              </div>
              <div>
                <b>Cách 1 — File cài offline của GOG (chuẩn nhất, nên dùng):</b>{" "}
                tải bộ file cài offline (file <code>.exe</code> kèm file{" "}
                <code>.bin</code>, phải để chung một thư mục). VCMI Launcher sẽ
                tự giải nén dữ liệu từ bộ file này.
              </div>
              <div>
                <b>Cách 2 — Thư mục game đã cài (phương án phụ):</b> lấy 3 thư
                mục <code>Data</code>, <code>Maps</code>, <code>Mp3</code> trong
                thư mục đã cài Complete trên Windows. Nên lấy từ thư mục
                Complete gốc chưa cài mod (không lấy từ thư mục HotA hay ERA) để
                tránh lỗi.
              </div>
            </div>
          </Note>
          <Steps
            title="Windows"
            items={[
              <>
                Vào <A href="https://vcmi.eu/download">vcmi.eu/download</A> tải
                bản cho Windows (file <code>.exe</code>) rồi cài như phần mềm
                bình thường.
              </>,
              "Mở VCMI Launcher, lần đầu mở sẽ hiện trình hướng dẫn thiết lập, chọn ngôn ngữ rồi bấm tiếp.",
              "Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục Complete đã cài để VCMI tự sao chép dữ liệu (cách 2).",
              <>
                Nếu muốn chép tay thì chép 3 thư mục <code>Data</code>,{" "}
                <code>Maps</code>, <code>Mp3</code> vào{" "}
                <code>Documents\My Games\vcmi</code>.
              </>,
              "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó bấm Play để vào game.",
            ]}
          />
          <Steps
            title="Linux"
            items={[
              <>
                Cài qua Flathub (chạy được trên hầu hết các distro):{" "}
                <code>flatpak install flathub eu.vcmi.VCMI</code>. Ngoài ra có
                thể cài qua kho phần mềm của distro, xem chi tiết ở link hướng
                dẫn bên dưới.
              </>,
              "Mở VCMI Launcher, lần đầu mở sẽ hiện trình hướng dẫn thiết lập, chọn ngôn ngữ rồi bấm tiếp.",
              "Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục Complete đã cài để VCMI tự sao chép dữ liệu (cách 2).",
              <>
                Nếu muốn chép tay thì chép 3 thư mục <code>Data</code>,{" "}
                <code>Maps</code>, <code>Mp3</code> vào{" "}
                <code>~/.local/share/vcmi</code> (bản Flatpak là{" "}
                <code>~/.var/app/eu.vcmi.VCMI/data/vcmi</code>). Lưu ý Linux
                phân biệt chữ hoa/thường nên phải giữ đúng tên thư mục.
              </>,
              "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó bấm Play để vào game.",
            ]}
          />
          <Steps
            title="macOS"
            items={[
              <>
                Vào <A href="https://vcmi.eu/download">vcmi.eu/download</A> tải
                bản cho macOS (file <code>.dmg</code>, chọn đúng loại chip Apple
                Silicon hoặc Intel), mở ra rồi kéo VCMI vào thư mục
                Applications. Nếu lần đầu mở bị macOS chặn thì vào System
                Settings → Privacy & Security, kéo xuống bấm Open Anyway.
              </>,
              "Mở VCMI Launcher, lần đầu mở sẽ hiện trình hướng dẫn thiết lập, chọn ngôn ngữ rồi bấm tiếp.",
              "Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục Complete đã cài để VCMI tự sao chép dữ liệu (cách 2).",
              <>
                Nếu muốn chép tay thì chép 3 thư mục <code>Data</code>,{" "}
                <code>Maps</code>, <code>Mp3</code> vào{" "}
                <code>~/Library/Application Support/vcmi</code>.
              </>,
              "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó bấm Play để vào game.",
            ]}
          />
          <Steps
            title="Android / iOS / iPadOS"
            items={[
              "Cài VCMI: Android thì tải từ Google Play; iOS/iPadOS thì cài app TestFlight từ App Store trước, sau đó mở link TestFlight của VCMI (link của cả hai đều ở mục Link game phía trên).",
              "Tải bộ cài offline ngay trên điện thoại/máy tính bảng, không cần máy tính: mở trình duyệt, đăng nhập gog.com, vào thư viện game (Account → Games), chọn Heroes 3 Complete rồi tải bộ cài offline cho Windows (file .exe và file .bin). File tải về sẽ nằm trong thư mục Download (Android) hoặc app Tệp (Files), mục Tải về (iOS/iPadOS). Ngoài ra, nếu đã có sẵn 3 thư mục Data, Maps, Mp3 (cách 2) thì cũng có thể chép từ máy tính sang qua cáp USB, Google Drive, iCloud Drive...",
              "Mở VCMI, làm theo trình hướng dẫn lần đầu, chọn cài từ file GOG rồi chọn file .exe vừa tải (file .bin phải nằm chung thư mục), hoặc chọn thư mục chứa 3 thư mục Data, Maps, Mp3 nếu chép từ máy tính sang. VCMI sẽ tự sao chép dữ liệu vào bộ nhớ của app.",
              "Chờ VCMI xử lý xong (có thể mất vài phút, cần còn trống khoảng 2 GB) rồi bấm Play để vào game.",
            ]}
          />
          <p className="hint">
            Giao diện VCMI có thể khác đôi chút tuỳ phiên bản. Nếu gặp lỗi, xem
            hướng dẫn chính thức chi tiết cho từng hệ điều hành:
          </p>
          <LinkRow
            label="Windows"
            url="https://vcmi.eu/players/Installation_Windows"
          />
          <LinkRow
            label="Linux"
            url="https://vcmi.eu/players/Installation_Linux"
          />
          <LinkRow
            label="macOS"
            url="https://vcmi.eu/players/Installation_macOS"
          />
          <LinkRow label="iOS" url="https://vcmi.eu/players/Installation_iOS" />
          <LinkRow
            label="Android"
            url="https://vcmi.eu/players/Installation_Android"
          />
        </Section>

        <Section title="Cộng đồng">
          <LinkRow
            label="Discord VCMI"
            url="https://discord.com/invite/chBT42V"
            buttonText="Tham gia"
          />
        </Section>
      </>
    ),
  },

  {
    id: "chronicles",
    name: "Chronicles",
    subtitle: "Campaign series",
    icon: iconChronicles,
    accent: "#c9a06a",
    summary:
      "Series Heroes 3 campaign gồm 8 chapters với cốt truyện liên kết chặt chẽ, cài Patch HD cho Chronicles để có thêm chapter thứ 9.",
    content: (
      <>
        <Quote>
          “Một series Heroes 3 campaign được ra mắt vào cuối năm 2000 bao gồm 8
          chapters với cốt truyện liên kết với nhau chặt chẽ.”
        </Quote>
        <Note title="Chỉ dùng được bản GOG">
          Chronicles chỉ dùng được file cài của <b>GOG</b> (cả Chronicles lẫn
          Heroes 3 Complete dùng kèm Patch HD), bản Steam không dùng được cho
          Chronicles.
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
              "Đối với Patch HD, yêu cầu máy phải cài thêm cả Heroes 3 Complete GOG. Khi đã cài Complete rồi thì cài Patch HD vào thư mục Complete, nó sẽ tự nhận diện các thư mục còn lại của 8 chapters Chronicles.",
            ]}
          />
        </Section>

        <Section title="Chơi Chronicles trên VCMI">
          <p>
            Ngoài bản gốc, bạn còn có thể chơi Heroes Chronicles bằng engine{" "}
            VCMI (chơi được trên điện thoại và nhiều hệ điều hành khác). Yêu cầu
            đã cài VCMI đầy đủ kèm dữ liệu Complete GOG.
          </p>
          <Steps
            items={[
              "Mở VCMI Launcher, bấm nút Install file rồi chọn (các) file cài GOG đã mua để VCMI tự trích xuất dữ liệu.",
              "Chờ VCMI xử lý xong (có thể khá lâu, nhất là trên điện thoại, và cần dung lượng trống tạm thời), rồi vào mục chọn campaign trong game là chơi được.",
              "VCMI sẽ không cài được chapter thứ 9 (The Glory of War) vì Patch HD cho Chronicles không hỗ trợ VCMI. Nếu muốn chơi chapter 9 thì phải cài bản gốc trên Windows.",
            ]}
          />
          <Note>
            Các bước chi tiết cho từng nền tảng xem tại trang hướng dẫn chính
            thức của VCMI.
          </Note>
          <LinkRow
            label="Hướng dẫn cài Chronicles cho VCMI"
            url="https://vcmi.eu/players/Heroes_Chronicles/"
          />
        </Section>
      </>
    ),
  },
];
