from fastapi import APIRouter, HTTPException
from models import Kana
from db import get_kana_collection
from bson.json_util import dumps
import random

router = APIRouter()

# 通用的函數來取得假名
async def get_kana(kana_type: str, category: str):
    collection = get_kana_collection()
    if category == 'all':
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
async def get_kana_by_kana_type_and_category(kana_type: str, category: str = 'all'):
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
