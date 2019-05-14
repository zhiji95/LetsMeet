import json
from pprint import pprint
from botocore.vendored import requests


def lambda_handler(event, context):
    
    OPEN_WEATHER_API_KEY = '9d7da966edcb449ed7e146e07f98d4d2'
    
    r = requests.get(
        'http://api.openweathermap.org/data/2.5/weather?q=London&APPID={}'\
        .format(OPEN_WEATHER_API_KEY))
    pprint(r.json())

    return {
        'statusCode': 200,
        'body': json.dumps(r.json())
    }
