# 📄 DocuMind AI

An AI-powered document intelligence platform that extracts text from documents, understands their contents using Google Gemini AI, stores information in PostgreSQL, and allows users to ask natural language questions using Retrieval-Augmented Generation (RAG).

---

## 🚀 Features

- 📤 Upload invoice, passport, and image documents
- 🔍 OCR using EasyOCR
- 🤖 AI-powered document understanding with Google Gemini
- 📑 Automatic document classification
- 🗄️ PostgreSQL database storage
- 🧠 Vector search using ChromaDB
- 💬 Ask questions about uploaded documents
- ⚡ FastAPI REST API
- 📖 Interactive Swagger documentation

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Backend | FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| OCR | EasyOCR |
| AI | Google Gemini |
| Vector Database | ChromaDB |
| Embeddings | Sentence Transformers |
| Language | Python 3 |

---

## 📂 Project Structure

```text
DocuMind-AI/
│
├── app/
│   ├── api/
│   ├── database/
│   ├── models/
│   ├── services/
│   └── main.py
│
├── uploads/
├── chroma_db/
├── requirements.txt
├── create_tables.py
├── README.md
└── .gitignore
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/DocuMind-AI.git

cd DocuMind-AI
```

### Create virtual environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Create a `.env` file

```text
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost/documind_ai

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Create database tables

```bash
python create_tables.py
```

### Run the API

```bash
uvicorn app.main:app --reload
```

Open:

```
http://127.0.0.1:8000/docs
```

---

## 📌 API Endpoints

### Upload Document

```
POST /documents/upload
```

### List Documents

```
GET /documents/
```

### Get Document

```
GET /documents/{id}
```

### Chat with Document

```
POST /documents/chat
```

---

## 💬 Example Chat

### Question

```json
{
  "document_id": 4,
  "question": "Who is the vendor?"
}
```

### Response

```json
{
  "answer": "The vendor is East Repair Inc."
}
```

---

## 🔄 Workflow

1. Upload a document
2. EasyOCR extracts text
3. Gemini extracts structured information
4. Data is stored in PostgreSQL
5. OCR text is converted into embeddings
6. Embeddings are stored in ChromaDB
7. User asks a question
8. RAG retrieves relevant content
9. Gemini generates the final answer

---

## 🎯 Future Improvements

- PDF support
- Authentication
- React frontend
- Docker deployment
- AWS deployment
- Batch document processing

---

## 👨‍💻 Author

**Huzaifa**

Built using FastAPI, PostgreSQL, EasyOCR, Google Gemini, and ChromaDB.