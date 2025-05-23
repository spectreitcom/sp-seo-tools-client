import { z } from "zod";
import { useAnalysis } from "../hooks/use-analysis.ts";
import {
  getErrorMessage,
  RequestAxiosError,
  useErrorHandler,
} from "../../shared";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { AxiosError } from "axios";
import AsideModal from "../../shared/components/aside-modal.tsx";
import Button from "../../shared/components/button.tsx";
import Spinner from "../../shared/components/loader/spinner.tsx";
import MessageBox from "../../shared/components/message-box.tsx";
import Input from "../../shared/components/input.tsx";
import Select from "../../shared/components/select/select.tsx";
import { useSaDevices } from "../hooks/use-devices.ts";
import { useSaLocalizations } from "../hooks/use-localizations.ts";

type Props = Readonly<{
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}>;

const validationSchema = z.object({
  keyword: z.string().min(1, {
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

function AddAnalysisAsideModal({ onClose, onAdded, open }: Props) {
  const { createDevicesQueryOptions } = useSaDevices();
  const { createLocalizationsQueryOptions } = useSaLocalizations();
  const { createUsageQueryOptions, createAnalysisFn } = useAnalysis();
  const { handle401Error } = useErrorHandler();

  const { reset, handleSubmit, control } = useForm<
    z.infer<typeof validationSchema>
  >({
    defaultValues: {
      device: "",
      localizationId: "",
      keyword: "",
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
  } = useQuery(createLocalizationsQueryOptions(open));

  const {
    data: usage,
    error: usageError,
    isFetching: usageIsFetching,
  } = useQuery(createUsageQueryOptions(open));

  const { mutate, isPending } = useMutation({
    mutationFn: createAnalysisFn,
    onSuccess: () => {
      toast.success("Analysis created successfully");
      onAdded();
      onClose();
      reset();
    },
    onError: (error: RequestAxiosError) => {
      handle401Error(error);
      toast.error(getErrorMessage(error));
    },
  });

  const cancel = () => {
    reset();
    onClose();
  };

  const submit = handleSubmit((data) => {
    mutate(data);
  });

  const isQuotaExceeded = () => {
    if (!usage) return false;
    return usage.monthlyLimit <= usage.usedQuota;
  };

  useEffect(() => {
    if (devicesError) {
      handle401Error(devicesError as AxiosError);
      return;
    }
    if (localizationsError) {
      handle401Error(localizationsError as AxiosError);
      return;
    }
    if (usageError) {
      handle401Error(usageError as AxiosError);
    }
  }, [devicesError, localizationsError, usageError, handle401Error]);

  return (
    <AsideModal
      open={open}
      onClose={cancel}
      title={"Add a new analysis"}
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
            disabled={isQuotaExceeded()}
          >
            Save
          </Button>
        </div>
      }
    >
      {devicesIsFetching ||
        localizationsIsFetching ||
        (usageIsFetching && (
          <div>
            <Spinner />
          </div>
        ))}

      {isQuotaExceeded() && (
        <div className={"mb-4"}>
          <MessageBox
            severity={"warning"}
            text={"You exceeded the monthly limit of analyses to add"}
          />
        </div>
      )}

      <Controller
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className={"mt-4"}>
            <Input
              label={"Phrase"}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              error={error?.message}
            />
          </div>
        )}
        name={"keyword"}
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
    </AsideModal>
  );
}

export default AddAnalysisAsideModal;
