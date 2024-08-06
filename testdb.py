from db import get_visit_records_collection

collection = get_visit_records_collection()
print(collection)
record = collection.find_one({}, {"hiragana_youon": 1, "_id": 0})

#update_result = collection.find_one_and_update({}, {"$inc": {"home": 1}}, upsert=True)

print(record["hiragana_youon"])
#print(update_result["home"])