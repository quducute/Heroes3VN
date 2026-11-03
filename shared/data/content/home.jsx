import { A, B, I, Br, PageLink } from "@ui";
import { DISCORD_URL, YOUTUBE_URL, SUPPORT_FB_URL } from "../social.js";

export const HOME = {
  title: "Heroes III Việt Nam by Gogetto",
  tagline: (
    <>
      Tool lưu trữ link tải/mua <B>Heroes 3</B> mọi phiên bản kèm hướng dẫn cài
      đặt.
    </>
  ),
  versionCta: "Xem link tải & hướng dẫn",
  upcomingCta: "Xem thông tin",
  storyTitle: "Lý do tool ra đời",
  chooseTitle: "Nên chọn bản nào?",
};

export const homeNote = (linksOpen) => (
  <>
    {`Mọi link trong tool đều mở ${linksOpen}, yêu cầu Windows 10/11 để chơi ổn định và cài sẵn`}{" "}
    <A href="https://www.win-rar.com/download.html">
      <B>WinRAR</B>
    </A>{" "}
    hoặc{" "}
    <A href="https://www.7-zip.org/download.html">
      <B>7-Zip</B>
    </A>{" "}
    để giải nén.
    <Br />
    Nếu dùng macOS, Linux, Android hoặc iOS thì có thể chơi bằng{" "}
    <PageLink to="vcmi">
      <B>VCMI</B>
    </PageLink>
    .
  </>
);

export const HOME_STORY = [
  {
    key: "why",
    text: (
      <>
        Trong cộng đồng Heroes 3 tại Việt Nam, ngày nào cũng có người hỏi:{" "}
        <I>&quot;Tải Heroes 3 ở đâu?&quot;</I>,{" "}
        <I>
          &quot;<B>HotA</B> với <B>ERA</B> khác gì nhau?&quot;
        </I>
        ,{" "}
        <I>
          &quot;Cài <B>VCMI</B> như thế nào?&quot;
        </I>
        ... Link tải/mua thì nằm rải rác, đa phần viết bằng tiếng Anh hoặc tiếng
        Nga và thiếu hướng dẫn cài đặt. Vì vậy tool này ra đời để gom tất cả về
        một chỗ: link tải/mua chính thức của mọi phiên bản Heroes 3 kèm hướng
        dẫn cài đặt từng bước bằng tiếng Việt.
      </>
    ),
  },
  {
    key: "nonprofit",
    text: "Đây là dự án phi lợi nhuận làm tặng cộng đồng, không liên quan đến Ubisoft hay bất kỳ tổ chức nào.",
  },
];

export const HOME_BANNERS = {
  support: {
    title: "Cần người hỗ trợ cài đặt?",
    desc: (
      <>
        Bác nào làm theo hướng dẫn mà vẫn chưa cài được, cứ nhắn tin Facebook
        cho em - em sẽ hỗ trợ cài trực tiếp từ xa qua{" "}
        <A href="https://www.ultraviewer.net/vi/download.html">
          <B>UltraViewer</B>
        </A>
        {", hoàn toàn miễn phí."}
      </>
    ),
    url: SUPPORT_FB_URL,
    buttonText: "Inbox Gogetto",
  },
  youtube: {
    title: "YouTube Channel",
    desc: "Theo dõi kênh YouTube chính thức của Heroes 3 VN.",
    url: YOUTUBE_URL,
    buttonText: "Xem kênh",
  },
  discord: {
    title: "Server Discord",
    desc: "Tham gia máy chủ Discord chính thức của Heroes 3 VN.",
    url: DISCORD_URL,
    buttonText: "Tham gia server",
  },
};
