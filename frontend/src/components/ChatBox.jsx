import { useEffect, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";
import api from "../services/api";

function ChatBox({ documentId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (messages.length > 0 || loading) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  async function sendQuestion() {
    if (!question.trim() || loading) return;

    const userQuestion = question.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userQuestion, time: new Date() },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await api.post("/documents/chat", {
        document_id: documentId,
        question: userQuestion,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: response.data.answer, time: new Date() },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong. Please try again.",
          time: new Date(),
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-lg">
          🤖
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">AI Chat</h2>
          <p className="text-sm text-slate-500">Ask about this document</p>
        </div>
      </div>

      <div className="h-96 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-4 mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
            <div className="text-4xl mb-3">💬</div>
            <p className="font-medium text-slate-500">
              Ask anything about this document
            </p>
            <p className="text-sm mt-1 max-w-xs">
              Try: "What is the invoice number?" or "What is the total amount?"
            </p>
          </div>
        )}

        {messages.map((msg, index) =>
          msg.sender === "user" ? (
            <div key={index} className="flex items-end gap-2 justify-end">
              <div className="max-w-[75%]">
                <div className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white px-4 py-3 rounded-2xl rounded-br-md text-sm leading-relaxed shadow-md">
                  {msg.text}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 text-right">
                  {msg.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-lg shrink-0">
                🧑
              </div>
            </div>
          ) : (
            <div key={index} className="flex items-end gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-base shrink-0">
                🤖
              </div>

              <div className="max-w-[75%]">
                <div
                  className={`px-4 py-3 rounded-2xl rounded-bl-md text-sm leading-relaxed border ${
                    msg.error
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-slate-200 text-slate-700 shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {msg.time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          )
        )}

        {loading && (
          <div className="flex items-end gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-base shrink-0">
              🤖
            </div>

            <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.15s" }}
                />
                <span
                  className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="flex gap-3">
        <input
          className="flex-1 border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          placeholder="Ask about this document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendQuestion();
            }
          }}
        />

        <button
          onClick={sendQuestion}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white px-6 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          Send
          <SendHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
