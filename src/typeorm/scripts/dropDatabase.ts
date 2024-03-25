import { config } from "dotenv";
import { Client } from "pg";

config({ path: "../../../.env" });

const DB_NAME: string = process.env.POSTGRE_DATABASE_NAME || "test";
const DB_USER: string = process.env.POSTGRE_DATABASE_USER_NAME || "";
const DB_HOST: string = process.env.POSTGRE_DATABASE_HOST || "localhost";
const DB_PASSWORD: string = process.env.POSTGRE_DATABASE_PASSWORD || "";
const DB_PORT: number = parseInt(process.env.POSTGRE_DATABASE_PORT) || 5432;

async function dropDatabase() {
  const client = new Client({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    name: "postgres", // explicitly pass a default database name of postgre
  });

  await client.connect();

  const res = await client.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`
  );

  if (res.rowCount === 0) {
    console.log(`${DB_NAME} database not found, skip drop.`);
  } else {
    await client.query(`DROP DATABASE "${DB_NAME}";`);
    console.log(`drop database ${DB_NAME}.`);
  }

  await client.end();
}

dropDatabase();
