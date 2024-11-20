import { faker } from "@faker-js/faker";
import { UniqueEnforcer } from "enforce-unique";

// import * as fs from "fs";
// import * as path from "path";

import { getRandomIntInclusive } from "../utils";
import { TOPICS_COUNT } from "../config";

const uniqueEnforcerEmail = new UniqueEnforcer();

export default function generateTopics(sub_categories: number[]) {
  const topicsSql = [];
  const topicsObj: {
    map_category_topics: { [index: number]: Set<number> | number[] };
    map_topic_categories: { [index: number]: Set<number> | number[] };
  } = { map_category_topics: {}, map_topic_categories: {} };

  for (let idx = 1; idx < TOPICS_COUNT; idx++) {
    const topic = uniqueEnforcerEmail.enforce(faker.word.noun, {
      maxTime: 50,
      maxRetries: 50,
    });
    topicsSql.push(
      `insert into public.topics (id, name) values (${idx}, '${topic.replace(
        "'",
        " "
      )}');`
    );
    topicsObj.map_topic_categories[idx] = new Set();
  }

  for (let idx = 1; idx < 4000; idx++) {
    let topic_id = getRandomIntInclusive(1, TOPICS_COUNT - 1);
    let sub_category_id =
      sub_categories[getRandomIntInclusive(1, sub_categories.length - 1)];
    if (topicsObj.map_category_topics[sub_category_id]) {
      (topicsObj.map_category_topics[sub_category_id] as Set<number>).add(
        topic_id
      );
    } else {
      topicsObj.map_category_topics[sub_category_id] = new Set();
      (topicsObj.map_category_topics[sub_category_id] as Set<number>).add(
        topic_id
      );
    }
    (topicsObj.map_topic_categories[topic_id] as Set<number>).add(
      sub_category_id
    );
  }

  Object.keys(topicsObj.map_category_topics).forEach(
    (key) =>
      (topicsObj.map_category_topics[key as unknown as number] = Array.from(
        topicsObj.map_category_topics[key as unknown as number]
      ))
  );

  Object.keys(topicsObj.map_topic_categories).forEach(
    (key) =>
      (topicsObj.map_topic_categories[key as unknown as number] = Array.from(
        topicsObj.map_topic_categories[key as unknown as number]
      ))
  );

  // fs.appendFileSync(path.join("./supabase", "seed.sql"), topics.join("\n"));
  // console.log("Array of strings has been written to", "seed.sql");

  // fs.writeFileSync(
  //   path.join("./supabase/dummy_data/topics", "topics.json"),
  //   JSON.stringify(topicsObj)
  // );
  // console.log("Array of strings has been written to", "topics.json");

  return { obj: topicsObj, sql: topicsSql.join("\n") };
}

if (require.main === module) {
  generateTopics([]);
}
