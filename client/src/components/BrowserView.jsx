import { useState } from "react";
import { apiWebsiteProxy } from "../api";

export default function BrowserView({ getUrl}) {
  const [url, setUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoadPage = async () => {
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("http")) {
      formattedUrl = "https://" + formattedUrl;
    }
    setLoading(true);
    try {
      const result = await apiWebsiteProxy(formattedUrl);
      setHtmlContent(result);
      getUrl(url);
    } catch (error) {
      alert("Lỗi khi gọi API. Vui lòng thử lại.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="p-3 border-b flex">
        <input
          type="text"
          placeholder="Nhập địa chỉ trang web (vd: https://vnexpress.net)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded px-3 py-2 mr-2"
        />
        <button
          onClick={handleLoadPage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        >
          {loading ? "Đang tải..." : "Tải trang"}
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        {htmlContent ? (
          <iframe
            title="Web View"
            src={url}
            className="w-full h-full border-0"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Nhập URL và nhấn “Tải trang” để xem nội dung.
          </div>
        )}
      </div>
    </div>
  );
}
