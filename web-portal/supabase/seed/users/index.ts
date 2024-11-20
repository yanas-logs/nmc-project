import { faker } from "@faker-js/faker";
import { UniqueEnforcer } from "enforce-unique";
import * as fs from "fs";
import * as path from "path";
import { USERS_COUNT } from "../config";

type AccountType = "default" | "creater";

const uniqueEnforcerEmail = new UniqueEnforcer();

interface User {
  uuid: string;
  avatar: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  account_type: AccountType;
}

function createRandomUsers(): User {
  const firstName = faker.person.firstName().replace("'", " ");
  const lastName = faker.person.lastName().replace("'", " ");
  const username = faker.internet.userName({ firstName, lastName });
  const email = uniqueEnforcerEmail.enforce(
    () =>
      faker.internet.email({
        firstName,
        lastName,
      }),
    {
      maxTime: 50,
      maxRetries: 50,
    }
  );

  return {
    uuid: faker.string.uuid(),
    avatar: faker.image.avatar(),
    email,
    username,
    firstName,
    lastName,
    password: "uswag007",
    account_type: faker.helpers.arrayElement(["default", "creater"]),
  };
}

export default function generateUsers() {
  const usersSql = [];
  const usersObj: {
    users: { user_id: string; account_type: string }[];
    creators: string[];
  } = { users: [], creators: [] };

  for (let index = 0; index < USERS_COUNT; index++) {
    const user = createRandomUsers();
    usersSql.push(
      `select public.create_user('${user.uuid}', '${user.username}', '${user.email}', '${user.password}', '${user.avatar}', '${user.firstName}', '${user.lastName}', '${user.account_type}');`
    );
    usersObj.users.push({
      user_id: user.uuid,
      account_type: user.account_type,
    });
    if (user.account_type === "creater") {
      usersObj.creators.push(user.uuid);
    }
  }

  // fs.writeFileSync(path.join("./supabase", "seed.sql"), usersSql.join("\n"));
  // console.log("Array of strings has been written to", "seed.sql");

  // fs.writeFileSync(
  //   path.join("./supabase/dummy_data/users", "users.json"),
  //   JSON.stringify(jsonO)
  // );
  // console.log("Array of strings has been written to", "users.json");

  return {
    obj: usersObj,
    sql: usersSql.join("\n"),
  };
}

if (require.main === module) {
  generateUsers();
}
