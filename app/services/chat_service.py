import os

from dotenv import load_dotenv
from google import genai
from google.genai import errors

from app.services.rag_service import search_document

# Load environment variables
load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

QUOTA_MESSAGE = (
    "I'm currently unavailable because the AI API quota for the day has "
    "been reached. Please try again later."
)


def chat_with_document(document_id: int, question: str):

    context = search_document(
        document_id,
        question,
        top_k=5,
    )

    context_text = "\n\n".join(context)

    prompt = f"""
You are DocuMind AI, a helpful and accurate document assistant.

Answer the user's question using ONLY the information provided in the document below.

Guidelines:
- Give a clear, complete and direct answer to the question.
- Start with the direct answer, then briefly explain it if helpful.
- If the question is a follow-up (e.g. "what about the total?" or "tell me more"),
  use the document context to answer it naturally.
- If the exact detail is not in the document but a related detail is, say so clearly.
- If the answer is NOT present in the document, reply exactly:
  "I couldn't find that information in the document. Try asking about something else in it."
- Do not invent facts, numbers or names that are not in the document.

Document:
{context_text}

Question:
{question}
"""

    try:
        response = client.models.generate_content(
            model="models/gemini-3.5-flash",
            contents=prompt,
        )
    except errors.ClientError as e:
        if e.code == 429:
            return QUOTA_MESSAGE
        raise

    return response.text
