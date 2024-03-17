import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

export const db = (scope: Construct, vpc: ec2.IVpc) => {
  // Get subnets from the VPC
  const subnets = vpc.selectSubnets().subnetIds.map((subnetId) => {
    return ec2.Subnet.fromSubnetId(scope, subnetId, subnetId);
  });

  // Create a subnet group with subnets
  const subnetGroup = new rds.SubnetGroup(scope, "DatabaseSubnetGroup", {
    vpc,
    vpcSubnets: { subnets: subnets },
    description: "Database subnet group",
  });

  // Create an RDS instance
  const dbInstance = new rds.DatabaseInstance(scope, "database-1", {
    engine: rds.DatabaseInstanceEngine.postgres({
      version: rds.PostgresEngineVersion.VER_16_1,
    }),
    vpc: vpc,
    instanceType: ec2.InstanceType.of(
      ec2.InstanceClass.T3,
      ec2.InstanceSize.MICRO,
    ),
    allocatedStorage: 20,
    subnetGroup: subnetGroup,
    parameters: {
      "rds.force_ssl": "0",
    },
    credentials: {
      username: "",
      password: cdk.SecretValue.unsafePlainText(""),
    },
  });

  return dbInstance;
};
