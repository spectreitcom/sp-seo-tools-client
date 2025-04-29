import { FactorsCollection } from "../../hooks";
import Checkbox from "../ui/checkbox.tsx";

type Props = Readonly<{
  data: FactorsCollection;
  onChange: (factors: { label: string; key: string }[]) => void;
  selected: { label: string; key: string }[];
}>;

function PageFactors({ data, onChange, selected }: Props) {
  const selectedKeys = selected.map((item) => item.key);

  const handleChange = (factor: { label: string; key: string }) => {
    const found = selectedKeys.includes(factor.key);
    if (found) {
      onChange(selected.filter((item) => item.key !== factor.key));
      return;
    }
    onChange([...selected, factor]);
  };

  return (
    <div className={"overflow-scroll"}>
      {data.map((item) => (
        <ul key={item.label}>
          <li>
            <div className={"bg-gray-100 p-2 font-semibold"}>{item.label}</div>
            <ul className={"mt-2 mb-2"}>
              {item.factors.map((factor) => (
                <li key={factor.key} className={"mb-2"}>
                  <Checkbox
                    label={factor.label}
                    checked={selectedKeys.includes(factor.key)}
                    onChange={() => handleChange(factor)}
                  />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default PageFactors;
