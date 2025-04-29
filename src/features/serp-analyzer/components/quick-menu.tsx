import clsx from "clsx";
import QuickMenuCard from "../../shared/components/quick-menu-card.tsx";

type Props = Readonly<{
  className?: string;
}>;

function SaQuickMenu({ className }: Props) {
  return (
    <div className={clsx(className)}>
      <h3 className={"font-semibold text-xl"}>Choose what you want to do</h3>
      <div className={"flex gap-4 mt-4"}>
        <QuickMenuCard
          path={"/serp-analyzer/analysis"}
          heading={"Analysis"}
          description={"Create and browse the analysis"}
        />
      </div>
    </div>
  );
}

export default SaQuickMenu;
