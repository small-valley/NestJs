import serverlessExpress from "@codegenie/serverless-express";
import { NestFactory } from "@nestjs/core";
import { Callback, Context, Handler } from "aws-lambda";
import { config } from "dotenv";
import "reflect-metadata";
import { AppModule } from "./app/app.module";

/*
  serverless configuration
*/
let server: Handler;

async function bootstrapServerless(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrapServerless());
  return server(event, context, callback);
};

/*
  nest js Rest configuration
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

config({ path: "../.env" });
if (process.env.IS_SERVERLESS === "false") {
  bootstrap();
}
