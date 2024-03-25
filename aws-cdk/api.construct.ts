import * as cdk from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Code, Function, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { resolve } from "path";
import { db } from "./db.instance";
import { vpc } from "./vpc.instance";

export class ApiConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    // Get a default VPC
    const vpcInstance = vpc(this);

    // Create an RDS instance
    const dbInstance = db(this, vpcInstance);

    // pack all external deps in layer
    const lambdaLayer1 = new LayerVersion(this, "HandlerLayer1", {
      code: Code.fromAsset(
        resolve(__dirname, "../aws-cdk/dependencies/layer1/node_modules"),
      ),
      compatibleRuntimes: [Runtime.NODEJS_20_X],
      description: "Api Handler Dependencies 1",
    });

    // add handler to respond to all our api requests
    const handler = new Function(this, "Handler", {
      code: Code.fromAsset(resolve(__dirname, "../dist"), {
        exclude: ["node_modules"],
      }),
      vpc: vpcInstance,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      allowPublicSubnet: true,
      handler: "lambda.handler",
      runtime: Runtime.NODEJS_20_X,
      layers: [lambdaLayer1],
      environment: {
        NODE_PATH: "$NODE_PATH:/opt",
        DB_TYPE: "postgres",
        POSTGRE_DATABASE_HOST: dbInstance.dbInstanceEndpointAddress,
        POSTGRE_DATABASE_PORT: dbInstance.dbInstanceEndpointPort,
        POSTGRE_DATABASE_USER_NAME:
          process.env.POSTGRE_DATABASE_USER_NAME || "",
        POSTGRE_DATABASE_PASSWORD: process.env.POSTGRE_DATABASE_PASSWORD || "",
        POSTGRE_DATABASE_NAME: process.env.POSTGRE_DATABASE_NAME || "",
      },
      timeout: cdk.Duration.seconds(10),
      memorySize: 128,
    });

    // Update RDS security group to allow inbound traffic from Lambda
    dbInstance.connections.allowFrom(
      handler,
      ec2.Port.tcp(5432),
      "Allow inbound from Lambda",
    );

    // add api resource to handle all http traffic and pass it to our handler
    const api = new RestApi(this, "Api", {
      deploy: true,
      defaultMethodOptions: {
        apiKeyRequired: false,
      },
    });

    // // add api key to enable monitoring
    // const apiKey = api.addApiKey("ApiKey");
    // const usagePlan = api.addUsagePlan("UsagePlan", {
    //   apiKey,
    //   name: "Standard",
    // });

    // usagePlan.addApiStage({
    //   stage: api.deploymentStage,
    // });

    // Define resources and methods for the API Gateway
    const days = api.root.addResource("days");
    days.addMethod("GET", new LambdaIntegration(handler));
  }
}
