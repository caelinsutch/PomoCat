/* eslint-disable import/no-mutable-exports */
import { Db, MongoClient } from "mongodb";

let client: MongoClient;
let database: Db;

const dbName = "pomocat-production";

const url = `mongodb://localhost/${dbName}`;

export const connect = async (): Promise<Db> => {
  if (!database) {
    console.info(`Connecting to database ${url}`);
    client = await MongoClient.connect(url, {
      maxIdleTimeMS: 1200000,
    });
    database = client.db(dbName);
  }

  return database;
};

export { client, database };
export * from "./types";
