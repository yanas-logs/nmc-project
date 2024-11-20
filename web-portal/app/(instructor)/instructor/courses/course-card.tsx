import { Button } from "@/components/ui/button";
import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.jpg";

interface PropeTypes {
  course: {
    id: number;
    image: string | null;
    title: string;
    status: "DRAFT" | "PUBLISHED";
  };
}

export default function CourseCard({ course }: PropeTypes) {
  return (
    <div className="m-2 border bg-white rounded flex gap-5">
      <div className="relative h-28 w-52 overflow-hidden rounded-l border-r">
        {course.image ? (
          <Image
            fill
            className="object-cover"
            src={course.image}
            alt={course.title}
          />
        ) : (
          <Image
            fill
            className="object-contain"
            src={placeholderImage}
            alt={course.title}
          />
        )}
      </div>
      <div className="relative flex-1 flex flex-col justify-between py-2 group">
        <h1 className="text-lg font-medium">{course.title}</h1>
        <p className="text-gray-500 font-medium text-sm">{course.status}</p>
        <div className="hidden group-hover:flex absolute w-full h-full right-0 top-0 items-center justify-center bg-[rgba(255,255,255,0.5)]">
          <Button variant="secondary">Edit/Manage Course</Button>
        </div>
      </div>
    </div>
  );
}
