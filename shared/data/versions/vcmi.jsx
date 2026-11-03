import iconVcmi from "@shared/assets/icons/vcmi.webp";
import {
  mix,
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
  Hint,
  Lines,
} from "@ui";
import { HEROES_LAUNCHER_URL } from "../links.js";
import menuSettings from "@shared/assets/images/menu-settings.webp";
import vcmi1 from "@shared/assets/vcmi/vcmi-01-launcher-install.webp";
import vcmi2 from "@shared/assets/vcmi/vcmi-02-select-folder.webp";
import vcmi3 from "@shared/assets/vcmi/vcmi-03-install-new-folder.webp";
import vcmi4 from "@shared/assets/vcmi/vcmi-04-launcher-play.webp";

export const vcmi = {
  id: "vcmi",
  path: "VCMI",
  name: "VCMI",
  subtitle: "Chơi trên đa nền tảng",
  icon: iconVcmi,
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

      <Section id="link" title="Link game">
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

      <Section id="cai-dat" title="Hướng dẫn cài qua Heroes Launcher (Windows)">
        <Note>
          <P>
            Cách dễ nhất cho Windows: <B>Heroes Launcher</B> sẽ cài <B>VCMI</B>{" "}
            và tự copy dữ liệu từ <B>Complete GOG</B> vào làm nền cho{" "}
            <B>VCMI</B> chạy, không cần copy thủ công. Cần cài{" "}
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
              Cài <B>Heroes Launcher</B>, mở lên, vào tab <B>VCMI</B>, chọn
              Install.
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
              Vào Menu › Settings › Games, chuyển phần Check for updates thành
              Check and install để <B>VCMI</B> tự động cập nhật khi có bản mới.
            </P>,
            "Click Play để vào game.",
          ]}
        />
        <ShotGrid>
          <Screenshot
            src={vcmi1}
            caption="Bước 2: Vào tab VCMI trong Heroes Launcher, click Install"
          />
          <Screenshot
            src={vcmi2}
            caption='Bước 3: Chọn "Select folder with Heroes 3"'
          />
          <Screenshot
            src={vcmi3}
            caption="Bước 4: Tick cài ra thư mục riêng rồi click Start installation"
          />
          <Screenshot
            src={menuSettings}
            caption="Bước 5: Menu › Settings › Games › Check for updates › Check and install"
          />
          <Screenshot src={vcmi4} caption="Bước 6: Click Play để vào game" />
        </ShotGrid>
      </Section>

      <Section
        id="cai-thu-cong"
        title="Hướng dẫn cài thủ công qua kho phần mềm (mọi hệ điều hành)"
      >
        <Note title="Chuẩn bị dữ liệu game gốc">
          <Lines>
            <P>
              <B>VCMI</B> chỉ là engine nên bắt buộc phải có dữ liệu (hình ảnh,
              âm thanh, map) của <B>Heroes 3 Complete</B>/<B>SoD</B> để chạy.
              Chuẩn bị sẵn <B>một trong hai</B> thứ sau:
            </P>
            <P>
              <B>Cách 1 - File cài offline của GOG (chuẩn nhất, nên dùng):</B>{" "}
              đăng nhập gog.com, vào thư viện game (Account › Games), chọn{" "}
              <B>Heroes 3 Complete</B> rồi tải bộ cài offline cho Windows (file{" "}
              <Code>.exe</Code> kèm file <Code>.bin</Code>, phải để chung một
              thư mục). <B>VCMI</B> sẽ tự giải nén dữ liệu từ bộ file này, kể cả
              trên Linux, macOS, iOS, Android.
            </P>
            <P>
              <B>Cách 2 - Thư mục game đã cài (phương án phụ):</B> lấy 3 thư mục{" "}
              <Code>Data</Code>, <Code>Maps</Code>, <Code>Mp3</Code> trong thư
              mục đã cài <B>Complete</B> trên Windows. Nên lấy từ thư mục{" "}
              <B>Complete</B> gốc chưa cài mod (không lấy từ thư mục <B>HotA</B>{" "}
              hay <B>ERA</B>) để tránh lỗi.
            </P>
          </Lines>
        </Note>
        <Hint>
          Cài qua kho phần mềm thì sau này cập nhật <B>VCMI</B> cũng qua đúng
          kho đó, không cần tải lại file cài bằng tay.
        </Hint>
        <Steps
          title="Windows (winget)"
          items={[
            <P key="vcmi-win-install">
              Click chuột phải vào nút Start, chọn <B>Terminal</B> (Windows 11)
              hoặc <B>Windows PowerShell</B> (Windows 10), gõ lệnh{" "}
              <Code>winget install -e --id vcmi.vcmi</Code> rồi bấm Enter để cài{" "}
              <B>VCMI</B> từ{" "}
              <A href="https://winstall.app/apps/vcmi.vcmi">winget</A> (có sẵn
              trên Windows 10/11, nếu máy báo không có lệnh thì cài/cập nhật app{" "}
              <B>App Installer</B> trong Microsoft Store). Sau này muốn cập nhật
              thì chạy <Code>winget upgrade -e --id vcmi.vcmi</Code>.
            </P>,
            <P key="vcmi-win-launcher">
              Mở <B>VCMI</B> từ Start menu, lần đầu mở sẽ hiện trình hướng dẫn
              thiết lập, chọn ngôn ngữ rồi click tiếp.
            </P>,
            <P key="vcmi-win-data">
              Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file{" "}
              <Code>.exe</Code> cài offline, file <Code>.bin</Code> sẽ được tự
              nhận (cách 1). Nếu dùng cách 2 thì copy 3 thư mục{" "}
              <Code>Data</Code>, <Code>Maps</Code>, <Code>Mp3</Code> vào{" "}
              <Code>Documents\My Games\vcmi</Code> rồi click Scan again.
            </P>,
            "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó click Play để vào game.",
          ]}
        />
        <Steps
          title="Linux (Flathub)"
          items={[
            <P key="vcmi-linux-install">
              Mở Terminal, chạy{" "}
              <Code>flatpak install flathub eu.vcmi.VCMI</Code> để cài{" "}
              <B>VCMI</B> từ{" "}
              <A href="https://flathub.org/apps/eu.vcmi.VCMI">Flathub</A> (chạy
              được trên hầu hết các distro, cần cài sẵn Flatpak). Cập nhật sau
              này bằng <Code>flatpak update</Code>.
            </P>,
            <P key="vcmi-linux-launcher">
              Mở <B>VCMI</B> từ menu ứng dụng (hoặc chạy lệnh{" "}
              <Code>vcmilauncher</Code>), lần đầu mở sẽ hiện trình hướng dẫn
              thiết lập, chọn ngôn ngữ rồi click tiếp.
            </P>,
            <P key="vcmi-linux-data">
              Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file{" "}
              <Code>.exe</Code> cài offline (cách 1). Nếu dùng cách 2 thì copy 3
              thư mục <Code>Data</Code>, <Code>Maps</Code>, <Code>Mp3</Code> vào{" "}
              <Code>~/.var/app/eu.vcmi.VCMI/data/vcmi</Code>. Lưu ý Linux phân
              biệt chữ hoa/thường nên phải giữ đúng tên thư mục.
            </P>,
            "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó click Play để vào game.",
          ]}
        />
        <Steps
          title="macOS (Homebrew)"
          items={[
            <P key="vcmi-mac-install">
              Mở Terminal, chạy <Code>brew install --cask vcmi</Code> để cài{" "}
              <B>VCMI</B> từ{" "}
              <A href="https://formulae.brew.sh/cask/vcmi">Homebrew</A> vào thư
              mục <Code>Applications</Code> (tự chọn đúng bản cho chip Apple
              Silicon hoặc Intel; nếu máy chưa có <B>Homebrew</B> thì cài trước
              theo hướng dẫn ở <A href="https://brew.sh">brew.sh</A>). Cập nhật
              sau này bằng <Code>brew upgrade --cask vcmi</Code>.
            </P>,
            <P key="vcmi-mac-launcher">
              Mở <B>VCMI</B>. Nếu lần đầu mở bị macOS chặn thì vào System
              Settings › Privacy & Security, kéo xuống click Open Anyway (macOS
              14 trở về trước có thể click chuột phải vào app › Open). Trình
              hướng dẫn thiết lập sẽ hiện ra, chọn ngôn ngữ rồi click tiếp.
            </P>,
            <P key="vcmi-mac-data">
              Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file{" "}
              <Code>.exe</Code> cài offline (cách 1). Nếu dùng cách 2 thì copy 3
              thư mục <Code>Data</Code>, <Code>Maps</Code>, <Code>Mp3</Code> vào{" "}
              <Code>~/Library/Application Support/vcmi</Code>.
            </P>,
            "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó click Play để vào game.",
          ]}
        />
        <Steps
          title="iOS (TestFlight)"
          items={[
            <P key="vcmi-ios-install">
              Cài app <B>TestFlight</B> từ App Store, sau đó mở link{" "}
              <A href="https://testflight.apple.com/join/pJWHSbmu">
                TestFlight của VCMI
              </A>{" "}
              trên iPhone/iPad và chạm Install. Yêu cầu iOS 12 trở lên, khi có
              bản mới <B>TestFlight</B> sẽ báo để cập nhật.
            </P>,
            <P key="vcmi-ios-data">
              Tải bộ cài offline GOG (cách 1) ngay trên máy bằng Safari, file sẽ
              nằm trong app Tệp (Files), mục Tải về. Nếu dùng cách 2 thì copy 3
              thư mục <Code>Data</Code>, <Code>Maps</Code>, <Code>Mp3</Code> từ
              máy tính sang qua iCloud Drive, Google Drive hoặc Finder.
            </P>,
            <P key="vcmi-ios-import">
              Mở <B>VCMI</B>, làm theo trình hướng dẫn lần đầu, chọn cài từ file
              GOG rồi chọn file <Code>.exe</Code>, sau đó chọn tiếp file{" "}
              <Code>.bin</Code>; hoặc copy 3 thư mục <Code>Data</Code>,{" "}
              <Code>Maps</Code>, <Code>Mp3</Code> vào thư mục của <B>VCMI</B>{" "}
              trong app Tệp nếu dùng cách 2.
            </P>,
            "Chờ VCMI xử lý xong (có thể mất vài phút, cần còn trống khoảng 2 GB) rồi chạm Play để vào game.",
          ]}
        />
        <Steps
          title="Android (Google Play)"
          items={[
            <P key="vcmi-android-install">
              Cài <B>VCMI</B> từ{" "}
              <A href="https://play.google.com/store/apps/details?id=is.xyz.vcmi">
                Google Play
              </A>
              , bản mới sẽ được Google Play tự cập nhật. Yêu cầu Android 5.0 trở
              lên.
            </P>,
            <P key="vcmi-android-data">
              Tải bộ cài offline GOG (cách 1) ngay trên điện thoại bằng trình
              duyệt, file sẽ nằm trong thư mục <Code>Download</Code>. Nếu dùng
              cách 2 thì cắm cáp USB, copy 3 thư mục <Code>Data</Code>,{" "}
              <Code>Maps</Code>, <Code>Mp3</Code> từ máy tính vào một thư mục
              trên điện thoại (ví dụ <Code>Download/Heroes3</Code>).
            </P>,
            <P key="vcmi-android-import">
              Mở <B>VCMI</B>, làm theo trình hướng dẫn lần đầu, chọn cài từ file
              GOG rồi chọn file <Code>.exe</Code>, sau đó chọn tiếp file{" "}
              <Code>.bin</Code>; hoặc chọn thư mục chứa 3 thư mục{" "}
              <Code>Data</Code>, <Code>Maps</Code>, <Code>Mp3</Code> nếu dùng
              cách 2.
            </P>,
            "Chờ VCMI xử lý xong (có thể mất vài phút, cần còn trống khoảng 2 GB) rồi chạm Play để vào game.",
          ]}
        />
        <Hint>
          Giao diện <B>VCMI</B> có thể khác đôi chút tuỳ phiên bản. Nếu gặp lỗi,
          xem hướng dẫn chính thức chi tiết cho từng hệ điều hành:
        </Hint>
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

      <Section id="cong-dong" title="Cộng đồng">
        <LinkRow
          label="Discord VCMI"
          url="https://discord.com/invite/chBT42V"
          buttonText="Tham gia"
        />
      </Section>
    </>
  ),
};
