"use client";

import FilterMenu from "@/components/filter-menu";
import SortFilter from "@/components/sort-filter";
import { ReactNode, useState } from "react";

interface SideFilterMenuPropeTypes {
  searchParams: {
    q: string | null;
    categories: null | string[];
    sub_categories: null | string[];
    topics: null | string[];
    rating: null | number;
    levels: null | string[];
    languages: null | string[];
    price: null | string[];
    sort: null | string;
    p: null | number;
  };
  children: ReactNode;
  filtersMetaData: any;
  hideFilters: string[];
}

export default function SideFilterMenu({
  children,
  filtersMetaData,
  searchParams,
  hideFilters,
}: SideFilterMenuPropeTypes) {
  const [filterMenuVisible, setFilterMenuVisible] = useState(true);
  const toggleFilterMenuHandler = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };
  return (
    <div>
      <div>
        <div className="flex justify-between items-stretch box-content h-14 pb-3 border-b">
          <SortFilter
            sort={searchParams?.sort || "default"}
            toggleFilterMenu={toggleFilterMenuHandler}
          />
          <span className="text-lg font-bold text-gray-400 flex items-center">
            {filtersMetaData.total_count} results
          </span>
        </div>
      </div>
      <div className="flex">
        <div
          className={`transition-all overflow-hidden ${
            filterMenuVisible ? "w-64 mr-7" : "w-0 m-0 p-0"
          }`}
        >
          <div className="w-64">
            <FilterMenu
              filtersMetaData={filtersMetaData}
              searchParams={searchParams}
              hideFilters={hideFilters}
            />
          </div>
        </div>

        <div className="flex-1 mt-2">{children}</div>
      </div>
    </div>
  );
}
