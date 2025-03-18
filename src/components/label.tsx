type Props = {
  text?: string;
  id?: string;
};

function Label({ text, id }: Props) {
  return (
    text && (
      <label
        className="block text-sm/6 font-medium text-gray-900 mb-2"
        htmlFor={id}
      >
        {text}
      </label>
    )
  );
}

export default Label;
