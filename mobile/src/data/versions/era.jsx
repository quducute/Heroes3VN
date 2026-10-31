import { View } from "react-native";
import {
  Quote,
  Note,
  P,
  A,
  Section,
  SysReq,
  LinkRow,
  Screenshot,
  Code,
  Steps,
  PageLink,
  ShotGrid,
  B,
} from "../../components/ui";
import { HEROES_LAUNCHER_URL } from "../links";
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
import { RmgTemplates, TavernInvite } from "./shared";

export const era = {
  id: "era",
  name: "ERA",
  subtitle: "Tên cũ: WoG",
  accent: "slateblue",
  summary:
    "Hậu duệ của WoG 3.58f huyền thoại, fix các lỗi còn tồn đọng, thêm nhiều script mới và hệ thống Mod Browser/Mod Manager.",
  content: (
    <>
      <Quote>
        &quot;Nói đến In the Wake of Gods hay WoG thì chắc là đã quá nổi tiếng
        rồi. Đây là một phiên bản huyền thoại đã từng có rất nhiều người chơi.
        Tuy nhiên, cái tên WoG đã dừng lại ở con số 3.58f để nhường chỗ cho cái
        tên mới là ERA. Để cho dễ hiểu thì ERA chính là phiên bản tiếp theo của
        WoG 3.58f. Nó fix các lỗi còn tồn đọng ở WoG, thêm nhiều script mới
        trong WoG Options mới và đặc biệt là giới thiệu hệ thống Mod Browser/Mod
        Manager giúp việc cài mod trở nên dễ dàng hơn.&quot;
      </Quote>
      <Note>
        <P>
          Một vài mod nặng như Third Upgrades Mod yêu cầu cài Visual C++
          Redistributable 2005, 2008, 2010, 2012, 2015-nay. Bác có thể tải trực
          tiếp từng phiên bản ở trang chủ Microsoft hoặc tải bản repack full ở
          đây: <A href="https://www.tinyplease.com/vcpp">tinyplease.com/vcpp</A>
          .
        </P>
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
          desc="Đây là nguồn chính thức duy nhất để cài ERA."
          url={HEROES_LAUNCHER_URL}
          buttonText="Tải Launcher"
        />
        <View style={{ width: 220, alignSelf: "center" }}>
          <Screenshot
            source={era10}
            caption="Từ bản 3.9, ERA đã đổi sang dùng biểu tượng phượng hoàng lửa này thay cho con mắt WoG"
          />
        </View>
      </Section>

      <Section title="Nhạc menu của WoG">
        <LinkRow
          label="Nhạc menu của WoG"
          desc={
            <P>
              Tải về giải nén vào thư mục <Code>MP3</Code> trong thư mục ERA.
            </P>
          }
          url="https://drive.google.com/file/d/1nCrBC2T7yxfIIoRbxOgi15fXsy45CUH3/view?usp=sharing"
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
            "Cài Launcher, mở lên, vào tab ERA, chọn Install.",
            'Chọn "Select folder with Heroes 3" rồi chọn đường dẫn đến thư mục đã cài Complete.',
            'Tick vào dòng "Install ERA project to a new folder and copy the original game files" để cài ERA ra thư mục riêng (nếu không tick, ERA sẽ bị cài đè vào thư mục Complete và có thể dẫn đến xung đột game).',
            "Vào Menu → Settings → Games, chuyển phần Check for updates thành Check and install để ERA tự động cập nhật khi có bản mới.",
            "Bấm Play để mở game. Lần đầu mở game, vào WoG Options bấm vào tab 1 và bấm nút Restore Default để đưa cài đặt về chuẩn WoG, sau đó mới chỉnh tuỳ ý rồi save lại (bấm theo ảnh bên dưới).",
            "Nên cài thêm một vài mod trong Mod Browser để trải nghiệm ERA hay hơn (đặc biệt là Third Upgrades Mod). Bật/tắt mod ở trong Mod Manager.",
          ]}
        />
        <ShotGrid>
          <Screenshot
            source={era1}
            caption="Bước 2: Vào tab ERA trong Heroes Launcher, bấm Install"
          />
          <Screenshot
            source={era2}
            caption='Bước 3: Chọn "Select folder with Heroes 3"'
          />
          <Screenshot
            source={era3}
            caption="Bước 4: Tick cài ra thư mục riêng rồi Start installation"
          />
          <Screenshot
            source={menuSettings}
            caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
          />
          <Screenshot source={era4} caption="Bước 6: Bấm Play để mở game" />
          <Screenshot
            source={era5}
            caption="Bước 6: WoG Options - vào tab 1, bấm Restore Default (2) rồi Save (3)"
          />
          <Screenshot
            source={era6}
            caption="Bước 7 (tuỳ chọn): Cài mod theo sở thích"
          />
        </ShotGrid>
      </Section>

      <Section title="ERA bản cũ">
        <Note title="Khi nào cần dùng bản cũ?">
          <P>
            Một số map của ERA như <B>The Empire of the World (TEW)</B> được làm
            dưới dạng <Code>[Scenarios]</Code> mod. Các mod này không tương
            thích với bản ERA 3.9 cài từ Heroes Launcher, nên cần dùng phiên bản{" "}
            <B>3.8 trở xuống</B> để chơi. Cách phân biệt: bản 3.9 trở lên đã đổi
            biểu tượng sang hình <B>con phượng hoàng lửa</B>, còn bản 3.8 trở
            xuống vẫn dùng biểu tượng <B>con mắt WoG</B>.
          </P>
        </Note>
        <LinkRow
          label="ERA Old Version"
          desc="Dùng để chơi các map dạng [Scenarios] mod như The Empire of the World (TEW)."
          url="https://drive.google.com/file/d/1IZIBLuvfOc2LFgXyQuhmR6ul49HEeXE0/view?usp=sharing"
        />
        <Steps
          title="Hướng dẫn cài"
          items={[
            "Tải file cài ERA Old Version ở link trên về máy rồi mở lên.",
            String.raw`Bấm nút Browse... rồi chọn một thư mục trống để cài (ví dụ D:\Games\Heroes 3 ERA Old Version). Tuyệt đối không cài đè lên ERA/WoG, Complete/SoD, HotA hay bất kỳ bản Heroes 3 nào đã cài sẵn.`,
            "Bấm Install và chờ cài xong.",
          ]}
        />
        <Screenshot
          source={era9}
          caption="Trình cài đặt ERA Old Version (bản 3.8, kèm sẵn map TEW 2, 3, 4)"
        />
      </Section>

      <Section title="Phân biệt update của HD Patch và update của ERA">
        <Note title="Đừng nhầm lẫn">
          <P>
            Update của ERA khác với update tự động của HD Patch - update HD
            Patch <B>không</B> phải là update ERA.
          </P>
        </Note>
        <Screenshot
          source={era7}
          caption="Update của HD Patch (trái) và update của ERA (phải)"
        />
      </Section>

      <RmgTemplates />

      <TavernInvite />

      <Section title="Cheat bằng mod TrainerX (riêng ERA)">
        <Note>
          <P>
            TrainerX có sẵn khi cài ERA mới nhất, không cần cài thêm. Mod này
            cho phép cheat trực tiếp trong game qua menu cheat; các bản khác chỉ
            có cách gõ mã truyền thống, xem ở{" "}
            <PageLink to="cheat">trang Mã cheat Heroes 3</PageLink>.
          </P>
        </Note>
        <Steps
          items={[
            "Bấm F2 và nhập tên tướng muốn chỉnh để chỉnh mọi thứ liên quan đến tướng đấy (Level, Skills, Spells, Đồ, Quân, Commander, Henchman, Tài nguyên...).",
            "Bấm F3 và click chuột phải vào các chỗ muốn chỉnh ngoài map để hiện menu cheat nâng cao (chỉ nên dùng F3 nếu bác hiểu mình đang làm gì, nếu không có thể dẫn đến hỏng map).",
            "Bấm F6 để hiện menu cheat phụ: Builder Mode để xây nhà liên tục trong 1 ngày và Change in-game Date để chỉnh ngày trong game.",
          ]}
        />
        <Screenshot
          source={era8}
          caption="Bảng chỉnh tướng của TrainerX (bấm F2)"
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
};
