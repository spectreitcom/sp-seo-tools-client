import Select from "./select.tsx";
import { useDomains } from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";

type Props = {
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  label?: string;
  placeholderText?: string;
};

function DomainsAsyncSelect({
  value,
  onChange,
  className,
  error,
  label,
  placeholderText,
}: Props) {
  const { createDomainsQueryOptions, createDomainQueryOptions } = useDomains();
  const [searchText, setSearchText] = useDebounceValue("", 500);
  const { data, isLoading } = useQuery(
    createDomainsQueryOptions(1, searchText ?? "", 15),
  );

  const { data: domain } = useQuery(
    createDomainQueryOptions(value ?? "", !!value),
  );

  return (
    <Select
      label={label}
      className={className}
      options={
        data?.data.map((item) => ({
          label: item.domain,
          value: item.domainId,
        })) ?? []
      }
      searchable
      loading={isLoading}
      value={value}
      onChange={(option) => {
        onChange(option.value.toString());
      }}
      onSearch={(searchText) => {
        setSearchText(searchText);
      }}
      error={error}
      placeholderText={placeholderText}
      onOpen={() => setSearchText("")}
      foundedOption={
        domain
          ? {
              label: domain.domain,
              value: domain.domainId,
            }
          : null
      }
    />
  );
}

export default DomainsAsyncSelect;
