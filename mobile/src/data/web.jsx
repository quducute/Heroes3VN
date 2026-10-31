import { P, PageLink, B } from "../components/ui";

export const WEB_GROUPS = [
  {
    title: "Trang GitHub của Heroes 3 VN",
    links: [
      {
        label: "Heroes 3 VN by Gogetto",
        desc: "Theo dõi cập nhật, báo lỗi hoặc góp ý cho em tại đây.",
        url: "https://github.com/quducute/Heroes3VN",
      },
    ],
  },
  {
    title: "Information",
    links: [
      {
        label: "Heroes 3 Wiki",
        desc: "Bách khoa toàn thư về Heroes 3, người chơi có thể tra cứu thông tin tướng, skill tướng, phép, quái, đồ, thành... (English).",
        url: "https://heroes.thelazy.net",
      },
      {
        label: "WoG Portal",
        desc: (
          <P>
            Trang cộng đồng chuyên đăng tin tức, mod và tài liệu về <B>ERA</B>.
          </P>
        ),
        url: "https://heroes3wog.net",
      },
    ],
  },
  {
    title: "Forum",
    links: [
      {
        label: "Heroes Community",
        desc: "Diễn đàn cộng đồng Heroes lớn và lâu đời nhất, nơi thảo luận chiến thuật, tin tức, map, mod... (English).",
        url: "http://heroescommunity.com", // NOSONAR
      },
      {
        label: "VCMI Forum",
        desc: (
          <P>
            Diễn đàn chính thức của <B>VCMI</B>, nơi thảo luận và báo lỗi liên
            quan đến engine <B>VCMI</B>.
          </P>
        ),
        url: "https://forum.vcmi.eu",
      },
    ],
  },
  {
    title: "Maps",
    links: [
      {
        label: "Maps4Heroes",
        desc: (
          <P>
            Kho map khổng lồ cho Heroes 3, lọc được theo kích cỡ map, phiên bản,
            lượt tải, đánh giá. Cách cài map xem ở{" "}
            <PageLink to="faq">mục FAQ</PageLink>.
          </P>
        ),
        url: "https://www.maps4heroes.com/heroes3/maps.php",
      },
      {
        label: "Image to h3m",
        desc: "Tool chuyển ảnh đời thực thành map Heroes 3 (.h3m) ngay trên trình duyệt.",
        url: "https://imagetoh3m.netlify.app",
      },
    ],
  },
  {
    title: "Tools for Modding",
    links: [
      {
        label: "HoMM3 Explorer",
        desc: "Tool xem và trích xuất tài nguyên game (ảnh, animation, âm thanh, map, save...) ngay trên trình duyệt.",
        url: "https://laserlicht.github.io/homm3-explorer",
      },
      {
        label: "GrayFace Tools",
        desc: "Bộ tool mod game của GrayFace dành cho bác nào thích vọc vạch: MMArchive, Def Tool...",
        url: "https://grayface.github.io/wog",
      },
    ],
  },
  {
    title: "Graphics",
    links: [
      {
        label: "Aphra's Heroes Hub",
        desc: (
          <P>
            Trang cung cấp hình ảnh Heroes 3 ở định dạng HD, có mod hình ảnh
            tướng và quân HD cho <B>ERA</B>.
          </P>
        ),
        url: "https://sites.google.com/view/aphrasheroessite/home",
      },
    ],
  },
];
