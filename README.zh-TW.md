# 日文五十音練習

> **免費、互動式的日文假名學習工具**

繁體中文 | [English](./README.md)

[![線上展示](https://img.shields.io/badge/demo-線上展示-success)](https://jp50.rj-tw.com)
[![授權](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ 特色功能

- 🎯 **平假名與片假名** - 練習所有基礎日文假名
- 📊 **連續答對計數** - 追蹤學習進度
- 🎲 **智慧隨機** - 避免短時間內重複出題
- 🎨 **現代化介面** - 簡潔優雅，預設深色模式
- 📱 **全裝置支援** - 桌機、平板、手機皆可使用
- 🌐 **免註冊** - 立即使用，無需登入

## 🎯 練習模式

| 類型 | 分類 | 狀態 |
|-----|------|------|
| 平假名 | 清音、濁音/半濁音、拗音、全部 | ✅ |
| 片假名 | 清音、濁音/半濁音、拗音、全部 | ✅ |
| 全部 50 音 | 所有假名混合 | ✅ |

## 🛠️ 技術堆疊

- **React 18** with Hooks
- **React Router v6** (HashRouter)
- **GitHub Pages** 靜態網站託管
- **GitHub Actions** CI/CD 自動化部署

## 🏗️ 專案結構

```
jp_syllabaries_training/
├── public/              # 靜態資源
│   ├── CNAME           # 自訂網域設定
│   └── index.html      # HTML 入口
├── src/
│   ├── data/           # 假名資料 (JSON)
│   ├── App.js          # 主應用程式與路由
│   ├── HomePage.js     # 首頁
│   ├── KanaPage.js     # 練習頁面
│   └── kanaUtils.js    # 資料處理函式
└── .github/
    └── workflows/      # GitHub Actions 部署
```

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

## 📄 授權

本專案採用 MIT 授權。

## 🙏 致謝

- 由 [RJ Chang](https://github.com/SsuJ-Chang) 用 ❤️ 打造
- 基於 React 與開源技術構建

## 📧 聯絡方式

- 網站：[jp50.rj-tw.com](https://jp50.rj-tw.com)
- GitHub：[@SsuJ-Chang](https://github.com/SsuJ-Chang)

---

**⭐ 如果您覺得這個專案有用，請考慮給它一顆星星！**
