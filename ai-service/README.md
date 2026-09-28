# AI Service - Python 3.12 + FastAPI

This directory contains the AI/ML, NLP, recommendation engine, and Gemini API chatbot services.

## Stack
- Python 3.12
- FastAPI & Uvicorn
- PyMuPDF (`fitz`) & `python-docx` for document parsing
- spaCy for NLP & entity/skill extraction
- scikit-learn, Pandas, NumPy for recommendation models
- Google Gemini API (`google-genai`) for AI Career Assistant

## Planned Endpoints
- `/extract` - Resume text extraction & parsing
- `/predict-career` - Career pathway prediction
- `/analyze-skill-gap` - Skill gap analysis & employability score
- `/recommend` - Job, internship, and course matching
- `/assistant/chat` - Gemini API career assistant conversation endpoint
