from fastapi import FastAPI

from app.api.chat import router as chat_router
from app.api.upload import router as upload_router

app = FastAPI(
    title="DocuMind AI",
    version="1.0.0",
    description="AI-powered Document Intelligence System",
)

app.include_router(upload_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {
        "project": "DocuMind AI",
        "version": "1.0.0",
        "status": "Running",
    }