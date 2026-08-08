import React from "react";
import { P, B, A, Code } from "../components/ui";

export const FAQ_ITEMS = [
  {
    q: "Tại sao lại cần Windows 10/11 trong khi Heroes 3 là game cũ, Windows 7 có chơi được không?",
    a: (
      <P>
        Đối với Heroes 3 Complete và HD Patch thì Windows 7 vẫn chạy được, nhưng
        với các phiên bản sau này như HotA và ERA thì chúng đều dùng những thư
        viện mới, trong đó có một số cái không còn hỗ trợ trên Windows 7.
        Windows 7 đã bị Microsoft ngừng hỗ trợ từ lâu nên rất hay phát sinh lỗi
        vặt, vì vậy em khuyến nghị <B>Windows 10/11</B> để chơi ổn định nhất.
      </P>
    ),
  },
  {
    q: "Máy tôi cài game xong cứ báo lỗi thiếu DLL không chơi được, cách fix như thế nào?",
    a: (
      <P>
        Nguyên nhân chính cho vấn đề này thường là do máy các bác không được cập
        nhật thường xuyên khiến cho Windows bị lỗi thời và thiếu các thư viện
        DLL cần thiết. Cách xử lý an toàn nhất là cài đặt lại hệ điều hành lên
        phiên bản mới nhất để fix triệt để. Ngoài ra có một cách nguy hiểm hơn
        là tải các file DLL còn thiếu trên mạng về sao chép vào thư mục game,
        nhưng cách này không được khuyến nghị vì có thể gây lỗi khác hoặc nhiễm
        virus.
      </P>
    ),
  },
  {
    q: "Tôi chỉ chơi các bản mod như HotA, ERA, VCMI thì có cần mua Complete GOG không?",
    a: (
      <P>
        Câu trả lời là có, HotA và ERA cần game gốc để lấy tài nguyên nên bắt
        buộc phải có <B>Complete/SoD</B> làm nền. VCMI tuy là engine riêng nhưng
        vẫn cần dữ liệu (hình ảnh, âm thanh) trích xuất từ file game gốc. Mua{" "}
        <A href="https://www.gog.com/en/game/heroes_of_might_and_magic_3_complete_edition">
          Complete trên GOG
        </A>{" "}
        một lần là dùng được cho tất cả.
      </P>
    ),
  },
  {
    q: "HD Patch là gì và tại sao lại cần nó?",
    a: (
      <P>
        HD Patch (HoMM3 HD Mod) là bản vá đồ hoạ cho Heroes 3. Game gốc ra đời
        từ năm 1999 nên chỉ chạy ở độ phân giải rất thấp (800×600), khi mở trên
        màn hình đời mới sẽ bị mờ và không tương thích hoàn toàn với các hệ điều
        hành hiện tại. HD Patch giúp game chạy mượt trên Windows 10/11, hiển thị
        đúng độ phân giải màn hình 16:9, hỗ trợ màn rộng (widescreen), chơi ở
        chế độ cửa sổ, phóng to giao diện cùng nhiều tiện ích khác. Quan trọng
        hơn, nó còn có thêm <B>Multiplayer online lobby</B> để chơi qua mạng với
        người khác. Ngoài ra HD Patch cũng bổ sung thêm rất nhiều tính năng cho
        game như là thêm phím tắt, cho phép chọn template khi tạo random map và
        rất nhiều tính năng khác. HotA và ERA đã tích hợp sẵn HD Patch khi cài
        đặt, còn với Complete thì sẽ phải tự cài thủ công.
      </P>
    ),
  },
  {
    q: "Nên chọn phiên bản nào để chơi?",
    a: (
      <P>
        Tuỳ theo sở thích cá nhân để chọn phiên bản phù hợp. Bác xem so sánh các
        phiên bản Heroes 3 đầy đủ ở mục “Nên chọn bản nào?” ở trang chủ để có
        cái nhìn tổng quan hơn.
      </P>
    ),
  },
  {
    q: "Tại sao cần cài từng bản ra thư mục riêng mà không cài chung tất cả vào một thư mục cho gọn?",
    a: (
      <P>
        Vì mỗi bản mod sửa và ghi đè các file của game gốc theo cách khác nhau.
        Nếu cài chung vào một thư mục, các file sẽ đè lên nhau gây xung đột,
        hỏng game hoặc lỗi không mở được. Cài mỗi bản (Complete, HotA, ERA...)
        ra một thư mục riêng để chúng độc lập, không ảnh hưởng lẫn nhau.
      </P>
    ),
  },
  {
    q: "Map và Template khác nhau như thế nào và cách cài?",
    a: (
      <>
        <P>
          <B>Khác nhau:</B> Map (<Code>.h3m</Code>) là bản đồ dựng sẵn cố định —
          tải về chơi luôn; còn Template là “khuôn” để game tự sinh ra bản đồ
          ngẫu nhiên (Random Map).
        </P>
        <P>
          <B>Cài map</B> (<Code>.h3m</Code>): chép file vào thư mục{" "}
          <Code>Maps</Code> nằm trong thư mục cài game; map sẽ xuất hiện trong
          danh sách khi bạn tạo ván <B>Single Scenario</B> mới. Khi tải map từ
          Maps4Heroes, nhớ lọc đúng phiên bản mình đang chơi để map tương thích.
        </P>
        <P>
          <B>Map ERA:</B> một số map dành cho ERA được đóng gói dưới dạng{" "}
          <B>scenario mod</B>. Với loại này, bạn nên đọc kỹ file{" "}
          <Code>mod.json</Code> hoặc readme đi kèm để biết map yêu cầu phiên bản
          ERA nào và có xung đột với mod nào khác không.
        </P>
        <P>
          <B>Cài template HotA</B> (<Code>.h3t</Code>): xem hướng dẫn trong
          trang HotA.
        </P>
        <P>
          <B>Cài template Complete và ERA</B> (<Code>rmg.txt</Code>): xem hướng
          dẫn trong trang Complete.
        </P>
      </>
    ),
  },
  {
    q: "Chơi PvP online với bạn bè hoặc đánh rank qua online lobby như thế nào và nên dùng phiên bản nào?",
    a: (
      <P>
        Nên dùng <B>HotA</B> vì đây là bản có cộng đồng chơi online đông nhất.{" "}
        <B>Complete</B> cũng chơi online được nhưng ít người chơi hơn nhiều. Cài
        HD Patch, vào mục Multiplayer trong game, tạo tài khoản là vào được
        lobby online (bắt buộc phải cài HD Patch thì mới có online lobby), có cả
        xếp hạng (rank). Các template được thiết kế cho môi trường đánh rank
        HotA là <B>Duel</B> và <B>Jebus Outcast</B>. Luật chơi và cách vào lobby
        đọc <A href="https://h3hota.com/en/rules">tại đây</A>.
      </P>
    ),
  },
  {
    q: "Simultaneous Turns trong online lobby là gì và cách chỉnh nó khi đánh PvP online?",
    a: (
      <>
        <P>
          <B>Simultaneous Turns</B> (viết tắt Simturns hoặc ST) là chế độ cho
          phép tất cả người chơi đi lượt <B>cùng lúc</B> thay vì chờ lần lượt
          từng người, giúp rút ngắn rất nhiều thời gian ở giai đoạn đầu ván khi
          các bên chưa chạm mặt nhau.
        </P>
        <P>
          <B>Cách bật và chỉnh:</B> người tạo phòng (host) khi bắt đầu ván trong
          lobby bấm vào <B>More options</B>, rồi đặt mốc thời gian mà ST hết
          hiệu lực. Mốc này ghi theo dạng <B>tháng–tuần–ngày</B>, ví dụ{" "}
          <B>117</B> nghĩa là tháng 1, tuần 1, ngày 7. Qua mốc đó game tự chuyển
          về đi lượt tuần tự như bình thường.
        </P>
        <P>
          <B>Khi nào ST dừng:</B> ST tự ngắt khi hai người bắt đầu tương tác với
          nhau — tấn công tướng, thành hay mỏ của đối phương, hoặc cùng tranh
          một đối tượng trên bản đồ. Khi đó lượt quay về đi tuần tự, và người có
          cờ ưu tiên thấp hơn phải chơi lại lượt của mình từ đầu ngày (không cần
          lặp lại y hệt các nước trước điểm ngắt).
        </P>
        <P>
          <B>Thứ tự ưu tiên</B> tính theo thứ tự cờ trong Heroes 3: Đỏ → Xanh
          dương → Nâu → Xanh lá → Cam → Tím → Ngọc lam → Hồng. Ai cờ đứng trước
          thì được ưu tiên giữ lượt, người cờ đứng sau là người phải chơi lại
          khi ST ngắt.
        </P>
      </>
    ),
  },
  {
    q: "Tài khoản chơi online của tôi bị cấm/khoá đánh rank, tại sao lại vậy và mở lại như thế nào?",
    a: (
      <P>
        Nguyên nhân thường gặp là rời trận đánh rank giữa chừng (bỏ trận) nhiều
        lần, cố tình huỷ trận để tránh thua, gian lận hoặc có hành vi xấu với
        người chơi khác. Đa số lệnh cấm chỉ là tạm thời và tự hết hạn sau một
        thời gian. Nếu muốn khiếu nại hoặc xin mở lại sớm, bác vào{" "}
        <A href="https://discord.gg/eDkPSNf">cộng đồng HotA ở Discord</A> để
        liên hệ đội ngũ quản trị, đồng thời đọc kỹ{" "}
        <A href="https://h3hota.com/en/rules">luật chơi online của HotA</A> để
        tránh bị phạt lần sau.
      </P>
    ),
  },
  {
    q: "Tại sao ERA không thể dùng để đánh PvP online?",
    a: (
      <P>
        Do mỗi người có một cách chỉnh <B>WoG Options</B> và <B>Mod List</B>{" "}
        khác nhau dẫn đến hai máy không đồng bộ với nhau, đồng thời ERA chạy rất
        nặng vì phải xử lý các script liên tục nên không ổn định khi chơi qua
        mạng. Vì vậy ERA được thiết kế để chơi PvE offline hoặc hotseat (chơi
        lần lượt trên cùng một máy).
      </P>
    ),
  },
  {
    q: "ERA có thêm hệ thống mod mà WoG cũ không có, vậy nó là gì và có nên cài mod không?",
    a: (
      <P>
        ERA bổ sung <B>Mod Manager/Mod Browser</B> cho phép tải và bật/tắt từng
        mod dễ dàng ngay trong launcher. Bác nên cài thêm mod để làm phong phú
        nội dung, nhưng đừng bật quá nhiều mod nặng cùng lúc vì dễ xung đột gây
        lỗi. Nên cài vừa phải và đọc kỹ mô tả từng mod để biết nó xung đột với
        những mod nào và nên cài cùng mod nào.
      </P>
    ),
  },
  {
    q: "Tôi chơi ERA rất hay bị lỗi, nguyên nhân là gì và báo lỗi ở đâu?",
    a: (
      <P>
        Các nguyên nhân thường gặp: chưa cài đủ Visual C++, bật quá nhiều mod
        xung đột nhau, đường dẫn cài game có dấu tiếng Việt. Bác thử gỡ bớt mod
        và cài lại VC++ trước. Cần hỏi hoặc báo lỗi thì lên mục bug reports
        trong <A href="https://discord.gg/bvfJGZe">cộng đồng ERA ở Discord</A>.
      </P>
    ),
  },
  {
    q: "Bản Heroes 3 nào có quân nâng được lên cấp 3, cấp 4 và thêm rất nhiều đồ, quân mới?",
    a: (
      <P>
        Đó chính là <B>ERA</B>. Bản này có <B>Third Upgrades Mod (ResOunD)</B>{" "}
        cho phép nâng cấp quân lên bậc 3, thêm quân mới và đồ mới.
      </P>
    ),
  },
  {
    q: "Chơi bản Heroes 3 nào để có thêm các thành mới?",
    a: (
      <>
        <P>
          <B>HotA:</B> 3 thành mới là Cove, Factory và Bulwark.
        </P>
        <P>
          <B>ERA</B> (cài thêm mod Land Of New Towns): 15 thành mới là Wonder
          Woods, Eldorado, Sand Town, Shadow Town, Neutral Town, Magic Forest,
          Druid Town, Bastion, Cove, Knight's Castle, Ice Castle, Elemental
          Palace, Pyramid, Techno Town và Mythology.
        </P>
        <P>
          <B>VCMI</B> (cài thêm các mod có tag Town): số lượng thành tuỳ thuộc
          vào số lượng mod có tag Town đã cài.
        </P>
      </>
    ),
  },
  {
    q: "Heroes 3 ERA và Heroes of Might and Magic: Olden Era có phải là một không?",
    a: (
      <>
        <P>
          Không, đây là hai thứ hoàn toàn khác nhau, chỉ trùng nhau ở chữ “Era”.
        </P>
        <P>
          <B>Heroes 3 ERA</B> là nền tảng mod cho Heroes 3 (bản mà tool này
          hướng dẫn cài), phát triển lên từ WoG cũ được mở rộng thêm bằng mod.
        </P>
        <P>
          <B>Heroes of Might and Magic: Olden Era</B> là một game hoàn toàn mới
          do studio Unfrozen phát triển và Ubisoft phát hành (công bố năm 2024),
          không liên quan gì đến engine của Heroes 3 hay ERA.
        </P>
      </>
    ),
  },
  {
    q: "Tôi không có thời gian ngồi máy tính, làm thế nào để chơi trên điện thoại hoặc máy tính bảng?",
    a: (
      <P>
        Bác dùng <B>VCMI</B> — engine chạy được trên cả Android và iOS. Cài app
        VCMI, rồi nạp dữ liệu game gốc vào là chơi được Heroes 3 ngay trên điện
        thoại/máy tính bảng.
      </P>
    ),
  },
  {
    q: "Tại sao lại nói VCMI không phải Heroes 3, tôi chơi thấy giống hệt Heroes 3 mà?",
    a: (
      <P>
        Vì VCMI là một engine mã nguồn mở viết lại từ đầu để tái tạo Heroes 3,
        chứ không phải file game gốc của 3DO/New World Computing. Nó mượn lại dữ
        liệu (hình ảnh, âm thanh) của bản gốc nên nhìn giống hệt, nhưng phần
        “động cơ” bên trong là code hoàn toàn mới, nhờ vậy mới chạy được đa nền
        tảng và mở rộng thoải mái. Nói cách khác nó là bản tương thích, không
        phải Heroes 3 nguyên gốc.
      </P>
    ),
  },
  {
    q: "WoG và HotA trong VCMI thiếu nhiều chức năng so với bản trên PC, có cách nào bổ sung không?",
    a: (
      <P>
        VCMI có port lại WoG và HotA ở dạng mod cho VCMI nhưng chưa đầy đủ 100%
        như bản gốc trên PC. Phần còn thiếu đó không có cách nào bổ sung cả mà
        chỉ có thể đợi đội ngũ VCMI hoàn thiện dần.
      </P>
    ),
  },
  {
    q: "Đọc thay đổi các bản cập nhật Heroes 3 ở đâu?",
    a: (
      <>
        <P>
          <B>HD Patch:</B> xem changelog{" "}
          <A href="https://drive.google.com/file/d/1OeNFzNy-m9ZDxe4ikGEGVqMrfVN-Nwbz/view">
            tại đây
          </A>
          .
        </P>
        <P>
          <B>HotA:</B> xem changelog{" "}
          <A href="https://download.h3hota.com/upd/changelogs/eng.txt">
            tại đây
          </A>
          .
        </P>
        <P>
          <B>ERA:</B> xem changelog{" "}
          <A href="https://raw.githubusercontent.com/ERA-Projects/era-project-eng/refs/heads/main/CHANGELOG.md">
            tại đây
          </A>
          .
        </P>
        <P>
          <B>VCMI:</B> xem changelog{" "}
          <A href="https://raw.githubusercontent.com/vcmi/vcmi/refs/heads/develop/ChangeLog.md">
            tại đây
          </A>
          .
        </P>
        <P>
          <B>Chronicles:</B> xem changelog{" "}
          <A href="https://www.forum.acidcave.net/topic.php?TID=3892">
            tại đây
          </A>
          .
        </P>
      </>
    ),
  },
];
