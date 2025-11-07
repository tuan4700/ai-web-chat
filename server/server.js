import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const {question, url} = req.body;
  const fullPrompt = `
  Bạn là trợ lý AI. Dưới đây là link nội dung trang web:
  ${url}
  Người dùng hỏi: "${question}"
  Hãy trả lời ngắn gọn, súc tích, bằng tiếng Việt.
  `;
  try {
    const response = await axios.post(
      process.env.LINK_API_AI,
      {
        model: process.env.OPENROUTER_MODEL,
        messages: [{ role: "user", content: fullPrompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const answer = response.data.choices?.[0]?.message?.content || "Không có phản hồi";
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi gọi API" });
  }
});

app.post("/api/proxy", async (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith("http")) {
    return res.status(400).json({ error: "URL không hợp lệ" });
  }
  try {
    const response = await axios.get(url, { timeout: 10000 });
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Không thể tải trang." });
  }
});

app.listen(process.env.PORT, () => console.log(`✅ Server chạy tại link http://localhost:${process.env.PORT}`));