<<<<<<< HEAD
import { Fragment, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonNav from "@/components/elements/ButtonNav";
import Experiences from "@/components/fragments/Experiences";
import About from "@/components/fragments/About";
import Projects from "@/components/fragments/Projects";
import Message from "@/components/fragments/Message";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "@/components/ui/shadcn-io/particles";
import {
  House,
  User,
  Briefcase,
  FolderKanban,
  Mail,
  ArrowRight,
  Download,
  ChevronDown,
  Terminal,
} from "lucide-react";
import ChatBot from "@/components/elements/ChatBot";
=======
import {
  Fragment,
  useState,
  useEffect,
  useRef,
  useMemo,
  lazy,
  Suspense,
} from "react";
import ButtonNav from "@/components/elements/ButtonNav";
import CodeTemplate from "@/components/elements/CodeTemplate";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { Particles } from "@/components/ui/shadcn-io/particles";
import { House, User, Briefcase, FolderKanban, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Experiences = lazy(() => import("@/components/fragments/Experiences"));
const About = lazy(() => import("@/components/fragments/About"));
const Projects = lazy(() => import("@/components/fragments/Projects"));
const Message = lazy(() => import("@/components/fragments/Message"));
const ChatBot = lazy(() => import("@/components/elements/ChatBot"));

>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
const Home = () => {
  const [isScroll, setIsScroll] = useState(false);
  const HomeSection = useRef(null);
  const AboutSection = useRef(null);
  const ExperiencesSection = useRef(null);
  const ProjectsSection = useRef(null);
  const MessageSection = useRef(null);

  const words = ["I'm an IT Support", "I'm a Developer"];
  const [index, setIndex] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const measureRef = useRef(null);
  const [activeNav, setActiveNav] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const [projectTab, setProjectTab] = useState(null);

  // Pastikan browser tidak menahan posisi scroll saat refresh
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!location.state?.scrollTo) {
      window.scrollTo({ top: 0, behavior: "instant" });
      setActiveNav("home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll ke section tertentu jika kembali dari halaman ProjectDetail, lalu bersihkan state agar refresh kembali ke Home
  useEffect(() => {
    if (location.state?.activeTab) {
      setProjectTab(location.state.activeTab);
    }
    if (location.state?.scrollTo) {
      const targetMap = {
        home: HomeSection,
        about: AboutSection,
        experiences: ExperiencesSection,
        projects: ProjectsSection,
        message: MessageSection,
      };
      const targetRef = targetMap[location.state.scrollTo];
      if (targetRef?.current) {
        setTimeout(() => {
          targetRef.current.scrollIntoView({ behavior: "smooth" });
          setActiveNav(location.state.scrollTo);
          navigate(location.pathname, { replace: true, state: null });
        }, 80);
      }
    }
  }, [location.state, location.pathname, navigate]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.2 },
      },
    }),
    [],
  );

<<<<<<< HEAD
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  // 2. Gunakan satu scroll listener pasif + rAF untuk menghindari layout thrashing
=======
  const wordVariants = useMemo(
    () => ({
      hidden: { filter: "blur(12px)", opacity: 0, y: 10 },
      visible: {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    [],
  );

  const navItems = useMemo(
    () => [
      {
        id: "home",
        section: HomeSection,
        text: "Home",
        icon: House,
        label: "Home",
      },
      {
        id: "about",
        section: AboutSection,
        text: "About",
        icon: User,
        label: "About",
      },
      {
        id: "experiences",
        section: ExperiencesSection,
        text: "Experiences",
        icon: Briefcase,
        label: "Exp",
      },
      {
        id: "projects",
        section: ProjectsSection,
        text: "Projects",
        icon: FolderKanban,
        label: "Projects",
      },
      {
        id: "message",
        section: MessageSection,
        text: "Contact",
        icon: Mail,
        label: "Contact",
      },
    ],
    [],
  );

>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
  useEffect(() => {
    let ticking = false;
    const sections = [
      { id: "home", ref: HomeSection },
      { id: "about", ref: AboutSection },
      { id: "experiences", ref: ExperiencesSection },
      { id: "projects", ref: ProjectsSection },
      { id: "message", ref: MessageSection },
    ];

<<<<<<< HEAD
    const updateOnScroll = () => {
      const y = window.scrollY;
      setIsScroll(y > 0);
      const scrollPosition = y + 300;

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i].ref.current;
        if (
          el &&
          el.offsetTop <= scrollPosition &&
          el.offsetTop + el.offsetHeight > scrollPosition
        ) {
          setActiveNav(sections[i].id);
          break;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

=======
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 300;
        setIsScroll(window.scrollY > 0);
        sections.forEach((section) => {
          if (
            section.ref.current &&
            section.ref.current.offsetTop <= scrollPosition &&
            section.ref.current.offsetTop + section.ref.current.offsetHeight >
              scrollPosition
          ) {
            setActiveNav(section.id);
          }
        });
        ticking = false;
      });
    };

>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateWidth = () => {
      if (measureRef.current) setMaxWidth(measureRef.current.offsetWidth);
    };
    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    if (measureRef.current) resizeObserver.observe(measureRef.current);

    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      resizeObserver.disconnect();
    };
  }, [index]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const JumpToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

<<<<<<< HEAD
=======
  const buttons = useMemo(
    () => [
      { text: "Download CV", icon: faDownload, link: "#", primary: true },
      { text: "Github", icon: faGithub, link: "https://github.com/hamma-nyk" },
      {
        text: "Linkedin",
        icon: faLinkedin,
        link: "https://linkedin.com/in/myikos",
      },
    ],
    [],
  );

>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
  return (
    <Fragment>
      <Particles
        className="fixed inset-0 z-0 pointer-events-none"
        quantity={35}
        ease={50}
        staticity={20}
        color="#ffffff"
        size={0.8}
      />
      <div className="flex mx-auto w-full h-full bg-neutral-900 flex-col dark:text-white">
        {/* NAVBAR */}
        <section
          id="navbar"
          className={`flex fixed top-0 w-full justify-center z-50 transition-all duration-300 ease-in-out ${
            isScroll
              ? "shadow-lg bg-neutral-900/90 backdrop-blur-md border-b border-neutral-700/50"
              : "bg-neutral-900 border-b border-neutral-700/0"
          }`}
        >
          <div className="flex w-[90%] sm:w-4/5 md:w-2/3 h-16 sm:h-20 items-center justify-between font-[500]">
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              {navItems.map((item) => (
                <ButtonNav
                  key={item.id}
                  text={item.text}
                  isActive={activeNav === item.id}
                  onClick={() => {
                    JumpToSection(item.section);
                    setActiveNav(item.id);
                  }}
                />
              ))}
            </div>
            <div className="flex sm:hidden justify-evenly w-full items-center px-1">
              {navItems.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      JumpToSection(item.section);
                      setActiveNav(item.id);
                    }}
                    aria-label={item.label}
                    className={`group relative p-2.5 rounded-2xl transition-all duration-300 focus:outline-none ${
                      isActive ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 transition-opacity duration-300 pointer-events-none ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }`}
                    ></div>
                    <item.icon
                      className={`relative z-10 w-5 h-5 transition-colors duration-300 drop-shadow-sm ${
                        isActive
                          ? "text-blue-300"
                          : "text-gray-400 group-hover:text-blue-300"
                      }`}
                      strokeWidth={2}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOME SECTION */}
        <section
          id="home"
          ref={HomeSection}
          className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-16"
        >
<<<<<<< HEAD
          <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* LEFT COLUMN: Identity, Dynamic Role & Primary CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Availability Pill */}
=======
          <div className="flex flex-col h-screen w-full items-start justify-center px-4 sm:px-0">
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-3xl sm:text-3xl md:text-5xl font-[700] px-1 sm:px-5 relative text-white mb-4 sm:mb-6 leading-tight"
            >
              <div className="flex flex-wrap items-center">
                {"Hello there!".split(" ").map((word, i) => (
                  <motion.span
                    key={`h1-${i}`}
                    variants={wordVariants}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span variants={wordVariants}>😹</motion.span>
              </div>

              <div className="flex flex-wrap items-center mt-2">
                {"You can call me".split(" ").map((word, i) => (
                  <motion.span
                    key={`h2-${i}`}
                    variants={wordVariants}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  variants={wordVariants}
                  className="text-2xl sm:text-3xl md:text-5xl font-[700] text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400"
                >
                  Iko
                </motion.span>
              </div>

>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-gray-300 mb-6"
              >
<<<<<<< HEAD
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>IT Support &amp; App Developer</span>
              </motion.div>

              {/* 1. TEXT ANIMATION (Staggered Word Blur) */}
              <motion.h1
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl sm:text-5xl lg:text-[3.25rem] font-[700] relative text-white mb-5 leading-tight"
=======
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="block font-[700] text-blue-400 text-2xl sm:text-3xl md:text-5xl"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              <span
                ref={measureRef}
                className="opacity-0 absolute left-0 top-0 font-[700] text-2xl sm:text-3xl md:text-5xl whitespace-nowrap pointer-events-none select-none"
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
              >
                <div className="flex flex-wrap items-center">
                  {"Hello there!".split(" ").map((word, i) => (
                    <motion.span
                      key={`h1-${i}`}
                      variants={wordVariants}
                      className="mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                  <motion.span variants={wordVariants}>😹</motion.span>
                </div>

<<<<<<< HEAD
                <div className="flex flex-wrap items-center mt-2">
                  {"You can call me".split(" ").map((word, i) => (
                    <motion.span
                      key={`h2-${i}`}
                      variants={wordVariants}
                      className="mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                  <motion.span
                    variants={wordVariants}
                    className="font-[700] text-transparent bg-clip-text bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400"
                  >
                    Iko
                  </motion.span>
                </div>

                {/* Dynamic Text */}
                <motion.div
                  variants={wordVariants}
                  className="inline-block overflow-hidden align-top mt-2"
                  style={{
                    height: "1.25em",
                    minWidth: maxWidth ? `${maxWidth}px` : "auto",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="block font-[700] text-blue-400"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>

                {/* 🔹 Hidden element for width measurement */}
                <span
                  ref={measureRef}
                  className="opacity-0 absolute left-0 top-0 font-[700] text-3xl sm:text-5xl lg:text-[3.25rem] whitespace-nowrap pointer-events-none select-none"
                >
                  I&apos;m a Web Developer
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8"
              >
                Bridging reliable enterprise IT infrastructure with clean,
                automated web and desktop applications.
              </motion.p>

              {/* Primary Hero CTAs (No duplicate GitHub/LinkedIn) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <button
                  onClick={() => {
                    JumpToSection(ProjectsSection);
                    setActiveNav("projects");
                  }}
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <a
                  href="#"
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-neutral-900/90 border border-neutral-800 hover:border-blue-500/50 text-gray-200 hover:text-white text-sm font-medium transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Download size={16} className="text-blue-400" />
                  <span>Download CV</span>
=======
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="w-full"
            >
              <CodeTemplate />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 sm:gap-4 pl-1 sm:pl-5"
            >
              {buttons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.link}
                  target={btn.link === "#" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="w-10 sm:w-auto mt-4 sm:mt-6 text-sm group relative px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-neutral-800/80 border border-neutral-700/50 text-gray-300 font-medium transition-all duration-300 hover:text-white hover:-translate-y-1 overflow-hidden hover:border-purple-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-center gap-3 z-10">
                    <FontAwesomeIcon
                      icon={btn.icon}
                      className={`transition-transform duration-300 group-hover:scale-105 ${
                        btn.primary ? "text-blue-400" : ""
                      }`}
                    />
                    <span className="hidden sm:inline">{btn.text}</span>
                  </div>
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
                </a>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Sleek Code / Terminal Window */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
              className="lg:col-span-5 w-full"
            >
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                {/* Terminal Title Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-950/80 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                    <Terminal size={12} className="text-blue-400" />
                    <span>iko.profile.js</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    ready
                  </span>
                </div>

                {/* Code Content */}
                <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                  <div className="flex gap-4">
                    <div className="select-none text-neutral-600 text-right space-y-1">
                      <div>1</div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                      <div>6</div>
                      <div>7</div>
                      <div>8</div>
                    </div>
                    <div className="space-y-1 whitespace-nowrap">
                      <div>
                        <span className="text-purple-400">const</span>{" "}
                        <span className="text-blue-300">iko</span>{" "}
                        <span className="text-white">=</span>{" "}
                        <span className="text-purple-400">{"{"}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-400">roles:</span>{" "}
                        <span className="text-amber-200">[</span>
                        <span className="text-emerald-300">
                          &quot;IT Support&quot;
                        </span>
                        <span className="text-white">, </span>
                        <span className="text-emerald-300">
                          &quot;Developer&quot;
                        </span>
                        <span className="text-amber-200">]</span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-400">focus:</span>{" "}
                        <span className="text-emerald-300">
                          &quot;Infra &amp; Automation&quot;
                        </span>
                        <span className="text-white">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-gray-400">openToWork:</span>{" "}
                        <span className="text-blue-400">true</span>
                        <span className="text-white">,</span>
                      </div>
                      <div>
                        <span className="text-purple-400">{"}"}</span>
                        <span className="text-white">;</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-purple-400">while</span>{" "}
                        <span className="text-purple-400">(</span>
                        <span className="text-red-400">!</span>
                        <span className="text-yellow-200">goalAchieved</span>
                        <span className="text-blue-200">()</span>
                        <span className="text-purple-400">)</span>{" "}
                        <span className="text-purple-400">{"{"}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-yellow-200">tryAgain</span>
                        <span className="text-blue-200">()</span>
                        <span className="text-white">;</span>
                      </div>
                      <div>
                        <span className="text-purple-400">{"}"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Down Cue */}
          <button
            onClick={() => {
              JumpToSection(AboutSection);
              setActiveNav("about");
            }}
            aria-label="Scroll to About"
            className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-gray-500 hover:text-blue-400 transition-colors cursor-pointer"
          >
            <span className="text-[11px] font-mono tracking-wider uppercase">
              Scroll
            </span>
            <ChevronDown size={18} className="animate-bounce" />
          </button>
        </section>

<<<<<<< HEAD
        <About goto={AboutSection} />
        <Experiences goto={ExperiencesSection} />
        <Projects goto={ProjectsSection} initialTab={projectTab} />
        <Message goto={MessageSection} />
        <ChatBot />
=======
        <Suspense fallback={null}>
          <About goto={AboutSection} />
          <Experiences goto={ExperiencesSection} />
          <Projects goto={ProjectsSection} />
          <Message goto={MessageSection} />
          <ChatBot />
        </Suspense>
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6
      </div>
    </Fragment>
  );
};

export default Home;
