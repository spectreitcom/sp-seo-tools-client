import clsx from "clsx";
import QuickMenuCard from "./quick-menu-card.tsx";

type Props = Readonly<{
  className?: string;
}>;

function RtQuickMenu({ className }: Props) {
  return (
    <div className={clsx(className)}>
      <h3 className={"font-semibold text-xl"}>Choose what you want to do</h3>
      <div className={"flex gap-4 mt-4"}>
        <QuickMenuCard
          path={"/rank-tracker/domains"}
          heading={"Add new domain"}
          description={"Add domains which you can use to add a new keywords"}
        />
        <QuickMenuCard
          path={"/rank-tracker/keywords"}
          heading={"Add new keyword"}
          description={"You can add keywords which can be tracked for a domain"}
        />
      </div>
    </div>
  );
}

export default RtQuickMenu;
