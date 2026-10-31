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
        hành bởi New World Computing Studio và The 3DO Company.{" "}
        <B>Heroes 3 Complete</B> bao gồm game gốc cùng với tất cả các phần mở
        rộng của nó là <B>Armageddon&apos;s Blade</B> và{" "}
        <B>The Shadow of Death</B>.&quot;
      </Quote>
      <Note>
        <P>
          Phiên bản <B>Complete</B> gần như không khác gì so với <B>SoD</B>, thứ
          duy nhất <B>Complete</B> hơn là số lượng Map và Campaign (vì nó bao
          gồm cả <B>AB</B> và <B>SoD</B>). Tóm lại:
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
          desc={
            <P>
              Cách nhanh để cài <B>HD Patch</B> và <B>SoD SP Plugin</B> mà không
              cần tải thủ công.
            </P>
          }
          url={HEROES_LAUNCHER_URL}
          buttonText="Tải Launcher"
        />
      </Section>

      <Section title="HD Patch (HoMM3 HD)">
        <Note>
          <P>
            Nếu đã cài qua <B>Heroes Launcher</B> (hướng dẫn phía dưới) thì{" "}
            <B>HD Patch</B> đã được cài sẵn, có thể bỏ qua mục này.{" "}
            <PageLink to="hota">
              <B>HotA</B>
            </PageLink>{" "}
            và{" "}
            <PageLink to="era">
              <B>ERA</B>
            </PageLink>{" "}
            cũng đã tích hợp sẵn <B>HD Patch</B>.
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
            <P key="complete-step-1">
              Chạy file cài và chọn đúng thư mục đã cài <B>Complete</B>.
            </P>,
            <P key="complete-step-2">
              Mở <B>HD Launcher</B> (file HD_Launcher.exe trong thư mục game),
              chỉnh cài đặt tuỳ ý rồi bấm Play để vào game.
            </P>,
          ]}
        />
      </Section>

      <Section title="Hướng dẫn cài qua Heroes Launcher">
        <Note>
          <P>
            Với <B>Complete</B>, <B>Heroes Launcher</B> chỉ cài thêm{" "}
            <B>HD Patch</B> và <B>SoD SP Plugin</B> chứ <B>không</B> cài game -
            bác vẫn phải mua <B>Complete</B> trước (khuyên dùng bản GOG, bản
            Steam cũng được).
          </P>
        </Note>
        <Steps
          items={[
            <P key="complete-step-3">
              Cài <B>Heroes 3 Complete</B> (khuyên dùng bản GOG, bản Steam cũng
              được) - nếu máy đã cài <B>Complete</B> rồi thì có thể bỏ qua bước
              này.
            </P>,
            <P key="complete-step-4">
              Cài Launcher, mở lên, vào tab <B>SoD</B>, chọn Install.
            </P>,
            <P key="complete-step-5">
              Chọn &quot;Select folder with Heroes 3&quot; rồi chọn đường dẫn
              đến thư mục đã cài <B>Complete</B> (các thành phần sẽ cài thêm bao
              gồm <B>HD Patch</B>, <B>SoD SP Plugin</B> và trình sửa map
              Unleashed).
            </P>,
            <P key="complete-step-6">
              Bấm Start installation để cài. Mặc định các plugin đang tắt - mở{" "}
              <B>HD Launcher</B> lên và bật <B>SoD SP</B> trong phần Plugins để
              dùng.
            </P>,
            <P key="complete-step-7">
              Vào Menu → Settings → Games, chuyển phần Check for updates thành
              Check and install để <B>Complete</B> tự động cập nhật khi có bản
              mới.
            </P>,
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
          desc={
            <P>
              Thêm nhiều chức năng cho <B>Complete/SoD</B>, tuy nhiên bị cấm
              dùng khi chơi online.
            </P>
          }
          url="https://github.com/RoseKavalier/H3Plugins/releases/tag/sodsp"
        />
        <Steps
          title="Hướng dẫn cài SoD SP"
          items={[
            <P key="complete-step-8">
              Cài <B>Complete/SoD</B> và <B>HD Patch</B>.
            </P>,
            <P key="sodsp-download">
              Vào link trên tải file <Code>SoD_SP.exe</Code> về và cài vào thư
              mục chứa game.
            </P>,
            <P key="complete-step-9">
              Mở <B>HD Launcher</B> lên và bật <B>SoD SP</B> trong phần Plugins.
            </P>,
            <P key="sodsp-doc">
              Toàn bộ tính năng đọc ở đây:{" "}
              <A href="https://docs.google.com/document/d/1JlQ6TC97d_Bb1g_sDRpxTvkKHtyXgZ3qORG5LJS8tp8/edit">
                Tài liệu tính năng <B>SoD SP</B>
              </A>
              .
            </P>,
          ]}
        />
        <LinkRow
          label="XXL Plugin"
          desc={
            <P>
              Tạo được map đến size G như <B>HotA</B> và <B>ERA</B>.
            </P>
          }
          url="https://drive.google.com/file/d/1DAO6ttLg9Ka7w8zXxJ8SZqAIQrm-HK-t/view?usp=sharing"
        />
        <Steps
          title="Hướng dẫn cài XXL Plugin"
          items={[
            <P key="xxl-extract">
              Tải về, giải nén và bỏ vào thư mục{" "}
              <Code>HoMM 3 Complete\_HD3_Data\Packs</Code>.
            </P>,
            <P key="complete-step-10">
              Mở <B>HD Launcher</B> lên và bật XXL trong phần Plugins.
            </P>,
          ]}
        />
      </Section>

      <TavernInvite />
    </>
  ),
};
