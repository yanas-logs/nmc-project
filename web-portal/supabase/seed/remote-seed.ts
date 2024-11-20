import { Client } from "pg";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";
import * as util from "util";
import * as stream from "stream";

dotenv.config();

const hostname = process.env.HOST;
const port = process.env.PORT as unknown as number;
const database = process.env.DATABASE_NAME;
const username = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

export default async function main() {
  let client: Client | undefined;
  let linesPerBatch = process.env.BATCH_SIZE
    ? Number.parseInt(process.env.BATCH_SIZE, 10)
    : 1000;
  try {
    client = new Client({
      host: hostname,
      port: port,
      database: database,
      user: username,
      password: password,
    });

    await client.connect();

    await client.query("BEGIN");
    console.log(`Batch Size ${linesPerBatch}`);
    console.log("Transaction started.");

    const fileStream = fs.createReadStream(path.join(__dirname, "./seed.sql"), {
      encoding: "utf8",
    });
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let linesBuffer = [];
    let batchIndex = 1;

    for await (const line of rl) {
      linesBuffer.push(line);

      if (linesBuffer.length === linesPerBatch) {
        console.log(`Processed Batch: ${++batchIndex}`);
        try {
          await client?.query(linesBuffer.join("\n"));
        } catch (err) {
          console.error("Error executing query batch:", linesBuffer, err);
          await client?.query("ROLLBACK");
          console.log("Transaction rolled back due to an error.");
          throw err;
        }
        linesBuffer = [];
      }
    }

    if (linesBuffer.length > 0) {
      console.log(`Processed Batch: ${++batchIndex}`);
      try {
        await client?.query(linesBuffer.join("\n"));
      } catch (err) {
        console.error("Error executing query batch:", linesBuffer, err);
        await client?.query("ROLLBACK");
        console.log("Transaction rolled back due to an error.");
        throw err;
      }
    }
    // const pipeline = util.promisify(stream.pipeline);

    // let sql = "";
    // let buffer = "";

    // await pipeline(fileStream, async function* (source) {
    //   for await (const chunk of source) {
    //     buffer += chunk;
    //     let splitIndex;

    //     while ((splitIndex = buffer.indexOf(");")) >= 0) {
    //       sql = buffer.slice(0, splitIndex + 1);
    //       buffer = buffer.slice(splitIndex + 1);

    //       try {
    //         await client?.query(sql);
    //       } catch (err) {
    //         console.error("Error executing query:", sql, err);
    //         await client?.query("ROLLBACK");
    //         console.log("Transaction rolled back due to an error.");
    //         throw err;
    //       }
    //     }
    //   }

    //   if (buffer.trim() !== "") {
    //     try {
    //       await client?.query(buffer);
    //     } catch (err) {
    //       console.error("Error executing query:", buffer, err);
    //       await client?.query("ROLLBACK");
    //       console.log("Transaction rolled back due to an error.");
    //       throw err;
    //     }
    //   }
    // });
    await client.query("COMMIT");
    console.log("Transaction committed successfully.");
  } catch (err) {
    console.error("Error during data import:", err);
  } finally {
    await client?.query("rollback;");
    await client?.end();
    console.log("Disconnected from the remote database.");
  }
}

main().then(() => {
  console.log("Data import completed successfully.");
});
