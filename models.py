from pydantic import BaseModel

class Kana(BaseModel):
    kana_type: str
    category: str
    kana: str
    romaji: str