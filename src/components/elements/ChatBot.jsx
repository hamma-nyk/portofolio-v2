import { useState, useRef, useEffect, lazy, Suspense } from "react";
import {
  Send,
  X,
  Bot,
  User,
<<<<<<< HEAD
  Sparkles,
  RotateCcw,
=======
  Loader2,
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ReactMarkdown = lazy(() => import("react-markdown"));

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
<<<<<<< HEAD
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);

  const scrollRef = useRef(null);

  // Auto-scroll ke pesan terbaru
=======
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

>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

<<<<<<< HEAD
  const sendMessageToApi = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
=======
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
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

  const handleSend = async (e) => {
    e.preventDefault();
    await sendMessageToApi(input);
  };

  const handleReset = () => {
    if (isLoading) return;
    setMessages([INITIAL_MESSAGE]);
  };

  return (
<<<<<<< HEAD
    <div className="fixed bottom-5 right-4 sm:right-6 z-[100] flex flex-col items-end">
      {/* 🔹 Chat Window */}
=======
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-[100] flex flex-col items-end">
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
<<<<<<< HEAD
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
=======
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
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
                </div>

                <div>
<<<<<<< HEAD
                  <h3 className="text-white font-bold text-sm flex items-center gap-1.5">
                    <span>Asia</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-blue-500/15 text-blue-300 font-medium border border-blue-500/30">
                      <Sparkles size={10} />
                      AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-emerald-400/90 flex items-center gap-1 mt-0.5">
                    Online &bull; Portfolio Assistant
=======
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
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
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
<<<<<<< HEAD
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
=======
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
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
<<<<<<< HEAD
            <form
              onSubmit={handleSend}
              className="p-3 bg-neutral-950/90 border-t border-neutral-800"
            >
              <div className="relative flex items-center bg-neutral-900 border border-neutral-800 focus-within:border-blue-500/60 rounded-xl transition-colors">
=======
            <form onSubmit={handleSend} className="p-2.5 sm:p-3 bg-neutral-900/50 border-t border-white/5">
              <div className="relative flex items-center">
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Iko..."
<<<<<<< HEAD
                  className="w-full bg-transparent py-3 pl-4 pr-12 text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none"
=======
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl py-2.5 sm:py-3 pl-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
<<<<<<< HEAD
                  aria-label="Send message"
                  className="cursor-pointer absolute right-1.5 p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Send size={15} />
=======
                  className="cursor-pointer absolute right-2 p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                >
                  <Send size={14} />
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

<<<<<<< HEAD
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
=======
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
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
    </div>
  );
};

export default ChatBot;
