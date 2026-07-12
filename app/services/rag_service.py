import chromadb
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.services.embedding_service import create_embedding

# Persistent Chroma database
client = chromadb.PersistentClient(path="chroma_db")

collection = client.get_or_create_collection(
    name="documents"
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)


def index_document(document_id: int, text: str):
    """
    Split the document into chunks and store them in ChromaDB.
    """

    chunks = text_splitter.split_text(text)

    for i, chunk in enumerate(chunks):

        embedding = create_embedding(chunk)

        collection.add(
            ids=[f"{document_id}_{i}"],
            embeddings=[embedding],
            documents=[chunk],
            metadatas=[
                {
                    "document_id": document_id
                }
            ]
        )


def search_document(document_id: int, query: str, top_k=5):
    """
    Search the uploaded document.
    """

    query_embedding = create_embedding(query)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where={
            "document_id": document_id
        }
    )

    return results["documents"][0]