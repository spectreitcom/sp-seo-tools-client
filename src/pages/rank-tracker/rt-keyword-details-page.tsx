import PageTitle from "../../components/pages/page-title.tsx";
import { useErrorHandler, useKeywords } from "../../hooks";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect } from "react";
import { RequestAxiosError } from "../../types";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/get-error-message.ts";
import RtKeywordDetails from "../../components/pages/rt-keyword-details.tsx";
import { useDomainHistoryPosition } from "../../hooks/use-domain-history-position.ts";
import DomainPositionHistoryTable from "../../components/pages/domain-position-history-table.tsx";
import Pagination from "../../components/ui/pagination.tsx";
import { useKeywordDetailsFilters } from "../../hooks/use-keyword-details-filters.ts";
import DomainPositionChart from "../../components/pages/domain-position-chart.tsx";
import moment from "moment";
import LinkBtn from "../../components/ui/link-btn.tsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DatePicker from "../../components/ui/date-picker/date-picker.tsx";
import Spinner from "../../components/ui/loader/spinner.tsx";

const PER_PAGE = 15;

const maxDateMoment = moment();
const minDateMoment = maxDateMoment.clone().subtract(6, "months");

const minDate = minDateMoment.format("YYYY-MM-DD");
const maxDate = maxDateMoment.format("YYYY-MM-DD");

function RtKeywordDetailsPage() {
  const { createKeywordQueryOptions } = useKeywords();
  const { keywordId } = useParams<{ keywordId: string }>();
  const { handle401Error } = useErrorHandler();
  const {
    getPage,
    updatePage,
    commit,
    getFromDate,
    getToDate,
    updateFromDate,
    updateToDate,
    reset,
  } = useKeywordDetailsFilters();
  const {
    createDomainHistoryPositionQueryOptions,
    createDomainHistoryPositionChartQueryOptions,
  } = useDomainHistoryPosition();

  const { data, error, isLoading } = useQuery(
    createKeywordQueryOptions(keywordId ?? ""),
  );

  const { data: domainPositionData, isLoading: isLoading2 } = useQuery(
    createDomainHistoryPositionQueryOptions(
      keywordId ?? "",
      getFromDate(),
      getToDate(),
      PER_PAGE,
      getPage(),
      !!keywordId,
    ),
  );

  const { data: chartData, isLoading: isLoading3 } = useQuery(
    createDomainHistoryPositionChartQueryOptions(
      keywordId ?? "",
      getFromDate(),
      getToDate(),
      99999,
      1,
      !!keywordId,
    ),
  );

  const handleNextPage = async () => {
    updatePage(getPage() + 1);
    commit();
  };

  const handlePrevPage = async () => {
    updatePage(getPage() - 1);
    commit();
  };

  const handleDatesChange = (dates: string[]) => {
    if (dates.length === 2) {
      updateFromDate(dates[0]);
      updateToDate(dates[1]);
    } else {
      updateFromDate("");
      updateToDate("");
    }
    commit();
  };

  const isClearFiltersBtnVisible = () => {
    const fromDate = getFromDate();
    const toDate = getToDate();
    return fromDate || toDate;
  };

  const resetFiltersFn = () => {
    reset();
    commit();
  };

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error as RequestAxiosError));
      handle401Error(error as RequestAxiosError);
    }
  }, [error]);

  if (isLoading || isLoading2 || isLoading3)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div>
      <PageTitle
        title={"Keyword details"}
        returnPath={"/rank-tracker/keywords"}
        returnText={"Back"}
      />
      <RtKeywordDetails keyword={data} className={"mt-8"} />
      <div className={"mt-8 -mx-2"}>
        <div className={"px-2 w-2/12"}>
          <DatePicker
            placeholder={"Select date range"}
            mode={"range"}
            onChange={handleDatesChange}
            minDate={minDate}
            maxDate={maxDate}
            values={[getFromDate(), getToDate()]}
          />
        </div>
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
      <DomainPositionChart className={"mt-8"} data={chartData?.data ?? []} />
      <h3 className={"mt-8 font-semibold text-xl"}>History</h3>
      {domainPositionData?.userTotal ? (
        <>
          <DomainPositionHistoryTable
            data={domainPositionData?.data ?? []}
            className={"mt-4"}
          />
          <div className={"mt-4 flex justify-end"}>
            <Pagination
              page={getPage()}
              total={domainPositionData.total}
              perPage={PER_PAGE}
              onPrevPage={handlePrevPage}
              onNextPage={handleNextPage}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default RtKeywordDetailsPage;
