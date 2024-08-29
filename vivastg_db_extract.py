import sys
import json
from pymongo import MongoClient
input = sys.stdin.readline

url = input().strip()
client = MongoClient(url)
db = client['vivastg']
collections = db.list_collection_names()

#############################
# dealer records collection #
#############################
# get all dealershipCode for count

d_collection = db['dealers']
d_query = {
	'countryCode': 'IT',
}
d_projection = {
    '_id': 0,
    'dealershipCode': 1,
}
d_result = list(d_collection.find(d_query, d_projection))

with open('dealer.json', 'w') as d_outfile:
    json.dump(d_result, d_outfile, indent=4)

#################################
# dealership records collection #
#################################
# get all need attributes from dealership

ds_collection = db['dealerships']
ds_query = {
	'countryCode': 'IT',
}
ds_projection = {
    '_id': 0,
    'address': 1,
    'dealershipCode': 1,
    'email': 1,
    'name': 1,
    'position': 1,
    'telephone': 1,
    'website': 1,
}
ds_result = list(ds_collection.find(ds_query, ds_projection))

with open('dealership.json', 'w') as ds_outfile:
    json.dump(ds_result, ds_outfile, indent=4)

