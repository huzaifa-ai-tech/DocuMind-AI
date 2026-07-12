import { useState } from "react";
import api from "../services/api";

function ChatBox({ documentId }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendQuestion() {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
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
        {
          sender: "ai",
          text: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">AI Chat</h2>

      <div className="h-80 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-xl ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p>AI is thinking...</p>}
      </div>

      <div className="flex gap-3">
        <input
          className="flex-1 border rounded-lg p-3"
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
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;