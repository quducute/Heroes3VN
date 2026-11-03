import { Section, SysReq, LinkRow, Hint } from "../components/ui.jsx";
import { PAGES } from "../../data/pages.jsx";
import { UPCOMING } from "../../data/content/upcoming.jsx";

function UpcomingHead({ icon, name }) {
  return (
    <div className="flex items-center gap-3.5 mb-2.5">
      <img className="w-14 h-14 rounded-lg object-cover" src={icon} alt="" />
      <div>
        <div className="text-[17px] font-bold text-gold-bright">{name}</div>
      </div>
    </div>
  );
}

export const upcomingPage = {
  ...PAGES.upcoming,
  badge: {
    text: `${UPCOMING.length} bản sắp ra mắt`,
    title: "Số bản sắp ra mắt",
  },
  content: (
    <>
      {UPCOMING.map((u) => (
        <Section key={u.title} id={u.id} title={u.title}>
          <UpcomingHead icon={u.icon} name={u.name} />
          <Hint>{u.intro}</Hint>
          <SysReq items={u.info} />
          <LinkRow {...u.link} />
        </Section>
      ))}
    </>
  ),
};
