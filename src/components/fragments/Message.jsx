import { Fragment, useState, useRef } from "react";
import emailjs from "emailjs-com";
import {
  Mail,
  Send,
  User,
  MessageSquare,
  AtSign,
  Hash,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Loader2,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Message = ({ goto }) => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const form = useRef();
  const [activeTab, setActiveTab] = useState("email"); // "email" | "telegram"

  const sendEmail = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .sendForm(
        "service_8t8tz35",
        "template_t4grhe3",
        e.target,
        "mLA7c5q0L6d7eOUP_",
      )
      .then(
        () => {
          setSent(true);
          setSending(false);
          e.target.reset();
          setTimeout(() => setSent(false), 3500);
        },
        (error) => {
          alert("Failed to send message: " + error.text);
          setSending(false);
        },
      );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setSending(true);

    const name = e.target.name.value;
    const euname = e.target.euname.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    const text =
      `💌  Hello Dev! there's a new message! %0A%0A` +
      `🙋‍♂️  Name: ${name}%0A` +
      `📥  E/TG: ${euname}%0A` +
      `📄  Subject: ${subject}%0A%0A` +
      `🗒  Messages: ${message}%0A`;

    const url = `https://api.telegram.org/bot6601751803:AAGABxX-ZcTvwHw3_hVV8kt-ZQx6iJzSYGc/sendMessage?chat_id=782491852&text=${text}`;

    try {
      await fetch(url);
      setSent(true);
      e.target.reset();
      setTimeout(() => setSent(false), 3500);
    } catch {
      alert("Failed to send message. Please try again!");
    } finally {
      setSending(false);
    }
  };

  const tabs = [
    {
      id: "email",
      label: "Email",
      icon: Mail,
      gradient: "from-blue-600 to-blue-500",
    },
    {
      id: "telegram",
      label: "Telegram",
      icon: Send,
      gradient: "from-purple-600 to-purple-500",
    },
  ];

  const isEmail = activeTab === "email";

  return (
    <Fragment>
      <section
        id="messages"
        ref={goto}
        className="flex flex-col w-full justify-center py-24 px-4 min-h-screen relative overflow-hidden"
      >
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Touch
              </span>
            </h1>

            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="w-full sm:w-2/3 mx-auto flex flex-wrap justify-center text-center text-gray-400 leading-relaxed text-sm sm:text-base"
            >
              {"Have a project in mind or just want to chat? Choose your preferred platform below."
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={`msg-${i}`}
                    variants={wordVariants}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
          </motion.div>

          {/* Bento Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
            {/* LEFT PANEL: Contact Info & Socials */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              viewport={{ once: true }}
              className="lg:col-span-2 relative bg-neutral-900/95 border border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-xl shadow-black/30"
            >
              <div className="relative z-10">
                {/* Availability Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Open for opportunities</span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 leading-snug">
                  Let&apos;s build something{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    great together
                  </span>
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-8">
                  Whether it&apos;s IT infrastructure support, custom web apps, or
                  desktop automation tools — feel free to reach out anytime.
                </p>

                {/* Info Items */}
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-200">
                        Indonesia (Remote / On-site)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Response Time</p>
                      <p className="text-sm font-medium text-gray-200">
                        Usually within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Focus Areas</p>
                      <p className="text-sm font-medium text-gray-200">
                        IT Support &amp; App Development
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Connect Links */}
              <div className="relative z-10 pt-6 border-t border-neutral-800/80">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-3">
                  Connect Directly
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://github.com/hamma-nyk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-800/70 border border-neutral-700/70 hover:border-blue-500/50 hover:bg-neutral-800 text-gray-300 hover:text-white transition-all text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faGithub} />
                      <span>GitHub</span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-gray-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </a>

                  <a
                    href="https://linkedin.com/in/myikos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-neutral-800/70 border border-neutral-700/70 hover:border-purple-500/50 hover:bg-neutral-800 text-gray-300 hover:text-white transition-all text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faLinkedin} />
                      <span>LinkedIn</span>
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-gray-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* RIGHT PANEL: Tab Switcher & Interactive Form */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="lg:col-span-3 relative"
            >
              <div
                className={`relative h-full bg-neutral-900/95 border rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40 flex flex-col transition-colors duration-500 ${
                  isEmail ? "border-blue-500/30" : "border-purple-500/30"
                }`}
              >
                {/* Tab Switcher */}
                <div className="flex items-center justify-between flex-wrap gap-4 mb-7 pb-5 border-b border-neutral-800/80">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Send a Message
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {isEmail
                        ? "Delivered directly to my inbox"
                        : "Instant ping via Telegram Bot"}
                    </p>
                  </div>

                  <div className="relative inline-flex bg-neutral-800/90 p-1 rounded-full border border-neutral-700/80 shadow-inner">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setActiveTab(tab.id);
                            setSent(false);
                          }}
                          className={`relative z-10 px-4 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors duration-300 cursor-pointer select-none ${
                            isActive
                              ? "text-white font-semibold"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeContactTabIndicator"
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 32,
                              }}
                              className={`absolute inset-0 rounded-full bg-gradient-to-r ${tab.gradient} shadow-md`}
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-1.5">
                            <Icon size={15} />
                            <span>{tab.label}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Form Area */}
                <AnimatePresence mode="wait">
                  {isEmail ? (
                    <motion.form
                      key="email-form"
                      ref={form}
                      onSubmit={sendEmail}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4 flex-1"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group">
                          <User
                            className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                            size={18}
                          />
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="w-full text-sm bg-neutral-950/70 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>

                        <div className="relative group">
                          <Mail
                            className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                            size={18}
                          />
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email Address"
                            required
                            className="w-full text-sm bg-neutral-950/70 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="relative group flex-1">
                        <MessageSquare
                          className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                          size={18}
                        />
                        <textarea
                          name="message"
                          placeholder="What's on your mind?"
                          required
                          rows="5"
                          className="w-full h-full min-h-[140px] text-sm bg-neutral-950/70 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all resize-none"
                        />
                      </div>

                      <input
                        type="hidden"
                        name="time"
                        value={new Date().toLocaleString()}
                      />

                      <button
                        type="submit"
                        disabled={sending}
                        className={`mt-2 w-full text-sm font-semibold py-3.5 rounded-xl transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer ${
                          sent
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                        }`}
                      >
                        {sending ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : sent ? (
                          <>
                            <CheckCircle2 size={18} />
                            <span>Message Sent!</span>
                          </>
                        ) : (
                          <>
                            <Send size={17} />
                            <span>Send via Email</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="telegram-form"
                      onSubmit={sendMessage}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4 flex-1"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group">
                          <User
                            className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                            size={18}
                          />
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="w-full text-sm bg-neutral-950/70 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 outline-none transition-all"
                          />
                        </div>
                        <div className="relative group">
                          <AtSign
                            className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                            size={18}
                          />
                          <input
                            type="text"
                            name="euname"
                            placeholder="Username / Email"
                            required
                            className="w-full text-sm bg-neutral-950/70 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <Hash
                          className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                          size={18}
                        />
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject (Optional)"
                          className="w-full text-sm bg-neutral-950/70 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 outline-none transition-all"
                        />
                      </div>

                      <div className="relative group flex-1">
                        <MessageSquare
                          className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-purple-400 transition-colors"
                          size={18}
                        />
                        <textarea
                          name="message"
                          placeholder="Write your telegram message..."
                          required
                          rows="4"
                          className="w-full h-full min-h-[115px] text-sm bg-neutral-950/70 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={sending}
                        className={`mt-2 w-full text-sm font-semibold py-3.5 rounded-xl transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer ${
                          sent
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                            : "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25"
                        }`}
                      >
                        {sending ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : sent ? (
                          <>
                            <CheckCircle2 size={18} />
                            <span>Message Sent!</span>
                          </>
                        ) : (
                          <>
                            <Send size={17} />
                            <span>Send via Telegram</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Message;
