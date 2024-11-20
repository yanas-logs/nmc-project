import * as fs from "fs";
import * as path from "path";
import { faker } from "@faker-js/faker";
import { escapeString, getRandomIntInclusive } from "../utils";

let c_section_index = 1;
let c_section_content_index = 1;

function createRandomCourseContent({ course }: { course: { id: number } }) {
  return Array.from({ length: getRandomIntInclusive(7, 20) }).map((_, idx) => {
    const sectionContentCount = getRandomIntInclusive(7, 20);
    const sectionContents = [];
    for (let i = 1; i <= sectionContentCount; i++) {
      sectionContents.push({
        id: c_section_content_index++,
        section_id: c_section_index,
        order_index: i,
        title: escapeString(faker.word.words({ count: { max: 10, min: 5 } })),
        type: faker.helpers.arrayElement(["VIDEO", "DOCUMENT"]),
        url: faker.image.avatar(),
      });
    }
    return {
      id: c_section_index++,
      course_id: course.id,
      title: escapeString(faker.word.words({ count: { max: 10, min: 5 } })),
      order_index: idx + 1,
      section_contents: sectionContents,
    };
  });
}

export default function generateCourseContent({
  courses,
}: {
  courses: { id: number }[];
}) {
  const coursesSectionsSql: string[] = [];

  courses.forEach((course) => {
    const courseSections = createRandomCourseContent({ course });
    courseSections.forEach((sec) => {
      coursesSectionsSql.push(
        `insert into course_sections (id, course_id, title, order_index) values (${sec.id}, ${sec.course_id}, '${sec.title}', ${sec.order_index});`
      );
      sec.section_contents.forEach((sc) => {
        coursesSectionsSql.push(
          `insert into course_section_contents (id, section_id, order_index, title, type, url) values (${sc.id}, ${sc.section_id}, ${sc.order_index}, '${sc.title}', '${sc.type}', '${sc.url}');`
        );
      });
    });
  });

  // fs.appendFileSync(
  //   path.join("./supabase", "seed.sql"),
  //   coursesSectionsSql.join("\n")
  // );
  // console.log("Array of strings has been written to", "seed.sql");

  return { sql: coursesSectionsSql.join("\n") };
}
