import { Link } from "react-router-dom";

type Props = Readonly<{
  path: string;
  heading: string;
  description: string;
}>;

function QuickMenuCard({ path, heading, description }: Props) {
  return (
    <Link
      to={path}
      className="w-full lg:w-3/12 transform transition-transform hover:scale-105"
    >
      <div className="border border-gray-300 rounded-lg p-6 shadow-sm bg-white hover:shadow-md">
        <h4 className="text-lg font-bold text-gray-800">{heading}</h4>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}

export default QuickMenuCard;
