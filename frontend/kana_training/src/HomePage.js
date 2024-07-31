import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>50 音練習</h1>
      <div className="kana-options">
        <div className="kana-section">
          <h2>平假名</h2>
          <Link to="/hiragana/seion" className="option">清音</Link>
          <Link to="/hiragana/youon" className="option">拗音</Link>
          <Link to="/hiragana/dakuon_handaon" className="option">濁音與半濁音</Link>
          <Link to="/hiragana/all" className="option">全部</Link>
        </div>
        <div className="kana-section">
          <h2>片假名</h2>
          <Link to="/katakana/seion" className="option">清音</Link>
          <Link to="/katakana/youon" className="option">拗音</Link>
          <Link to="/katakana/dakuon_handaon" className="option">濁音與半濁音</Link>
          <Link to="/katakana/all" className="option">全部</Link>
        </div>
      </div>
      <div className="all-kana-section">
        <h2>全部 50 音</h2>
        <Link to="/all_kanas" className="option">全部</Link>
      </div>
    </div>
  );
};

export default HomePage;
