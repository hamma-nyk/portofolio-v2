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

  useEffect(() => {
    let ticking = false;
    const sections = [
      { id: "home", ref: HomeSection },
      { id: "about", ref: AboutSection },
      { id: "experiences", ref: ExperiencesSection },
      { id: "projects", ref: ProjectsSection },
      { id: "message", ref: MessageSection },
    ];

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

  return (
    <Fragment>
      <Particles
        className="absolute inset-0 fixed z-0 pointer-events-none"
        quantity={50}
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
          className="flex flex-col mx-auto justify-center"
        >
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

              <motion.div
                variants={wordVariants}
                className="inline-block overflow-hidden align-top mt-2"
                style={{
                  height: "1.2em",
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
                    className="block font-[700] text-blue-400 text-2xl sm:text-3xl md:text-5xl"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              <span
                ref={measureRef}
                className="opacity-0 absolute left-0 top-0 font-[700] text-2xl sm:text-3xl md:text-5xl whitespace-nowrap pointer-events-none select-none"
              >
                I'm a Web Developer
              </span>
            </motion.h1>

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
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        <Suspense fallback={null}>
          <About goto={AboutSection} />
          <Experiences goto={ExperiencesSection} />
          <Projects goto={ProjectsSection} />
          <Message goto={MessageSection} />
          <ChatBot />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default Home;
