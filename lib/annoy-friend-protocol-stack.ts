import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AnnoyFriendProtocolStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AnnoyFriendProtocolQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const annoyFriendProtocolFunction = new lambda.Function(this, 'AnnoyFriendProtocolFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda/annoy'),
    });

    new apigateway.LambdaRestApi(this, 'AnnoyLambdaEndPoint', {
      handler: annoyFriendProtocolFunction,
    });
  }
}
