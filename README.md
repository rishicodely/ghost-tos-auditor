# 👻 Ghost — AI Privacy Auditor

## 🚀 Overview

Ghost is an AI-powered tool that analyzes Terms of Service and highlights risky clauses most users ignore.

Instead of blindly clicking "Accept", users can understand what they are agreeing to in seconds.

---

## ✨ Features

* 🔍 Extracts risky clauses from legal text
* ⚠️ Classifies risks (LOW, MEDIUM, HIGH, CRITICAL)
* 📊 Privacy score (0–100)
* 💡 Explains impact in simple language
* 🎯 Clean, minimal UI

---

## 🧠 How It Works

1. User enters a Terms of Service URL
2. Backend scrapes and cleans the content
3. Text is sent to an LLM for analysis
4. Clauses are extracted and categorized
5. A scoring engine calculates privacy risk
6. Results are displayed in a clean UI

---

## 🏗️ Tech Stack

### Frontend

* React
* Tailwind CSS

### Backend

* Node.js
* Express
* Cheerio (scraping)

### AI

* Groq API (LLaMA models)

---

## 📸 Demo

<img width="1850" height="1002" alt="image" src="https://github.com/user-attachments/assets/aac041d1-b541-48a6-b828-c2aa342b2085" />


---

## ⚙️ Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🌍 Live Demo

Frontend: https://ghost-tos-auditor.vercel.app/
Backend: https://ghost-tos-auditor.onrender.com

---

## ⚠️ Challenges

* Handling long legal documents
* Ensuring structured JSON output from LLM
* Avoiding hallucinations
* Scraping restrictions from some websites

---

## 🔮 Future Improvements

* Highlight risky phrases in text
* Chrome extension version
* Compare multiple platforms
* Save analysis history

---

## 👩‍💻 Author

Rishika Reddy

---
