import { PageData } from "../../hooks";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

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
          className={"flex p-2 text-indigo-600 hover:font-semibold"}
        >
          <div className={"w-16 text-black"}>{item.position}</div>
          <div className={"flex items-center"}>
            <span className={"mr-2"}>{item.url}</span>
            <ArrowTopRightOnSquareIcon className={"size-5"} />
          </div>
        </a>
      ))}
    </div>
  );
}

export default PagesList;
