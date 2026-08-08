from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database.database import Base, engine
from app.models.document import Document
from app.api.chat import router as chat_router
from app.api.upload import router as upload_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="DocuMind AI",
    version="1.0.0",
    description="AI-powered Document Intelligence System",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1):\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
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
