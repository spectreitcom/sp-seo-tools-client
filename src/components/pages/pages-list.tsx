import { PageData } from "../../hooks";

type Props = Readonly<{
  data: Omit<PageData, "factors">[];
}>;

function PagesList({ data }: Props) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.pageId} className={"flex p-2"}>
          <div className={"w-16"}>{item.position}</div>
          <div>{item.url}</div>
        </div>
      ))}
    </div>
  );
}

export default PagesList;
