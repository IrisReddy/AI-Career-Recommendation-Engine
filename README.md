# AI-Driven Career Resource and Employment Recommendation Engine

Final-Year B.Tech Computer Science Project

## 📌 Project Overview
An intelligent career guidance and employment recommendation platform that parses user resumes, analyzes technical skills, predicts career pathways, identifies skill gaps, recommends targeted learning courses and job/internship opportunities, and provides an AI-powered Career Assistant using Google Gemini API.

---

## 🏗️ Architecture

```
React Frontend (Vite + Tailwind CSS)
        │
        ▼ (HTTP / REST)
Node.js + Express Backend
        │
        ├──► MongoDB + Mongoose (User Data & Master Records)
        │
        ▼ (HTTP REST APIs)
Python 3.12 FastAPI Service
        ├──► spaCy NLP & Resume Extractors (PyMuPDF, python-docx)
        ├──► scikit-learn ML Models & Pandas/NumPy Processors
        └──► Google Gemini API (AI Career Assistant & Explanations)
```

---

## 📁 Repository Structure

```
ai-career-recommendation/
├── frontend/             # React + Vite + Tailwind CSS User Interface
├── backend/              # Node.js + Express API Gateway & MongoDB Controller
└── ai-service/           # Python 3.12 FastAPI ML & NLP Analytics Engine
```

---

## 🚀 Step-by-Step Development Roadmap

1. [x] **Project structure and basic configuration**
2. [ ] React frontend setup
3. [ ] Node/Express backend setup
4. [ ] MongoDB connection
5. [ ] Authentication (JWT)
6. [ ] User profile management
7. [ ] Resume upload service
8. [ ] Python FastAPI service setup
9. [ ] Resume text extraction (PDF/DOCX)
10. [ ] NLP resume parsing
11. [ ] Skill extraction module
12. [ ] Career-path prediction model
13. [ ] Skill-gap analysis engine
14. [ ] Course recommendation module
15. [ ] Job recommendation engine
16. [ ] Internship recommendation module
17. [ ] Employability score calculation
18. [ ] Gemini AI Career Assistant integration
19. [ ] Personalized dashboard
20. [ ] End-to-end integration and testing
