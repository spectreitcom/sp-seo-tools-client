import { useAnalysis } from "../hooks/use-analysis.ts";
import {
  getErrorMessage,
  RequestAxiosError,
  useErrorHandler,
} from "../../shared";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../shared/components/input.tsx";
import Button from "../../shared/components/button.tsx";

type Props = Readonly<{
  analysisId: string;
}>;

const validationSchema = z.object({
  url: z.string().url({
    message: "This field must contain valid url",
  }),
});

function AddCompetitorForm({ analysisId }: Props) {
  const { addCompetitorFn } = useAnalysis();
  const { handle401Error } = useErrorHandler();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: addCompetitorFn,
    onSuccess: () => {
      toast.success("Competitor added successfully");
      reset();
      navigate("/serp-analyzer/analysis");
    },
    onError: (error: RequestAxiosError) => {
      handle401Error(error);
      toast.error(getErrorMessage(error));
    },
  });

  const { reset, control, handleSubmit } = useForm<
    z.infer<typeof validationSchema>
  >({
    defaultValues: {
      url: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const submit = handleSubmit((data) => {
    mutate({
      analysisId,
      url: data.url,
    });
  });

  return (
    <div>
      <h4 className={"font-semibold"}>Add competitor</h4>
      <div className={"mt-4 flex items-center"}>
        <div className={"w-4/12 mr-2"}>
          <Controller
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={"https://your-page.com"}
                error={error?.message}
              />
            )}
            name={"url"}
            control={control}
          />
        </div>
        <Button size={"xxl"} loading={isPending} onClick={submit}>
          Compare
        </Button>
      </div>
    </div>
  );
}

export default AddCompetitorForm;
