# Japanese Kana Training (日文五十音練習)

An interactive web application for learning Japanese Hiragana and Katakana characters through romaji practice.

> 🇹🇼 [繁體中文版](#繁體中文)

## 🌐 Live Demo

**[jp50.rj-tw.com](https://jp50.rj-tw.com)**

## ✨ Features

- **Hiragana Practice** - Seion (清音), Dakuon/Handakuon (濁音/半濁音), Youon (拗音)
- **Katakana Practice** - Seion, Dakuon/Handakuon, Youon
- **Full 50-on Practice** - Mixed practice with all kana
- **Streak Counter** - Track your learning progress
- **Smart Random** - Avoids repeating recent characters

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **React Router (Hash)** - Routing
- **GitHub Pages** - Static hosting
- **GitHub Actions** - CI/CD

## 📁 Project Structure

```
├── public/          # Static assets
│   ├── CNAME        # Custom domain config
│   └── index.html   # HTML entry
├── src/
│   ├── data/        # Kana data (JSON)
│   ├── App.js       # Main app
│   ├── HomePage.js  # Home page
│   ├── KanaPage.js  # Practice page
│   └── kanaUtils.js # Data utilities
└── .github/
    └── workflows/   # GitHub Actions deployment
```

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build

# Test production build locally
npx serve -s build
```

## 📝 License

MIT License

---

# 繁體中文

互動式日文假名學習網站，透過羅馬拼音練習幫助使用者學習平假名和片假名。

## 🌐 線上版本

**[jp50.rj-tw.com](https://jp50.rj-tw.com)**

## ✨ 功能

- **平假名練習** - 清音、濁音/半濁音、拗音
- **片假名練習** - 清音、濁音/半濁音、拗音
- **全部 50 音練習** - 混合練習所有假名
- **連續答對計數** - 追蹤學習進度
- **智慧隨機** - 避免短時間內重複出題

## 🛠️ 技術架構

- **React 18** - 前端框架
- **React Router (Hash)** - 路由管理
- **GitHub Pages** - 靜態網站託管
- **GitHub Actions** - 自動化部署

## 🚀 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm start

# 建置生產版本
npm run build

# 本地測試生產版本
npx serve -s build
```

## 📝 授權

MIT License
