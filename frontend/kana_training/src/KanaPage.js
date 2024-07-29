import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './KanaPage.css';

const KanaPage = ({ kanaType, category }) => {
  const [kana, setKana] = useState('');
  const [romaji, setRomaji] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [errorInput, setErrorInput] = useState('');
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const hasFetched = useRef(false);

  const fetchKana = async () => {
    try {
      const response = await axios.get(
        kanaType === 'all_kanas' 
          ? `${apiBaseUrl}/api/all_kanas` 
          : `${apiBaseUrl}/api/${kanaType}/${category}`
      );
      const { kana, romaji } = response.data;
      setKana(kana);
      setRomaji(romaji);
      setInputValue('');
      setIsCorrect(null);
      setErrorInput('');
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchKana();
      hasFetched.current = true;
    }
  }, [kanaType, category]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.toLowerCase() === romaji.toLowerCase()) {
      setIsCorrect(true);
      fetchKana();
    } else {
      setIsCorrect(false);
      setErrorInput(inputValue);
    }
  };

  const handleContinue = () => {
    fetchKana();
  };

  const titles = {
    hiragana: {
      seion: '平假名 - 清音',
      youon: '平假名 - 拗音',
      dakuon_handaon: '平假名 - 濁音與半濁音',
      all: '平假名 - 全部'
    },
    katakana: {
      seion: '片假名 - 清音',
      youon: '片假名 - 拗音',
      dakuon_handaon: '片假名 - 濁音與半濁音',
      all: '片假名 - 全部'
    },
    all_kanas: {
      all: '全部 50 音'
    }
  };

  const getTitle = () => {
    return titles[kanaType] && titles[kanaType][category] ? titles[kanaType][category] : '50音練習';
  };

  return (
    <div>
      <div id="kana-training-body">
        <h1>{getTitle()}</h1>
        <p id="kana">{kana ? `${kana}` : '載入中...'}</p>
        {isCorrect === false && (
            <div>
            <p id="error-msg">發音錯誤！你輸入「{errorInput}」，正確發音為「{romaji}」</p>
            </div>
        )}
        <form onSubmit={handleSubmit}>
            {isCorrect === false ? (
            <button className="btn" type="button" onClick={handleContinue}>繼續練習</button>
            ) : (
            <input
                type="text"
                id="answer"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="輸入羅馬拼音"
            />
            )}
        </form>
      </div>
    </div>
  );
}

export default KanaPage;
