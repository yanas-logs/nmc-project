"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const queryChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );
  const querySubmitHandler = useCallback(() => {
    if (typeof query === "string" && query.length > 0)
      router.push(`/courses/search?q=${query}&`);
  }, [query]);
  return (
    <div className="relative">
      <input
        type="search"
        className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
        placeholder="Search..."
        onChange={queryChangeHandler}
        value={query}
        onKeyDown={(e) => {
          if (e.key === "Enter") querySubmitHandler();
        }}
      />
      <button
        className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors"
        onClick={querySubmitHandler}
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
            d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314Z"
          />
        </svg>
      </button>
    </div>
  );
}
