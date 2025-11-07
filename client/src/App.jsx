import BrowserView from "./components/BrowserView";
import ChatPanel from "./components/ChatPanel";
import React, { useState } from "react";

export default function App() {
  const [url, setUrl] = useState();
  return (
    <div className="flex h-screen">
      <div className="w-4/5 pr-2">
        <BrowserView getUrl={(link) => setUrl(link) } />
      </div>
      <div className="w-1/5 border-l">
        <ChatPanel url={url} />
      </div>
    </div>
  );
}
