type Props = {
  noOptionsText?: string;
};

function SelectNoOptionsPlaceholder({
  noOptionsText = "No options to display",
}: Props) {
  return <div>{noOptionsText}</div>;
}

export default SelectNoOptionsPlaceholder;
