import MaxWidthWrapper from "@/components/max-width-wrapper";
import { createClient } from "@/utils/supabase/server";
import CourseCard from "./course-card";
import CreateNewCourse from "./create-new-course";
import FilterMenu from "./filter";

function getSortByFilter(s: string = "newest") {
  switch (s) {
    case "oldest":
      return {
        column: "created_at",
        ascending: true,
      };
    case "atoz":
      return {
        column: "title",
        ascending: true,
      };
    case "ztoa":
      return {
        column: "title",
        ascending: false,
      };
    case "publishedFirst":
      return {
        column: "case status when 'PUBLISHED' then 1 else 2 end",
        ascending: true,
      };
    case "unpublishedFirst":
      return {
        column: "case status when 'DRAFT' then 1 else 2 end",
        ascending: true,
      };
    default:
      return {
        column: "created_at",
        ascending: false,
      };
  }
}

interface PropeTypes {
  searchParams: {
    query?: string;
    sort?: string;
  };
}

export default async function UserCourses({ searchParams }: PropeTypes) {
  const { query, sort } = searchParams;

  const supabase = createClient();
  const { data: session, error: sessionError } = await supabase.auth.getUser();
  if (sessionError) throw sessionError;

  const { data: courses, error } = await supabase.rpc("get_user_courses", {
    query: query || null,
    sort: sort || null,
    u_id: session.user.id,
    page_size: 20,
  });

  if (error) throw error;

  return (
    <div className="py-16">
      <MaxWidthWrapper>
        <h1 className="text-2xl mb-3">Courses</h1>
        <div className="flex items-center justify-between mb-5">
          <FilterMenu query={query} sortBy={sort} />
          <CreateNewCourse session={session.user} />
        </div>
        <div className="bg-gray-100 p-3 rounded min-h-[400px]">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
