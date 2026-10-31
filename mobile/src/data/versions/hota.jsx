import {
  Quote,
  Note,
  P,
  A,
  Section,
  SysReq,
  LinkRow,
  Code,
  Steps,
  PageLink,
  ShotGrid,
  Screenshot,
} from "../../components/ui";
import { HEROES_LAUNCHER_URL } from "../links";
import menuSettings from "../../assets/images/menu-settings.webp";
import hota1 from "../../assets/hota/hota-01-launcher-install.webp";
import hota2 from "../../assets/hota/hota-02-select-folder.webp";
import hota3 from "../../assets/hota/hota-03-install-new-folder.webp";
import hota4 from "../../assets/hota/hota-04-launcher-play.webp";
import {
  RMG_PLAY_STEP,
  SYSREQ_BASE,
  TavernInvite,
  TemplateGuide,
} from "./shared";

export const hota = {
  id: "hota",
  name: "Horn of the Abyss",
  subtitle: "HotA",
  accent: "lightseagreen",
  summary:
    "Kế thừa lối chơi của Complete/SoD với nhiều cải tiến cân bằng và thêm 3 thành mới là Cove, Factory và Bulwark.",
  content: (
    <>
      <Quote>
        &quot;Nói đến Horn of the Abyss hay HotA thì đây là một phiên bản kế
        thừa lối chơi truyền thống của Complete/SoD với nhiều cải tiến như cân
        bằng lại sức mạnh các thành, các skill, tạo map G, thêm đồ mới, skill
        mới, địa hình mới và thêm ba thành mới là Cove, Factory và Bulwark. HotA
        hiện đang được rất nhiều người sử dụng để chơi PvP online.&quot;
      </Quote>
      <Note>
        <P>
          Để chơi PvP online, bác cần có HD Patch (hiện HD Patch đã được tích
          hợp sẵn khi cài đặt HotA). Sau khi cài xong thì vào phần Multiplayer ở
          trong game, tạo tài khoản là chơi được luôn. Luật chơi HotA PvP online
          lobby đọc ở đây:{" "}
          <A href="https://h3hota.com/en/rules">h3hota.com/en/rules</A>. Ngoài
          ra, mỗi Template online (như Duel và Jebus Outcast) sẽ có một luật
          riêng - nên tìm hiểu kỹ trước khi chơi.
        </P>
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
          label="Bản cài qua Heroes Launcher (nên dùng)"
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
            <P>
              Tải về, giải nén bằng mật khẩu <Code>h3@tv</Code> rồi chạy file
              Setup để cài vào thư mục HotA. Chỉ dùng cho HotA 1.8.1, bản HotA
              mới hơn có thể bị lỗi.
            </P>
          }
          url="https://drive.google.com/drive/folders/1E8sFpwIHFEMr01E-89Vk-1upYcPvkSQj?usp=sharing"
        />
      </Section>

      <Section title="Hướng dẫn cài qua Heroes Launcher">
        <Steps
          items={[
            <P key="complete-step">
              Cài <PageLink to="complete">Heroes 3 Complete</PageLink> (khuyên
              dùng bản GOG, bản Steam cũng được) - nếu máy đã cài Complete rồi
              thì có thể bỏ qua bước này.
            </P>,
            "Cài Launcher, mở lên, vào tab HotA, chọn Install.",
            'Chọn "Select folder with Heroes 3" rồi chọn đường dẫn đến thư mục đã cài Complete.',
            'Tick vào dòng "Install HotA to a new folder and copy the original game files" để cài HotA ra thư mục riêng (nếu không tick, HotA sẽ bị cài đè vào thư mục Complete và có thể dẫn đến xung đột game).',
            "Vào Menu → Settings → Games, chuyển phần Check for updates thành Check and install để HotA tự động cập nhật khi có bản mới.",
            "Bấm Play để vào game.",
          ]}
        />
        <ShotGrid>
          <Screenshot
            source={hota1}
            caption="Bước 2: Vào tab HotA trong Heroes Launcher, bấm Install"
          />
          <Screenshot
            source={hota2}
            caption='Bước 3: Chọn "Select folder with Heroes 3"'
          />
          <Screenshot
            source={hota3}
            caption="Bước 4: Tick cài ra thư mục riêng rồi Start installation"
          />
          <Screenshot
            source={menuSettings}
            caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
          />
          <Screenshot source={hota4} caption="Bước 6: Bấm Play để vào game" />
        </ShotGrid>
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
            <P key="hota-rmg-download">
              Tải Template dạng file <Code>.h3t</Code> ở các link trên (nếu là
              file nén thì giải nén ra).
            </P>,
            <P key="hota-rmg-copy">
              Vào thư mục game, tìm thư mục <Code>HotA_RMGTemplates</Code> rồi
              copy file <Code>.h3t</Code> của Template vào đó.
            </P>,
            RMG_PLAY_STEP,
          ]}
        />
        <TemplateGuide />
      </Section>

      <TavernInvite />

      <Section title="Công cụ hỗ trợ">
        <LinkRow
          label="Heroes 3 Assist"
          desc="Hỗ trợ tính sát thương theo công thức, có đầy đủ thông tin về quân, phép, kỹ năng, thành..."
          url="https://drive.google.com/file/d/1dxiSXtjcxa4zObavJLX_TdDLp2CA0962/view"
        />
        <LinkRow
          label="Heroes 3 Viewer"
          desc="Công cụ hỗ trợ cho streamer (bảng hiện thông tin tướng mà các bác hay thấy khi xem stream HotA)."
          url="https://gitlab.com/Grekern/h3roviewer/-/releases"
        />
      </Section>

      <Section title="Cộng đồng">
        <LinkRow
          label="Discord HotA"
          url="https://discord.gg/eDkPSNf"
          buttonText="Tham gia"
        />
      </Section>
    </>
  ),
};
