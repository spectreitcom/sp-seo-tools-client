import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import InputWithInlineAddon from "./input-with-inline-addon.tsx";
import { useDomains, useRtDevices, useRtSearchEngines } from "../hooks";
import { useQuery } from "@tanstack/react-query";
import Select from "./select.tsx";

export type KeywordsFilter = {
  searchText: string;
  device: string;
  searchEngineId: string;
  domainId: string;
};

type Props = {
  onChange: (v: KeywordsFilter) => void;
  value: KeywordsFilter;
};

function KeywordsFilters({ onChange, value }: Props) {
  const { createDevicesQueryOptions } = useRtDevices();
  const { createSearchEnginesQueryOptions } = useRtSearchEngines();
  const { createDomainsQueryOptions } = useDomains();

  const { data: devices } = useQuery(createDevicesQueryOptions());
  const { data: searchEngines } = useQuery(createSearchEnginesQueryOptions());
  const { data: domains } = useQuery(createDomainsQueryOptions());

  return (
    <div className={"flex items-center -mx-2"}>
      <div className={"px-2 w-2/12"}>
        <InputWithInlineAddon
          placeholder={"Search"}
          onChange={(e) =>
            onChange({
              searchText: e.target.value,
              device: value.device,
              searchEngineId: value.searchEngineId,
              domainId: value.domainId,
            })
          }
          value={value.searchText}
          leadingAddon={
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400 sm:size-4"
            />
          }
        />
      </div>
      <div className={"px-2 w-2/12"}>
        <Select
          value={value.searchEngineId}
          onChange={(option) => {
            onChange({
              searchText: value.searchText,
              device: value.device,
              searchEngineId: option.value,
              domainId: value.domainId,
            });
          }}
          options={
            searchEngines?.map((searchEngine) => ({
              label: searchEngine.name,
              value: searchEngine.searchEngineId,
            })) ?? []
          }
        />
      </div>
      <div className={"px-2 w-2/12"}>
        <Select
          value={value.domainId}
          onChange={(option) => {
            onChange({
              searchText: value.searchText,
              device: value.device,
              searchEngineId: value.searchEngineId,
              domainId: option.value,
            });
          }}
          options={
            domains?.data?.map((domain) => ({
              label: domain.domain,
              value: domain.domainId,
            })) ?? []
          }
        />
      </div>
      <div className={"px-2 w-2/12"}>
        <Select
          value={value.device}
          onChange={(option) => {
            onChange({
              searchText: value.searchText,
              device: option.value,
              searchEngineId: value.searchEngineId,
              domainId: value.domainId,
            });
          }}
          options={devices ?? []}
        />
      </div>
    </div>
  );
}

export default KeywordsFilters;
