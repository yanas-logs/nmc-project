import { createClient } from "@/utils/supabase/server";

import SideFilterMenu from "../../../../components/side-filter-menu";
import { defaultFiltersForSearchPage } from "@/lib/defaults";
import CoursesList from "../../../../components/courses_list";
import CoursePagination from "@/components/pagination";

interface SearchPagePropeTypes {
  searchParams: {
    q: string;
    categories?: null;
    sub_categories?: null;
    topics: null | string[];
    rating?: string;
    prices?: string | string[];
    levels?: string | string[];
    sort?: string;
    p: null | number;
  };
}

const processSearchQuery = (searchParams: {
  q: string;
  categories?: null;
  sub_categories?: null;
  topics: null | string[];
  rating?: string;
  prices?: string | string[];
  levels?: string | string[];
  languages?: string | string[];
  sort?: string;
  p: null | number;
}) => {
  const filters: {
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
  } = {
    q: "",
    categories: null,
    sub_categories: null,
    topics: null,
    rating: null,
    levels: null,
    languages: null,
    price: null,
    sort: null,
    p: 0,
  };

  filters["q"] = searchParams.q;
  if (searchParams.rating)
    filters["rating"] = Number.parseFloat(searchParams.rating);

  if (searchParams.topics) {
    if (typeof searchParams.topics === "string")
      filters["topics"] = [searchParams.topics];
    else filters["topics"] = searchParams.topics;
  }

  if (searchParams.levels) {
    if (typeof searchParams.levels === "string")
      filters["levels"] = [searchParams.levels];
    else filters["levels"] = searchParams.levels;
  }

  if (searchParams.prices) {
    if (typeof searchParams.prices === "string")
      filters["price"] = [searchParams.prices];
    else filters["price"] = searchParams.prices;
  }

  if (searchParams.languages) {
    if (typeof searchParams.languages === "string")
      filters["languages"] = [searchParams.languages];
    else filters["languages"] = searchParams.languages;
  }

  if (searchParams.sort) filters["sort"] = searchParams.sort;
  if (searchParams.p) filters["p"] = searchParams.p;

  return filters;
};

export default async function SearchPage({
  searchParams,
}: SearchPagePropeTypes) {
  const processedSearchParams = processSearchQuery(searchParams);
  const supabase = createClient();
  const dbFilter = {
    q: processedSearchParams.q,
    topics: processedSearchParams.topics,
    rating: processedSearchParams.rating,
    levels: processedSearchParams.levels,
    languages: processedSearchParams.languages,
    price: processedSearchParams.price,
  };

  const { data, error } = await supabase.rpc(
    "get_text_search_filters",
    dbFilter
  );

  if (error) {
    console.log(error.message);
    return <h1>Something went wrong! {error.message}</h1>;
  }

  let filtersMetaData = defaultFiltersForSearchPage;
  if (data["total"] && data["total"]["total_count"]) {
    filtersMetaData["total_count"] = data["total"]["total_count"];
  }
  if (data["ratings"]) {
    filtersMetaData["rating"] = [
      {
        value: 4.5,
        count: data["ratings"]["rating_4_half_up"],
        text: "4.5 & up",
      },
      {
        value: 4,
        count: data["ratings"]["rating_4_up"],
        text: "4 & up",
      },
      {
        value: 3.5,
        count: data["ratings"]["rating_3_half_up"],
        text: "3.5 & up",
      },
      {
        value: 3,
        count: data["ratings"]["rating_3_up"],
        text: "3 & up",
      },
    ];
  }
  if (data["paid"]) {
    filtersMetaData["price"] = [
      {
        value: "PAID",
        label: "Paid",
        count: data["paid"]["paid"],
      },
      {
        value: "FREE",
        label: "Free",
        count: data["paid"]["free"],
      },
    ];
  }

  if (data["level"]) {
    filtersMetaData["level"] = [
      {
        value: "ALL_LEVELS",
        label: "All Level",
        count: data["level"]["all_levels"],
      },
      {
        value: "BEGINNER",
        label: "Beginner",
        count: data["level"]["beginner"],
      },
      {
        value: "INTERMEDIATE",
        label: "Intermediate",
        count: data["level"]["intermediate"],
      },
      {
        value: "EXPERT",
        label: "Expert",
        count: data["level"]["expert"],
      },
    ];
  }
  if (data["languages"]) filtersMetaData["languages"] = data["languages"];
  if (data["topics"]) filtersMetaData["topics"] = data["topics"];

  return (
    <main className="max-w-7xl mx-auto p-3 overflow-hidden">
      <h1 className="text-4xl font-bold mb-2">
        {filtersMetaData["total_count"]} results for {processedSearchParams.q}
      </h1>
      <SideFilterMenu
        filtersMetaData={filtersMetaData}
        searchParams={processedSearchParams}
        hideFilters={["sub_category"]}
      >
        <>
          <CoursesList searchParams={processedSearchParams} />
          <CoursePagination
            pageSize={20}
            totalCount={filtersMetaData["total_count"]}
            currentPage={(processedSearchParams.p as number) + 1}
          />
        </>
      </SideFilterMenu>
    </main>
  );
}
