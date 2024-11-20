import { createClient } from "@/utils/supabase/client";
import SideFilterMenu from "@/components/side-filter-menu";
import CoursePagination from "@/components/pagination";
import CoursesList from "@/components/courses_list";
import { defaultFiltersForSearchPage } from "@/lib/defaults";
import { Database } from "@/types/supabase";

interface CategoryPropeTypes {
  params: {
    category: string;
    subcategory: string;
  };
  searchParams: {
    rating?: string;
    sub_category?: string | string[];
    topics?: string | string[];
    prices?: string | string[];
    levels?: string | string[];
    languages?: string | string[];
    sort?: string;
    p: null | number;
  };
}

const processSearchQuery = (searchParams: {
  rating?: string;
  sub_category?: string | string[];
  topics?: string | string[];
  prices?: string | string[];
  levels?: string | string[];
  languages?: string | string[];
  sort?: string;
  p: null | number;
}) => {
  const filters: {
    q: string | null;
    categories: null | string[];
    rating: null | number;
    sub_categories: null | string[];
    topics: null | string[];
    levels: null | string[];
    languages: null | string[];
    price: null | string[];
    sort: null | string;
    p: null | number;
  } = {
    q: null,
    categories: null,
    rating: null,
    sub_categories: null,
    topics: null,
    levels: null,
    languages: null,
    price: null,
    sort: null,
    p: 0,
  };
  if (searchParams.rating)
    filters["rating"] = Number.parseFloat(searchParams.rating);
  if (searchParams.topics) {
    if (typeof searchParams.topics === "string")
      filters["topics"] = [searchParams.topics];
    else filters["topics"] = searchParams.topics;
  }

  if (searchParams.sub_category) {
    if (typeof searchParams.sub_category === "string")
      filters["sub_categories"] = [searchParams.sub_category];
    else filters["sub_categories"] = searchParams.sub_category;
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
  if (searchParams.p)
    filters["p"] = Number.parseInt(searchParams.p as unknown as string);

  return filters;
};

export default async function Category({
  params,
  searchParams,
}: CategoryPropeTypes) {
  const processedSearchParams = processSearchQuery(searchParams);
  const supabase = createClient();

  if (params.category) {
    processedSearchParams.categories = [decodeURIComponent(params.category)];
  }

  if (params.subcategory) {
    processedSearchParams.sub_categories = processedSearchParams.sub_categories
      ? [
          decodeURIComponent(params.subcategory),
          ...processedSearchParams.sub_categories,
        ]
      : [decodeURIComponent(params.subcategory)];
  }

  const dbFilter = {
    categories: [decodeURIComponent(params.category)],
    sub_categories: processedSearchParams.sub_categories
      ? [
          decodeURIComponent(params.subcategory),
          ...processedSearchParams.sub_categories,
        ]
      : [decodeURIComponent(params.subcategory)],
    topics: processedSearchParams.topics,
    rating: processedSearchParams.rating,
    levels: processedSearchParams.levels as
      | Database["public"]["Enums"]["course_level_enum"][]
      | null,
    languages: processedSearchParams.languages as
      | Database["public"]["Enums"]["language_enum"][]
      | null,
    price: processedSearchParams.price as
      | Database["public"]["Enums"]["course_access_enum"][]
      | null,
  };

  const { data, error } = await supabase.rpc(
    "get_categories_filters",
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

  if (data["sub_category"]) {
    filtersMetaData["sub_category"] = data["sub_category"];
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
    <main className="max-w-7xl mx-auto p-3">
      <h1 className="text-4xl font-bold mb-2">
        {decodeURIComponent(params.category)} courses
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
