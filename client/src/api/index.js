export async function askWebsiteQuestion(question, url) {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN_SERVER}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, url }),
    });
    if (!response.ok) {
      throw new Error("Failed to get response from server");
    }
    const data = await response.json();
    return data.answer;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}

export async function apiWebsiteProxy(formattedUrl) {
  try {
    const response = await fetch(`${import.meta.env.VITE_DOMAIN_SERVER}/api/proxy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: formattedUrl }),
    });
    if (!response.ok) throw new Error("Không thể tải trang");
    const html = await response.text();
    return html;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
