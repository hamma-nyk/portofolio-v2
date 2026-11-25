import { Fragment } from "react";
import {
  MonitorCog,
  CodeXml,
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers,
  Server,
  Terminal,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiNodedotjs,
  SiFlask,
  SiPython,
  SiLaravel,
} from "react-icons/si";

const About = ({ goto }) => {
  const itTools = [
    { name: "Ubiquiti", link: "https://www.ui.com/introduction" },
    { name: "MikroTik", link: "https://www.mikrotik.com" },
    { name: "Ruijie Reyee", link: "https://reyee.ruijie.com" },
    { name: "VMware ESXi", link: "https://www.vmware.com" },
    { name: "TrueNAS", link: "https://www.truenas.com" },
  ];

  const itCapabilities = [
    "Network & Fiber Optic infrastructure design, deployment, and troubleshooting",
    "Server virtualization & storage administration (VMware ESXi, TrueNAS, Linux)",
    "Enterprise ERP operations, CCTV surveillance, and end-user hardware/software support",
  ];

  const devTechs = [
    {
      name: "ReactJS",
      icon: <SiReact className="text-sky-400" />,
      link: "https://react.dev/",
    },
    {
      name: "NextJS",
      icon: <SiNextdotjs className="text-gray-200" />,
      link: "https://nextjs.org/",
    },
    {
      name: "NodeJS",
      icon: <SiNodedotjs className="text-green-500" />,
      link: "https://nodejs.org/en/",
    },
    {
      name: "ExpressJS",
      icon: <SiExpress className="text-gray-300" />,
      link: "https://expressjs.com/",
    },
    {
      name: "Python",
      icon: <SiPython className="text-yellow-400" />,
      link: "https://www.python.org/",
    },
    {
      name: "Flask",
      icon: <SiFlask className="text-gray-300" />,
      link: "https://flask.palletsprojects.com/",
    },
    {
      name: "Laravel",
      icon: <SiLaravel className="text-red-500" />,
      link: "https://laravel.com/",
    },
  ];

  const devCapabilities = [
    "Full-stack web applications with modern UI/UX, REST APIs, and database integration",
    "Desktop & network automation tools (monitoring, schedulers, WhatsApp/Telegram bots)",
    "Database design & migration workflows (PostgreSQL, Microsoft SQL Server, Supabase)",
  ];

  const highlights = [
    {
      icon: ShieldCheck,
      title: "Reliability First",
      desc: "Proactive monitoring and resilient infrastructure to minimize downtime.",
      accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      icon: Zap,
      title: "Automation-Driven",
      desc: "Turning repetitive manual IT operations into fast, reliable scripts and tools.",
      accent: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      icon: Layers,
      title: "End-to-End Perspective",
      desc: "Bridging physical network layers all the way up to production web applications.",
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "16+", label: "Projects Delivered" },
    { value: "2", label: "Core Disciplines" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
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

  return (
    <Fragment>
      <section
        id="about"
        ref={goto}
        className="relative w-full py-24 px-4 overflow-hidden min-h-screen flex flex-col justify-center"
      >
        {/* Background Glow Effects */}
        <div className="absolute bottom-35 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-35 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          {/* --- Header Utama --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Me
              </span>
            </h1>

            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="w-full sm:w-2/3 mx-auto flex flex-wrap justify-center text-gray-400 leading-relaxed text-sm sm:text-base"
            >
              {"Hello! 👋 I work in two areas that I really enjoy:"
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={`about1-${i}`}
                    variants={wordVariants}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}

              <motion.span
                variants={wordVariants}
                className="text-blue-400 font-semibold mr-[0.25em]"
              >
                IT Support
              </motion.span>

              <motion.span variants={wordVariants} className="mr-[0.25em]">
                and
              </motion.span>

              <motion.span
                variants={wordVariants}
                className="text-purple-400 font-semibold"
              >
                App Development
              </motion.span>

              <motion.span variants={wordVariants} className="mr-[0.25em]">
                .
              </motion.span>

              {"They’re different fields, but both teach me how technology helps people do their work better."
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={`about2-${i}`}
                    variants={wordVariants}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
          </motion.div>

          {/* --- Top Summary Banner + Stats --- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-neutral-900/85 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-6 shadow-xl shadow-black/25"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700/80 text-xs font-medium text-gray-300 mb-3">
                  <Terminal size={13} className="text-blue-400" />
                  <span>Infrastructure Meets Software Engineering</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2.5">
                  Practical problem solver across networks, servers, and code.
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Currently working as an IT Support Staff at PT Nusantara Building
                  Industries, I manage enterprise networks, virtualization, and
                  ERP operations while building internal web apps and Python
                  automation tools that eliminate manual bottlenecks.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3.5 text-center"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {stat.value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-400 mt-1 leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- Two Core Discipline Cards --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* CARD 1: IT SUPPORT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-neutral-900/85 backdrop-blur-md border border-neutral-800 hover:border-blue-500/40 rounded-2xl p-6 sm:p-8 transition-colors duration-300 shadow-xl shadow-black/25 flex flex-col"
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                    <MonitorCog size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      IT Support
                    </h2>
                    <p className="text-xs text-blue-300/80 font-medium">
                      Infrastructure, Network &amp; Systems
                    </p>
                  </div>
                </div>
                <Server size={18} className="text-neutral-600 group-hover:text-blue-400/60 transition-colors shrink-0" />
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Ensuring reliable daily operations through proactive network
                administration, hardware/software troubleshooting, and
                enterprise server management.
              </p>

              {/* Capabilities List */}
              <ul className="space-y-2.5 mb-6 flex-grow">
                {itCapabilities.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tools & Platforms */}
              <div className="pt-5 border-t border-neutral-800/80 mt-auto">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Infrastructure &amp; Hardware Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {itTools.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800/80 border border-neutral-700/80 hover:border-blue-500/60 hover:text-blue-300 rounded-lg text-xs font-medium text-gray-300 transition-colors"
                    >
                      <span>{item.name}</span>
                      <ExternalLink size={11} className="opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CARD 2: APP DEVELOPMENT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="group bg-neutral-900/85 backdrop-blur-md border border-neutral-800 hover:border-purple-500/40 rounded-2xl p-6 sm:p-8 transition-colors duration-300 shadow-xl shadow-black/25 flex flex-col"
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                    <CodeXml size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      App Development
                    </h2>
                    <p className="text-xs text-purple-300/80 font-medium">
                      Web Apps &amp; Desktop Automation
                    </p>
                  </div>
                </div>
                <CodeXml size={18} className="text-neutral-600 group-hover:text-purple-400/60 transition-colors shrink-0" />
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-5">
                Building clean, functional web and desktop applications that
                streamline workflows, automate operational tasks, and improve
                team productivity.
              </p>

              {/* Capabilities List */}
              <ul className="space-y-2.5 mb-6 flex-grow">
                {devCapabilities.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="pt-5 border-t border-neutral-800/80 mt-auto">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Core Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {devTechs.map((t, i) => (
                    <a
                      key={t.name || i}
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800/80 border border-neutral-700/80 hover:border-purple-500/60 hover:text-white rounded-lg text-xs font-medium text-gray-300 transition-colors"
                    >
                      <span className="text-sm">{t.icon}</span>
                      <span>{t.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* --- Bottom Value Pillars --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-neutral-900/75 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 flex items-start gap-3.5 transition-colors"
                >
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${item.accent}`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default About;
