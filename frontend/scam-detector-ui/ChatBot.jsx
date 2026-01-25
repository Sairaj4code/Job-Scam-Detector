import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, AlertTriangle } from "lucide-react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I'm ScamShield AI. I can help you verify job offers, detect scams, or answer questions about internship safety. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      // Connect to the backend we will create
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: data.reply || "I'm having trouble connecting to the server. Please ensure the backend is running." 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "Error: Could not reach the server. Please check your connection." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col h-[80vh] glass-card overflow-hidden relative">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">ScamShield Assistant</h2>
            <p className="text-xs text-gray-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-400" /> AI Powered
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "bot" && (
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                  <Bot className="w-5 h-5 text-red-400" />
                </div>
              )}
              
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === "user" 
                  ? "bg-red-600 text-white rounded-tr-none" 
                  : "bg-white/10 text-gray-100 border border-white/10 rounded-tl-none backdrop-blur-md"
              }`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-300" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-2xl rounded-tl-none border border-white/10">
                <span className="text-sm text-gray-400 animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a suspicious job offer..."
              className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition-colors"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}