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

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles

app.mount("/uploads", 
        StaticFiles(directory="uploads"), 
        name="uploads",
        )