"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface CoursePaginationPropeTypes {
  pageSize: number;
  totalCount: number;
  currentPage: number;
}

export default function CoursePagination({
  pageSize,
  totalCount,
  currentPage,
}: CoursePaginationPropeTypes) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(totalCount / pageSize);

  const paginationChangeHandler = (value: number) => {
    if (value - 1 > pageCount || value - 1 < 0) return;
    const qq: string[] = [];
    searchParams.forEach((value, key) => {
      if (key !== "p") qq.push(`${key}=${value}`);
    });
    router.replace(pathname + `?${qq.join("&")}&p=${value - 1}`);
  };

  return (
    <div className="flex items-center gap-3 mt-7">
      <button
        className="flex items-center justify-center w-10 h-10 border rounded-full border-slate-800"
        onClick={() => paginationChangeHandler(currentPage - 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="scale-150"
        >
          <path
            fill="currentColor"
            d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6L14 18Z"
          ></path>
        </svg>
      </button>

      {Array.from(
        { length: pageCount > 5 ? (currentPage >= 3 ? 1 : 3) : pageCount },
        (_, idx) => (
          <button
            key={idx}
            className={`p-2 ${
              currentPage - 1 === idx && "border-b-4 border-purple-600"
            }`}
            onClick={() => paginationChangeHandler(idx + 1)}
          >
            {idx + 1}
          </button>
        )
      )}

      {pageCount > 5 && currentPage >= 3 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z"
          ></path>
        </svg>
      )}

      {pageCount > 5 && currentPage >= 3 && currentPage + 3 <= pageCount && (
        <>
          <button
            key={currentPage - 1}
            className="p-2"
            onClick={() => paginationChangeHandler(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
          <button
            key={currentPage}
            className="p-2 border-b-4 border-purple-600"
          >
            {currentPage}
          </button>
          <button
            key={currentPage + 1}
            className="p-2"
            onClick={() => paginationChangeHandler(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        </>
      )}
      {pageCount > 5 && currentPage + 3 > pageCount && (
        <>
          <button
            key={pageCount - 2}
            className={`p-2 ${
              currentPage === pageCount - 2 && "border-b-4 border-purple-600"
            }`}
            onClick={() => paginationChangeHandler(pageCount - 2)}
          >
            {pageCount - 2}
          </button>
          <button
            key={pageCount - 1}
            className={`p-2 ${
              currentPage === pageCount - 1 && "border-b-4 border-purple-600"
            }`}
            onClick={() => paginationChangeHandler(pageCount - 1)}
          >
            {pageCount - 1}
          </button>
          <button
            key={pageCount}
            className={`p-2 ${
              currentPage === pageCount && "border-b-4 border-purple-600"
            }`}
            onClick={() => paginationChangeHandler(pageCount)}
          >
            {pageCount}
          </button>
        </>
      )}

      {pageCount > 5 && currentPage + 3 <= pageCount && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z"
          ></path>
        </svg>
      )}

      {pageCount > 5 && currentPage + 3 <= pageCount && (
        <button
          key={pageCount}
          className="p-2"
          onClick={() => paginationChangeHandler(pageCount)}
        >
          {pageCount}
        </button>
      )}

      <button
        className="flex items-center justify-center w-10 h-10 border rounded-full border-slate-800"
        onClick={() => paginationChangeHandler(currentPage + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="scale-150"
        >
          <path
            fill="currentColor"
            d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z"
          ></path>
        </svg>
      </button>
    </div>
  );
}
