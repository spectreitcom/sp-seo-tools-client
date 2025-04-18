import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router";
import Button from "../ui/button.tsx";

type Props = Readonly<{
  title: string;
  description?: string;
  returnPath?: string;
  returnText?: string;
}>;

function PageTitle({
  title,
  description,
  returnPath,
  returnText = "Back",
}: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (returnPath) {
      navigate(returnPath);
    }
  };

  return (
    <div>
      <div className={"flex items-center"}>
        {returnPath && (
          <Button size={"lg"} soft className={"mr-4"} onClick={handleBack}>
            <ChevronLeftIcon className={"size-4"} />
            <span>{returnText}</span>
          </Button>
        )}
        <h1 className={"text-2xl font-semibold"}>{title}</h1>
      </div>
      {description && <p className={"mt-2"}>{description}</p>}
    </div>
  );
}

export default PageTitle;
