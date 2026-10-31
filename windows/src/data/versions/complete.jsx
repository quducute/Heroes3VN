import { Fragment } from "react";
import {
  Quote,
  Note,
  Formula,
  Section,
  SysReq,
  LinkRow,
  PageLink,
  Steps,
  Screenshot,
  A,
} from "../../components/ui.jsx";
import { HEROES_LAUNCHER_URL } from "../links.js";
import iconComplete from "../../assets/icons/complete.webp";
import menuSettings from "../../assets/images/menu-settings.webp";
import complete1 from "../../assets/complete/complete-01-launcher-install.webp";
import complete2 from "../../assets/complete/complete-02-select-folder.webp";
import complete3 from "../../assets/complete/complete-03-install-new-folder.webp";
import complete4 from "../../assets/complete/complete-04-launcher-play.webp";
import { RmgTemplates, SYSREQ_BASE, TavernInvite } from "./shared.jsx";

export const complete = {
  id: "complete",
  path: "Complete",
  name: "Complete",
  subtitle: "Bao gồm: SoD + AB + RoE",
  icon: iconComplete,
  accent: "color-mix(in srgb, cornflowerblue 68%, black)",
  summary:
    "Phiên bản chuẩn chính thức cuối cùng, gồm game gốc và toàn bộ các bản mở rộng. Nền tảng để cài thêm bất kỳ thứ gì.",
  content: (
    <>
      <Quote>
        &quot;Đây là phiên bản Heroes 3 chuẩn chính thức cuối cùng được phát
        hành bởi New World Computing Studio và The 3DO Company.{" "}
        <b>Heroes 3 Complete</b> bao gồm game gốc cùng với tất cả các phần mở
        rộng của nó là <b>Armageddon&apos;s Blade</b> và{" "}
        <b>The Shadow of Death</b>.&quot;
      </Quote>
      <Note>
        Phiên bản <b>Complete</b> gần như không khác gì so với <b>SoD</b>, thứ
        duy nhất <b>Complete</b> hơn là số lượng Map và Campaign (vì nó bao gồm
        cả <b>AB</b> và <b>SoD</b>). Tóm lại:
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
          label="Bản cài full qua Heroes Launcher (cần cài Complete trước)"
          desc={
            <>
              Cách nhanh để cài <b>HD Patch</b> và <b>SoD SP Plugin</b> mà không
              cần tải thủ công.
            </>
          }
          url={HEROES_LAUNCHER_URL}
          buttonText="Tải Launcher"
        />
      </Section>

      <Section title="HD Patch (HoMM3 HD)">
        <Note>
          Nếu đã cài qua <b>Heroes Launcher</b> (hướng dẫn phía dưới) thì{" "}
          <b>HD Patch</b> đã được cài sẵn, có thể bỏ qua mục này.{" "}
          <PageLink to="hota">
            <b>HotA</b>
          </PageLink>{" "}
          và{" "}
          <PageLink to="era">
            <b>ERA</b>
          </PageLink>{" "}
          cũng đã tích hợp sẵn <b>HD Patch</b>.
        </Note>
        <LinkRow
          label="HD Patch (HoMM3 HD)"
          desc={
            <>
              Cài để có trải nghiệm hình ảnh tốt nhất, chơi online qua lobby và
              chia quân nhanh bằng <PageLink to="keybinds">phím tắt</PageLink>.
            </>
          }
          url="https://sites.google.com/site/heroes3hd/eng/download"
        />
        <Steps
          items={[
            "Vào link trên tải bản HoMM3 HD mới nhất (file cài .exe).",
            <Fragment key="complete-step-1">
              Chạy file cài và chọn đúng thư mục đã cài <b>Complete</b>.
            </Fragment>,
            <Fragment key="complete-step-2">
              Mở <b>HD Launcher</b> (file HD_Launcher.exe trong thư mục game),
              chỉnh cài đặt tuỳ ý rồi bấm Play để vào game.
            </Fragment>,
          ]}
        />
      </Section>

      <Section title="Hướng dẫn cài qua Heroes Launcher">
        <Note>
          Với <b>Complete</b>, <b>Heroes Launcher</b> chỉ cài thêm{" "}
          <b>HD Patch</b> và <b>SoD SP Plugin</b> chứ <b>không</b> cài game -
          bác vẫn phải mua <b>Complete</b> trước (khuyên dùng bản GOG, bản Steam
          cũng được).
        </Note>
        <Steps
          items={[
            <Fragment key="complete-step-3">
              Cài <b>Heroes 3 Complete</b> (khuyên dùng bản GOG, bản Steam cũng
              được) - nếu máy đã cài <b>Complete</b> rồi thì có thể bỏ qua bước
              này.
            </Fragment>,
            <Fragment key="complete-step-4">
              Cài Launcher, mở lên, vào tab <b>SoD</b>, chọn Install.
            </Fragment>,
            <Fragment key="complete-step-5">
              Chọn &quot;Select folder with Heroes 3&quot; rồi chọn đường dẫn
              đến thư mục đã cài <b>Complete</b> (các thành phần sẽ cài thêm bao
              gồm <b>HD Patch</b>, <b>SoD SP Plugin</b> và trình sửa map
              Unleashed).
            </Fragment>,
            <Fragment key="complete-step-6">
              Bấm Start installation để cài. Mặc định các plugin đang tắt - mở{" "}
              <b>HD Launcher</b> lên và bật <b>SoD SP</b> trong phần Plugins để
              dùng.
            </Fragment>,
            <Fragment key="complete-step-7">
              Vào Menu → Settings → Games, chuyển phần Check for updates thành
              Check and install để <b>Complete</b> tự động cập nhật khi có bản
              mới.
            </Fragment>,
            "Bấm Play để vào game.",
          ]}
        />
        <div className="shot-grid">
          <Screenshot
            src={complete1}
            caption="Bước 2: Vào tab SoD trong Heroes Launcher, bấm Install"
          />
          <Screenshot
            src={complete2}
            caption='Bước 3: Chọn "Select folder with Heroes 3"'
          />
          <Screenshot
            src={complete3}
            caption="Bước 4: Chọn thư mục Complete rồi Start installation"
          />
          <Screenshot
            src={menuSettings}
            caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
          />
          <Screenshot src={complete4} caption="Bước 6: Bấm Play để vào game" />
        </div>
      </Section>

      <RmgTemplates needsHd />

      <Section title="Plugin hay cho Complete (yêu cầu đã cài HD Patch)">
        <LinkRow
          label="SoD SP Plugin"
          desc={
            <>
              Thêm nhiều chức năng cho <b>Complete/SoD</b>, tuy nhiên bị cấm
              dùng khi chơi online.
            </>
          }
          url="https://github.com/RoseKavalier/H3Plugins/releases/tag/sodsp"
        />
        <Steps
          title="Hướng dẫn cài SoD SP"
          items={[
            <Fragment key="complete-step-8">
              Cài <b>Complete/SoD</b> và <b>HD Patch</b>.
            </Fragment>,
            <Fragment key="sodsp-download">
              Vào link trên tải file <code>SoD_SP.exe</code> về và cài vào thư
              mục chứa game.
            </Fragment>,
            <Fragment key="complete-step-9">
              Mở <b>HD Launcher</b> lên và bật <b>SoD SP</b> trong phần Plugins.
            </Fragment>,
            <Fragment key="sodsp-doc">
              Toàn bộ tính năng đọc ở đây:{" "}
              <A href="https://docs.google.com/document/d/1JlQ6TC97d_Bb1g_sDRpxTvkKHtyXgZ3qORG5LJS8tp8/edit">
                Tài liệu tính năng <b>SoD SP</b>
              </A>
              .
            </Fragment>,
          ]}
        />
        <LinkRow
          label="XXL Plugin"
          desc={
            <>
              Tạo được map đến size G như <b>HotA</b> và <b>ERA</b>.
            </>
          }
          url="https://drive.google.com/file/d/1DAO6ttLg9Ka7w8zXxJ8SZqAIQrm-HK-t/view?usp=sharing"
        />
        <Steps
          title="Hướng dẫn cài XXL Plugin"
          items={[
            <Fragment key="xxl-extract">
              Tải về, giải nén và bỏ vào thư mục{" "}
              <code>HoMM 3 Complete\_HD3_Data\Packs</code>.
            </Fragment>,
            <Fragment key="complete-step-10">
              Mở <b>HD Launcher</b> lên và bật XXL trong phần Plugins.
            </Fragment>,
          ]}
        />
      </Section>

      <TavernInvite />
    </>
  ),
};
