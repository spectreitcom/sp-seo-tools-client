import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useRtDevices } from "../hooks/use-rt-devices.ts";
import { useRtLocalizations } from "../hooks/use-rt-localizations.ts";
import { useErrorHandler } from "../../shared";
import InputWithInlineAddon from "../../shared/components/input-with-inline-addon.tsx";
import DomainsAsyncSelect from "../../shared/components/select/domains-async-select.tsx";
import Select from "../../shared/components/select/select.tsx";

export type KeywordsFilter = {
  searchText: string;
  device: string;
  domainId: string;
  localizationId: string;
};

type Props = Readonly<{
  onChange: (v: KeywordsFilter) => void;
  value: KeywordsFilter;
}>;

function KeywordsFilters({ onChange, value }: Props) {
  const { createDevicesQueryOptions } = useRtDevices();
  const { createLocalizationsQueryOptions } = useRtLocalizations();
  const { handle401Error } = useErrorHandler();

  const { data: devices, error: devicesError } = useQuery(
    createDevicesQueryOptions(),
  );

  const { data: localizations, error: localizationsError } = useQuery(
    createLocalizationsQueryOptions(),
  );

  useEffect(() => {
    if (devicesError) {
      handle401Error(devicesError as AxiosError);
    }
    if (localizationsError) {
      handle401Error(localizationsError as AxiosError);
    }
  }, [devicesError, localizationsError, handle401Error]);

  return (
    <div className={"flex items-center -mx-2"}>
      <div className={"px-2 w-2/12"}>
        <InputWithInlineAddon
          placeholder={"Search"}
          onChange={(e) =>
            onChange({
              searchText: e.target.value,
              device: value.device,
              domainId: value.domainId,
              localizationId: value.localizationId,
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
        <DomainsAsyncSelect
          placeholderText={"Domain"}
          value={value.domainId}
          onChange={(domainId) => {
            onChange({
              searchText: value.searchText,
              device: value.device,
              domainId,
              localizationId: value.localizationId,
            });
          }}
        />
      </div>
      <div className={"px-2 w-2/12"}>
        <Select
          value={value.device}
          placeholderText={"Device"}
          onChange={(option) => {
            onChange({
              searchText: value.searchText,
              device: option.value.toString(),
              domainId: value.domainId,
              localizationId: value.localizationId,
            });
          }}
          options={devices ?? []}
        />
      </div>
      <div className={"px-2 w-2/12"}>
        <Select
          value={value.localizationId}
          placeholderText={"Localization"}
          onChange={(option) => {
            onChange({
              searchText: value.searchText,
              device: value.device,
              domainId: value.domainId,
              localizationId: option.value.toString(),
            });
          }}
          options={
            localizations?.map((localization) => ({
              label: localization.name,
              value: localization.localizationId,
            })) ?? []
          }
        />
      </div>
    </div>
  );
}

export default KeywordsFilters;
