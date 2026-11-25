import { Fragment, useEffect, useState } from "react";
import ProjectCard from "../elements/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
<<<<<<< HEAD
import { MonitorCog, CodeXml } from "lucide-react";
import {
  infraProjects,
  webProjects,
  desktopProjects,
} from "@/data/projects";
=======
import { ChevronLeft, ChevronRight } from "lucide-react";

// 🔹 Sub-Component: ProjectSlider
// Menangani logika Next/Prev untuk setiap kategori
const ProjectSlider = ({ title, projects, gradientColor }) => {
  const ITEMS_PER_PAGE = 2; // Tampilkan 4 item per halaman
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = Next, -1 = Prev

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const hasMultiplePages = totalPages > 1;
  const gradientMap = {
    purple: "from-purple-500/30",
    blue: "from-blue-500/30",
    pink: "from-pink-500/30",
    cyan: "from-cyan-500/30",
  };
  const activeGradient = gradientMap[gradientColor] || "from-purple-500/30";

  // Logika Pagination
  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages); // Loop kembali ke awal
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages); // Loop ke akhir
  };

  // Data yang ditampilkan saat ini (hanya 4 item)
  const currentProjects = projects.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  // Animasi Slide
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full mb-24">
      {/* --- Header Kategori & Kontrol Navigasi --- */}
      {/* --- Header Kategori & Kontrol Navigasi --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 overflow-hidden">
        <div className="flex items-center gap-4 flex-grow">
          {/* Judul Kategori: Slide in dari kiri */}
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white flex items-center gap-2"
          >
            {title}
          </motion.h2>

          {/* Garis Divider: Efek memanjang (scaleX) dari kiri ke kanan */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
            style={{ transformOrigin: "left" }} // Kunci agar memanjang dari kiri
            className={`h-[1px] flex-grow bg-gradient-to-r ${activeGradient} to-transparent`}
          ></motion.div>
        </div>

        {/* Tombol Navigasi: Slide in dari kanan */}
        {hasMultiplePages && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-mono text-gray-500 mr-2">
              Page {currentPage + 1}/{totalPages}
            </span>
            <button
              onClick={handlePrev}
              className="cursor-pointer p-2 rounded-full bg-neutral-800/80 border border-neutral-700 hover:border-blue-500/50 hover:text-blue-400 transition-all active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="cursor-pointer p-2 rounded-full bg-neutral-800/80 border border-neutral-700 hover:border-blue-500/50 hover:text-blue-400 transition-all active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </div>

      {/* --- Grid Projects (Slider Area) --- */}
      {/* min-h menjaga tinggi agar tidak layout shift saat ganti halaman */}
      <div className="relative min-h-[100px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage} // Key berubah = trigger animasi ulang
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {currentProjects.map((project, i) => (
              <ProjectCard key={`${title}-${i}`} {...project} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Projects = ({ goto }) => {
  // --- DATA PROJECTS ---
  const infra = [
    {
      title: "Topology Design and Implementation of Network Infrastructure",
      img: "./assets/image/networking.png",
      desc: "PT Nusantara Building Industries",
      descModal: `- Design network topology\n- Fiber Optic installation\n- Network infrastructure management & installation`,
      tech: ["draw.io", "Mikrotik", "Ruijie", "Ubiquiti", "Fiber Optic"],
    },
    {
      title: "Topology Design and Implementation of CCTV Infrastructure",
      img: "./assets/image/cctv.png",
      desc: "PT Nusantara Building Industries",
      tech: ["draw.io", "HIKVISION"],
    },
    {
      title: "TrueNAS and ESXi Infrastructure Management",
      img: "./assets/image/truenas.png",
      desc: "PT Nusantara Building Industries",
      descModal: `- TrueNAS & ESXi installation\n- User storage pool & group management\n- VM & Server management`,
      tech: ["TrueNAS", "ESXi", "Linux"],
    },
    {
      title: "Network and VM Monitoring Dashboard",
      img: "./assets/image/dashboard.png",
      desc: "PT Nusantara Building Industries",
      tech: ["SocketIO", "NodeJS", "SSH"],
    },
  ];

  const webProjects = [
    {
      title: "English Word Suggestion",
      img: "./assets/image/lletter.png",
      desc: "English word suggestion app using ReactJS",
      link: "https://lletter.vercel.app/",
      tech: ["ReactJS", "TailwindCSS"],
    },
    {
      title: "Youtube Downloader",
      img: "./assets/image/ytdlp.png",
      desc: "YtDlp Web UI using ReactJS",
      link: "https://my-ytdlp.vercel.app/",
      tech: ["ReactJS", "TailwindCSS", "shadCN", "FastAPI"],
    },
    {
      title: "MonoBlog",
      img: "./assets/image/monoblog.png",
      desc: "Simple blog using NextJS",
      link: "https://cakhem-blog.vercel.app/",
      tech: ["NextJS", "TailwindCSS", "shadCN", "Supabase"],
    },
    {
      title: "MyCtn",
      img: "./assets/image/myctn.png",
      desc: "Simple note app using NextJS",
      link: "https://myctn.vercel.app/",
      tech: ["NextJS", "TailwindCSS", "shadCN", "Supabase"],
    },
    {
      title: "QRNBI",
      img: "./assets/image/qrnbi.png",
      desc: "QR code generator for PT Nusantara Building Industries operational use.",
      link: "https://qrnbi.web.id/",
      tech: ["ReactJS", "TailwindCSS"],
    },
    {
      title: "KonekoBot",
      img: "./assets/image/konekobot.png",
      desc: "WhatsApp bot for automating tasks.",
      link: "https://konekobot.web.id/",
      tech: ["NodeJS", "ReactJS", "Flask"],
    },
    {
      title: "KonekoCert",
      img: "./assets/image/konekocert.png",
      desc: "Fake course certificate generator.",
      link: "https://konekocert.web.id/",
      tech: ["ReactJS", "TailwindCSS"],
    },
  ];

  const desktopProjects = [
    {
      title: "Nanostation AP Restart Scheduler",
      img: "./assets/image/aprestart.png",
      desc: "Shcedule Nanostation AP restart.",
      descModal: "This tools is for local use. Contact me if you want a demo.",
      tech: ["Python", "Paramiko"],
    },
    {
      title: "MDB Access to SQL Server",
      img: "./assets/image/mdbconvert.png",
      desc: "Shcedule and convert data from MDB to SQL Server",
      descModal: "This tools is for local use. Contact me if you want a demo.",
      tech: ["Python", "Pyodbc"],
    },
    {
      title: "Local Desktop Ping Monitor Tools",
      img: "./assets/image/dping.png",
      desc: "Desktop ping monitor tools with WhatsApp notification.",
      descModal: "This tools is for local use. Contact me if you want a demo.",
      tech: ["Python", "NodeJS"],
      preview:
        "https://www.linkedin.com/posts/myikos_project-desktop-network-ping-monitoring-activity-7384213008908177408-nxC2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6skr4BMfn0B9yURR30RUCZ-jPlmoMbSlQ",
    },
    {
      title: "Auto-Restart Scheduler for Attendance Machine",
      img: "./assets/image/rfrestart.png",
      desc: "Restarter for Attendance Machine. [ZKTeco]",
      descModal: "This tools is for local use. Contact me if you want a demo.",
      preview:
        "https://www.linkedin.com/posts/myikos_update-project-auto-restart-scheduler-for-activity-7381927489880846336-2-k4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD6skr4BMfn0B9yURR30RUCZ-jPlmoMbSlQ",
      tech: ["Python"],
    },
    {
      title: "Desktop Telegram Broadcast Tools",
      img: "./assets/image/tgbroadcast.png",
      desc: "Broadcast messages to multiple Telegram groups.",
      tech: ["Python"],
      descModal: "This tools is for sale. Contact me if you are interested.",
    },
  ];
>>>>>>> 78059343c7dd04263750be22a889f70648d31ef6

const Projects = ({ goto, initialTab }) => {
  // Konfigurasi container untuk mengatur antrean (stagger) antar kata
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Kecepatan muncul antar kata (0.05 detik)
        delayChildren: 0.1, // Jeda sebelum kata pertama muncul
      },
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

  // State Switch Tab: "it-support" | "app-dev"
  const [activeTab, setActiveTab] = useState(initialTab || "it-support");

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const itProjects = infraProjects;
  const appProjects = [...webProjects, ...desktopProjects];
  const activeProjects = activeTab === "it-support" ? itProjects : appProjects;

  const tabs = [
    {
      id: "it-support",
      label: "IT Support",
      icon: MonitorCog,
      count: itProjects.length,
      gradient: "from-blue-600 to-blue-500",
    },
    {
      id: "app-dev",
      label: "App Development",
      icon: CodeXml,
      count: appProjects.length,
      gradient: "from-purple-600 to-purple-500",
    },
  ];

  return (
    <Fragment>
      <section
        id="projects"
        ref={goto}
        className="relative w-full pt-16 sm:pt-24 px-4 overflow-hidden min-h-screen"
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* --- Header Utama --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Projects
              </span>
            </h1>
            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="w-full sm:w-2/3 mx-auto flex flex-wrap justify-center text-gray-400 leading-relaxed text-sm sm:text-base"
            >
              {/* Bagian Teks Biasa */}
              {"A showcase of my technical explorations, reflecting my passion for"
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={`text1-${i}`}
                    variants={wordVariants}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}

              {/* Teks dengan Warna Khusus (Inovasi) */}
              <motion.span
                variants={wordVariants}
                className="text-blue-400 font-semibold mr-[0.25em]"
              >
                innovation
              </motion.span>

              <motion.span variants={wordVariants} className="mr-[0.25em]">
                and
              </motion.span>

              {/* Teks dengan Warna Khusus (Problem Solving) */}
              <motion.span
                variants={wordVariants}
                className="text-purple-400 font-semibold mr-[0.1em]"
              >
                problem-solving
              </motion.span>

              <motion.span variants={wordVariants}>.</motion.span>
            </motion.p>
          </motion.div>

          {/* --- Tab Switcher Modern --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center mb-10 sm:mb-14"
          >
            <div className="relative inline-flex sm:flex bg-neutral-800/80 p-1.5 rounded-full border border-neutral-700 shadow-xl shadow-black/30 w-auto sm:w-full sm:max-w-md">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={tab.label}
                    title={tab.label}
                    className={`relative z-10 flex-1 sm:w-1/2 text-center font-medium px-5 sm:px-4 py-2.5 sm:py-3 rounded-full transition-colors duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer select-none whitespace-nowrap ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeProjectTabIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${tab.gradient} shadow-md`}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Icon size={18} className="shrink-0 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span
                        className={`text-[11px] sm:text-xs font-mono px-1.5 py-0.5 rounded-full transition-colors ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-neutral-700/60 text-gray-400"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* --- Grid Projects Portrait (Tanpa Pemisah Sub-kategori) --- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeProjects.map((project, i) => (
                <motion.div
                  key={`${activeTab}-${project.title}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.4,
                    delay: (i % 3) * 0.06,
                    ease: "easeOut",
                  }}
                  className="h-full"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </Fragment>
  );
};

export default Projects;
