import { mix } from "../../theme";
import {
  Quote,
  Note,
  P,
  Formula,
  Section,
  SysReq,
  LinkRow,
  PageLink,
  Steps,
  B,
  ShotGrid,
  Screenshot,
  Code,
  A,
} from "../../components/ui";
import { HEROES_LAUNCHER_URL } from "../links";
import menuSettings from "../../assets/images/menu-settings.webp";
import complete1 from "../../assets/complete/complete-01-launcher-install.webp";
import complete2 from "../../assets/complete/complete-02-select-folder.webp";
import complete3 from "../../assets/complete/complete-03-install-new-folder.webp";
import complete4 from "../../assets/complete/complete-04-launcher-play.webp";
import { RmgTemplates, SYSREQ_BASE, TavernInvite } from "./shared";

export const complete = {
  id: "complete",
  name: "Complete",
  subtitle: "Bao gồm: SoD + AB + RoE",
  accent: mix("cornflowerblue", 0.68),
  summary:
    "Phiên bản chuẩn chính thức cuối cùng, gồm game gốc và toàn bộ các bản mở rộng. Nền tảng để cài thêm bất kỳ thứ gì.",
  content: (
    <>
      <Quote>
        &quot;Đây là phiên bản Heroes 3 chuẩn chính thức cuối cùng được phát
        hành bởi New World Computing Studio và The 3DO Company. Heroes 3
        Complete bao gồm game gốc cùng với tất cả các phần mở rộng của nó là
        Armageddon&apos;s Blade và The Shadow of Death.&quot;
      </Quote>
      <Note>
        <P>
          Phiên bản Complete gần như không khác gì so với SoD, thứ duy nhất
          Complete hơn là số lượng Map và Campaign (vì nó bao gồm cả AB và SoD).
          Tóm lại:
        </P>
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
          desc="Cách nhanh để cài HD Patch và SoD SP Plugin mà không cần tải thủ công."
          url={HEROES_LAUNCHER_URL}
          buttonText="Tải Launcher"
        />
      </Section>

      <Section title="HD Patch (HoMM3 HD)">
        <Note>
          <P>
            Nếu đã cài qua Heroes Launcher (hướng dẫn phía dưới) thì HD Patch đã
            được cài sẵn, có thể bỏ qua mục này.{" "}
            <PageLink to="hota">HotA</PageLink> và{" "}
            <PageLink to="era">ERA</PageLink> cũng đã tích hợp sẵn HD Patch.
          </P>
        </Note>
        <LinkRow
          label="HD Patch (HoMM3 HD)"
          desc={
            <P>
              Cài để có trải nghiệm hình ảnh tốt nhất, chơi online qua lobby và
              chia quân nhanh bằng <PageLink to="keybinds">phím tắt</PageLink>.
            </P>
          }
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

      <Section title="Hướng dẫn cài qua Heroes Launcher">
        <Note>
          <P>
            Với Complete, Heroes Launcher chỉ cài thêm HD Patch và SoD SP Plugin
            chứ <B>không</B> cài game - bác vẫn phải mua Complete trước (khuyên
            dùng bản GOG, bản Steam cũng được).
          </P>
        </Note>
        <Steps
          items={[
            "Cài Heroes 3 Complete (khuyên dùng bản GOG, bản Steam cũng được) - nếu máy đã cài Complete rồi thì có thể bỏ qua bước này.",
            "Cài Launcher, mở lên, vào tab SoD, chọn Install.",
            'Chọn "Select folder with Heroes 3" rồi chọn đường dẫn đến thư mục đã cài Complete (các thành phần sẽ cài thêm bao gồm HD Patch, SoD SP Plugin và trình sửa map Unleashed).',
            "Bấm Start installation để cài. Mặc định các plugin đang tắt - mở HD Launcher lên và bật SoD SP trong phần Plugins để dùng.",
            "Vào Menu → Settings → Games, chuyển phần Check for updates thành Check and install để Complete tự động cập nhật khi có bản mới.",
            "Bấm Play để vào game.",
          ]}
        />
        <ShotGrid>
          <Screenshot
            source={complete1}
            caption="Bước 2: Vào tab SoD trong Heroes Launcher, bấm Install"
          />
          <Screenshot
            source={complete2}
            caption='Bước 3: Chọn "Select folder with Heroes 3"'
          />
          <Screenshot
            source={complete3}
            caption="Bước 4: Chọn thư mục Complete rồi Start installation"
          />
          <Screenshot
            source={menuSettings}
            caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
          />
          <Screenshot
            source={complete4}
            caption="Bước 6: Bấm Play để vào game"
          />
        </ShotGrid>
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
            <P key="sodsp-download">
              Vào link trên tải file <Code>SoD_SP.exe</Code> về và cài vào thư
              mục chứa game.
            </P>,
            "Mở HD Launcher lên và bật SoD SP trong phần Plugins.",
            <P key="sodsp-doc">
              Toàn bộ tính năng đọc ở đây:{" "}
              <A href="https://docs.google.com/document/d/1JlQ6TC97d_Bb1g_sDRpxTvkKHtyXgZ3qORG5LJS8tp8/edit">
                Tài liệu tính năng SoD SP
              </A>
              .
            </P>,
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
            <P key="xxl-extract">
              Tải về, giải nén và bỏ vào thư mục{" "}
              <Code>HoMM 3 Complete\_HD3_Data\Packs</Code>.
            </P>,
            "Mở HD Launcher lên và bật XXL trong phần Plugins.",
          ]}
        />
      </Section>

      <TavernInvite />
    </>
  ),
};
