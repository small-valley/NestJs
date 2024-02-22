import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: "../../.env" });

const config = {
  type: "postgres",
  host: process.env.POSTGRE_DATABASE_HOST,
  port: process.env.POSTGRE_DATABASE_PORT,
  username: process.env.POSTGRE_DATABASE_USER_NAME,
  password: process.env.POSTGRE_DATABASE_PASSWORD,
  database: process.env.POSTGRE_DATABASE_NAME,
  entities: ["src/typeorm/entities/*.entity{.ts,.js}"],
  migrations: ["src/typeorm/migrations/*{.ts,.js}"],
  autoLoadEntities: true,
  synchronize: false,
  cli: {
    entitiesDir: "src/typeorm/entities/",
    migrationsDir: "src/typeorm/migrations/",
  },
};

export default registerAs("typeorm", () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
