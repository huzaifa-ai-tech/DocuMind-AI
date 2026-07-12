import os
import shutil

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.services.rag_service import index_document
from app.models.document import Document
from app.services.gemini_service import extract_document_information
from app.services.ocr_service import extract_text

router = APIRouter(prefix="/documents", tags=["Documents"])

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = (".png", ".jpg", ".jpeg")


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename missing.")

    if not file.filename.lower().endswith(ALLOWED_EXTENSIONS):
        raise HTTPException(
            status_code=400,
            detail="Only PNG, JPG and JPEG files are supported.",
        )

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # OCR
    ocr_text = extract_text(file_path)

    # AI Extraction
    ai_result = extract_document_information(ocr_text)

    document = Document(
        filename=file.filename,
        file_path=file_path,
        file_type=file.content_type or "image",
        document_type=ai_result.get("document_type", "Unknown"),
        extracted_text=ocr_text,
        ai_data=ai_result,
        status="Processed",
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    # Index the OCR text for RAG
    index_document(
        document.id,
        ocr_text
    )

    return {
        "id": document.id,
        "filename": document.filename,
        "document_type": document.document_type,
        "status": document.status,
        "ocr_text": document.extracted_text,
        "ai_data": document.ai_data,
    }


@router.get("/")
def get_documents(db: Session = Depends(get_db)):
    documents = db.query(Document).all()

    return [
        {
            "id": doc.id,
            "filename": doc.filename,
            "document_type": doc.document_type,
            "status": doc.status,
            "upload_time": doc.upload_time,
        }
        for doc in documents
    ]


@router.get("/{document_id}")
def get_document(document_id: int, db: Session = Depends(get_db)):
    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if document is None:
        raise HTTPException(status_code=404, detail="Document not found.")

    return {
        "id": document.id,
        "filename": document.filename,
        "document_type": document.document_type,
        "ocr_text": document.extracted_text,
        "ai_data": document.ai_data,
    }