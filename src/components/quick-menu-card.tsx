import { Link } from "react-router-dom";

type Props = {
  path: string;
  heading: string;
  description: string;
};
function QuickMenuCard({ path, heading, description }: Props) {
  return (
    <Link to={path} className={"w-full lg:w-3/12"}>
      <div className={"border border-gray-400 border-dashed rounded-md p-4"}>
        <h4 className={"font-semibold"}>{heading}</h4>
        <p className={"mt-4"}>{description}</p>
      </div>
    </Link>
  );
}

export default QuickMenuCard;
