import {
  domainNameValidator,
  ErrorBoundary,
  getErrorMessage,
  useErrorHandler,
} from "../../shared";
import { z } from "zod";
import { useDomainsFilters } from "../hooks/use-domains-filters.ts";
import { useEffect, useState } from "react";
import { useDomains } from "../hooks/use-domains.ts";
import { useDebounceValue } from "usehooks-ts";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { RequestAxiosError } from "../../../types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import PageTitle from "../../shared/components/page-title.tsx";
import InputWithInlineAddon from "../../shared/components/input-with-inline-addon.tsx";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Button from "../../shared/components/button.tsx";
import LinkBtn from "../../shared/components/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Spinner from "../../shared/components/loader/spinner.tsx";
import DomainsTable from "../components/domains-table.tsx";
import Pagination from "../../shared/components/pagination.tsx";
import EmptyTablePlaceholder from "../../shared/components/empty-table-placeholder.tsx";
import AsideModal from "../../shared/components/aside-modal.tsx";

const validationSchema = z.object({
  domain: z
    .string()
    .nonempty({
      message: "This field is required",
    })
    .refine((value) => domainNameValidator(value), {
      message: "Invalid domain name",
    }),
});

const PER_PAGE = 15;

function RtDomainsPage() {
  const {
    updateSearchText,
    getSearchText,
    commit,
    reset: resetFilters,
    updatePage,
    getPage,
  } = useDomainsFilters();

  const { handle401Error } = useErrorHandler();

  const [addDomainModalOpen, setAddDomainModalOpen] = useState(false);
  const { createDomainsQueryOptions, addDomainFn } = useDomains();
  const [searchText, setSearchText] = useDebounceValue(getSearchText(), 1000);

  const {
    data: domains,
    refetch: refetchDomains,
    isError,
    error,
    isFetching: domainsIsFetching,
  } = useQuery(
    createDomainsQueryOptions(getPage(), searchText ?? "", PER_PAGE),
  );

  const { mutate, isPending } = useMutation({
    mutationFn: addDomainFn,
    retry: 4,
    onSuccess: async () => {
      toast.success("Domain added successfully");
      close();
      resetFiltersFn();
      await refetchDomains();
    },
    onError: (error: RequestAxiosError) => {
      handle401Error(error);
      toast.error(getErrorMessage(error));
    },
  });

  const { control, handleSubmit, reset } = useForm<
    z.infer<typeof validationSchema>
  >({
    defaultValues: {
      domain: "",
    },
    resolver: zodResolver(validationSchema),
  });

  const submit = handleSubmit((data) => {
    mutate(data.domain);
  });

  const close = () => {
    setAddDomainModalOpen(false);
    reset();
  };

  const handleSearchTextChange = (searchText: string) => {
    updateSearchText(searchText);
    reset();
    commit();
  };

  const handleDeleted = async () => {
    resetFilters();
    await refetchDomains();
  };

  const handleNextPage = async () => {
    updatePage(getPage() + 1);
    commit();
  };

  const handlePrevPage = async () => {
    updatePage(getPage() - 1);
    commit();
  };

  const resetFiltersFn = () => {
    setSearchText("");
    resetFilters();
    commit();
  };

  const isClearFiltersBtnVisible = () => {
    return !!getSearchText();
  };

  useEffect(() => {
    if (error) {
      handle401Error(error as AxiosError);
    }
  }, [error, handle401Error]);

  useEffect(() => {
    if (isError) {
      toast.error("Ups! Something went wrong");
    }
  }, [isError]);

  return (
    <div>
      <PageTitle
        title={"Domains"}
        returnPath={"/rank-tracker"}
        returnText={"Back"}
      />
      <div className={"mt-8 flex justify-between items-center"}>
        <div>
          <InputWithInlineAddon
            placeholder={"Search"}
            leadingAddon={
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400 sm:size-4"
              />
            }
            onChange={(e) => handleSearchTextChange(e.target.value)}
            value={getSearchText()}
          />
        </div>
        <Button size={"lg"} onClick={() => setAddDomainModalOpen(true)}>
          Add domain
        </Button>
      </div>
      {isClearFiltersBtnVisible() && (
        <div className={"mt-4"}>
          <LinkBtn
            onClick={resetFiltersFn}
            icon={<XMarkIcon className={"size-5"} />}
          >
            Clear filters
          </LinkBtn>
        </div>
      )}
      {domainsIsFetching ? (
        <div className={"mt-4"}>
          <Spinner />
        </div>
      ) : (
        <>
          {domains?.userTotal ? (
            <ErrorBoundary>
              <DomainsTable
                className={"mt-4"}
                domains={domains?.data ?? []}
                onDeleted={handleDeleted}
              />
              <div className={"mt-4 flex justify-end"}>
                <Pagination
                  page={getPage()}
                  total={domains.total}
                  perPage={PER_PAGE}
                  onPrevPage={handlePrevPage}
                  onNextPage={handleNextPage}
                />
              </div>
            </ErrorBoundary>
          ) : (
            ""
          )}
          {domains?.userTotal === 0 && (
            <EmptyTablePlaceholder
              className={"mt-8"}
              onAction={() => setAddDomainModalOpen(true)}
              heading={"No domains"}
              description={"Get started by creating a new domain."}
              actionText={"New domain"}
            />
          )}
        </>
      )}
      <AsideModal
        title={"Add a new domain"}
        open={addDomainModalOpen}
        onClose={close}
        footerAddon={
          <div className={"flex justify-end"}>
            <Button size={"lg"} className={"w-32 mr-4"} soft onClick={close}>
              Cancel
            </Button>
            <Button
              size={"lg"}
              className={"w-32"}
              onClick={submit}
              loading={isPending}
            >
              Save
            </Button>
          </div>
        }
      >
        <Controller
          render={({ fieldState: { error }, field: { value, onChange } }) => (
            <InputWithInlineAddon
              label={"Domain"}
              error={error?.message}
              leadingAddon={"www."}
              placeholder={"example.com"}
              value={value}
              onChange={onChange}
            />
          )}
          name={"domain"}
          control={control}
        />
      </AsideModal>
    </div>
  );
}

export default RtDomainsPage;
