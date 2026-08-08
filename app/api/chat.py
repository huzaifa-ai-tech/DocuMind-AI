from fastapi import APIRouter
from pydantic import BaseModel

from app.services.chat_service import chat_with_document

router = APIRouter(prefix="/documents", tags=["Chat"])


class ChatRequest(BaseModel):
    document_id: int
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    answer = chat_with_document(
        document_id=request.document_id,
        question=request.question
    )

    return {
        "document_id": request.document_id,
        "question": request.question,
        "answer": answer
    }