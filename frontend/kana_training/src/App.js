import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import KanaPage from './KanaPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/hiragana/seion" element={<KanaPage />} />
        <Route path="*" element={<Navigate to="/hiragana/seion" />} />
      </Routes>
    </Router>
  );
}

export default App;
