import * as fs from "fs";

import generateCategory from "./category";
import generateUsers from "./users";
import generateCourses from "./courses";
import generateTopics from "./topics";
import generateTags from "./tags";
import generateCourseContent from "./course_content";

const { obj: usersObj, sql: usersSql } = generateUsers();
fs.writeFileSync("seed.sql", usersSql);
const { obj: tagsObj, sql: tagsSql } = generateTags();
fs.appendFileSync("seed.sql", tagsSql);
const { obj: categoriesObj, sql: categoriesSql } = generateCategory();
fs.appendFileSync("seed.sql", categoriesSql);
const { obj: topicsObj, sql: topicsSql } = generateTopics(
  categoriesObj.sub_categories
);
fs.appendFileSync("seed.sql", topicsSql);

const { list: coursesList, sql: coursesSql } = generateCourses(
  categoriesObj.categories,
  usersObj.users,
  usersObj.creators,
  tagsObj.tagsIds,
  topicsObj.map_category_topics
);
fs.appendFileSync("seed.sql", coursesSql);

const { sql: coursesSectionsSql } = generateCourseContent({
  courses: coursesList,
});
fs.appendFileSync("seed.sql", coursesSectionsSql);
console.log("Dummy data has been written to the ", "seed.sql");
