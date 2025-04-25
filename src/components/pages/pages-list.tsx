import { PageData } from "../../hooks";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import Badge from "../ui/badge.tsx";

type Props = Readonly<{
  data: Omit<PageData, "factors">[];
}>;

function PagesList({ data }: Props) {
  return (
    <div>
      {data.map((item) => (
        <a
          href={item.url}
          target="_blank"
          key={item.pageId}
          className={"flex p-2"}
        >
          <div className={"w-16 text-black"}>{item.position}</div>
          {item.position === 0 && (
            <Badge color={"info"} text={"Your site"} className={"mr-2"} />
          )}
          <div
            className={"flex items-center text-indigo-600 hover:font-semibold"}
          >
            <span className={"mr-2"}>{item.url}</span>
            <ArrowTopRightOnSquareIcon className={"size-5"} />
          </div>
        </a>
      ))}
    </div>
  );
}

export default PagesList;
