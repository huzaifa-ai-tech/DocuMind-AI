![Python](https://img.shields.io/badge/Python-3.11-blue)

![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)

![React](https://img.shields.io/badge/React-19-blue)

![Vite](https://img.shields.io/badge/Vite-8-purple)

![Gemini](https://img.shields.io/badge/Google-Gemini-orange)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

![License](https://img.shields.io/badge/License-MIT-yellow)

# 🤖 DocuMind AI

### AI-Powered Document Intelligence System

Extract • Understand • Search • Chat with Documents

**DocuMind AI** is an AI-powered Document Intelligence System that extracts information from images and PDFs using OCR and Google Gemini, stores structured data in PostgreSQL, indexes documents in ChromaDB for semantic retrieval, and allows users to chat with their documents using Retrieval-Augmented Generation (RAG).

---

## 🎥 Demo

> **Note:** GitHub may not preview the demo video directly in the README.

📥 **Download the full demo video:** [demo.mp4](docs/demo.mp4)

---

## ✨ Features

* 📄 Upload images (PNG, JPG, JPEG)
* 📕 Upload PDF documents
* 👁️ OCR text extraction using EasyOCR
* 🤖 AI-powered document understanding with Google Gemini
* 📊 Automatic structured data extraction
* 💬 Chat with uploaded documents using RAG
* 🗂️ Document management dashboard
* 🔍 Search uploaded documents
* 📜 Original document preview
* ⚡ FastAPI REST API
* ⚛️ Modern React frontend
* 🗄️ PostgreSQL database
* 🧠 ChromaDB vector database

---

# 📸 Screenshots

> Add screenshots inside the `docs/` folder.

| Dashboard               | Upload               |
| ----------------------- | -------------------- |
| ![](docs/dashboard.png) | ![](docs/upload.png) |

| Documents               | Details               |
| ----------------------- | --------------------- |
| ![](docs/documents.png) | ![](docs/details.png) |

| AI Chat            |
| ------------------ |
| ![](docs/chat.png) |

---

# 🏗 Architecture

![](architecture.png)

---

## 🚀 Key Highlights

- AI-powered document understanding using Google Gemini
- OCR support for images and PDF documents
- Retrieval-Augmented Generation (RAG) with ChromaDB
- Interactive AI chat for document-based questions
- Responsive React frontend with modern UI
- FastAPI REST backend with PostgreSQL

# 🛠 Tech Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* Lucide React

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL

## AI & Machine Learning

* Google Gemini
* EasyOCR
* ChromaDB
* Sentence Transformers

## File Processing

* PyMuPDF
* Pillow

---

# 📂 Project Structure

```
DocuMind-AI
│
├── app
│   ├── api
│   ├── database
│   ├── models
│   ├── services
│   └── main.py
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── uploads
├── chroma_db
├── architecture.png
├── requirements.txt
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/huzaifa-ai-tech/DocuMind-AI.git
cd DocuMind-AI
```

---

## Backend

Create a virtual environment:

```bash
python -m venv venv
```

Activate it:

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run FastAPI:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

---

## Frontend

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Run Vite:

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file in the project root.

Example:

```
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

---

# 🔄 Workflow

1. User uploads an image or PDF.
2. FastAPI stores the file.
3. PDF pages are converted to images (if needed).
4. EasyOCR extracts text.
5. Google Gemini extracts structured information.
6. Data is stored in PostgreSQL.
7. OCR text is indexed in ChromaDB.
8. Users chat with documents using RAG.

---

# 📌 Future Improvements

* User Authentication
* Multi-user workspace
* Export to CSV
* Export to PDF
* Docker support
* Cloud deployment
* Advanced analytics dashboard

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed by **Huzaifa** as an AI-powered full-stack portfolio project.