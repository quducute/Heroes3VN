import { mix } from "../../theme";
import {
  Quote,
  PageLink,
  Note,
  P,
  Section,
  LinkRow,
  Steps,
  ShotGrid,
  Screenshot,
  B,
  Code,
  A,
} from "../../components/ui";
import { HEROES_LAUNCHER_URL } from "../links";
import menuSettings from "../../assets/images/menu-settings.webp";
import vcmi1 from "../../assets/vcmi/vcmi-01-launcher-install.webp";
import vcmi2 from "../../assets/vcmi/vcmi-02-select-folder.webp";
import vcmi3 from "../../assets/vcmi/vcmi-03-install-new-folder.webp";
import vcmi4 from "../../assets/vcmi/vcmi-04-launcher-play.webp";

export const vcmi = {
  id: "vcmi",
  name: "VCMI",
  subtitle: "Chơi trên đa nền tảng",
  accent: mix("peru", 0.73),
  summary:
    "Engine mã nguồn mở viết lại Heroes 3, chạy được trên đa nền tảng bao gồm Windows, Linux, macOS, iOS, Android.",
  content: (
    <>
      <Quote>
        &quot;Khác với <B>ERA/WoG</B> hay <B>HotA</B> vốn bổ sung nội dung cho
        Heroes 3 gốc, <B>VCMI</B> là một engine mã nguồn mở viết lại toàn bộ
        game và chỉ dùng lại tài nguyên (đồ hoạ, âm thanh, bản đồ...) của{" "}
        <PageLink to="complete">
          <B>Heroes 3 Complete GOG</B>
        </PageLink>
        . Nói cách khác, <B>VCMI</B> là một tựa game mới mô phỏng lại Heroes 3,
        nên sẽ ít tính năng hơn <B>HotA</B> hay <B>ERA</B>. Bù lại, điểm mạnh
        của <B>VCMI</B> là chơi được trên điện thoại và có hệ thống mod khá đa
        dạng, dù độ hoàn thiện vẫn chưa cao lắm.&quot;
      </Quote>
      <Note title="Chỉ dùng được bản GOG">
        <P>
          <B>VCMI</B> chỉ nạp được dữ liệu từ bản{" "}
          <PageLink to="complete">
            <B>Heroes 3 Complete GOG</B>
          </PageLink>
          , bản Steam không dùng được cho <B>VCMI</B>.
        </P>
      </Note>
      <Note title="Lưu ý">
        <P>
          <B>VCMI</B> không phải là Heroes 3, nó chỉ là một engine mã nguồn mở
          viết lại từ đầu để tái tạo Heroes 3 trên đa nền tảng.
        </P>
      </Note>

      <Section title="Link game">
        <LinkRow
          label="VCMI mới nhất cho Windows, Linux, macOS, iOS, Android"
          desc="Chọn đúng hệ điều hành để tải."
          url="https://vcmi.eu/download"
        />
        <LinkRow
          label="Windows: bản cài qua Heroes Launcher (nên dùng)"
          desc={
            <P>
              Tự cài <B>VCMI</B> và copy dữ liệu từ <B>Complete GOG</B> sang để
              làm nền cho <B>VCMI</B> chạy. Cần cài <B>Complete GOG</B> trước.
            </P>
          }
          url={HEROES_LAUNCHER_URL}
          buttonText="Tải Launcher"
        />
        <LinkRow
          label="iOS: bản trên TestFlight (nên dùng)"
          desc={
            <P>
              Tải <B>TestFlight</B> trên App Store trước.
            </P>
          }
          url="https://testflight.apple.com/join/pJWHSbmu"
        />
        <LinkRow
          label="Android: bản trên Google Play (nên dùng)"
          url="https://play.google.com/store/apps/details?id=is.xyz.vcmi"
        />
      </Section>

      <Section title="Hướng dẫn cài qua Heroes Launcher (Windows)">
        <Note>
          <P>
            Cách dễ nhất cho Windows: <B>Heroes Launcher</B> sẽ cài <B>VCMI</B>{" "}
            và tự copy dữ liệu từ <B>Complete GOG</B> vào làm nền cho{" "}
            <B>VCMI</B> chạy, không cần chép thủ công. Cần cài{" "}
            <B>Complete GOG</B> trước.
          </P>
        </Note>
        <Steps
          items={[
            <P key="complete-step">
              Cài{" "}
              <PageLink to="complete">
                <B>Heroes 3 Complete GOG</B>
              </PageLink>{" "}
              - nếu máy đã cài <B>Complete GOG</B> rồi thì có thể bỏ qua bước
              này.
            </P>,
            <P key="vcmi-step-1">
              Cài Launcher, mở lên, vào tab <B>VCMI</B>, chọn Install.
            </P>,
            <P key="vcmi-step-2">
              Chọn &quot;Select folder with Heroes 3&quot; rồi chọn đường dẫn
              đến thư mục đã cài <B>Complete GOG</B>.
            </P>,
            <P key="vcmi-step-3">
              Tick vào dòng &quot;Install <B>VCMI</B> to a new folder and copy
              the original game files&quot; để cài <B>VCMI</B> ra thư mục riêng
              (nếu không tick, <B>VCMI</B> sẽ bị cài đè vào thư mục{" "}
              <B>Complete</B> và có thể dẫn đến xung đột game).
            </P>,
            <P key="vcmi-step-4">
              Vào Menu → Settings → Games, chuyển phần Check for updates thành
              Check and install để <B>VCMI</B> tự động cập nhật khi có bản mới.
            </P>,
            "Bấm Play để vào game.",
          ]}
        />
        <ShotGrid>
          <Screenshot
            source={vcmi1}
            caption="Bước 2: Vào tab VCMI trong Heroes Launcher, bấm Install"
          />
          <Screenshot
            source={vcmi2}
            caption='Bước 3: Chọn "Select folder with Heroes 3"'
          />
          <Screenshot
            source={vcmi3}
            caption="Bước 4: Tick cài ra thư mục riêng rồi Start installation"
          />
          <Screenshot
            source={menuSettings}
            caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
          />
          <Screenshot source={vcmi4} caption="Bước 6: Bấm Play để vào game" />
        </ShotGrid>
      </Section>

      <Section title="Hướng dẫn cài thủ công (các hệ điều hành khác)">
        <Note title="Chuẩn bị dữ liệu game gốc">
          <P>
            <B>VCMI</B> chỉ là engine nên bắt buộc phải có dữ liệu (hình ảnh, âm
            thanh, map) của <B>Heroes 3 Complete</B>/<B>SoD</B> để chạy. Chuẩn
            bị sẵn <B>một trong hai</B> thứ sau:
          </P>
          <P>
            <B>Cách 1 - File cài offline của GOG (chuẩn nhất, nên dùng):</B> tải
            bộ file cài offline (file <Code>.exe</Code> kèm file{" "}
            <Code>.bin</Code>, phải để chung một thư mục). <B>VCMI Launcher</B>{" "}
            sẽ tự giải nén dữ liệu từ bộ file này.
          </P>
          <P>
            <B>Cách 2 - Thư mục game đã cài (phương án phụ):</B> lấy 3 thư mục{" "}
            <Code>Data</Code>, <Code>Maps</Code>, <Code>Mp3</Code> trong thư mục
            đã cài <B>Complete</B> trên Windows. Nên lấy từ thư mục{" "}
            <B>Complete</B> gốc chưa cài mod (không lấy từ thư mục <B>HotA</B>{" "}
            hay <B>ERA</B>) để tránh lỗi.
          </P>
        </Note>
        <Steps
          title="Windows"
          items={[
            <P key="vcmi-win-install">
              Vào <A href="https://vcmi.eu/download">vcmi.eu/download</A> tải
              bản cho Windows (file <Code>.exe</Code>) rồi cài như phần mềm bình
              thường.
            </P>,
            <P key="vcmi-step-5">
              Mở <B>VCMI Launcher</B>, lần đầu mở sẽ hiện trình hướng dẫn thiết
              lập, chọn ngôn ngữ rồi bấm tiếp.
            </P>,
            <P key="vcmi-step-6">
              Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài
              offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục{" "}
              <B>Complete</B> đã cài để <B>VCMI</B> tự sao chép dữ liệu (cách
              2).
            </P>,
            <P key="vcmi-win-manual">
              Nếu muốn chép tay thì chép 3 thư mục <Code>Data</Code>,{" "}
              <Code>Maps</Code>, <Code>Mp3</Code> vào{" "}
              <Code>Documents\My Games\vcmi</Code>.
            </P>,
            "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó bấm Play để vào game.",
          ]}
        />
        <Steps
          title="Linux"
          items={[
            <P key="vcmi-linux-install">
              Cài qua Flathub (chạy được trên hầu hết các distro):{" "}
              <Code>flatpak install flathub eu.vcmi.VCMI</Code>. Ngoài ra có thể
              cài qua kho phần mềm của distro, xem chi tiết ở link hướng dẫn bên
              dưới.
            </P>,
            <P key="vcmi-step-7">
              Mở <B>VCMI Launcher</B>, lần đầu mở sẽ hiện trình hướng dẫn thiết
              lập, chọn ngôn ngữ rồi bấm tiếp.
            </P>,
            <P key="vcmi-step-8">
              Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài
              offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục{" "}
              <B>Complete</B> đã cài để <B>VCMI</B> tự sao chép dữ liệu (cách
              2).
            </P>,
            <P key="vcmi-linux-manual">
              Nếu muốn chép tay thì chép 3 thư mục <Code>Data</Code>,{" "}
              <Code>Maps</Code>, <Code>Mp3</Code> vào{" "}
              <Code>~/.local/share/vcmi</Code> (bản Flatpak là{" "}
              <Code>~/.var/app/eu.vcmi.VCMI/data/vcmi</Code>). Lưu ý Linux phân
              biệt chữ hoa/thường nên phải giữ đúng tên thư mục.
            </P>,
            "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó bấm Play để vào game.",
          ]}
        />
        <Steps
          title="macOS"
          items={[
            <P key="vcmi-mac-install">
              Vào <A href="https://vcmi.eu/download">vcmi.eu/download</A> tải
              bản cho macOS (file <Code>.dmg</Code>, chọn đúng loại chip Apple
              Silicon hoặc Intel), mở ra rồi kéo <B>VCMI</B> vào thư mục
              Applications. Nếu lần đầu mở bị macOS chặn thì vào System Settings
              → Privacy & Security, kéo xuống bấm Open Anyway.
            </P>,
            <P key="vcmi-step-9">
              Mở <B>VCMI Launcher</B>, lần đầu mở sẽ hiện trình hướng dẫn thiết
              lập, chọn ngôn ngữ rồi bấm tiếp.
            </P>,
            <P key="vcmi-step-10">
              Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài
              offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục{" "}
              <B>Complete</B> đã cài để <B>VCMI</B> tự sao chép dữ liệu (cách
              2).
            </P>,
            <P key="vcmi-mac-manual">
              Nếu muốn chép tay thì chép 3 thư mục <Code>Data</Code>,{" "}
              <Code>Maps</Code>, <Code>Mp3</Code> vào{" "}
              <Code>~/Library/Application Support/vcmi</Code>.
            </P>,
            "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó bấm Play để vào game.",
          ]}
        />
        <Steps
          title="Android / iOS / iPadOS"
          items={[
            <P key="vcmi-step-11">
              Cài <B>VCMI</B>: Android thì tải từ Google Play; iOS/iPadOS thì
              cài app <B>TestFlight</B> từ App Store trước, sau đó mở link{" "}
              <B>TestFlight</B> của <B>VCMI</B> (link của cả hai đều ở mục Link
              game phía trên).
            </P>,
            <P key="vcmi-step-12">
              Tải bộ cài offline ngay trên điện thoại/máy tính bảng, không cần
              máy tính: mở trình duyệt, đăng nhập gog.com, vào thư viện game
              (Account → Games), chọn <B>Heroes 3 Complete</B> rồi tải bộ cài
              offline cho Windows (file .exe và file .bin). File tải về sẽ nằm
              trong thư mục Download (Android) hoặc app Tệp (Files), mục Tải về
              (iOS/iPadOS). Ngoài ra, nếu đã có sẵn 3 thư mục Data, Maps, Mp3
              (cách 2) thì cũng có thể chép từ máy tính sang qua cáp USB, Google
              Drive, iCloud Drive...
            </P>,
            <P key="vcmi-step-13">
              Mở <B>VCMI</B>, làm theo trình hướng dẫn lần đầu, chọn cài từ file
              GOG rồi chọn file .exe vừa tải (file .bin phải nằm chung thư mục),
              hoặc chọn thư mục chứa 3 thư mục Data, Maps, Mp3 nếu chép từ máy
              tính sang. <B>VCMI</B> sẽ tự sao chép dữ liệu vào bộ nhớ của app.
            </P>,
            <P key="vcmi-step-14">
              Chờ <B>VCMI</B> xử lý xong (có thể mất vài phút, cần còn trống
              khoảng 2 GB) rồi bấm Play để vào game.
            </P>,
          ]}
        />
        <P>
          Giao diện <B>VCMI</B> có thể khác đôi chút tuỳ phiên bản. Nếu gặp lỗi,
          xem hướng dẫn chính thức chi tiết cho từng hệ điều hành:
        </P>
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
};
