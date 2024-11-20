import { faker } from "@faker-js/faker";
import * as path from "path";
import * as fs from "fs";

import {
  escapeString,
  generateRandomRating,
  getRandomIntInclusive,
} from "../utils";
import { COURSES_COUNT } from "../config";

const markdownDescription = `**Welcome to the Marvelous World of Adventure and Wonder!**

In this mesmerizing universe of infinite possibilities, prepare to embark on an extraordinary journey that will captivate your imagination and thrill your senses. The Marvelous World of Adventure and Wonder is a place where dreams come to life, where heroes rise, and villains fall. Immerse yourself in the magical tapestry of narratives, where each tale is more enthralling than the last.

**Unravel the Epic Tales**

Discover an extensive collection of epic tales that span across galaxies, dimensions, and timelines. From the courageous exploits of legendary superheroes to the cunning machinations of sinister supervillains, our diverse range of stories will leave you at the edge of your seat, craving for more. Whether you are a die-hard fan or new to the universe of Marvelous Adventure and Wonder, there s something for everyone.

- Experience the valor of iconic heroes like **Captain Marvel**, **Spider-Man**, and **Black Panther**.
- Embrace the complexity of morally ambiguous anti-heroes like **Deadpool** and **Venom**.

**Enchanting Settings**

Venture into extraordinary worlds that defy reality and imagination. From the bustling streets of New York City to the mystical realms of Asgard and Wakanda, each setting is meticulously crafted, transporting you into a fantastical experience like no other. Get ready to be **awestruck** by the jaw-dropping scenery and **awe-inspiring landscapes**.

**Mind-bending Plots**

Prepare for mind-bending plots that will challenge your perceptions of right and wrong. As the lines between good and evil blur, our tales take you on an emotional rollercoaster of triumphs, betrayals, and unexpected alliances. Brace yourself for **twists** that will leave you questioning everything you thought you knew.

**Immersive Artwork**

Complementing the enthralling narratives, immerse yourself in the mesmerizing artwork that adorns these pages. Our team of talented artists brings the characters and worlds to life, giving you a visual treat that enhances your reading experience. Lose yourself in the **intricate details** and **vibrant colors** that breathe life into each panel.

**A Community of Enthusiasts**

The Marvelous World of Adventure and Wonder is not just a collection of stories; it s a vibrant community of enthusiasts. Engage in lively discussions, share fan theories, and connect with fellow readers who share your passion for all things marvelous. Be part of a community that celebrates **creativity** and **imagination**.

**Your Journey Begins Here**

So, dear reader, fasten your seatbelt and get ready for the most thrilling ride of your life. The Marvelous World of Adventure and Wonder awaits your exploration. Whether you seek action, intrigue, romance, or heartwarming moments, our universe has it all.

Remember, within these pages, anything is possible. Heroes will rise, villains will fall, and new legends will be born. Your adventure starts now! **Welcome to the Marvelous World of Adventure and Wonder!**`;

interface Course {
  id: number;
  image: string;
  title: string;
  short_description: string;
  category: number;
  sub_category: number;
  level: string;
  is_paid: string;
  price: number;
  meta_data: object;
  language: string;
  instructors: string[];
  enrollment: string[];
  reviewers: string[];
}

let c_index = 1;

function createRandomCourse(
  categories: {
    id: number;
    name: string;
    sub_categories: number[];
  }[],
  users: {
    user_id: string;
    account_type: string;
  }[],
  creators: string[]
): Course {
  const randomCategoryIndex = getRandomIntInclusive(0, categories.length - 1);
  const randomSubCategoryIndex = getRandomIntInclusive(
    0,
    categories[randomCategoryIndex].sub_categories.length - 1
  );
  const instructors = faker.helpers.multiple(
    () => creators[getRandomIntInclusive(0, creators.length - 1)],
    { count: getRandomIntInclusive(1, 3) }
  );
  let is_paid = faker.helpers.arrayElement(["PAID", "FREE"]);

  let meta_data = {
    long_description: markdownDescription,
    requirements: faker.helpers.multiple(() => faker.lorem.paragraph(), {
      count: { min: 5, max: 8 },
    }),
    whos_course: faker.helpers.multiple(() => faker.lorem.paragraph(), {
      count: { min: 5, max: 8 },
    }),
    course_promises: faker.helpers.multiple(() => faker.lorem.paragraph(), {
      count: { min: 20, max: 30 },
    }),
  };
  return {
    id: c_index++,
    image: faker.image.urlPicsumPhotos({ width: 1920, height: 1080 }),
    title: faker.word.words({ count: { max: 10, min: 5 } }).replace("'", " "),
    short_description: faker.lorem.paragraph().replace("'", " "),
    category: categories[randomCategoryIndex].id,
    sub_category:
      categories[randomCategoryIndex].sub_categories[randomSubCategoryIndex],
    level: faker.helpers.arrayElement([
      "ALL_LEVELS",
      "BEGINNER",
      "INTERMEDIATE",
      "EXPERT",
    ]),
    is_paid: is_paid,
    price: is_paid === "PAID" ? getRandomIntInclusive(20, 100) : 0,
    meta_data: meta_data,
    language: faker.helpers.arrayElement([
      "English",
      "Hindi",
      "Sanskrit",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Japanese",
      "Chinese",
      "Russian",
      "Other",
    ]),
    instructors: instructors.filter((i, idx) => instructors.indexOf(i) === idx),
    enrollment: faker.helpers.arrayElements(
      users.map((u) => u.user_id),
      { min: 50, max: 200 }
    ),
    reviewers: faker.helpers.arrayElements(
      users.map((u) => u.user_id),
      { min: 10, max: 20 }
    ),
  };
}

export default function generateCourses(
  categories: {
    id: number;
    name: string;
    sub_categories: number[];
  }[],
  users: {
    user_id: string;
    account_type: string;
  }[],
  creators: string[],
  tagsIds: number[],
  topics: { [index: number]: Set<number> | number[] }
) {
  const coursesArr = [];
  const coursesSql = [];
  let courseTags = new Set();

  for (let index = 0; index < COURSES_COUNT; index++) {
    const course = createRandomCourse(categories, users, creators);
    coursesArr.push(course);
    coursesSql.push(
      `insert into courses (id, image, title, short_description, category, sub_category, level, is_paid, language, meta_data) values (${
        course.id
      },'${course.image}', '${course.title}','${course.short_description}','${
        course.category
      }','${course.sub_category}', '${course.level}', '${course.is_paid}','${
        course.language
      }','${escapeString(JSON.stringify(course.meta_data))}');`
    );

    if (course.is_paid) {
      coursesSql.push(
        `insert into public.prices (course_id, amount) values (${course.id}, ${course.price});`
      );
    }
    course.enrollment.forEach((u) => {
      coursesSql.push(
        `insert into public.enrollments (course_id, user_id) values (${course.id}, '${u}');`
      );
    });

    course.instructors.forEach((i) => {
      coursesSql.push(
        `insert into public.course_instructors (user_id, course_id) values ('${i}', ${course.id});`
      );
    });
    if (topics[course.sub_category]) {
      faker.helpers
        .arrayElements(topics[course.sub_category] as number[])
        .forEach((t) =>
          coursesSql.push(
            `insert into public.course_topics (topic_id, course_id) values (${t}, ${course.id});`
          )
        );
    }

    for (let i = 0; i < course.reviewers.length; i++) {
      coursesSql.push(
        `insert into public.course_reviews (rating, user_id, course_id, body) values (${generateRandomRating().toPrecision(
          2
        )}, '${course.reviewers[i]}', ${
          course.id
        }, '${faker.lorem.paragraph()}');`
      );
    }
  }

  for (let idx = 0; idx < 500; idx++) {
    courseTags.add(
      `insert into public.course_tags (tag_id, course_id) values (${
        tagsIds[getRandomIntInclusive(0, tagsIds.length - 1)]
      }, ${getRandomIntInclusive(1, COURSES_COUNT - 1)});`
    );
  }

  // fs.appendFileSync(
  //   path.join("./supabase", "seed.sql"),
  //   courses.join("\n").concat("\n", Array.from(courseTags).join("\n"))
  // );

  return {
    list: coursesArr,
    sql: coursesSql.join("\n").concat("\n", Array.from(courseTags).join("\n")),
  };
}

if (require.main === module) {
  // generateCourses();
}
