from fastapi import APIRouter, HTTPException
from models import Kana
from db import get_kana_collection
from bson.json_util import dumps
import random

router = APIRouter()

@router.get("/hiragana/seion", response_model=Kana)
async def get_hiragana_seion():
    collection = get_kana_collection()
    pipeline = [
        {"$match": {"kana_type": "hiragana", "category": "seion"}},
        {"$sample": {"size": 1}}
    ]
    cursor = collection.aggregate(pipeline)
    result = next(cursor, None)
    if result:
        return Kana(**result)
    else:
        raise HTTPException(status_code=404, detail="Kana not found")
