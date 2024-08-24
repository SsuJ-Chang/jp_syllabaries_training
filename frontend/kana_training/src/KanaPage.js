import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchKanasAndCacheInSession, getRandomKana } from "./kanaUtils";
import axios from "axios";
import "./KanaPage.css";
import Cookies from 'js-cookie';
import titles from './kanePageTitles';

const KanaPage = ({ kanaType, category }) => {
  const [kana, setKana] = useState("");
  const [kanas, setKanas] = useState([]);
  const [romaji, setRomaji] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [errorInput, setErrorInput] = useState("");
  const [visitCount, setVisitCount] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null); // 新增狀態來存放音頻 URL
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const hasFetched = useRef(false);

  const handleKana = (kanas) => {
    const randomKana = getRandomKana(kanas);
    console.log("randomKana", randomKana)
    setKana(randomKana.kana);
    setRomaji(randomKana.romaji);
    setInputValue("");
    setIsCorrect(null);
    setErrorInput("");
    setAudioUrl(null);
  };

  const fetchKanaAndRecordVisit = useCallback(async (updateVisit = false) => {
    const pageName = `${kanaType}_${category}`;
    try {
      if (updateVisit) {
        const visitKey = `visited_${pageName}`;
        const visited = Cookies.get(visitKey);

        if (!visited) {
          const visitResponse = await axios.post(`${apiBaseUrl}/api/visit_records/${pageName}`);
          setVisitCount(visitResponse.data[pageName]);
          // 設定 Cookie 1 天內同一瀏覽器無法重複累積造訪次數
          Cookies.set(visitKey, 'true', { expires: 24 / 24 });
        } else {
          const visitResponse = await axios.get(`${apiBaseUrl}/api/visit_records/${pageName}`);
          setVisitCount(visitResponse.data[pageName]);
        }
      }

      const loadedKanas = await fetchKanasAndCacheInSession(kanaType, category, apiBaseUrl);
      setKanas(loadedKanas);
      handleKana(loadedKanas)
    } catch (error) {
      console.error("Error: ", error);
    }
  }, [kanaType, category, apiBaseUrl]);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchKanaAndRecordVisit(true);
      hasFetched.current = true;
    }
  }, [fetchKanaAndRecordVisit]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      alert("請輸入羅馬拼音")
      return;
    }
    const formatedInput = inputValue.toLowerCase();
    const isCorrectAnswer = romaji.includes(formatedInput);
    if (isCorrectAnswer) {
      setIsCorrect(true);
      setCorrectStreak(correctStreak + 1);
      handleKana(kanas)
    } else {
      setIsCorrect(false);
      setCorrectStreak(0);
      setErrorInput(inputValue);

      // 在答錯時請求音頻 URL
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/text_to_speech/`,
          { params: { text: kana },}
        );
        console.log("Fetched audio URL:", response.data.audio_url);
        setAudioUrl(response.data.audio_url);
      } catch (error) {
        console.error("Failed to fetch audio URL", error);
      }
    }
  };

  const handleContinue = () => {
    handleKana(kanas)
  };

  const getTitle = () => {
    return titles[kanaType] && titles[kanaType][category] ? titles[kanaType][category] : "50音練習";
  };

  return (
    <div>
      <div id="kana-training-body">
        <h1>{getTitle()}</h1>
        <div>連續答對 {correctStreak} 次</div>
        <div id="kana">{kana ? `${kana}` : "載入中..."}</div>
        {isCorrect === false && (
          <div>
            <p id="error-msg">
              發音錯誤！<br/>
              你輸入「{errorInput}」，正確發音為「{romaji.join(" 或 ")}」<br/>
              {audioUrl && (
                <button onClick={() => new Audio(audioUrl).play()} className="audio-btn">
                  （點此聽發音）
                </button>
              )}
            </p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {isCorrect === false ? (
            <button className="btn" type="button" onClick={handleContinue}>繼續練習</button>
          ) : (
            <>
              <input
                type="text"
                id="answer"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="輸入羅馬拼音"
                autocomplete="off"
              />
              <div className="submit-btn-container"><button className="btn submit-btn" type="submit">送出</button></div>
            </>
          )}
        </form>
        <div className="visit-record-kana">
          <p>造訪人次 {visitCount}</p>
        </div>
      </div>
    </div>
  );
};

export default KanaPage;
