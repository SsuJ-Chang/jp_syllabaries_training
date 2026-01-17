# Japanese Kana Training

> **A Free, Interactive Japanese Kana Learning Tool**

[繁體中文](./README.zh-TW.md) | English

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://jp50.rj-tw.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

- 🎯 **Hiragana & Katakana** - Practice all basic Japanese syllabaries
- 📊 **Streak Counter** - Track your learning progress
- 🎲 **Smart Random** - Avoids repeating recent characters
- 🎨 **Modern UI** - Clean, dark-mode-first interface
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🌐 **No Registration** - Use immediately without sign-up

## 🎯 Practice Modes

| Type | Categories | Status |
|------|-----------|--------|
| Hiragana | Seion, Dakuon/Handakuon, Youon, All | ✅ |
| Katakana | Seion, Dakuon/Handakuon, Youon, All | ✅ |
| Full 50-on | All Kana Combined | ✅ |

## 🛠️ Tech Stack

- **React 18** with Hooks
- **React Router v6** (HashRouter)
- **GitHub Pages** for hosting
- **GitHub Actions** for CI/CD

## 🏗️ Project Structure

```
jp_syllabaries_training/
├── public/              # Static assets
│   ├── CNAME           # Custom domain config
│   └── index.html      # HTML entry
├── src/
│   ├── data/           # Kana data (JSON)
│   ├── App.js          # Main app with routing
│   ├── HomePage.js     # Home page
│   ├── KanaPage.js     # Practice page
│   └── kanaUtils.js    # Data utilities
└── .github/
    └── workflows/      # GitHub Actions deployment
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

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with ❤️ by [RJ Chang](https://github.com/SsuJ-Chang)
- Powered by React and open-source technologies

## 📧 Contact

- Website: [jp50.rj-tw.com](https://jp50.rj-tw.com)
- GitHub: [@SsuJ-Chang](https://github.com/SsuJ-Chang)

---

**⭐ If you find this project useful, please consider giving it a star!**
