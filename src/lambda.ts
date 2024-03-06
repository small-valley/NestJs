import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { proxy } from "aws-serverless-express";
import express from "express";
import { Server, createServer } from "http";
import { AppModule } from "./app/app.module";

/*
  aws serverless configuration
*/
let cachedServer: Server;

const bootstrapServer = async () => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  await app.init();
  return createServer(expressApp);
};

export const api = async (event, context) => {
  // use cached Nestjs server if exists or create one
  // when lambdas are hot, they have tendency to cache runtime variables,
  // so in this case, if we hit one of hot instance, there will be one Nestjs server already bootstrapped
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return proxy(cachedServer, event, context, "PROMISE").promise;
};
