import { NestFactory } from "@nestjs/core";
import { execSync } from "child_process";
import { AppModule } from "./app/app.module";

export const handler = async (event: any, context: any) => {
  try {
    // console.log(__dirname);
    execSync("npm i -g typeorm");
    execSync(
      "npm run typeorm -- -d typeorm/typeorm.ts migration:generate tmp/migration --loglevel=verbose",
    );
    // console.log("migration:generate executed successfully");

    // Create NestJS application instance
    const app = await NestFactory.createApplicationContext(AppModule);

    try {
      // // Get TypeORM connection
      // const connection = app.get("TypeOrmModuleOptions").connection;
      // console.log(app);
      // // Run TypeORM migration command
      // await connection.runMigrations();
      // console.log("TypeORM migrations executed successfully");
    } finally {
      // Close NestJS application
      await app.close();
    }
  } catch (error) {
    console.error("Error executing TypeORM migrations:", error);
    throw error;
  }
};
