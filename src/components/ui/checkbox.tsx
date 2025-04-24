import { useId } from "react";

type Props = Readonly<{
  checked?: boolean;
  label?: string;
  onChange?: () => void;
}>;

function Checkbox({ checked, label, onChange }: Props) {
  const id = useId();
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className={"mr-2"}
        onChange={() => onChange?.()}
      />
      {label}
    </label>
  );
}

export default Checkbox;
