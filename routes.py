from fastapi import APIRouter, HTTPException
from models import Kana
from db import get_kana_collection, get_visit_records_collection
from pymongo import ReturnDocument
from bson.json_util import dumps
import random

router = APIRouter()

# 更新頁面造訪人次
@router.post("/api/visit_records/{page_name}")
async def update_visit_record(page_name: str):
    collection = get_visit_records_collection()
    record = collection.find_one_and_update({}, {"$inc": {page_name: 1}}, upsert=True, return_document=ReturnDocument.AFTER)
    if record and page_name in record:
        return {page_name: record[page_name]}
    else:
        raise HTTPException(status_code=404, detail="Visit record not found")

# 取得頁面造訪人次
@router.get("/api/visit_records/{page_name}")
async def get_visit_record(page_name: str):
    collection = get_visit_records_collection()
    print(collection)
    record = collection.find_one({}, {page_name: 1, "_id": 0})
    if page_name in record:
        return {page_name: record[page_name]}
    else:
        raise HTTPException(status_code=404, detail="Visit record not found")

# 通用的函數來取得假名
async def get_kana(kana_type: str, category: str):
    collection = get_kana_collection()
    if category == "all":
        pipeline = [
            {"$match": {"kana_type": kana_type}},
            {"$sample": {"size": 1}}
        ]
    else:
        pipeline = [
            {"$match": {"kana_type": kana_type, "category": category}},
            {"$sample": {"size": 1}}
        ]
    cursor = collection.aggregate(pipeline)
    result = next(cursor, None)
    if result:
        return Kana(**result)
    else:
        raise HTTPException(status_code=404, detail="Kana not found")

# 分類練習 API
@router.get("/api/{kana_type}/{category}", response_model=Kana)
async def get_kana_by_kana_type_and_category(kana_type: str, category: str = "all"):
    return await get_kana(kana_type, category)

# 全部假名 API
@router.get("/api/{kana_type}/all", response_model=Kana)
async def get_all_kana(kana_type: str):
    collection = get_kana_collection()
    pipeline = [
        {"$match": {"kana_type": kana_type}},
        {"$sample": {"size": 1}}
    ]
    cursor = collection.aggregate(pipeline)
    result = next(cursor, None)
    if result:
        return Kana(**result)
    else:
        raise HTTPException(status_code=404, detail="Kana not found")
