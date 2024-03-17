import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export const vpc = (scope: Construct) => {
  const defaultVpc = ec2.Vpc.fromLookup(scope, "DefaultVpc", {
    isDefault: true, // Lookup the default VPC
  });
  return defaultVpc;
};
