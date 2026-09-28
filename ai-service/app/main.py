from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health, extraction

app = FastAPI(
    title="AI Career Recommendation Engine Service",
    description="Python FastAPI NLP, ML & Recommendation Engine Microservice",
    version="1.0.0",
)

# CORS Configuration for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router)
app.include_router(extraction.router)

@app.get("/")
def read_root():
    return {
        "message": "AI-Driven Career Resource & Employment Recommendation Microservice Running",
        "healthCheck": "/health",
        "docsUrl": "/docs",
    }
