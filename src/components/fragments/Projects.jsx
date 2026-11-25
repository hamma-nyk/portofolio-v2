import { Fragment, useEffect, useState } from "react";
import ProjectCard from "../elements/ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import { MonitorCog, CodeXml } from "lucide-react";
import {
  infraProjects,
  webProjects,
  desktopProjects,
} from "@/data/projects";

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
        className="relative w-full pt-24 px-4 overflow-hidden min-h-screen"
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
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
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
