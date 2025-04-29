import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useKeywords } from "../hooks/use-keywords.ts";
import {
  getErrorMessage,
  RequestAxiosError,
  useErrorHandler,
} from "../../shared";
import AsideModal from "../../shared/components/aside-modal.tsx";
import Button from "../../shared/components/button.tsx";
import Spinner from "../../shared/components/loader/spinner.tsx";
import MessageBox from "../../shared/components/message-box.tsx";
import DomainsAsyncSelect from "./domains-async-select.tsx";
import Input from "../../shared/components/input.tsx";
import Select from "../../shared/components/select/select.tsx";
import { useRtDevices } from "../hooks/use-devices.ts";
import { useRtLocalizations } from "../hooks/use-localizations.ts";

type Props = Readonly<{
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}>;

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
  const { createDevicesQueryOptions } = useRtDevices();
  const { createLocalizationsQueryOptions } = useRtLocalizations();
  const { createAvailableKeywordsQuantityQueryOptions } = useKeywords();
  const { handle401Error } = useErrorHandler();

  const {
    data: availableKeywordsQuantity,
    error: availableKeywordsQuantityError,
    isFetching: availableKeywordsQuantityIsFetching,
  } = useQuery(createAvailableKeywordsQuantityQueryOptions(open));

  const { reset, handleSubmit, control } = useForm<
    z.infer<typeof validationSchema>
  >({
    defaultValues: {
      text: "",
      device: "",
      domainId: "",
      localizationId: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const {
    data: devices,
    error: devicesError,
    isFetching: devicesIsFetching,
  } = useQuery(createDevicesQueryOptions(open));

  const {
    data: localizations,
    error: localizationsError,
    isFetching: localizationsIsFetching,
  } = useQuery(createLocalizationsQueryOptions());

  const { mutate, isPending } = useMutation({
    mutationFn: addKeywordFn,
    retry: 4,
    onSuccess: () => {
      toast.success("Keyword added successfully");
      onAdded();
      onClose();
      reset();
    },
    onError: (error: RequestAxiosError) => {
      handle401Error(error);
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

  useEffect(() => {
    if (availableKeywordsQuantityError) {
      handle401Error(availableKeywordsQuantityError as AxiosError);
      return;
    }
    if (devicesError) {
      handle401Error(devicesError as AxiosError);
      return;
    }
    if (localizationsError) {
      handle401Error(localizationsError as AxiosError);
    }
  }, [
    availableKeywordsQuantityError,
    devicesError,
    localizationsError,
    handle401Error,
  ]);

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
            disabled={availableKeywordsQuantity?.exceeded}
          >
            Save
          </Button>
        </div>
      }
    >
      {availableKeywordsQuantityIsFetching ||
      devicesIsFetching ||
      localizationsIsFetching ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {availableKeywordsQuantity?.exceeded && (
            <div className={"mb-4"}>
              <MessageBox
                severity={"warning"}
                text={"You exceeded the limit of available keywords to add"}
              />
            </div>
          )}

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
                label={"Localization"}
                value={value}
                onChange={(option) => onChange(option.value)}
                options={
                  localizations?.map((localization) => ({
                    label: localization.name,
                    value: localization.localizationId,
                  })) ?? []
                }
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
        </>
      )}
    </AsideModal>
  );
}

export default AddKeywordAsideModal;
