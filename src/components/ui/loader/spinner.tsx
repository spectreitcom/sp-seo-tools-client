import "./spinner.css";

type Props = Readonly<{
  width?: number;
  borderWidth?: number;
}>;

function Spinner({ width = 50, borderWidth = 8 }: Props) {
  return (
    <div
      className={"spinner"}
      style={{
        width: `${width}px`,
        borderWidth: `${borderWidth}px`,
      }}
    />
  );
}

export default Spinner;
