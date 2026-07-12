import os

from dotenv import load_dotenv
from google import genai

from app.services.rag_service import search_document

# Load environment variables
load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def chat_with_document(document_id: int, question: str):

    context = search_document(
        document_id,
        question,
        top_k=5
    )

    context_text = "\n\n".join(context)

    prompt = f"""
You are an AI Document Assistant.

Answer ONLY using the information provided below.

If the answer is not present in the document,
reply:

"I couldn't find that information in the document."

Document:
{context_text}

Question:
{question}
"""

    response = client.models.generate_content(
        model="models/gemini-3.5-flash",
        contents=prompt,
    )

    return response.text