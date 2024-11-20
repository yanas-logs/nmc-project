"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = [
    {
      label: "All Courses",
      url: "/my-courses/learning",
    },
    {
      label: "My List",
      url: "/my-courses/lists",
    },
    {
      label: "Whishlist",
      url: "/my-courses/whishlist",
    },
  ];

  const pathname = usePathname();

  return (
    <div>
      <div className="bg-black">
        <MaxWidthWrapper>
          <div className="text-white">
            <h1 className="text-3xl font-bold pt-7 pb-5">My Learning</h1>
            <div className="flex gap-2">
              {tabs.map((t) => (
                <Link
                  href={t.url}
                  key={t.url}
                  className={cn(
                    "relative p-2",
                    pathname === t.url
                      ? "before:absolute before:h-1 before:w-full before:bg-white before:left-0 before:bottom-0"
                      : ""
                  )}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </div>
  );
}
