import { P, B, A, Code, PageLink } from "../components/ui";

export const FAQ_ITEMS = [
  {
    q: "Tại sao lại cần Windows 10/11 trong khi Heroes 3 là game cũ, Windows 7 có chơi được không?",
    a: (
      <P>
        Đối với <B>Heroes 3 Complete</B> và <B>HD Patch</B> thì Windows 7 vẫn
        chạy được, nhưng với các phiên bản sau này như <B>HotA</B> và <B>ERA</B>{" "}
        thì chúng đều dùng những thư viện mới, trong đó có một số cái không còn
        hỗ trợ trên Windows 7. Windows 7 đã bị Microsoft ngừng hỗ trợ từ lâu nên
        rất hay phát sinh lỗi vặt, vì vậy em khuyến nghị <B>Windows 10/11</B> để
        chơi ổn định nhất.
      </P>
    ),
  },
  {
    q: "Máy tôi cài game xong cứ báo lỗi thiếu DLL không chơi được, cách fix như thế nào?",
    a: (
      <>
        <P>
          Phần lớn lỗi thiếu DLL khi chơi Heroes 3 (ví dụ{" "}
          <Code>MSVCP140.dll</Code>, <Code>VCRUNTIME140.dll</Code>,{" "}
          <Code>d3dx9_43.dll</Code>) là do máy chưa cài đủ các thư viện mà game
          và các bản mod cần. Bác xử lý lần lượt như sau:
        </P>
        <P>
          <B>1.</B> Cài bản <B>Visual C++ Redistributable</B> gộp đủ các phiên
          bản: <A href="https://www.tinyplease.com/vcpp">tinyplease.com/vcpp</A>
          .
        </P>
        <P>
          <B>2.</B> Cài <B>DirectX End-User Runtime</B> của Microsoft:{" "}
          <A href="https://www.microsoft.com/en-us/download/details.aspx?id=35">
            microsoft.com
          </A>
          .
        </P>
        <P>
          <B>3.</B> Chạy Windows Update để cập nhật Windows lên bản mới nhất.
        </P>
        <P>
          Không nên tải từng file DLL lẻ trên mạng về chép vào thư mục game vì
          dễ gây lỗi khác hoặc nhiễm virus. Nếu đã làm hết các bước trên mà vẫn
          lỗi thì mới nên tính đến việc cài lại Windows.
        </P>
      </>
    ),
  },
  {
    q: "Tôi chỉ chơi các bản mod như HotA, ERA, VCMI thì có cần mua Complete không?",
    a: (
      <P>
        Câu trả lời là có, <B>HotA</B> và <B>ERA</B> cần game gốc để lấy tài
        nguyên nên bắt buộc phải có{" "}
        <PageLink to="complete">
          <B>Complete/SoD</B>
        </PageLink>{" "}
        làm nền. <B>VCMI</B> tuy là engine riêng nhưng vẫn cần dữ liệu (hình
        ảnh, âm thanh) trích xuất từ file game gốc. Mua{" "}
        <A href="https://www.gog.com/en/game/heroes_of_might_and_magic_3_complete_edition">
          <B>Complete</B> trên GOG
        </A>{" "}
        một lần là dùng được cho tất cả. Bản <B>Complete</B> trên Steam cũng
        dùng được cho <B>HotA</B> và <B>ERA</B>, nhưng{" "}
        <B>VCMI chỉ nhận bản GOG</B> nên vẫn khuyên mua bản GOG.
      </P>
    ),
  },
  {
    q: "Mua Heroes 3 trên Steam được không hay bắt buộc phải mua trên GOG?",
    a: (
      <>
        <P>
          <B>Complete, HotA, ERA:</B> dùng được cả bản Steam lẫn GOG, nhưng em
          vẫn khuyên mua bản GOG (bộ cài offline, không DRM).
        </P>
        <P>
          <B>VCMI và Patch HD cho Chronicles:</B> chỉ dùng được file cài của
          GOG, bản Steam không dùng được.
        </P>
        <P>
          Vì vậy nếu mua mới thì nên mua{" "}
          <PageLink to="complete">
            <B>Heroes 3 Complete</B> trên GOG
          </PageLink>{" "}
          để dùng được cho mọi phiên bản.
        </P>
      </>
    ),
  },
  {
    q: "HD Patch là gì và tại sao lại cần nó?",
    a: (
      <P>
        <B>HD Patch</B> (<B>HoMM3 HD Mod</B>) là bản vá đồ hoạ cho Heroes 3.
        Game gốc ra đời từ năm 1999 nên chỉ chạy ở độ phân giải rất thấp
        (800×600), khi mở trên màn hình đời mới sẽ bị mờ và không tương thích
        hoàn toàn với các hệ điều hành hiện tại. <B>HD Patch</B> giúp game chạy
        mượt trên Windows 10/11, hiển thị đúng độ phân giải màn hình 16:9, hỗ
        trợ màn rộng (widescreen), chơi ở chế độ cửa sổ, phóng to giao diện cùng
        nhiều tiện ích khác. Quan trọng hơn, nó còn có thêm{" "}
        <B>Multiplayer online lobby</B> để chơi qua mạng với người khác. Ngoài
        ra <B>HD Patch</B> cũng bổ sung thêm rất nhiều tính năng cho game như là
        thêm <PageLink to="keybinds">phím tắt</PageLink>, cho phép chọn Template
        khi tạo Random Map và rất nhiều tính năng khác. <B>HotA</B> và{" "}
        <B>ERA</B> đã tích hợp sẵn <B>HD Patch</B> khi cài đặt, còn với{" "}
        <B>Complete</B> thì sẽ phải tự cài{" "}
        <PageLink to="complete">
          <B>HD Patch</B>
        </PageLink>{" "}
        thủ công.
      </P>
    ),
  },
  {
    q: "Nên chọn phiên bản nào để chơi?",
    a: (
      <P>
        Tuỳ theo sở thích cá nhân để chọn phiên bản phù hợp. Bác xem so sánh các
        phiên bản Heroes 3 đầy đủ ở mục{" "}
        <PageLink to="home">&quot;Nên chọn bản nào?&quot; ở trang chủ</PageLink>{" "}
        để có cái nhìn tổng quan hơn.
      </P>
    ),
  },
  {
    q: "Có bản Heroes 3 tiếng Việt không?",
    a: (
      <P>
        Có. <B>HotA 1.8.1</B> đã có <B>Patch Việt hoá</B> by Bé Còi Team, link
        tải và hướng dẫn xem ở mục Việt hoá <B>HotA</B> trong{" "}
        <PageLink to="hota">
          trang <B>HotA</B>
        </PageLink>
        . Lưu ý patch chỉ dùng được cho <B>đúng bản HotA 1.8.1</B>.
      </P>
    ),
  },
  {
    q: "Tại sao cần cài từng bản ra thư mục riêng mà không cài chung tất cả vào một thư mục cho gọn?",
    a: (
      <P>
        Vì mỗi bản mod sửa và ghi đè các file của game gốc theo cách khác nhau.
        Nếu cài chung vào một thư mục, các file sẽ đè lên nhau gây xung đột,
        hỏng game hoặc lỗi không mở được. Cài mỗi bản (<B>Complete</B>,{" "}
        <B>HotA</B>, <B>ERA</B>...) ra một thư mục riêng để chúng độc lập, không
        ảnh hưởng lẫn nhau.
      </P>
    ),
  },
  {
    q: "Map và Template khác nhau như thế nào và cách cài?",
    a: (
      <>
        <P>
          <B>Khác nhau:</B> Map (<Code>.h3m</Code>) là bản đồ dựng sẵn cố định -
          tải về chơi luôn; còn Template là &quot;khuôn&quot; để game tự sinh ra
          bản đồ ngẫu nhiên (Random Map).
        </P>
        <P>
          <B>Cài map</B> (<Code>.h3m</Code>): chép file <Code>.h3m</Code> vào
          thư mục <Code>Maps</Code> nằm trong thư mục cài game; map sẽ xuất hiện
          trong danh sách khi bác tạo ván <B>Single Scenario</B> mới. Khi tải
          map từ{" "}
          <PageLink to="web">
            <B>Maps4Heroes</B>
          </PageLink>
          , nhớ lọc đúng phiên bản mình đang chơi để map tương thích.
        </P>
        <P>
          <B>Map ERA:</B> một số map dành cho <B>ERA</B> được đóng gói dưới dạng{" "}
          <B>scenario mod</B>. Với loại này, bác nên đọc kỹ file{" "}
          <Code>mod.json</Code> hoặc file readme đi kèm để biết map yêu cầu
          phiên bản <B>ERA</B> nào và có xung đột với mod nào khác không trước
          khi cài.
        </P>
        <P>
          <B>Cài Template Complete và ERA</B> (<Code>rmg.txt</Code>): tạo một
          thư mục mang tên Template trong <Code>_HD3_Data\Templates</Code> rồi
          copy file <Code>rmg.txt</Code> vào đó; riêng <B>Complete</B> cần cài{" "}
          <B>HD Patch</B> thì mới có thư mục này. Hướng dẫn chi tiết xem ở{" "}
          <PageLink to="complete">
            trang <B>Complete</B>
          </PageLink>{" "}
          hoặc{" "}
          <PageLink to="era">
            trang <B>ERA</B>
          </PageLink>
          .
        </P>
        <P>
          <B>Cài Template HotA</B> (<Code>.h3t</Code>): copy file{" "}
          <Code>.h3t</Code> vào thư mục <Code>HotA_RMGTemplates</Code> trong thư
          mục game. Hướng dẫn chi tiết xem ở{" "}
          <PageLink to="hota">
            trang <B>HotA</B>
          </PageLink>
          .
        </P>
        <P>
          <B>Chọn Template trong game:</B> vào New Game → Single Scenario →
          Random Map, Template đã cài sẽ hiện trong danh sách ở mục Template.
        </P>
      </>
    ),
  },
  {
    q: "Chơi PvP online với bạn bè hoặc đánh rank qua online lobby như thế nào và nên dùng phiên bản nào?",
    a: (
      <P>
        Nên dùng{" "}
        <PageLink to="hota">
          <B>HotA</B>
        </PageLink>{" "}
        vì đây là bản có cộng đồng chơi online đông nhất.{" "}
        <PageLink to="complete">
          <B>Complete</B>
        </PageLink>{" "}
        cũng chơi online được nhưng ít người chơi hơn nhiều. Cài <B>HD Patch</B>
        , vào mục Multiplayer trong game, tạo tài khoản là vào được lobby online
        (bắt buộc phải cài <B>HD Patch</B> thì mới có online lobby), có cả xếp
        hạng (rank). Các Template được thiết kế cho môi trường đánh rank{" "}
        <B>HotA</B> là <B>Duel</B> và <B>Jebus Outcast</B>. Luật chơi và cách
        vào lobby đọc <A href="https://h3hota.com/en/rules">tại đây</A>.
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
          hiệu lực. Mốc này ghi theo dạng <B>tháng-tuần-ngày</B>, ví dụ{" "}
          <B>117</B> nghĩa là tháng 1, tuần 1, ngày 7. Qua mốc đó game tự chuyển
          về đi lượt tuần tự như bình thường.
        </P>
        <P>
          <B>Khi nào ST dừng:</B> ST tự ngắt khi hai người bắt đầu tương tác với
          nhau - tấn công tướng, thành hay mỏ của đối phương, hoặc cùng tranh
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
        <A href="https://discord.gg/eDkPSNf">
          cộng đồng <B>HotA</B> ở Discord
        </A>{" "}
        để liên hệ đội ngũ quản trị, đồng thời đọc kỹ{" "}
        <A href="https://h3hota.com/en/rules">
          luật chơi online của <B>HotA</B>
        </A>{" "}
        để tránh bị phạt lần sau.
      </P>
    ),
  },
  {
    q: "Tại sao ERA không thể dùng để đánh PvP online?",
    a: (
      <P>
        Do mỗi người có một cách chỉnh <B>WoG Options</B> và <B>Mod List</B>{" "}
        khác nhau dẫn đến hai máy không đồng bộ với nhau, đồng thời <B>ERA</B>{" "}
        chạy rất nặng vì phải xử lý các script liên tục nên không ổn định khi
        chơi qua mạng. Vì vậy <B>ERA</B> được thiết kế để chơi PvE offline hoặc
        hotseat (chơi lần lượt trên cùng một máy).
      </P>
    ),
  },
  {
    q: "ERA có thêm hệ thống mod mà WoG cũ không có, vậy nó là gì và có nên cài mod không?",
    a: (
      <P>
        <B>ERA</B> bổ sung <B>Mod Browser/Mod Manager</B> cho phép tải và
        bật/tắt từng mod dễ dàng ngay trong launcher. Bác nên cài thêm mod để
        làm phong phú nội dung, nhưng đừng bật quá nhiều mod nặng cùng lúc vì dễ
        xung đột gây lỗi. Nên cài vừa phải và đọc kỹ mô tả từng mod để biết nó
        xung đột với những mod nào và nên cài cùng mod nào.
      </P>
    ),
  },
  {
    q: "Tôi chơi ERA rất hay bị lỗi, nguyên nhân là gì và báo lỗi ở đâu?",
    a: (
      <P>
        Các nguyên nhân thường gặp: chưa cài đủ <B>Visual C++</B> (xem ghi chú ở{" "}
        <PageLink to="era">
          trang <B>ERA</B>
        </PageLink>
        ), bật quá nhiều mod xung đột nhau, đường dẫn cài game có dấu tiếng
        Việt. Bác thử gỡ bớt mod và cài lại VC++ trước. Cần hỏi hoặc báo lỗi thì
        lên mục bug reports trong{" "}
        <A href="https://discord.gg/bvfJGZe">
          cộng đồng <B>ERA</B> ở Discord
        </A>
        .
      </P>
    ),
  },
  {
    q: "Bản Heroes 3 nào có quân nâng được lên bậc 3 và thêm rất nhiều đồ, quân mới?",
    a: (
      <P>
        Đó chính là{" "}
        <PageLink to="era">
          <B>ERA</B>
        </PageLink>
        . Bản này có <B>Third Upgrades Mod (ResOunD)</B> cho phép nâng cấp quân
        lên bậc 3, thêm quân mới và đồ mới.
      </P>
    ),
  },
  {
    q: "Chơi bản Heroes 3 nào để có thêm các thành mới?",
    a: (
      <>
        <P>
          <B>
            <PageLink to="hota">HotA</PageLink>:
          </B>{" "}
          3 thành mới là Cove, Factory và Bulwark.
        </P>
        <P>
          <PageLink to="era">
            <B>ERA</B>
          </PageLink>{" "}
          (cài thêm mod <B>Land Of New Towns</B>): 15 thành mới là Wonder Woods,
          Eldorado, Sand Town, Shadow Town, Neutral Town, Magic Forest, Druid
          Town, Bastion, Cove, Knight&apos;s Castle, Ice Castle, Elemental
          Palace, Pyramid, Techno Town và Mythology.
        </P>
        <P>
          <PageLink to="vcmi">
            <B>VCMI</B>
          </PageLink>{" "}
          (cài thêm các mod có tag Town): số lượng thành tuỳ thuộc vào số lượng
          mod có tag Town đã cài.
        </P>
      </>
    ),
  },
  {
    q: "Heroes 3 ERA và Heroes of Might and Magic: Olden Era có phải là một không?",
    a: (
      <>
        <P>
          Không, đây là hai thứ hoàn toàn khác nhau, chỉ trùng nhau ở chữ
          &quot;Era&quot;.
        </P>
        <P>
          <PageLink to="era">
            <B>Heroes 3 ERA</B>
          </PageLink>{" "}
          là nền tảng mod cho Heroes 3 (bản mà tool này hướng dẫn cài), phát
          triển lên từ <B>WoG</B> cũ được mở rộng thêm bằng mod.
        </P>
        <P>
          <PageLink to="series">
            <B>Heroes of Might and Magic: Olden Era</B>
          </PageLink>{" "}
          là một game hoàn toàn mới do studio Unfrozen phát triển, Hooded Horse
          và Ubisoft phát hành (công bố năm 2024, ra mắt Early Access năm 2026),
          không liên quan gì đến engine của Heroes 3 hay <B>ERA</B>.
        </P>
      </>
    ),
  },
  {
    q: "Tôi không có thời gian ngồi máy tính, làm thế nào để chơi trên điện thoại hoặc máy tính bảng?",
    a: (
      <P>
        Bác dùng{" "}
        <PageLink to="vcmi">
          <B>VCMI</B>
        </PageLink>{" "}
        - engine chạy được trên cả Android và iOS. Cài app <B>VCMI</B>, rồi nạp
        dữ liệu từ bản{" "}
        <PageLink to="complete">
          <B>Heroes 3 Complete GOG</B>
        </PageLink>{" "}
        (bản Steam không dùng được) là chơi được Heroes 3 ngay trên điện
        thoại/máy tính bảng.
      </P>
    ),
  },
  {
    q: "Tại sao lại nói VCMI không phải Heroes 3, tôi chơi thấy giống hệt Heroes 3 mà?",
    a: (
      <P>
        Vì <B>VCMI</B> là một engine mã nguồn mở viết lại từ đầu để tái tạo
        Heroes 3, chứ không phải file game gốc của 3DO/New World Computing. Nó
        mượn lại dữ liệu (hình ảnh, âm thanh) của bản gốc nên nhìn giống hệt,
        nhưng phần &quot;động cơ&quot; bên trong là code hoàn toàn mới, nhờ vậy
        mới chạy được đa nền tảng và mở rộng thoải mái. Nói cách khác nó là bản
        tương thích, không phải Heroes 3 nguyên gốc.
      </P>
    ),
  },
  {
    q: "WoG và HotA trong VCMI thiếu nhiều chức năng so với bản trên PC, có cách nào bổ sung không?",
    a: (
      <P>
        <B>VCMI</B> có port lại <B>WoG</B> và <B>HotA</B> ở dạng mod cho{" "}
        <B>VCMI</B> nhưng chưa đầy đủ 100% như bản gốc trên PC. Phần còn thiếu
        đó không có cách nào bổ sung cả mà chỉ có thể đợi đội ngũ <B>VCMI</B>{" "}
        hoàn thiện dần.
      </P>
    ),
  },
  {
    q: "Tại sao tôi không chơi được The Empire of the World (TEW) và một số custom map khác trên ERA?",
    a: (
      <P>
        Các map như <B>The Empire of the World (TEW)</B> được làm dưới dạng{" "}
        <Code>[Scenarios]</Code> mod, không tương thích với bản <B>ERA 3.9</B>{" "}
        cài từ <B>Heroes Launcher</B>. Để chơi, bác tải <B>ERA Old Version</B>{" "}
        (3.8 trở xuống) ở mục &quot;<B>ERA</B> bản cũ&quot; trong{" "}
        <PageLink to="era">
          tab <B>ERA</B>
        </PageLink>
        . Cách phân biệt: bản 3.9 trở lên có biểu tượng{" "}
        <B>con phượng hoàng lửa</B>, còn bản 3.8 trở xuống vẫn dùng biểu tượng{" "}
        <B>con mắt WoG</B>.
      </P>
    ),
  },
];
