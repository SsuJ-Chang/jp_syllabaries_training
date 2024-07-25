from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_USERNAME = os.getenv("MONGO_USERNAME")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
MONGO_CLUSTER = os.getenv("MONGO_CLUSTER")

client_uri = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@{MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(client_uri)
db = client.jp_syllabaries

def get_kana_collection():
    return db.kana_mappings
