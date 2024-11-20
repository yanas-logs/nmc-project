"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

interface SortFilterPropeTypes {
  sort: string | null;
  toggleFilterMenu: VoidFunction;
}

export default function SortFilter({
  sort,
  toggleFilterMenu,
}: SortFilterPropeTypes) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const coursesSortHandler = (value: string) => {
    const qq: string[] = [];
    if (value === "default") {
      searchParams.forEach((value, key) => {
        if (key !== "sort") qq.push(`${key}=${value}`);
      });
      router.replace(pathname + `?${qq.join("&")}`);
    } else if (searchParams.has("sort")) {
      searchParams.forEach((value, key) => {
        if (key !== "sort") qq.push(`${key}=${value}`);
      });
      router.replace(pathname + `?${qq.join("&")}&sort=${value}`);
    } else {
      router.replace(pathname + `?${searchParams.toString()}&sort=${value}`);
    }
  };

  const clearFilterHandler = () => {
    if (searchParams.has("q"))
      router.replace(`${pathname}?q=${searchParams.get("q")}`);
    else router.replace(pathname);
  };

  const clearFilters =
    searchParams.has("rating") ||
    searchParams.has("topics") ||
    searchParams.has("sub_category") ||
    searchParams.has("levels") ||
    searchParams.has("price");

  const filterCount =
    (searchParams.has("rating") ? 1 : 0) +
    (searchParams.has("topics") ? 1 : 0) +
    (searchParams.has("sub_category") ? 1 : 0) +
    (searchParams.has("levels") ? 1 : 0) +
    (searchParams.has("price") ? 1 : 0);

  const sortLabel =
    sort === "mostpop"
      ? "Most Popular"
      : sort === "new"
      ? "Newest"
      : sort === "high"
      ? "Higesh Rated"
      : "Most Relevent";

  return (
    <div className="flex gap-2">
      <button
        className="flex gap-2 items-center border bg-slate-100 px-3"
        onClick={toggleFilterMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
          />
        </svg>
        Filter({filterCount})
      </button>
      <Select
        onValueChange={coursesSortHandler}
        defaultValue={sort || undefined}
      >
        <SelectTrigger className="bg-slate-100 px-3 border rounded-none h-full">
          <div className="flex flex-col items-start pr-2 w-28">
            <span className="text-sm">Sort by</span>
            <span className="font-bold">{sortLabel}</span>
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Most Relevant</SelectItem>
          <SelectItem value="mostpop">Most Popular</SelectItem>
          <SelectItem value="high">Higest Rated</SelectItem>
          <SelectItem value="new">Newest</SelectItem>
        </SelectContent>
      </Select>
      {clearFilters && (
        <button onClick={clearFilterHandler} className="text-base font-medium">
          Clear Filters
        </button>
      )}
    </div>
  );
}
