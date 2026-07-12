import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText } from "lucide-react";
import ChatBox from "../components/ChatBox";
import api from "../services/api";

function DocumentDetails() {
  const { id } = useParams();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocument();
  }, []);

  async function loadDocument() {
    try {
      const response = await api.get(`/documents/${id}`);
      setDocument(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Loading document...</h2>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">
          Document not found.
        </h2>
      </div>
    );
  }

  const fields = document.ai_data?.fields || {};

  const fileUrl = `http://127.0.0.1:8000/${document.file_path}`;

  const isPDF = document.filename.toLowerCase().endsWith(".pdf");

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow-lg p-8 flex justify-between items-center">

        <div className="flex items-center gap-4">

          <FileText
            size={45}
            className="text-blue-600"
          />

          <div>

            <h1 className="text-3xl font-bold">
              {document.filename}
            </h1>

            <p className="text-gray-500">
              AI Document Intelligence
            </p>

          </div>

        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">

          {document.document_type}

        </span>

      </div>

      {/* Preview + AI */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Preview */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">
            Original Document
          </h2>

          <div className="border rounded-xl overflow-hidden bg-gray-100 h-[650px]">

            {isPDF ? (

              <iframe
                src={fileUrl}
                title="PDF Preview"
                className="w-full h-full"
              />

            ) : (

              <img
                src={fileUrl}
                alt={document.filename}
                className="w-full h-full object-contain"
              />

            )}

          </div>

        </div>

        {/* AI Fields */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Extracted Fields

          </h2>

          <div className="space-y-4">

            {Object.entries(fields).map(([key, value]) => (

              <div
                key={key}
                className="bg-gray-50 rounded-xl p-4 hover:shadow transition"
              >

                <p className="text-gray-500 capitalize mb-1">

                  {key.replaceAll("_", " ")}

                </p>

                <p className="font-semibold break-words">

                  {Array.isArray(value)
                    ? `${value.length} item(s)`
                    : String(value)}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* OCR */}

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">

          OCR Text

        </h2>

        <div className="bg-gray-50 rounded-xl p-4 h-[350px] overflow-y-auto">

          <pre className="whitespace-pre-wrap text-sm">

            {document.ocr_text}

          </pre>

        </div>

      </div>

      {/* Chat */}

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">

          AI Assistant

        </h2>

        <ChatBox documentId={document.id} />

      </div>

    </div>
  );
}

export default DocumentDetails;