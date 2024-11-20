"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const sortOptions = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "A-Z",
    value: "atoz",
  },
  {
    label: "Z-A",
    value: "ztoa",
  },
  {
    label: "Published First",
    value: "publishedFirst",
  },
  {
    label: "Unpublished First",
    value: "unpublishedFirst",
  },
];

interface PropeTypes {
  query: string | undefined;
  sortBy: string | undefined;
}

export default function FilterMenu({
  query = "",
  sortBy = "newest",
}: PropeTypes) {
  const [filters, setFilters] = useState({ query: "", sortBy: "newest" });
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (q: string = "") => {
    setFilters((prev) => ({ ...prev, query: q }));
    const queryParams = [];
    if (q.length) {
      queryParams.push(`query=${q}`);
    }
    if (sortBy != "newest") {
      queryParams.push(`sort=${sortBy}`);
    }

    const qq = `/?${queryParams.join("&")}`;
    router.replace(pathname + qq);
  };

  const handleSortChange = (s: string = "newest") => {
    setFilters((prev) => ({ ...prev, sortBy: s }));
    const queryParams = [];
    if (s !== "newest") {
      queryParams.push(`sort=${s}`);
    }
    if (query.length) {
      queryParams.push(`query=${query}`);
    }

    const qq = `/?${queryParams.join("&")}`;
    router.replace(pathname + qq);
  };

  useEffect(() => {
    setFilters({ query, sortBy });
  }, [query, sortBy]);

  return (
    <div className="flex gap-2 items-center">
      <Input
        value={filters.query}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, query: e.target.value || "" }))
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(filters.query);
          }
        }}
        placeholder="Search..."
      />
      <Select value={filters.sortBy} onValueChange={handleSortChange}>
        <SelectTrigger>
          <SelectValue defaultValue="newest" placeholder="Sort By..." />
        </SelectTrigger>
        <SelectContent className="overflow-y-auto max-h-[15rem]">
          {sortOptions?.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
