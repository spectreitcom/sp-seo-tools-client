import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { PageData } from "../types";
import Badge from "../../shared/components/badge.tsx";

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
          {item.hasError && (
            <Badge color={"danger"} text={"Error"} className={"mr-2"} />
          )}
          <div className={"flex items-center"}>
            <span
              className={clsx(
                "mr-2  hover:font-semibold",
                !item.hasError && "text-indigo-600",
                item.hasError && "text-red-600",
              )}
            >
              {item.url}
            </span>
            <ArrowTopRightOnSquareIcon
              className={clsx(
                "size-5",
                !item.hasError && "text-indigo-600",
                item.hasError && "text-red-600",
              )}
            />
          </div>
        </a>
      ))}
    </div>
  );
}

export default PagesList;
