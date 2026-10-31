import { mix } from "../../theme";
import {
  Quote,
  Note,
  P,
  B,
  PageLink,
  Section,
  Steps,
  SysReq,
  LinkRow,
} from "../../components/ui";
import { SYSREQ_BASE } from "./shared";

export const chronicles = {
  id: "chronicles",
  name: "Chronicles",
  subtitle: "Campaign series",
  accent: mix("burlywood", 0.89),
  summary: (
    <>
      Series Heroes 3 campaign gồm 8 chapters với cốt truyện liên kết chặt chẽ,
      cài <B>Patch HD</B> cho <B>Chronicles</B> để có thêm chapter thứ 9.
    </>
  ),
  content: (
    <>
      <Quote>
        &quot;Một series Heroes 3 campaign được ra mắt vào cuối năm 2000 bao gồm
        8 chapters với cốt truyện liên kết với nhau chặt chẽ.&quot;
      </Quote>
      <Note title="Chỉ dùng được bản GOG">
        <P>
          <B>Patch HD</B> cho <B>Chronicles</B> chỉ dùng được file cài của{" "}
          <B>Heroes Chronicles GOG</B> và{" "}
          <PageLink to="complete">
            <B>Heroes 3 Complete GOG</B>
          </PageLink>
          , bản Steam không dùng được.
        </P>
      </Note>

      <Section title="Danh sách 8 chapters">
        <Steps
          items={[
            "Warlords of the Wastelands",
            "Conquest of the Underworld",
            "Masters of the Elements",
            "Clash of the Dragons",
            "The World Tree",
            "The Fiery Moon",
            "Revolt of the Beastmasters",
            "The Sword of Frost",
          ]}
        />
        <Note title="Chapter thứ 9">
          <P>
            Khi cài <B>Patch HD</B> cho <B>Chronicles</B> sẽ có thêm chapter thứ
            9: <B>The Glory of War</B>.
          </P>
        </Note>
      </Section>

      <Section title="Cấu hình tối thiểu">
        <SysReq items={SYSREQ_BASE} />
      </Section>

      <Section title="Link game">
        <LinkRow
          label="8 chapters đầu của Chronicles (GOG)"
          url="https://www.gog.com/en/game/heroes_chronicles_all_chapters"
          buttonText="Mua trên GOG"
        />
        <LinkRow
          label="Patch HD và chapter 9 cho Chronicles (ModDB)"
          url="https://www.moddb.com/mods/heroes-chronicles-fully-compability-hdmod/downloads"
        />
      </Section>

      <Section title="Hướng dẫn cài">
        <Steps
          items={[
            <P key="chronicles-step-1">
              Sau khi mua game trên GOG thì sẽ có 8 file setup tương ứng với 8
              chapters, chapter thứ 9 cần cài thêm <B>Patch HD</B>.
            </P>,
            <P key="chronicles-hd-step">
              Đối với <B>Patch HD</B>, yêu cầu máy phải cài thêm cả{" "}
              <PageLink to="complete">
                <B>Heroes 3 Complete GOG</B>
              </PageLink>
              . Khi đã cài <B>Complete</B> rồi thì cài <B>Patch HD</B> vào thư
              mục <B>Complete</B>, nó sẽ tự nhận diện các thư mục còn lại của 8
              chapters <B>Chronicles</B>.
            </P>,
          ]}
        />
      </Section>

      <Section title="Chơi Chronicles trên VCMI">
        <P>
          Ngoài bản gốc, bác còn có thể chơi <B>Heroes Chronicles</B> bằng
          engine{" "}
          <PageLink to="vcmi">
            <B>VCMI</B>
          </PageLink>{" "}
          (chơi được trên điện thoại và nhiều hệ điều hành khác). Yêu cầu đã cài{" "}
          <B>VCMI</B> đầy đủ kèm dữ liệu{" "}
          <PageLink to="complete">
            <B>Complete GOG</B>
          </PageLink>
          .
        </P>
        <Steps
          items={[
            <P key="chronicles-step-2">
              Mở <B>VCMI Launcher</B>, bấm nút Install file rồi chọn (các) file
              cài GOG đã mua để <B>VCMI</B> tự trích xuất dữ liệu.
            </P>,
            <P key="chronicles-step-3">
              Chờ <B>VCMI</B> xử lý xong (có thể khá lâu, nhất là trên điện
              thoại, và cần dung lượng trống tạm thời), rồi vào mục chọn
              campaign trong game là chơi được.
            </P>,
            <P key="chronicles-step-4">
              <B>VCMI</B> sẽ không cài được chapter thứ 9 (The Glory of War) vì{" "}
              <B>Patch HD</B> cho <B>Chronicles</B> không hỗ trợ <B>VCMI</B>.
              Nếu muốn chơi chapter 9 thì phải cài bản gốc trên Windows.
            </P>,
          ]}
        />
        <Note>
          <P>
            Các bước chi tiết cho từng nền tảng xem tại trang hướng dẫn chính
            thức của <B>VCMI</B>.
          </P>
        </Note>
        <LinkRow
          label="Hướng dẫn cài Chronicles cho VCMI"
          url="https://vcmi.eu/players/Heroes_Chronicles/"
        />
      </Section>
    </>
  ),
};
