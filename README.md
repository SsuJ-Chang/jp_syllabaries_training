# Japanese Kana Training (日文五十音練習)

An interactive web application for learning Japanese Hiragana and Katakana characters through romaji practice.

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
