import sys
import json
from pymongo import MongoClient
input = sys.stdin.readline

url = input().strip()
client = MongoClient(url)
db = client['hLive']
collections = db.list_collection_names()

##############################
# service records collection #
##############################
# first top 100 records WHERE country = Italy

s_collection = db['servicerequests']
s_query = {
    'country': 'IT',
    'bookingDate': {
        '$ne': '',
    },
    'bookingTime': {
        '$ne': '',
        '$ne': '00:00',
    },
    'endTime': {
        '$ne': '',
        '$ne': '00:00',
    },
    'dealership': {
        '$exists': True,
        '$ne': '',
    },
    'dealership.dealershipCode': {
        '$ne': ''
    },
}
s_projection = {
    '_id': 0,
    'bookingDate': 1,
    'bookingTime': 1,
    'endTime': 1,
    'dealership.dealershipCode': 1,
}
s_result = list(s_collection.find(s_query, s_projection))

with open('service.json', 'w') as s_outfile:
    json.dump(s_result, s_outfile, indent=4)

##############################
#  model records collection  #
##############################
# WHERE country = italy

m_collection = db['modellists']
m_query = {'country': 'IT'}
m_projection = {
    '_id': 0,
    'hppModels.modelId': 1,
    'hppModels.modelDescription': 1,
    'hppModels.image': 1,
    'hppModels.carType1Desc': 1,
}
m_result = list(m_collection.find(m_query, m_projection))
flattened_result = []
for document in m_result:
    if 'hppModels' in document:
        for model in document['hppModels']:
            flattened_result.append(model)

with open('model.json', 'w') as m_outfile:
    json.dump(flattened_result, m_outfile, indent=4)

client.close()