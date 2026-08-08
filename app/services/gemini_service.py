import json
import os

from dotenv import load_dotenv
from google import genai
from google.genai import errors

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

QUOTA_FALLBACK = {
    "document_type": "Unknown",
    "fields": {},
    "extraction_status": "quota_exceeded",
}


def extract_document_information(ocr_text: str) -> dict:
    """
    Uses Gemini to classify the document and extract structured information.
    """

    prompt = f"""
You are an AI Document Intelligence system.

Analyze the OCR text below.

Tasks:
1. Identify the document type.
2. Extract all important information.
3. Return ONLY valid JSON.

Example:

{{
    "document_type":"Invoice",
    "fields": {{
        "vendor":"",
        "invoice_number":"",
        "invoice_date":"",
        "customer":"",
        "total":""
    }}
}}

OCR TEXT:

{ocr_text}
"""

    try:
        response = client.models.generate_content(
            model="models/gemini-3.5-flash",
            contents=prompt,
        )
    except errors.ClientError as e:
        if e.code == 429:
            return dict(QUOTA_FALLBACK)
        raise

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {
            "document_type": "Unknown",
            "fields": {},
            "raw_response": text,
        }