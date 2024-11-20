import { createClient } from "@/utils/supabase/server";
import { CourseType } from "@/components/courses_list";
import RatingStar from "@/components/rating-star";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import CourseContent from "./course-content";
import WhatWillYouLearn from "./what-will-you-learn";
import PurchaseCard from "./purchase-card";

interface CoursePagePropeTypes {
  params: {
    courseId: string;
  };
}

export default async function CoursePage({ params }: CoursePagePropeTypes) {
  const supabase = createClient();

  const { data: course, error } = await supabase
    .from("courses_lg")
    .select(
      `id,
      image, 
      title, 
      short_description, 
      enrollments_count, 
      created_at, 
      avg_rating, 
      is_paid, 
      level, 
      amount, 
      meta_data, 
      language, 
      review_count, 
      tag,
      topic, 
      instructor, 
      category, 
      sub_category,
      prices (amount, currency)
      `
    )
    .eq("id", params.courseId)
    .limit(1)
    .single();

  if (error) throw error;
  if (course == null) throw new Error("Courses not found!");

  return (
    <main>
      <div className="p-3 bg-black">
        <MaxWidthWrapper>
          <div className="py-10 max-w-2xl relative">
            <Breadcrumb className="mb-6 text-lg">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="text-purple-500 hover:text-purple-600 text-lg"
                  >
                    {course.category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    className="text-purple-500 hover:text-purple-600 text-lg"
                  >
                    {course.sub_category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-4xl text-white font-bold max-w-2xl mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-white font-medium max-w-2xl mb-3">
              {course.short_description}
            </p>
            <div className="flex gap-3 mb-3">
              <div className="flex gap-1">
                <span className="text-lg font-bold text-orange-500">
                  {course.avg_rating}
                </span>
                <RatingStar rating={course.avg_rating || 0}> </RatingStar>
              </div>
              <span className="text-lg text-purple-400 underline">
                ({course.review_count} ratings)
              </span>
              <span className="text-lg text-white">
                {course.enrollments_count} students
              </span>
            </div>
            <div>
              <span className="text-white text-lg">Created By&nbsp;</span>
              {(course.instructor as any[])?.map((i) => (
                <a key={i.user_id} href="#" className="text-purple-500 text-lg">
                  {i.username},&nbsp;
                </a>
              ))}
            </div>
            <PurchaseCard thumbnailImage={course.image as string} />
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper>
        <WhatWillYouLearn
          className="my-3 max-w-2xl"
          promises={
            course.meta_data !== null &&
            typeof course.meta_data === "object" &&
            "course_promises" in course.meta_data
              ? (course.meta_data["course_promises"] as string[])
              : []
          }
        />
        <CourseContent courseId={params.courseId} className="max-w-2xl" />
      </MaxWidthWrapper>
    </main>
  );
}
