import os
import requests
from fastapi import HTTPException

GOOGLE_TTS_API_KEY = os.getenv("GOOGLE_TTS_API_KEY")

def get_speech_url(text: str) -> str:
    url = f"https://texttospeech.googleapis.com/v1/text:synthesize?key={GOOGLE_TTS_API_KEY}"
    
    headers = {
        "Content-Type": "application/json",
        "Referer": "http://localhost:8000",
    }
    
    body = {
        "input": {"text": text},
        "voice": {"languageCode": "ja-JP", "name": "ja-JP-Neural2-B"},
        "audioConfig": {"audioEncoding": "MP3", "pitch": 1, "speakingRate": 1},
    }

    response = requests.post(url, headers=headers, json=body)
    
    if response.status_code == 200:
        data = response.json()
        audio_content = data.get("audioContent")
        if audio_content:
            audio_url = f"data:audio/mp3;base64,{audio_content}"
            return audio_url
        else:
            raise HTTPException(status_code=500, detail="Failed to generate speech audio.")
    else:
        raise HTTPException(status_code=response.status_code, detail=response.json().get("error", "Text-to-Speech API error."))
