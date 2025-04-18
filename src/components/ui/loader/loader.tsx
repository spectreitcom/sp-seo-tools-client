import Spinner from "./spinner.tsx";

type Props = Readonly<{
  active: boolean;
  text?: string;
}>;

function Loader({ active, text }: Props) {
  if (!active) return null;

  return (
    <div
      className={
        "loader fixed top-0 left-0 bottom-0 right-0 w-screen h-screen bg-white bg-opacity-75 flex items-center justify-center z-50"
      }
    >
      <div className={"flex flex-col items-center"}>
        <Spinner />
        {text && <div className={"mt-4"}>{text}</div>}
      </div>
    </div>
  );
}

export default Loader;
