import { Link } from "react-router-dom";
import {
  FileText,
  Upload,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="space-y-10">

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl p-10 text-white shadow-xl">

        <h1 className="text-5xl font-extrabold mb-4">
          🤖 DocuMind AI
        </h1>

        <p className="text-xl opacity-90 max-w-2xl">
          AI-powered document intelligence platform using OCR,
          Google Gemini, ChromaDB, PostgreSQL and Retrieval-Augmented
          Generation (RAG).
        </p>

        <div className="mt-8 flex gap-4">

          <Link
            to="/upload"
            className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Upload Document
          </Link>

          <Link
            to="/documents"
            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-700 transition"
          >
            View Documents
          </Link>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <FileText
            size={40}
            className="text-blue-600 mb-4"
          />

          <h2 className="text-3xl font-bold">
            OCR
          </h2>

          <p className="text-gray-500 mt-2">
            Extract text from invoices, passports and images.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <Sparkles
            size={40}
            className="text-purple-600 mb-4"
          />

          <h2 className="text-3xl font-bold">
            Gemini AI
          </h2>

          <p className="text-gray-500 mt-2">
            Automatically understands and classifies documents.
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <MessageSquare
            size={40}
            className="text-green-600 mb-4"
          />

          <h2 className="text-3xl font-bold">
            AI Chat
          </h2>

          <p className="text-gray-500 mt-2">
            Ask questions using Retrieval-Augmented Generation.
          </p>

        </div>

      </div>

      {/* Features */}

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold mb-6">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <Feature text="EasyOCR Text Extraction" />
          <Feature text="Google Gemini AI" />
          <Feature text="PostgreSQL Database" />
          <Feature text="ChromaDB Vector Search" />
          <Feature text="Sentence Transformers" />
          <Feature text="AI Document Chat" />
          <Feature text="FastAPI REST API" />
          <Feature text="React Frontend" />

        </div>

      </div>

      {/* CTA */}

      <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">
            Ready to analyze documents?
          </h2>

          <p className="opacity-80 mt-2">
            Upload a document and let AI do the work.
          </p>

        </div>

        <Link
          to="/upload"
          className="bg-blue-600 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          Upload

          <ArrowRight size={18} />

        </Link>

      </div>

    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-4">
      <Upload className="text-blue-600" />
      <span>{text}</span>
    </div>
  );
}

export default Dashboard;