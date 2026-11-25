import { useState, useRef, useEffect } from "react";
import {
  Send,
  X,
  Bot,
  User,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

const INITIAL_MESSAGE = {
  role: "system",
  content:
    "Halo! 👋 Saya **Asia**, asisten AI Iko. Tanya apa saja tentang portofolio, pengalaman, atau proyek Iko.\n\nHi! 👋 I’m **Asia**, Iko’s AI assistant. Ask me anything about Iko’s portfolio, skills, or projects.",
};

const QUICK_PROMPTS = [
  "What are Iko's main skills?",
  "Tell me about Iko's projects",
  "How can I contact Iko?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);

  const scrollRef = useRef(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessageToApi = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://portofolio-ai.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Secret-Token": "alahtempek-123",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();

      const botMessage = {
        role: "system",
        content: data.response || "Maaf, saya sedang offline sebentar.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Waduh, koneksi saya sedang gangguan. Coba lagi nanti ya!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    await sendMessageToApi(input);
  };

  const handleReset = () => {
    if (isLoading) return;
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-[100] flex flex-col items-end">
      {/* 🔹 Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3.5 w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[78vh] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-neutral-950/90 border-b border-neutral-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
                  <img
                    className="w-full h-full object-cover rounded-xl"
                    src="/assets/image/asia.png"
                    alt="Asia AI Assistant"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
                </div>

                <div>
                  <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                    <span>Asia</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-blue-500/15 text-blue-300 font-medium border border-blue-500/30">
                      <Sparkles size={10} />
                      AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-emerald-400/90 flex items-center gap-1 mt-0.5">
                    Online &bull; Portfolio Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {messages.length > 1 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Reset chat"
                    aria-label="Reset chat"
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={15} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 border border-transparent hover:border-neutral-700 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-900"
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex gap-2.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border mt-0.5 ${
                        isUser
                          ? "bg-purple-500/15 border-purple-500/30 text-purple-300"
                          : "bg-blue-500/15 border-blue-500/30 text-blue-300"
                      }`}
                    >
                      {isUser ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[82%] whitespace-pre-line ${
                        isUser
                          ? "bg-purple-600/20 text-purple-50 rounded-tr-sm border border-purple-500/30"
                          : "bg-neutral-800/80 text-gray-200 rounded-tl-sm border border-neutral-700/70"
                      }`}
                    >
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-semibold text-white">
                              {children}
                            </strong>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 underline hover:text-blue-300"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                );
              })}

              {/* Quick Prompt Suggestions (when conversation just started) */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-2 pl-9 flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => sendMessageToApi(prompt)}
                      className="text-left text-xs px-3 py-1.5 rounded-full bg-neutral-800/90 border border-neutral-700 hover:border-blue-500/60 text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-neutral-800/80 border border-neutral-700/70 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-neutral-950/90 border-t border-neutral-800"
            >
              <div className="relative flex items-center bg-neutral-900 border border-neutral-800 focus-within:border-blue-500/60 rounded-xl transition-colors">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Iko..."
                  className="w-full bg-transparent py-3 pl-4 pr-12 text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="cursor-pointer absolute right-1.5 p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={15} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Modern AI Trigger Button */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        className={`group relative flex items-center gap-2.5 rounded-full border shadow-xl shadow-black/50 transition-all duration-300 cursor-pointer select-none ${
          isOpen
            ? "p-3.5 bg-neutral-900 border-neutral-700 hover:border-red-500/50 text-white"
            : "p-2.5 sm:pl-2.5 sm:pr-4 sm:py-2 bg-neutral-900 border-neutral-700/90 hover:border-blue-500/60 text-white"
        }`}
      >
        {isOpen ? (
          <X size={22} className="text-gray-300 group-hover:text-white" />
        ) : (
          <>
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
              <Sparkles size={17} className="text-white" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-neutral-900 rounded-full" />
            </div>

            <div className="hidden sm:flex flex-col items-start text-left pr-1">
              <span className="text-xs font-bold text-white leading-none flex items-center gap-1">
                Ask Asia
              </span>
              <span className="text-[10px] text-blue-400 font-mono mt-0.5 leading-none">
                AI Assistant
              </span>
            </div>
          </>
        )}

        {/* Unread / Active Dot (Mobile) */}
        {!isOpen && messages.length > 1 && (
          <span className="sm:hidden absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 border-2 border-neutral-900 rounded-full" />
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;
