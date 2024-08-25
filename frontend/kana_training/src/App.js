import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from './Header';
import Footer from './Footer';
import HomePage from "./HomePage";
import KanaPage from "./KanaPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hiragana/seion" element={<KanaPage kanaType="hiragana" category="seion" />} />
        <Route path="/hiragana/youon" element={<KanaPage kanaType="hiragana" category="youon" />} />
        <Route path="/hiragana/dakuon_handaon" element={<KanaPage kanaType="hiragana" category="dakuon_handaon" />} />
        <Route path="/hiragana/all" element={<KanaPage kanaType="hiragana" category="all" />} />
        <Route path="/katakana/seion" element={<KanaPage kanaType="katakana" category="seion" />} />
        <Route path="/katakana/youon" element={<KanaPage kanaType="katakana" category="youon" />} />
        <Route path="/katakana/dakuon_handaon" element={<KanaPage kanaType="katakana" category="dakuon_handaon" />} />
        <Route path="/katakana/all" element={<KanaPage kanaType="katakana" category="all" />} />
        <Route path="/all_kanas" element={<KanaPage kanaType="all_kanas" category="all" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
