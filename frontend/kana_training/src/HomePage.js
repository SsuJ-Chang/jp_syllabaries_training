import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./HomePage.css";

const HomePage = () => {
  const [visitRecord, setVisitRecord] = useState(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchVisitRecord = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/visit_records/home`);
        setVisitRecord(response.data.home);
      } catch (error) {
        console.error("Error fetching visit record", error);
      }
    };

    if (!hasFetched.current) {
      fetchVisitRecord();
      hasFetched.current = true;
    }
  }, []);

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
      <div className="visit-record-home">
        <p>造訪人次 {visitRecord}</p>
      </div>
    </div>
  );
};

export default HomePage;
