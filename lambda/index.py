import json
import boto3

sns = boto3.client("sns")

TOPIC_ARN = "arn:aws:sns:ap-south-1:751955865143:serverless-contact-form-notifications"


def lambda_handler(event, context):
    try:
        if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "content-type"
                },
                "body": ""
            }

        body = json.loads(event.get("body", "{}"))

        name = body.get("name")
        email = body.get("email")
        message = body.get("message")

        if not name or not email or not message:
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "message": "Name, email, and message are required."
                })
            }

        print("Contact form submission:")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Message: {message}")

        sns.publish(
            TopicArn=TOPIC_ARN,
            Subject="New Contact Form Submission",
            Message=(
                f"New contact form submission\n\n"
                f"Name: {name}\n"
                f"Email: {email}\n"
                f"Message:\n{message}"
            )
        )

        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Message received successfully!"
            })
        }

    except Exception as error:
        print(f"Error: {error}")

        return {
            "statusCode": 500,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "message": "Internal server error."
            })
        }
