import React, { useState, useEffect, useRef, useCallback } from "react";
import { getKanasByTypeAndCategory, getRandomKana } from "./kanaUtils";
import "./KanaPage.css";
import titles from './kanePageTitles';

/**
 * 假名練習頁面元件
 * 
 * @param {Object} props
 * @param {string} props.kanaType - 假名類型 ('hiragana', 'katakana', 'all_kanas')
 * @param {string} props.category - 分類 ('seion', 'dakuon_handaon', 'youon', 'all')
 */
const KanaPage = ({ kanaType, category }) => {
  // 當前顯示的假名
  const [kana, setKana] = useState("");
  // 當前假名的所有可接受羅馬拼音
  const [romaji, setRomaji] = useState([]);
  // 載入的假名列表
  const [kanas, setKanas] = useState([]);
  // 使用者輸入
  const [inputValue, setInputValue] = useState("");
  // 答題結果狀態
  const [isCorrect, setIsCorrect] = useState(null);
  // 錯誤時顯示使用者的輸入
  const [errorInput, setErrorInput] = useState("");
  // 連續答對次數
  const [correctStreak, setCorrectStreak] = useState(0);
  // 防止重複初始化
  const hasLoaded = useRef(false);

  /**
   * 設定新的隨機假名題目
   */
  const setNewQuestion = useCallback((kanaList) => {
    const randomKana = getRandomKana(kanaList);
    setKana(randomKana.kana);
    setRomaji(randomKana.romaji);
    setInputValue("");
    setIsCorrect(null);
    setErrorInput("");
  }, []);

  /**
   * 載入假名資料
   */
  const loadKanaData = useCallback(() => {
    const loadedKanas = getKanasByTypeAndCategory(kanaType, category);
    setKanas(loadedKanas);
    setNewQuestion(loadedKanas);
  }, [kanaType, category, setNewQuestion]);

  // 元件掛載時載入資料
  useEffect(() => {
    if (!hasLoaded.current) {
      loadKanaData();
      hasLoaded.current = true;
    }
  }, [loadKanaData]);

  /**
   * 處理表單送出
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!inputValue.trim()) {
      alert("請輸入羅馬拼音");
      return;
    }

    const formattedInput = inputValue.toLowerCase();
    const isCorrectAnswer = romaji.includes(formattedInput);

    if (isCorrectAnswer) {
      setIsCorrect(true);
      setCorrectStreak(correctStreak + 1);
      setNewQuestion(kanas);
    } else {
      setIsCorrect(false);
      setCorrectStreak(0);
      setErrorInput(inputValue);
    }
  };

  /**
   * 答錯後繼續練習
   */
  const handleContinue = () => {
    setNewQuestion(kanas);
  };

  /**
   * 取得頁面標題
   */
  const getTitle = () => {
    return titles[kanaType]?.[category] ?? "50音練習";
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
              你輸入「{errorInput}」，正確發音為「{romaji.join(" 或 ")}」
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
                autoComplete="off"
              />
              <div className="submit-btn-container"><button className="btn submit-btn" type="submit">送出</button></div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default KanaPage;
