type Props = {
  noOptionsText?: string;
};

function SelectNoOptionsPlaceholder({
  noOptionsText = "No options to display",
}: Props) {
  return <div className={"text-sm"}>{noOptionsText}</div>;
}

export default SelectNoOptionsPlaceholder;
