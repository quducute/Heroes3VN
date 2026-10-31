import { A, PageLink } from "../components/ui.jsx";

export const FAQ_ITEMS = [
  {
    q: "Tại sao lại cần Windows 10/11 trong khi Heroes 3 là game cũ, Windows 7 có chơi được không?",
    a: (
      <>
        Đối với <b>Heroes 3 Complete</b> và <b>HD Patch</b> thì Windows 7 vẫn
        chạy được, nhưng với các phiên bản sau này như <b>HotA</b> và <b>ERA</b>{" "}
        thì chúng đều dùng những thư viện mới, trong đó có một số cái không còn
        hỗ trợ trên Windows 7. Windows 7 đã bị Microsoft ngừng hỗ trợ từ lâu nên
        rất hay phát sinh lỗi vặt, vì vậy em khuyến nghị <b>Windows 10/11</b> để
        chơi ổn định nhất.
      </>
    ),
  },
  {
    q: "Máy tôi cài game xong cứ báo lỗi thiếu DLL không chơi được, cách fix như thế nào?",
    a: (
      <div className="faq-lines">
        <div>
          Phần lớn lỗi thiếu DLL khi chơi Heroes 3 (ví dụ{" "}
          <code>MSVCP140.dll</code>, <code>VCRUNTIME140.dll</code>,{" "}
          <code>d3dx9_43.dll</code>) là do máy chưa cài đủ các thư viện mà game
          và các bản mod cần. Bác xử lý lần lượt như sau:
        </div>
        <div>
          <b>1.</b> Cài bản <b>Visual C++ Redistributable</b> gộp đủ các phiên
          bản: <A href="https://www.tinyplease.com/vcpp">tinyplease.com/vcpp</A>
          .
        </div>
        <div>
          <b>2.</b> Cài <b>DirectX End-User Runtime</b> của Microsoft:{" "}
          <A href="https://www.microsoft.com/en-us/download/details.aspx?id=35">
            microsoft.com
          </A>
          .
        </div>
        <div>
          <b>3.</b> Chạy Windows Update để cập nhật Windows lên bản mới nhất.
        </div>
        <div>
          Không nên tải từng file DLL lẻ trên mạng về chép vào thư mục game vì
          dễ gây lỗi khác hoặc nhiễm virus. Nếu đã làm hết các bước trên mà vẫn
          lỗi thì mới nên tính đến việc cài lại Windows.
        </div>
      </div>
    ),
  },
  {
    q: "Tôi chỉ chơi các bản mod như HotA, ERA, VCMI thì có cần mua Complete không?",
    a: (
      <>
        Câu trả lời là có, <b>HotA</b> và <b>ERA</b> cần game gốc để lấy tài
        nguyên nên bắt buộc phải có{" "}
        <PageLink to="complete">
          <b>Complete/SoD</b>
        </PageLink>{" "}
        làm nền. <b>VCMI</b> tuy là engine riêng nhưng vẫn cần dữ liệu (hình
        ảnh, âm thanh) trích xuất từ file game gốc. Mua{" "}
        <A href="https://www.gog.com/en/game/heroes_of_might_and_magic_3_complete_edition">
          <b>Complete</b> trên GOG
        </A>{" "}
        một lần là dùng được cho tất cả. Bản <b>Complete</b> trên Steam cũng
        dùng được cho <b>HotA</b> và <b>ERA</b>, nhưng{" "}
        <b>VCMI chỉ nhận bản GOG</b> nên vẫn khuyên mua bản GOG.
      </>
    ),
  },
  {
    q: "Mua Heroes 3 trên Steam được không hay bắt buộc phải mua trên GOG?",
    a: (
      <div className="faq-lines">
        <div>
          <b>Complete, HotA, ERA:</b> dùng được cả bản Steam lẫn GOG, nhưng em
          vẫn khuyên mua bản GOG (bộ cài offline, không DRM).
        </div>
        <div>
          <b>VCMI và Patch HD cho Chronicles:</b> chỉ dùng được file cài của
          GOG, bản Steam không dùng được.
        </div>
        <div>
          Vì vậy nếu mua mới thì nên mua{" "}
          <PageLink to="complete">
            <b>Heroes 3 Complete</b> trên GOG
          </PageLink>{" "}
          để dùng được cho mọi phiên bản.
        </div>
      </div>
    ),
  },
  {
    q: "HD Patch là gì và tại sao lại cần nó?",
    a: (
      <>
        <b>HD Patch</b> (<b>HoMM3 HD Mod</b>) là bản vá đồ hoạ cho Heroes 3.
        Game gốc ra đời từ năm 1999 nên chỉ chạy ở độ phân giải rất thấp
        (800×600), khi mở trên màn hình đời mới sẽ bị mờ và không tương thích
        hoàn toàn với các hệ điều hành hiện tại. <b>HD Patch</b> giúp game chạy
        mượt trên Windows 10/11, hiển thị đúng độ phân giải màn hình 16:9, hỗ
        trợ màn rộng (widescreen), chơi ở chế độ cửa sổ, phóng to giao diện cùng
        nhiều tiện ích khác. Quan trọng hơn, nó còn có thêm{" "}
        <b>Multiplayer online lobby</b> để chơi qua mạng với người khác. Ngoài
        ra <b>HD Patch</b> cũng bổ sung thêm rất nhiều tính năng cho game như là
        thêm <PageLink to="keybinds">phím tắt</PageLink>, cho phép chọn Template
        khi tạo Random Map và rất nhiều tính năng khác. <b>HotA</b> và{" "}
        <b>ERA</b> đã tích hợp sẵn <b>HD Patch</b> khi cài đặt, còn với{" "}
        <b>Complete</b> thì sẽ phải tự cài{" "}
        <PageLink to="complete">
          <b>HD Patch</b>
        </PageLink>{" "}
        thủ công.
      </>
    ),
  },
  {
    q: "Nên chọn phiên bản nào để chơi?",
    a: (
      <>
        Tuỳ theo sở thích cá nhân để chọn phiên bản phù hợp. Bác xem so sánh các
        phiên bản Heroes 3 đầy đủ ở mục{" "}
        <PageLink to="home">
          <i>&quot;Nên chọn bản nào?&quot;</i> ở trang chủ
        </PageLink>{" "}
        để có cái nhìn tổng quan hơn.
      </>
    ),
  },
  {
    q: "Có bản Heroes 3 tiếng Việt không?",
    a: (
      <>
        Có. <b>HotA 1.8.1</b> đã có <b>Patch Việt hoá</b> by Bé Còi Team, link
        tải và hướng dẫn xem ở mục Việt hoá <b>HotA</b> trong{" "}
        <PageLink to="hota">
          trang <b>HotA</b>
        </PageLink>
        . Lưu ý patch chỉ dùng được cho <b>đúng bản HotA 1.8.1</b>.
      </>
    ),
  },
  {
    q: "Tại sao cần cài từng bản ra thư mục riêng mà không cài chung tất cả vào một thư mục cho gọn?",
    a: (
      <>
        Vì mỗi bản mod sửa và ghi đè các file của game gốc theo cách khác nhau.
        Nếu cài chung vào một thư mục, các file sẽ đè lên nhau gây xung đột,
        hỏng game hoặc lỗi không mở được. Cài mỗi bản (<b>Complete</b>,{" "}
        <b>HotA</b>, <b>ERA</b>...) ra một thư mục riêng để chúng độc lập, không
        ảnh hưởng lẫn nhau.
      </>
    ),
  },
  {
    q: "Map và Template khác nhau như thế nào và cách cài?",
    a: (
      <div className="faq-lines">
        <div>
          <b>Khác nhau:</b> Map (<code>.h3m</code>) là bản đồ dựng sẵn cố định -
          tải về chơi luôn; còn Template là &quot;khuôn&quot; để game tự sinh ra
          bản đồ ngẫu nhiên (Random Map).
        </div>
        <div>
          <b>Cài map</b> (<code>.h3m</code>): chép file <code>.h3m</code> vào
          thư mục <code>Maps</code> nằm trong thư mục cài game; map sẽ xuất hiện
          trong danh sách khi bác tạo ván <b>Single Scenario</b> mới. Khi tải
          map từ{" "}
          <PageLink to="web">
            <b>Maps4Heroes</b>
          </PageLink>
          , nhớ lọc đúng phiên bản mình đang chơi để map tương thích.
        </div>
        <div>
          <b>Map ERA:</b> một số map dành cho <b>ERA</b> được đóng gói dưới dạng{" "}
          <b>scenario mod</b>. Với loại này, bác nên đọc kỹ file{" "}
          <code>mod.json</code> hoặc file readme đi kèm để biết map yêu cầu
          phiên bản <b>ERA</b> nào và có xung đột với mod nào khác không trước
          khi cài.
        </div>
        <div>
          <b>Cài Template Complete và ERA</b> (<code>rmg.txt</code>): tạo một
          thư mục mang tên Template trong <code>_HD3_Data\Templates</code> rồi
          copy file <code>rmg.txt</code> vào đó; riêng <b>Complete</b> cần cài{" "}
          <b>HD Patch</b> thì mới có thư mục này. Hướng dẫn chi tiết xem ở{" "}
          <PageLink to="complete">
            trang <b>Complete</b>
          </PageLink>{" "}
          hoặc{" "}
          <PageLink to="era">
            trang <b>ERA</b>
          </PageLink>
          .
        </div>
        <div>
          <b>Cài Template HotA</b> (<code>.h3t</code>): copy file{" "}
          <code>.h3t</code> vào thư mục <code>HotA_RMGTemplates</code> trong thư
          mục game. Hướng dẫn chi tiết xem ở{" "}
          <PageLink to="hota">
            trang <b>HotA</b>
          </PageLink>
          .
        </div>
        <div>
          <b>Chọn Template trong game:</b> vào New Game → Single Scenario →
          Random Map, Template đã cài sẽ hiện trong danh sách ở mục Template.
        </div>
      </div>
    ),
  },
  {
    q: "Chơi PvP online với bạn bè hoặc đánh rank qua online lobby như thế nào và nên dùng phiên bản nào?",
    a: (
      <>
        Nên dùng{" "}
        <PageLink to="hota">
          <b>HotA</b>
        </PageLink>{" "}
        vì đây là bản có cộng đồng chơi online đông nhất.{" "}
        <PageLink to="complete">
          <b>Complete</b>
        </PageLink>{" "}
        cũng chơi online được nhưng ít người chơi hơn nhiều. Cài <b>HD Patch</b>
        , vào mục Multiplayer trong game, tạo tài khoản là vào được lobby online
        (bắt buộc phải cài <b>HD Patch</b> thì mới có online lobby), có cả xếp
        hạng (rank). Các Template được thiết kế cho môi trường đánh rank{" "}
        <b>HotA</b> là <b>Duel</b> và <b>Jebus Outcast</b>. Luật chơi và cách
        vào lobby đọc <A href="https://h3hota.com/en/rules">tại đây</A>.
      </>
    ),
  },
  {
    q: "Simultaneous Turns trong online lobby là gì và cách chỉnh nó khi đánh PvP online?",
    a: (
      <div className="faq-lines">
        <div>
          <b>Simultaneous Turns</b> (viết tắt Simturns hoặc ST) là chế độ cho
          phép tất cả người chơi đi lượt <b>cùng lúc</b> thay vì chờ lần lượt
          từng người, giúp rút ngắn rất nhiều thời gian ở giai đoạn đầu ván khi
          các bên chưa chạm mặt nhau.
        </div>
        <div>
          <b>Cách bật và chỉnh:</b> người tạo phòng (host) khi bắt đầu ván trong
          lobby bấm vào <b>More options</b>, rồi đặt mốc thời gian mà ST hết
          hiệu lực. Mốc này ghi theo dạng <b>tháng-tuần-ngày</b>, ví dụ{" "}
          <b>117</b> nghĩa là tháng 1, tuần 1, ngày 7. Qua mốc đó game tự chuyển
          về đi lượt tuần tự như bình thường.
        </div>
        <div>
          <b>Khi nào ST dừng:</b> ST tự ngắt khi hai người bắt đầu tương tác với
          nhau - tấn công tướng, thành hay mỏ của đối phương, hoặc cùng tranh
          một đối tượng trên bản đồ. Khi đó lượt quay về đi tuần tự, và người có
          cờ ưu tiên thấp hơn phải chơi lại lượt của mình từ đầu ngày (không cần
          lặp lại y hệt các nước trước điểm ngắt).
        </div>
        <div>
          <b>Thứ tự ưu tiên</b> tính theo thứ tự cờ trong Heroes 3: Đỏ → Xanh
          dương → Nâu → Xanh lá → Cam → Tím → Ngọc lam → Hồng. Ai cờ đứng trước
          thì được ưu tiên giữ lượt, người cờ đứng sau là người phải chơi lại
          khi ST ngắt.
        </div>
      </div>
    ),
  },
  {
    q: "Tài khoản chơi online của tôi bị cấm/khoá đánh rank, tại sao lại vậy và mở lại như thế nào?",
    a: (
      <>
        Nguyên nhân thường gặp là rời trận đánh rank giữa chừng (bỏ trận) nhiều
        lần, cố tình huỷ trận để tránh thua, gian lận hoặc có hành vi xấu với
        người chơi khác. Đa số lệnh cấm chỉ là tạm thời và tự hết hạn sau một
        thời gian. Nếu muốn khiếu nại hoặc xin mở lại sớm, bác vào{" "}
        <A href="https://discord.gg/eDkPSNf">
          cộng đồng <b>HotA</b> ở Discord
        </A>{" "}
        để liên hệ đội ngũ quản trị, đồng thời đọc kỹ{" "}
        <A href="https://h3hota.com/en/rules">
          luật chơi online của <b>HotA</b>
        </A>{" "}
        để tránh bị phạt lần sau.
      </>
    ),
  },
  {
    q: "Tại sao ERA không thể dùng để đánh PvP online?",
    a: (
      <>
        Do mỗi người có một cách chỉnh <b>WoG Options</b> và <b>Mod List</b>{" "}
        khác nhau dẫn đến hai máy không đồng bộ với nhau, đồng thời <b>ERA</b>{" "}
        chạy rất nặng vì phải xử lý các script liên tục nên không ổn định khi
        chơi qua mạng. Vì vậy <b>ERA</b> được thiết kế để chơi PvE offline hoặc
        hotseat (chơi lần lượt trên cùng một máy).
      </>
    ),
  },
  {
    q: "ERA có thêm hệ thống mod mà WoG cũ không có, vậy nó là gì và có nên cài mod không?",
    a: (
      <>
        <b>ERA</b> bổ sung <b>Mod Browser/Mod Manager</b> cho phép tải và
        bật/tắt từng mod dễ dàng ngay trong launcher. Bác nên cài thêm mod để
        làm phong phú nội dung, nhưng đừng bật quá nhiều mod nặng cùng lúc vì dễ
        xung đột gây lỗi. Nên cài vừa phải và đọc kỹ mô tả từng mod để biết nó
        xung đột với những mod nào và nên cài cùng mod nào.
      </>
    ),
  },
  {
    q: "Tôi chơi ERA rất hay bị lỗi, nguyên nhân là gì và báo lỗi ở đâu?",
    a: (
      <>
        Các nguyên nhân thường gặp: chưa cài đủ <b>Visual C++</b> (xem ghi chú ở{" "}
        <PageLink to="era">
          trang <b>ERA</b>
        </PageLink>
        ), bật quá nhiều mod xung đột nhau, đường dẫn cài game có dấu tiếng
        Việt. Bác thử gỡ bớt mod và cài lại VC++ trước. Cần hỏi hoặc báo lỗi thì
        lên mục bug reports trong{" "}
        <A href="https://discord.gg/bvfJGZe">
          cộng đồng <b>ERA</b> ở Discord
        </A>
        .
      </>
    ),
  },
  {
    q: "Bản Heroes 3 nào có quân nâng được lên bậc 3 và thêm rất nhiều đồ, quân mới?",
    a: (
      <>
        Đó chính là{" "}
        <PageLink to="era">
          <b>ERA</b>
        </PageLink>
        . Bản này có <b>Third Upgrades Mod (ResOunD)</b> cho phép nâng cấp quân
        lên bậc 3, thêm quân mới và đồ mới.
      </>
    ),
  },
  {
    q: "Chơi bản Heroes 3 nào để có thêm các thành mới?",
    a: (
      <div className="faq-lines">
        <div>
          <b>
            <PageLink to="hota">HotA</PageLink>:
          </b>{" "}
          3 thành mới là Cove, Factory và Bulwark.
        </div>
        <div>
          <PageLink to="era">
            <b>ERA</b>
          </PageLink>{" "}
          (cài thêm mod <b>Land Of New Towns</b>): 15 thành mới là Wonder Woods,
          Eldorado, Sand Town, Shadow Town, Neutral Town, Magic Forest, Druid
          Town, Bastion, Cove, Knight&apos;s Castle, Ice Castle, Elemental
          Palace, Pyramid, Techno Town và Mythology.
        </div>
        <div>
          <PageLink to="vcmi">
            <b>VCMI</b>
          </PageLink>{" "}
          (cài thêm các mod có tag Town): số lượng thành tuỳ thuộc vào số lượng
          mod có tag Town đã cài.
        </div>
      </div>
    ),
  },
  {
    q: "Heroes 3 ERA và Heroes of Might and Magic: Olden Era có phải là một không?",
    a: (
      <div className="faq-lines">
        <div>
          Không, đây là hai thứ hoàn toàn khác nhau, chỉ trùng nhau ở chữ
          &quot;Era&quot;.
        </div>
        <div>
          <PageLink to="era">
            <b>Heroes 3 ERA</b>
          </PageLink>{" "}
          là nền tảng mod cho Heroes 3 (bản mà tool này hướng dẫn cài), phát
          triển lên từ <b>WoG</b> cũ được mở rộng thêm bằng mod.
        </div>
        <div>
          <PageLink to="series">
            <b>Heroes of Might and Magic: Olden Era</b>
          </PageLink>{" "}
          là một game hoàn toàn mới do studio Unfrozen phát triển, Hooded Horse
          và Ubisoft phát hành (công bố năm 2024, ra mắt Early Access năm 2026),
          không liên quan gì đến engine của Heroes 3 hay <b>ERA</b>.
        </div>
      </div>
    ),
  },
  {
    q: "Tôi không có thời gian ngồi máy tính, làm thế nào để chơi trên điện thoại hoặc máy tính bảng?",
    a: (
      <>
        Bác dùng{" "}
        <PageLink to="vcmi">
          <b>VCMI</b>
        </PageLink>{" "}
        - engine chạy được trên cả Android và iOS. Cài app <b>VCMI</b>, rồi nạp
        dữ liệu từ bản{" "}
        <PageLink to="complete">
          <b>Heroes 3 Complete GOG</b>
        </PageLink>{" "}
        (bản Steam không dùng được) là chơi được Heroes 3 ngay trên điện
        thoại/máy tính bảng.
      </>
    ),
  },
  {
    q: "Tại sao lại nói VCMI không phải Heroes 3, tôi chơi thấy giống hệt Heroes 3 mà?",
    a: (
      <>
        Vì <b>VCMI</b> là một engine mã nguồn mở viết lại từ đầu để tái tạo
        Heroes 3, chứ không phải file game gốc của 3DO/New World Computing. Nó
        mượn lại dữ liệu (hình ảnh, âm thanh) của bản gốc nên nhìn giống hệt,
        nhưng phần &quot;động cơ&quot; bên trong là code hoàn toàn mới, nhờ vậy
        mới chạy được đa nền tảng và mở rộng thoải mái. Nói cách khác nó là bản
        tương thích, không phải Heroes 3 nguyên gốc.
      </>
    ),
  },
  {
    q: "WoG và HotA trong VCMI thiếu nhiều chức năng so với bản trên PC, có cách nào bổ sung không?",
    a: (
      <>
        <b>VCMI</b> có port lại <b>WoG</b> và <b>HotA</b> ở dạng mod cho{" "}
        <b>VCMI</b> nhưng chưa đầy đủ 100% như bản gốc trên PC. Phần còn thiếu
        đó không có cách nào bổ sung cả mà chỉ có thể đợi đội ngũ <b>VCMI</b>{" "}
        hoàn thiện dần.
      </>
    ),
  },
  {
    q: "Tại sao tôi không chơi được The Empire of the World (TEW) và một số custom map khác trên ERA?",
    a: (
      <>
        Các map như <b>The Empire of the World (TEW)</b> được làm dưới dạng{" "}
        <code>[Scenarios]</code> mod, không tương thích với bản <b>ERA 3.9</b>{" "}
        cài từ <b>Heroes Launcher</b>. Để chơi, bác tải <b>ERA Old Version</b>{" "}
        (3.8 trở xuống) ở mục &quot;<b>ERA</b> bản cũ&quot; trong{" "}
        <PageLink to="era">
          tab <b>ERA</b>
        </PageLink>
        . Cách phân biệt: bản 3.9 trở lên có biểu tượng{" "}
        <b>con phượng hoàng lửa</b>, còn bản 3.8 trở xuống vẫn dùng biểu tượng{" "}
        <b>con mắt WoG</b>.
      </>
    ),
  },
];
