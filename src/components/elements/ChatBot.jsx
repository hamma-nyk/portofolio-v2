import { useState, useRef, useEffect, lazy, Suspense } from "react";
import {
  Send,
  MessageCircle,
  X,
  Bot,
  User,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReactMarkdown = lazy(() => import("react-markdown"));

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setShowBot] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `Halo! 👋 Saya **Asia**, asisten pribadi Iko. Tanya apa saja tentang portofolio, skill, atau proyek Iko.\n\nHi! 👋 I'm **Asia**, Iko's personal assistant. Ask me anything about Iko's portfolio, skills, or projects.`,
    },
  ]);

  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowBot(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
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
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "system", content: data.response || "Maaf, saya sedang offline sebentar." },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "system", content: "Waduh, koneksi saya sedang gangguan. Coba lagi nanti ya!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[380px] h-[70vh] sm:h-[500px] max-h-[80vh] bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center border border-white/20">
                  <User size={18} className="text-white" />
                  <img
                    className="absolute w-full h-full object-cover rounded-full"
                    src="./assets/image/asia.png"
                    alt=""
                    loading="lazy"
                  />
                  <span className="absolute -bottom-0 -right-1 w-3 h-3 bg-green-500 border-2 border-neutral-900 rounded-full"></span>
                </div>

                <div>
                  <h3 className="text-white font-bold text-xs sm:text-sm flex items-center gap-1">
                    Asia Assistant{" "}
                    <span className="px-1.5 py-0.5 rounded text-[8px] bg-blue-500/20 text-blue-300 font-medium border border-blue-500/30">
                      AI
                    </span>
                    <span className="hidden sm:inline px-1.5 py-0.5 rounded text-[8px] bg-neutral-500/20 text-neutral-300 font-medium border border-neutral-500/30">
                      Beta 1.0
                    </span>
                  </h3>
                  <p className="text-xs text-green-400 mt-0.5 sm:mt-1 flex items-center gap-1">
                    Online & Ready
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 sm:gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user" ? "bg-purple-500/20" : "bg-blue-500/20"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <User size={12} className="text-purple-400" />
                    ) : (
                      <Bot size={12} className="text-blue-400" />
                    )}
                  </div>

                  <div
                    className={`p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[80%] whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-purple-500/20 text-purple-100 rounded-tr-none border border-purple-500/20"
                        : "bg-blue-600/20 text-blue-50 rounded-tl-none border border-blue-500/20"
                    }`}
                  >
                    <Suspense fallback={<span>{msg.content}</span>}>
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-semibold text-white">{children}</strong>
                          ),
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </Suspense>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Bot size={12} className="text-blue-400" />
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-2xl rounded-tl-none bg-neutral-800 border border-neutral-700 flex items-center gap-2">
                    <Loader2 size={14} className="text-blue-400 animate-spin" />
                    <span className="text-xs text-gray-400">Typing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-2.5 sm:p-3 bg-neutral-900/50 border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Iko..."
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-2.5 sm:py-3 pl-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="cursor-pointer absolute right-2 p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB & Sonar */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        {!isOpen &&
          [0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border-2 border-blue-400/50 hidden sm:block"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 2.5], opacity: [0, 0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
            />
          ))}

        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
          className="cursor-pointer absolute z-10 group flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl shadow-neutral-900 text-white overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-white/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  <MessageCircle size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isOpen && messages.length > 1 && (
            <span className="absolute top-0 right-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 border-2 border-neutral-900 rounded-full z-20"></span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatBot;
