import AsideModal from "./aside-modal.tsx";
import Button from "./button.tsx";
import { z } from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RequestAxiosError } from "../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/get-error-message.ts";
import {
  useKeywords,
  useRtDevices,
  useRtLocalizations,
  useRtSearchEngines,
} from "../hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./input.tsx";
import Select from "./select-new/select.tsx";
import DomainsAsyncSelect from "./select-new/domains-async-select.tsx";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
};

const validationSchema = z.object({
  domainId: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .uuid(),
  text: z.string().min(1, {
    message: "This field is required",
  }),
  searchEngineId: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .uuid(),
  device: z.string().min(1, {
    message: "This field is required",
  }),
  localizationId: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .uuid(),
});

function AddKeywordAsideModal({ open, onClose, onAdded }: Props) {
  const { addKeywordFn } = useKeywords();
  const { createSearchEnginesQueryOptions } = useRtSearchEngines();
  const { createDevicesQueryOptions } = useRtDevices();
  const { createLocalizationsQueryOptions } = useRtLocalizations();

  const { reset, handleSubmit, control } = useForm<
    z.infer<typeof validationSchema>
  >({
    defaultValues: {
      text: "",
      device: "",
      domainId: "",
      localizationId: "",
      searchEngineId: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const searchEngineId = useWatch({ name: "searchEngineId", control });

  const { data: searchEngines } = useQuery(
    createSearchEnginesQueryOptions(open),
  );

  const { data: devices } = useQuery(createDevicesQueryOptions(open));

  const { data: localizations } = useQuery(
    createLocalizationsQueryOptions(searchEngineId, !!(open && searchEngineId)),
  );

  const { mutate, isPending } = useMutation({
    mutationFn: addKeywordFn,
    onSuccess: () => {
      toast.success("Keyword added successfully");
      onAdded();
      onClose();
      reset();
    },
    onError: (error: RequestAxiosError) => {
      toast.error(getErrorMessage(error));
    },
  });

  const submit = handleSubmit((data) => {
    mutate(data);
  });

  const cancel = () => {
    reset();
    onClose();
  };

  return (
    <AsideModal
      open={open}
      onClose={cancel}
      title={"Add a new keyword"}
      footerAddon={
        <div className={"flex justify-end"}>
          <Button size={"lg"} className={"w-32 mr-4"} soft onClick={cancel}>
            Cancel
          </Button>
          <Button
            size={"lg"}
            className={"w-32"}
            loading={isPending}
            onClick={submit}
          >
            Save
          </Button>
        </div>
      }
    >
      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DomainsAsyncSelect
            label={"Domain"}
            value={value}
            onChange={(domainId) => onChange(domainId)}
            error={error?.message}
          />
        )}
        name={"domainId"}
        control={control}
      />
      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className={"mt-4"}>
            <Input
              label={"Keyword"}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              error={error?.message}
            />
          </div>
        )}
        name={"text"}
        control={control}
      />
      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Select
            className={"mt-4"}
            label={"Search engine"}
            value={value}
            onChange={(option) => onChange(option.value)}
            options={
              searchEngines?.map((searchEngine) => ({
                value: searchEngine.searchEngineId,
                label: searchEngine.name,
              })) ?? []
            }
            error={error?.message}
          />
        )}
        name={"searchEngineId"}
        control={control}
      />
      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Select
            className={"mt-4"}
            label={"Localization"}
            value={value}
            onChange={(option) => onChange(option.value)}
            options={
              localizations?.map((localization) => ({
                label: localization.name,
                value: localization.localizationId,
              })) ?? []
            }
            disabled={!localizations?.length}
            error={error?.message}
          />
        )}
        name={"localizationId"}
        control={control}
      />
      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Select
            label={"Device"}
            className={"mt-4"}
            options={devices ?? []}
            value={value}
            onChange={(option) => onChange(option.value)}
            error={error?.message}
          />
        )}
        name={"device"}
        control={control}
      />
    </AsideModal>
  );
}

export default AddKeywordAsideModal;
