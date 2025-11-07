import { useEffect, useState } from "react";
import { askWebsiteQuestion } from "../api";

export default function ChatPanel({ url }) {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInput("");
    setAnswer("");
  }, [url]);

  const handleAsk = async () => {
    if (!input.trim()) return;
    if (!url) {
      setAnswer("Vui lòng tải một trang web trước.");
      return;
    }
    setLoading(true);
    try {
      const result = await askWebsiteQuestion(input, url);
      setAnswer(result);
    } catch (error) {
      setAnswer("Lỗi khi gọi API. Vui lòng thử lại.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4">
        {answer && (
          <div className="p-3 bg-gray-100 rounded text-gray-800">{answer}</div>
        )}
      </div>
      <div className="flex items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi về trang web..."
          className="flex-1 border rounded px-3 py-2 mr-2"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Đang gửi..." : "Gửi"}
        </button>
      </div>
    </div>
  );
}
