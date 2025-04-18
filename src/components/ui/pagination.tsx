import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

type Props = Readonly<{
  total: number;
  page: number;
  perPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}>;

function Pagination({ total, perPage, page, onNextPage, onPrevPage }: Props) {
  const pagesCount = Math.ceil(total / perPage);

  return (
    <div className={"flex flex-nowrap items-center"}>
      <button
        onClick={onPrevPage}
        className={
          "cursor-pointer bg-white hover:bg-gray-100 rounded-full p-1 disabled:opacity-40 disabled:hover:bg-gray-50"
        }
        disabled={page === 1}
      >
        <ChevronLeftIcon className={"size-5"} />
      </button>
      <div className={"mx-4 text-sm"}>
        page {page} of {pagesCount}
      </div>
      <button
        onClick={onNextPage}
        className={
          "cursor-pointer bg-white hover:bg-gray-100 rounded-full p-1 disabled:opacity-40 disabled:hover:bg-gray-50"
        }
        disabled={page === pagesCount}
      >
        <ChevronRightIcon className={"size-5"} />
      </button>
    </div>
  );
}

export default Pagination;
