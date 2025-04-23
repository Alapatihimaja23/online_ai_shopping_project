import { useState } from "react";
import { Button } from "../components/ui/button";


import { marked } from "marked";

function renderMarkdown(text: string) {
  // Truncate to 100 words
  const words = text.split(/\s+/);
  const limited = words.slice(0, 100).join(" ");
  return marked.parse(limited);
}

export default function AISuggest() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm Manashop's AI assistant. Ask me anything about our products, shopping, or get suggestions!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: data.response || "Sorry, I couldn't understand that." },
      ]);
      setInput("");
    } catch (e) {
      console.log(e);
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "Error connecting to AI backend." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-black">🛒 AI Chat Assistant</h1>
        <div className="h-80 overflow-y-auto mb-4 flex flex-col gap-2 border rounded p-2 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`text-sm px-3 py-2 rounded-lg max-w-[80%] whitespace-pre-line ${msg.sender === "ai" ? "bg-blue-100 self-start" : "bg-green-100 self-end"}`}>
              <span className="font-semibold">{msg.sender === "ai" ? "AI" : "You"}:</span> <span dangerouslySetInnerHTML={{ __html: msg.sender === "ai" ? renderMarkdown(msg.text) : msg.text }} />
            </div>
          ))}
          {loading && <div className="text-xs text-gray-500">AI is typing...</div>}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 focus:outline-none"
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

