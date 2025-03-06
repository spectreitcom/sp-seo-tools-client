type Props = {
  text?: string;
};

function Label({ text }: Props) {
  return (
    text && (
      <label className="block text-sm/6 font-medium text-gray-900 mb-2">
        {text}
      </label>
    )
  );
}

export default Label;
