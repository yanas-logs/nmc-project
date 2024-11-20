"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export interface SubCategory {
  id: any;
  name: any;
}

export interface Topics {
  id: any;
  topic: any;
}

export interface Category {
  id: any;
  name: any;
  sub_categories: SubCategory[];
}

interface CategoriesMenuPropeTypes {
  categories: Category[] | null;
}

export default function CategoriesMenu({
  categories,
}: CategoriesMenuPropeTypes) {
  const supabase = createClient();
  const [mainCategory, setMainCategory] = useState<Category | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null);
  const [topics, setTopics] = useState<{
    loading: boolean;
    data: Topics[] | null;
  }>({ loading: false, data: [] });

  const mainCategoryChangeHandler = useCallback((c: any) => {
    setMainCategory(c);
    setSubCategory(null);
  }, []);

  const subCategoryChangeHandler = useCallback(async (sc: string) => {
    setSubCategory(sc);
    setTopics({ data: [], loading: true });
    const { data: xtopics, error } = await supabase
      .from("sub_categories_topics")
      .select("*")
      .eq("name", sc)
      .order("course_count")
      .limit(10);
    setTopics({ loading: false, data: xtopics as unknown as Topics[] });
  }, []);

  return (
    <div className="flex shadow-trello bg-white rounded w-max">
      <ul className="p-3 bg-white">
        {categories?.map((c) => (
          <Link
            className={`flex items-center justify-between py-1.5 gap-20 hover:text-primary-blue hover:cursor-pointer text-sm ${
              c.name == mainCategory?.name && "text-primary-blue"
            }`}
            key={c?.name}
            onMouseOver={() => mainCategoryChangeHandler(c)}
            href={`/courses/${c.name}`}
          >
            {c.name}
            {c.sub_categories.length && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m9 5l6 7l-6 7"
                />
              </svg>
            )}
          </Link>
        ))}
      </ul>
      {mainCategory?.sub_categories.length ? (
        <ul className="border-l p-3">
          {mainCategory?.sub_categories?.map((sc) => (
            <Link
              className={`flex items-center justify-between py-1.5 gap-14 hover:text-primary-blue hover:cursor-pointer text-sm ${
                sc.name == subCategory && "text-primary-blue"
              }`}
              key={sc?.name}
              href={`/courses/${mainCategory.name}/${sc.name}`}
              onMouseOver={() => subCategoryChangeHandler(sc.name)}
            >
              {sc.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m9 5l6 7l-6 7"
                />
              </svg>
            </Link>
          ))}
        </ul>
      ) : null}
      {subCategory && (
        <ul className="border-l p-3">
          <h2 className="text-base font-medium mb-3">Popular Topics</h2>
          {topics.loading ? (
            <div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
            </div>
          ) : (
            topics.data?.map((c) => (
              <Link
                href={`/courses/topic/${c?.topic}`}
                className="flex items-center justify-between py-1.5 gap-14 hover:text-primary-blue hover:cursor-pointer text-sm "
                key={c?.topic}
              >
                {c.topic}
              </Link>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
