import * as cdk from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import { resolve } from "path";

export class ApiConstruct extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    // pack all external deps in layer
    const lambdaLayer1 = new LayerVersion(this, "HandlerLayer1", {
      code: Code.fromAsset(
        resolve(__dirname, "../aws-cdk/dependencies/layer1/node_modules"),
      ),
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      description: "Api Handler Dependencies 1",
    });

    // add handler to respond to all our api requests
    const handler = new Function(this, "Handler", {
      code: Code.fromAsset(resolve(__dirname, "../dist"), {
        exclude: ["node_modules"],
      }),
      handler: "lambda.api",
      runtime: Runtime.NODEJS_18_X,
      layers: [lambdaLayer1],
      environment: {
        NODE_PATH: "$NODE_PATH:/opt",
      },
    });

    // add api resource to handle all http traffic and pass it to our handler
    const api = new RestApi(this, "Api", {
      deploy: true,
      defaultMethodOptions: {
        apiKeyRequired: false,
      },
      deployOptions: {
        stageName: "v1",
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
    const resource = api.root.addResource("example");
    resource.addMethod("GET", new LambdaIntegration(handler));
  }
}
