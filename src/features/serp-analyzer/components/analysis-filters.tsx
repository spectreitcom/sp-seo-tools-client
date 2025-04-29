import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useErrorHandler } from "../../shared";
import InputWithInlineAddon from "../../shared/components/input-with-inline-addon.tsx";
import Select from "../../shared/components/select/select.tsx";
import { useSaDevices } from "../hooks/use-devices.ts";
import { useSaLocalizations } from "../hooks/use-localizations.ts";

export type AnalysisFilter = {
  searchText: string;
  device: string;
  localizationId: string;
};

type Props = Readonly<{
  onChange: (v: AnalysisFilter) => void;
  value: AnalysisFilter;
}>;

function AnalysisFilters({ value, onChange }: Props) {
  const { createDevicesQueryOptions } = useSaDevices();
  const { createLocalizationsQueryOptions } = useSaLocalizations();
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
          leadingAddon={
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400 sm:size-4"
            />
          }
          value={value.searchText}
          onChange={(e) =>
            onChange({
              searchText: e.target.value,
              device: value.device,
              localizationId: value.localizationId,
            })
          }
        />
      </div>
      <div className={"px-2 w-2/12"}>
        <Select
          options={devices ?? []}
          placeholderText={"Device"}
          value={value.device}
          onChange={(option) =>
            onChange({
              searchText: value.searchText,
              device: option.value.toString(),
              localizationId: value.localizationId,
            })
          }
        />
      </div>
      <div className={"px-2 w-2/12"}>
        <Select
          options={
            localizations?.map((localization) => ({
              label: localization.name,
              value: localization.localizationId,
            })) ?? []
          }
          placeholderText={"Localization"}
          value={value.localizationId}
          onChange={(option) =>
            onChange({
              searchText: value.searchText,
              device: value.device,
              localizationId: option.value.toString(),
            })
          }
        />
      </div>
    </div>
  );
}

export default AnalysisFilters;
