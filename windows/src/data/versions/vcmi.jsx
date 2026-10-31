import { Fragment } from "react";
import {
  Quote,
  PageLink,
  Note,
  Section,
  LinkRow,
  Steps,
  Screenshot,
  A,
} from "../../components/ui.jsx";
import { HEROES_LAUNCHER_URL } from "../links.js";
import iconVcmi from "../../assets/icons/vcmi.webp";
import menuSettings from "../../assets/images/menu-settings.webp";
import vcmi1 from "../../assets/vcmi/vcmi-01-launcher-install.webp";
import vcmi2 from "../../assets/vcmi/vcmi-02-select-folder.webp";
import vcmi3 from "../../assets/vcmi/vcmi-03-install-new-folder.webp";
import vcmi4 from "../../assets/vcmi/vcmi-04-launcher-play.webp";

export const vcmi = {
  id: "vcmi",
  path: "VCMI",
  name: "VCMI",
  subtitle: "Chơi trên đa nền tảng",
  icon: iconVcmi,
  accent: "color-mix(in srgb, peru 73%, black)",
  summary:
    "Engine mã nguồn mở viết lại Heroes 3, chạy được trên đa nền tảng bao gồm Windows, Linux, macOS, iOS, Android.",
  content: (
    <>
      <Quote>
        &quot;Khác với ERA/WoG hay HotA vốn bổ sung nội dung cho Heroes 3 gốc,
        VCMI là một engine mã nguồn mở viết lại toàn bộ game và chỉ dùng lại tài
        nguyên (đồ hoạ, âm thanh, bản đồ...) của{" "}
        <PageLink to="complete">Heroes 3 Complete GOG</PageLink>. Nói cách khác,
        VCMI là một tựa game mới mô phỏng lại Heroes 3, nên sẽ ít tính năng hơn
        HotA hay ERA. Bù lại, điểm mạnh của VCMI là chơi được trên điện thoại và
        có hệ thống mod khá đa dạng, dù độ hoàn thiện vẫn chưa cao lắm.&quot;
      </Quote>
      <Note title="Chỉ dùng được bản GOG">
        VCMI chỉ nạp được dữ liệu từ bản{" "}
        <PageLink to="complete">Heroes 3 Complete GOG</PageLink>, bản Steam
        không dùng được cho VCMI.
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
          label="Windows: bản cài qua Heroes Launcher (nên dùng)"
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

      <Section title="Hướng dẫn cài qua Heroes Launcher (Windows)">
        <Note>
          Cách dễ nhất cho Windows: Heroes Launcher sẽ cài VCMI và tự copy dữ
          liệu từ Complete GOG vào làm nền cho VCMI chạy, không cần chép thủ
          công. Cần cài Complete GOG trước.
        </Note>
        <Steps
          items={[
            <Fragment key="complete-step">
              Cài <PageLink to="complete">Heroes 3 Complete GOG</PageLink> - nếu
              máy đã cài Complete GOG rồi thì có thể bỏ qua bước này.
            </Fragment>,
            "Cài Launcher, mở lên, vào tab VCMI, chọn Install.",
            'Chọn "Select folder with Heroes 3" rồi chọn đường dẫn đến thư mục đã cài Complete GOG.',
            'Tick vào dòng "Install VCMI to a new folder and copy the original game files" để cài VCMI ra thư mục riêng (nếu không tick, VCMI sẽ bị cài đè vào thư mục Complete và có thể dẫn đến xung đột game).',
            "Vào Menu → Settings → Games, chuyển phần Check for updates thành Check and install để VCMI tự động cập nhật khi có bản mới.",
            "Bấm Play để vào game.",
          ]}
        />
        <div className="shot-grid">
          <Screenshot
            src={vcmi1}
            caption="Bước 2: Vào tab VCMI trong Heroes Launcher, bấm Install"
          />
          <Screenshot
            src={vcmi2}
            caption='Bước 3: Chọn "Select folder with Heroes 3"'
          />
          <Screenshot
            src={vcmi3}
            caption="Bước 4: Tick cài ra thư mục riêng rồi Start installation"
          />
          <Screenshot
            src={menuSettings}
            caption="Bước 5: Menu → Settings → Games → Check for updates → Check and install"
          />
          <Screenshot src={vcmi4} caption="Bước 6: Bấm Play để vào game" />
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
              <b>Cách 1 - File cài offline của GOG (chuẩn nhất, nên dùng):</b>{" "}
              tải bộ file cài offline (file <code>.exe</code> kèm file{" "}
              <code>.bin</code>, phải để chung một thư mục). VCMI Launcher sẽ tự
              giải nén dữ liệu từ bộ file này.
            </div>
            <div>
              <b>Cách 2 - Thư mục game đã cài (phương án phụ):</b> lấy 3 thư mục{" "}
              <code>Data</code>, <code>Maps</code>, <code>Mp3</code> trong thư
              mục đã cài Complete trên Windows. Nên lấy từ thư mục Complete gốc
              chưa cài mod (không lấy từ thư mục HotA hay ERA) để tránh lỗi.
            </div>
          </div>
        </Note>
        <Steps
          title="Windows"
          items={[
            <Fragment key="vcmi-win-install">
              Vào <A href="https://vcmi.eu/download">vcmi.eu/download</A> tải
              bản cho Windows (file <code>.exe</code>) rồi cài như phần mềm bình
              thường.
            </Fragment>,
            "Mở VCMI Launcher, lần đầu mở sẽ hiện trình hướng dẫn thiết lập, chọn ngôn ngữ rồi bấm tiếp.",
            "Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục Complete đã cài để VCMI tự sao chép dữ liệu (cách 2).",
            <Fragment key="vcmi-win-manual">
              Nếu muốn chép tay thì chép 3 thư mục <code>Data</code>,{" "}
              <code>Maps</code>, <code>Mp3</code> vào{" "}
              <code>Documents\My Games\vcmi</code>.
            </Fragment>,
            "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó bấm Play để vào game.",
          ]}
        />
        <Steps
          title="Linux"
          items={[
            <Fragment key="vcmi-linux-install">
              Cài qua Flathub (chạy được trên hầu hết các distro):{" "}
              <code>flatpak install flathub eu.vcmi.VCMI</code>. Ngoài ra có thể
              cài qua kho phần mềm của distro, xem chi tiết ở link hướng dẫn bên
              dưới.
            </Fragment>,
            "Mở VCMI Launcher, lần đầu mở sẽ hiện trình hướng dẫn thiết lập, chọn ngôn ngữ rồi bấm tiếp.",
            "Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục Complete đã cài để VCMI tự sao chép dữ liệu (cách 2).",
            <Fragment key="vcmi-linux-manual">
              Nếu muốn chép tay thì chép 3 thư mục <code>Data</code>,{" "}
              <code>Maps</code>, <code>Mp3</code> vào{" "}
              <code>~/.local/share/vcmi</code> (bản Flatpak là{" "}
              <code>~/.var/app/eu.vcmi.VCMI/data/vcmi</code>). Lưu ý Linux phân
              biệt chữ hoa/thường nên phải giữ đúng tên thư mục.
            </Fragment>,
            "Ở bước tiếp theo có thể tick cài thêm các mod được gợi ý (tuỳ chọn), sau đó bấm Play để vào game.",
          ]}
        />
        <Steps
          title="macOS"
          items={[
            <Fragment key="vcmi-mac-install">
              Vào <A href="https://vcmi.eu/download">vcmi.eu/download</A> tải
              bản cho macOS (file <code>.dmg</code>, chọn đúng loại chip Apple
              Silicon hoặc Intel), mở ra rồi kéo VCMI vào thư mục Applications.
              Nếu lần đầu mở bị macOS chặn thì vào System Settings → Privacy &
              Security, kéo xuống bấm Open Anyway.
            </Fragment>,
            "Mở VCMI Launcher, lần đầu mở sẽ hiện trình hướng dẫn thiết lập, chọn ngôn ngữ rồi bấm tiếp.",
            "Ở bước nạp dữ liệu: chọn cài từ file GOG rồi trỏ đến file .exe cài offline (cách 1, nên dùng); nếu không có bộ cài thì chọn thư mục Complete đã cài để VCMI tự sao chép dữ liệu (cách 2).",
            <Fragment key="vcmi-mac-manual">
              Nếu muốn chép tay thì chép 3 thư mục <code>Data</code>,{" "}
              <code>Maps</code>, <code>Mp3</code> vào{" "}
              <code>~/Library/Application Support/vcmi</code>.
            </Fragment>,
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
};
