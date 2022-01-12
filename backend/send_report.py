import boto3
import os
import base64
import re

dynamodb_client = boto3.client('dynamodb')

def handler(event, context):
    
    encodedStr = event['body']

    b64decodeUTF8Str = base64.b64decode(encodedStr).decode('utf-8')

    b64decodeUTF8StrStripped = b64decodeUTF8Str.replace("\n", "")
    b64decodeUTF8StrStripped = b64decodeUTF8StrStripped.replace("\r","")

    matches = re.findall(r'name=\".*?\"(.*?)-', b64decodeUTF8StrStripped)

    email = matches[0]
    issue = matches[1]

    try:
        dynamodb_client.put_item (TableName=os.environ['DYNAMODB_TABLE'], Item={'reporterEmail': {'S': email}, 'reporterIssue': {'S': issue}})

        response = {
            "statusCode": 200,
            "headers": {'Access-Control-Allow-Origin': '*'}
        }

    except:
        response = {
            "statusCode": 500,
            "headers": {'Access-Control-Allow-Origin': '*'}
            }

    return response