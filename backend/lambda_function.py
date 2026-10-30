
import json
import os
import boto3

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["TABLE_NAME"])

def lambda_handler(event, context):
    try:
        response = table.update_item(
            Key={"counterId": "resume"},
            UpdateExpression="ADD visitCount :increment",
            ExpressionAttributeValues={
                ":increment": 1
            },
            ReturnValues="UPDATED_NEW"
        )

        count = int(response["Attributes"]["visitCount"])

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps({
                "visitCount": count
            })
        }

    except Exception as error:
        print(f"Error updating visitor count: {error}")

        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": json.dumps({
                "message": "Unable to update visitor count"
            })
        }
