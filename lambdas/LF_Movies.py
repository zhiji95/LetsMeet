import json
from pprint import pprint
from botocore.vendored import requests


def lambda_handler(event, context):
    
    API_KEY = '7301b7dd59e658fac9d1fc977d8fe766'

    r = requests.get(
        #'https://api.themoviedb.org/3/movie/popular?api_key={}&language=en-US&page=1'\
        'https://api.themoviedb.org/3/trending/movie/day?api_key={}'.format(API_KEY))
    pprint(r.json())


    return {
        'statusCode': 200,
        'body': r.json()
    }
