import Select from "./select.tsx";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useDomains, useErrorHandler } from "../../../hooks";

type Props = Readonly<{
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
  error?: string;
  label?: string;
  placeholderText?: string;
}>;

function DomainsAsyncSelect({
  value,
  onChange,
  className,
  error,
  label,
  placeholderText,
}: Props) {
  const { createDomainsQueryOptions, createDomainQueryOptions } = useDomains();
  const { handle401Error } = useErrorHandler();

  const [searchText, setSearchText] = useDebounceValue("", 500);
  const {
    data,
    isLoading,
    error: domainsError,
  } = useQuery(createDomainsQueryOptions(1, searchText ?? "", 15));

  const { data: domain, error: domainError } = useQuery(
    createDomainQueryOptions(value ?? "", !!value),
  );

  useEffect(() => {
    if (error) {
      handle401Error(domainsError as AxiosError);
      return;
    }
    if (domainError) {
      handle401Error(domainError as AxiosError);
    }
  }, [domainsError, domainError]);

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
