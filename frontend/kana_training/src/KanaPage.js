import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KanaPage = () => {
  const [kana, setKana] = useState('');
  const [romaji, setRomaji] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [errorInput, setErrorInput] = useState('');
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchKana = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/hiragana/seion`);
      const { kana, romaji } = response.data;
      setKana(kana);
      setRomaji(romaji);
      setInputValue('');
      setIsCorrect(null);
      setErrorInput('');
    } catch (error) {
      console.error('Error fetching kana:', error);
    }
  };

  useEffect(() => {
    fetchKana();
  }, [apiBaseUrl]);

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

  return (
    <div>
      <div id="kana-training-body">
        <h1>JAPANESE SYLLABARIES TRAINING</h1>
        <p id="kana">{kana ? `${kana}` : 'Loading...'}</p>
        {isCorrect === false && (
            <div>
            <p id="error-msg">Incorrect! You entered "{errorInput}", correct answer is "{romaji}"</p>
            </div>
        )}
        <form onSubmit={handleSubmit}>
            {isCorrect === false ? (
            <button className="btn" type="button" onClick={handleContinue}>CONTINUE</button>
            ) : (
            <input
                type="text"
                id="answer"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ENTER ROMAJI"
            />
            )}
        </form>
      </div>
    </div>
  );
}

export default KanaPage;
