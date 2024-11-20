"use client";

import { useState, useCallback } from "react";

export interface SideMenuPropeTypes {
  mostPopular: {
    name: string;
    topics: {
      name: string;
    }[];
  }[];
  categories: {
    name: string;
    subCategories: {
      name: string;
      topics: {
        name: string;
      }[];
    }[];
  }[];
}

export default function SideMenu({
  mostPopular,
  categories,
}: SideMenuPropeTypes) {
  const [visible, setVisible] = useState(false);
  const [mostPopularCategory, setMostPopularCategory] = useState<null | {
    name: string;
    topics: {
      name: string;
    }[];
  }>(null);
  const [allCategory, setAllCategory] = useState<{
    visible: boolean;
    category: null | {
      name: string;
      subCategories: {
        name: string;
        topics: {
          name: string;
        }[];
      }[];
    };
  }>({ visible: false, category: null });

  const goToMainMenu = useCallback(() => {
    setAllCategory({ visible: false, category: null });
    setMostPopularCategory(null);
  }, []);
  const goToAllCategoryMenu = useCallback(() => {
    setAllCategory({ visible: true, category: null });
  }, []);

  return (
    <div className="md:hidden h-6">
      <button
        className="hover:fill-primary-blue"
        onClick={() => setVisible(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
          />
        </svg>
      </button>
      <div
        className={`bg-black opacity-20 absolute top-0 left-0 w-screen h-screen ${
          visible ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`bg-white absolute left-0 top-0 w-64 h-full transition-transform ${
          visible ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <button
          className="absolute z-20 -right-16 hover:bg-slate-50 p-3 rounded-full top-4 flex justify-center items-center bg-white stroke-black"
          onClick={() => setVisible(false)}
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
              strokeWidth="2"
              d="M20 20L4 4m16 0L4 20"
            />
          </svg>
        </button>

        <div className="relative w-full h-full z-20 overflow-hidden">
          <div className="absolute bg-white w-full h-full">
            <div className="flex flex-col gap-2 items-start p-3 border-b">
              <button className="text-primary-button">Log In</button>
              <button className="text-primary-button">Sign In</button>
            </div>
            <div className="p-3 border-b">
              <h2 className="text-lg text-gray-600 font-medium">
                Most Popular
              </h2>
              <ul>
                {mostPopular.map((mp) => (
                  <li
                    className={`flex items-center justify-between my-2 gap-20 hover:text-primary-blue hover:cursor-pointer`}
                    key={mp?.name}
                    onClick={() => setMostPopularCategory(mp)}
                  >
                    {mp.name}
                    {mp.topics.length && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        className="flex-shrink-0"
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
                  </li>
                ))}
                <li
                  className={`flex items-center justify-between my-2 gap-20 hover:text-primary-blue hover:cursor-pointer`}
                  onClick={goToAllCategoryMenu}
                >
                  All Category
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    className="flex-shrink-0"
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
                </li>
              </ul>
            </div>
            <div className="p-3">
              <h2 className="text-lg text-gray-600 font-medium">
                More from xxx
              </h2>
              <button className="block hover:text-primary-blue">
                Teach on xxx
              </button>
              <button className="block hover:text-primary-blue">Help</button>
            </div>
          </div>
          <div
            className={`absolute w-full bg-white h-full transition-transform ${
              mostPopularCategory ? "translate-x-0" : "translate-x-64"
            }`}
          >
            <button
              className="flex items-center gap-4 bg-blue-100 px-2 py-4 w-full"
              onClick={goToMainMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"
                />
              </svg>
              Menu
            </button>
            <ul className="p-2">
              {mostPopularCategory?.topics.map((t) => (
                <li
                  key={t.name}
                  className="p-1.5 hover:text-primary-blue hover:cursor-pointer"
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`absolute w-full bg-white h-full transition-transform  ${
              allCategory.visible ? "translate-x-0" : "translate-x-64"
            }`}
          >
            <button
              className="flex items-center gap-4 mb-2 bg-blue-100 px-2 py-4 w-full"
              onClick={goToMainMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"
                />
              </svg>
              Menu
            </button>
            {allCategory.category && (
              <button
                className="flex items-center gap-4 border-b px-2 py-4 w-full"
                onClick={goToAllCategoryMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M16.62 2.99a1.25 1.25 0 0 0-1.77 0L6.54 11.3a.996.996 0 0 0 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z"
                  />
                </svg>
                All Category
              </button>
            )}

            {allCategory.category ? (
              <ul className="p-2">
                {allCategory.category?.subCategories.map((c) => (
                  <li
                    key={c.name}
                    className="p-1.5 hover:text-primary-blue hover:cursor-pointer"
                  >
                    {c.name}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="p-2">
                {categories?.map((c) => (
                  <li
                    className={`flex items-center justify-between my-2 gap-20 hover:text-primary-blue hover:cursor-pointer`}
                    key={c?.name}
                    onClick={() =>
                      setAllCategory({ visible: true, category: c })
                    }
                  >
                    {c.name}
                    {c.subCategories.length && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        className="flex-shrink-0"
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
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
