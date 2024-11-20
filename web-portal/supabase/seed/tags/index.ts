import * as fs from "fs";
import * as path from "path";

const tagList = ["Latest", "Hot & New", "Highest Rated", "Bestseller", "New"];

export default function generateTags() {
  const tagsSql: string[] = [];
  const tagsObj: { tags: { [index: string]: number }; tagsIds: number[] } = {
    tags: {},
    tagsIds: [],
  };

  let id = 1;

  tagList.forEach((t) => {
    tagsSql.push(`insert into tags (id, name) values (${id}, '${t}');`);
    tagsObj.tagsIds.push(id);
    tagsObj.tags[t] = id++;
  });

  // fs.appendFileSync(path.join("./supabase", "seed.sql"), tags.join("\n"));
  // console.log("Array of strings has been written to", "seed.sql");

  // fs.writeFileSync(
  //   path.join("./supabase/dummy_data/tags", "tags.json"),
  //   JSON.stringify(tagsObj)
  // );
  // console.log("Array of strings has been written to", "tags.json");

  return { obj: tagsObj, sql: tagsSql.join("\n") };
}

if (require.main === module) {
  generateTags();
}
