import { createClient } from "@/utils/supabase/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

export default async function CourseContent({
  courseId,
  className = "",
}: {
  courseId: string;
  className?: string;
}) {
  const supabase = createClient();

  const { data: sections, error } = await supabase
    .from("course_sections")
    .select(
      `id, title, order_index, course_section_contents( id, title, order_index, type )`
    )
    .eq("course_id", courseId);

  if (error) throw error;

  const sectionCount = sections.length;
  const lecturesCount = sections.reduce((prev, curr) => {
    let lc = curr.course_section_contents.reduce((p, c) => {
      if (["VIDEO", "DOCUMENT"].includes(c.type)) return p + 1;
      return p;
    }, 0);

    return prev + lc;
  }, 0);

  return (
    <div className={className}>
      <h1 className="text-2xl font-semibold my-3">Course Content</h1>
      <div className="mb-3">
        <p className="flex items-center gap-2 text-sm from-grey-500">
          {sectionCount} Sections
          <span className="inline-block w-1 h-1 rounded-full bg-black"></span>{" "}
          {lecturesCount} lectures
        </p>
      </div>
      <Accordion type="multiple" className="w-full border">
        {sections.map((s) => (
          <AccordionItem value={s.id.toString()} key={s.id} className="">
            <AccordionTrigger className=" px-3">{s.title}</AccordionTrigger>
            <AccordionContent className="px-3 border-t">
              <ul>
                {s.course_section_contents.map((csc) => (
                  <li key={csc.id}>{csc.title}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
