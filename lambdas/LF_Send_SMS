import json
import boto3

def format_mobile(value):
    value = value.replace(" ", '')
    value = value.replace("-", '')
    value = value.replace("(", '')
    value = value.replace(")", '')
    value = value.replace("+1", '')
    return value

def lambda_handler(event, context):
    # ---------------sent sns---------------
    sns = boto3.client('sns', region_name='us-east-1')
    phoneNumber = str(event['phoneNumber'])
    phoneNumber = format_mobile(phoneNumber)
    
    print('phone number = ', phoneNumber)
    
    number = '+1' + phoneNumber[-10:]

    print('number = ', number)

    sns_message = "Hello, this is a reminder that you have a meeting coming up today."
    
    
    response = sns.publish(PhoneNumber = number, Message=sns_message)
    return {
        "statusCode": 200,
        "headers": {
          "X-Requested-With": '*',
          "Access-Control-Allow-Headers": 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Methods": 'POST, OPTIONS'
        },
        "body": json.dumps(response)
    }
    
