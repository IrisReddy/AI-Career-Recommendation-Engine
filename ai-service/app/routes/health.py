import sys
from datetime import datetime, timezone
from fastapi import APIRouter
import spacy

router = APIRouter()

@router.get("/health")
def health_check():
    """
    Health check endpoint verifying FastAPI service readiness,
    Python runtime version, and spaCy NLP model status.
    """
    spacy_model_name = "en_core_web_sm"
    spacy_status = "not_loaded"
    
    try:
        if spacy.util.is_package(spacy_model_name):
            nlp = spacy.load(spacy_model_name)
            spacy_status = f"loaded ({spacy_model_name})"
        else:
            spacy_status = f"missing ({spacy_model_name} model not installed)"
    except Exception as e:
        spacy_status = f"error: {str(e)}"

    return {
        "status": "OK",
        "service": "AI Career Recommendation & NLP Engine",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "pythonVersion": sys.version.split()[0],
        "spacy": {
            "model": spacy_model_name,
            "status": spacy_status,
        },
    }
