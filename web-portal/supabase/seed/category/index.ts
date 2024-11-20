import * as fs from "fs";
import * as path from "path";

import { Categories } from "../fake-data.json";

export default function generateCategory() {
  const categoriesObj: {
    categories: { id: number; name: string; sub_categories: number[] }[];
    sub_categories: number[];
  } = { categories: [], sub_categories: [] };

  const categoriesSql: string[] = [];
  const subcategoriesSql: string[] = [];

  let category_id = 1;
  let sub_category_id = 1;

  Categories.forEach((c, cIdx) => {
    let t: { id: number; name: string; sub_categories: number[] } = {
      id: category_id,
      name: c.name,
      sub_categories: [],
    };
    categoriesSql.push(
      `insert into public.categories (id, name) values(${category_id}, '${c.name}');`
    );
    c.subCategories.forEach((sc, scIdx) => {
      subcategoriesSql.push(
        `insert into public.sub_categories (id, name, category_id) values(${sub_category_id}, '${sc.name}', ${category_id});`
      );
      t.sub_categories.push(sub_category_id++);
    });
    category_id++;

    categoriesObj.categories.push(t);
    categoriesObj.sub_categories = categoriesObj.sub_categories.concat(
      t.sub_categories
    );
  });

  // fs.appendFileSync(
  //   path.join("./supabase", "seed.sql"),
  //   categories.join("\n").concat("\n", sub_categories.join("\n"))
  // );
  // console.log("Array of strings has been written to", "seed.sql");

  // fs.writeFileSync(
  //   path.join("./supabase/dummy_data/category", "category.json"),
  //   JSON.stringify(categoriesObj)
  // );
  // console.log("Array of strings has been written to", "category.json");

  return {
    obj: categoriesObj,
    sql: categoriesSql.join("\n").concat("\n", subcategoriesSql.join("\n")),
  };
}

if (require.main === module) {
  generateCategory();
}
