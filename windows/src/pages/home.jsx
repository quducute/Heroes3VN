import {
  Info,
  ArrowRight,
  ScreenShare,
  ExternalLink,
  Users,
} from "lucide-react";
import { versions } from "../data/versions.js";
import { PageLink, A } from "../components/ui.jsx";
import { IS_WEB } from "../lib/platform.js";
import { CardLatest } from "../components/ModLatest.jsx";
import { DISCORD_URL, GROUP_FB_URL, SUPPORT_FB_URL } from "../data/social.js";
import { upcomingPage } from "./upcoming.jsx";
import { CHOOSE_GUIDE } from "../data/choose.jsx";

export function Home({ setPage }) {
  return (
    <div className="page page-home">
      <header className="hero">
        <h1>Heroes III Việt Nam by Gogetto</h1>
        <p>
          Tool lưu trữ link tải/mua <b>Heroes 3</b> mọi phiên bản kèm hướng dẫn
          cài đặt.
        </p>
        <div className="home-note">
          <Info size={16} />{" "}
          <span>
            {IS_WEB
              ? "Mọi link trong tool đều mở trong tab mới"
              : "Mọi link trong tool đều mở bằng trình duyệt mặc định của máy"}
            , yêu cầu <PageLink to="faq">Windows 10/11</PageLink> để chơi ổn
            định và cài sẵn{" "}
            <A href="https://www.win-rar.com/download.html">
              <b>WinRAR</b>
            </A>{" "}
            hoặc{" "}
            <A href="https://www.7-zip.org/download.html">
              <b>7-Zip</b>
            </A>{" "}
            để giải nén.
            <br />
            Nếu dùng macOS, Linux, Android hoặc iOS thì có thể chơi bằng{" "}
            <PageLink to="vcmi">
              <b>VCMI</b>
            </PageLink>
            .
          </span>
        </div>
      </header>
      <div className="card-grid">
        {versions.map((v) => (
          <button
            key={v.id}
            type="button"
            className="card"
            style={{ "--accent": v.accent }}
            onClick={() => setPage(v.id)}
          >
            <div className="card-icon">
              <img src={v.icon} alt="" />
            </div>
            <div className="card-name">{v.name}</div>
            <div className="card-sub">{v.subtitle}</div>
            <CardLatest id={v.id} />
            <p className="card-summary">{v.summary}</p>
            <div className="card-cta">
              Xem link tải &amp; hướng dẫn <ArrowRight size={14} />
            </div>
          </button>
        ))}
        <button
          type="button"
          className="card"
          style={{ "--accent": upcomingPage.accent }}
          onClick={() => setPage(upcomingPage.id)}
        >
          <div className="card-icon">
            <img src={upcomingPage.icon} alt="" />
          </div>
          <div className="card-name">{upcomingPage.name}</div>
          <div className="card-sub">{upcomingPage.subtitle}</div>
          <div className="card-latest">Heroes 3 Remake • DoR</div>
          <p className="card-summary">{upcomingPage.summary}</p>
          <div className="card-cta">
            Xem thông tin <ArrowRight size={14} />
          </div>
        </button>
      </div>
      <section className="support-banner">
        <div className="support-icon">
          <ScreenShare size={30} />
        </div>
        <div className="support-info">
          <div className="support-title">Cần người hỗ trợ cài đặt?</div>
          <p className="support-desc">
            Bác nào làm theo hướng dẫn mà vẫn chưa cài được, cứ nhắn tin
            Facebook cho em - em sẽ hỗ trợ cài trực tiếp từ xa qua{" "}
            <A href="https://www.ultraviewer.net/vi/download.html">
              <b>UltraViewer</b>
            </A>
            {", hoàn toàn miễn phí."}
          </p>
        </div>
        <a
          className="btn"
          href={SUPPORT_FB_URL}
          target="_blank"
          rel="noreferrer"
        >
          Inbox Gogetto <ExternalLink size={14} />
        </a>
      </section>
      <section className="choose">
        <h2 className="choose-title">Nên chọn bản nào?</h2>
        <div className="choose-list">
          {CHOOSE_GUIDE.map((g) => {
            const v = versions.find((x) => x.id === g.id);
            return (
              <button
                key={g.id}
                type="button"
                className="choose-row"
                style={{ "--accent": v.accent }}
                onClick={() => setPage(v.id)}
              >
                <img src={v.icon} alt="" />
                <span className="choose-name">{v.name}</span>
                <span className="choose-desc">{g.desc}</span>
                <ArrowRight size={15} />
              </button>
            );
          })}
        </div>
      </section>
      <section className="story">
        <h2 className="choose-title">Lý do tool ra đời</h2>
        <div className="story-box">
          <p>
            Trong group Heroes 3 VN, ngày nào cũng có người hỏi những câu quen
            thuộc: <i>&quot;Tải Heroes 3 ở đâu?&quot;</i>,{" "}
            <i>
              &quot;<b>HotA</b> với <b>ERA</b> khác gì nhau?&quot;
            </i>
            ,{" "}
            <i>
              &quot;Cài <b>VCMI</b> như thế nào?&quot;
            </i>
            {"... Link tải/mua thì đến từ nhiều nguồn và rất khó tìm, "}
            phần lớn các trang đó cũng đều viết bằng tiếng Anh hoặc tiếng Nga
            rất khó tiếp cận.
          </p>
          <p>
            Kể cả đã tìm được link tải/mua chuẩn, nhiều người vẫn không biết
            cách cài đặt thế nào vì các trang đó không hề có hướng dẫn chi tiết
            hoặc có nhưng rất sơ sài.
          </p>
          <p>
            Vì vậy tool này ra đời để gom tất cả về một chỗ: link tải/mua chính
            thức của mọi phiên bản Heroes 3 cùng hướng dẫn cài đặt từng bước
            bằng tiếng Việt để bất kỳ ai cũng có thể tự cài đặt và tận hưởng tựa
            game huyền thoại này.
          </p>
          <p>
            Tool này là dự án phi lợi nhuận làm tặng cộng đồng, không liên quan
            đến Ubisoft hay bất kỳ tổ chức nào.
          </p>
        </div>
      </section>
      <section className="support-banner">
        <div className="support-icon">
          <Users size={30} />
        </div>
        <div className="support-info">
          <div className="support-title">Group Facebook</div>
          <p className="support-desc">
            Tham gia nhóm Facebook chính thức của Heroes 3 VN.
          </p>
        </div>
        <a className="btn" href={GROUP_FB_URL} target="_blank" rel="noreferrer">
          Tham gia group <ExternalLink size={14} />
        </a>
      </section>
      <section className="support-banner">
        <div className="support-icon">
          <Users size={30} />
        </div>
        <div className="support-info">
          <div className="support-title">Server Discord</div>
          <p className="support-desc">
            Tham gia máy chủ Discord chính thức của Heroes 3 VN.
          </p>
        </div>
        <a className="btn" href={DISCORD_URL} target="_blank" rel="noreferrer">
          Tham gia server <ExternalLink size={14} />
        </a>
      </section>
    </div>
  );
}
