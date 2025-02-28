type Props = {
  title: string;
  description?: string;
};

function PageTitle({ title, description }: Props) {
  return (
    <div>
      <h1 className={"text-2xl font-semibold"}>{title}</h1>
      {description && <p className={"mt-2"}>{description}</p>}
    </div>
  );
}

export default PageTitle;
