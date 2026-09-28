from fastapi import APIRouter, File, UploadFile, HTTPException, status
from app.services.resume_extractor import ResumeExtractor, ExtractionError

router = APIRouter(prefix="/extract-text", tags=["Text Extraction"])

@router.post("", summary="Extract raw text from uploaded PDF or DOCX resume")
async def extract_resume_text(file: UploadFile = File(...)):
    """
    Test endpoint for extracting, cleaning, and calculating text statistics
    from an uploaded PDF or DOCX resume document.
    """
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Filename is required for format detection."
        )

    filename = file.filename
    content = await file.read()

    if not content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty."
        )

    try:
        result = ResumeExtractor.extract(file_input=content, filename=filename)
        
        return {
            "success": True,
            "filename": filename,
            "file_type": result["file_type"],
            "character_count": result["character_count"],
            "word_count": result["word_count"],
            "page_count": result["page_count"],
            "extracted_text": result["extracted_text"],
        }
    except ExtractionError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred during text extraction: {str(e)}"
        )
