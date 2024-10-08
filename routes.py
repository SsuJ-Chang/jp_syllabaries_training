from fastapi import APIRouter, HTTPException
from models import Kana
from db import get_kana_collection, get_visit_records_collection
from pymongo import ReturnDocument
from bson.json_util import dumps
import random
from text_to_speech import get_speech_url

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
    record = collection.find_one({}, {page_name: 1, "_id": 0})
    if page_name in record:
        return {page_name: record[page_name]}
    else:
        raise HTTPException(status_code=404, detail="Visit record not found")

# 通用的函數來取得 1 個隨機假名
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

# 通用的函數來取得全部假名
async def get_kanas(kana_type: str, category: str):
    collection = get_kana_collection()
    if category == "all":
        pipeline = [
            {"$match": {"kana_type": kana_type}}
        ]
    else:
        pipeline = [
            {"$match": {"kana_type": kana_type, "category": category}}
        ]
    cursor = collection.aggregate(pipeline)
    results = list(cursor)
    if results:
        return [Kana(**result) for result in results]
    else:
        raise HTTPException(status_code=404, detail="Kanas not found")

# 分類練習 API 隨機取得 1 個分類假名
# @router.get("/api/{kana_type}/{category}", response_model=Kana)
# async def get_kana_by_kana_type_and_category(kana_type: str, category: str = "all"):
#     return await get_kana(kana_type, category)

# 分類練習 API 一次取得分類全部假名
@router.get("/api/{kana_type}/{category}", response_model=list[Kana])
async def get_kanas_by_type_and_category(kana_type: str, category: str = "all"):
    return await get_kanas(kana_type, category)

# 全部假名 API 取得 1 個隨機假名
# @router.get("/api/all_kanas", response_model=Kana)
# async def get_all_kana():
#     collection = get_kana_collection()
#     pipeline = [
#         {"$sample": {"size": 1}}
#     ]
#     cursor = collection.aggregate(pipeline)
#     result = next(cursor, None)
#     if result:
#         return Kana(**result)
#     else:
#         raise HTTPException(status_code=404, detail="Kana not found")

# 不分類型一次取得全部假名
@router.get("/api/all_kanas", response_model=list[Kana])
async def get_all_kanas():
    collection = get_kana_collection()
    pipeline = [
        {"$match": {}}
    ]
    cursor = collection.aggregate(pipeline)
    results = list(cursor)
    if results:
        return [Kana(**result) for result in results]
    else:
        raise HTTPException(status_code=404, detail="Kanas not found")

# 取得 Text-to-Speech API 的發音
@router.get("/api/text_to_speech/")
async def text_to_speech(text: str):
    try:
        audio_url = get_speech_url(text)
        return {"audio_url": audio_url}
    except HTTPException as e:
        raise e
