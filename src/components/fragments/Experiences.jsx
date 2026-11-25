import { Fragment } from "react";
import ExperienceCard from "../elements/ExperienceCard";
import { motion } from "framer-motion";

const Experiences = (props) => {
  const { goto } = props;

  const experiences = [
    {
      img: "/assets/image/nbi.png",
      title: "PT Nusantara Building Industries",
      position: "IT Support Staff",
      date: "2024 - Present",
      jobdesk: [
        "ERP Operations & Maintenance.",
        "Hardware & Software Troubleshooting, Installation, and Maintenance.",
        "CCTV Installation & Maintenance.",
        "Network Infrastructure Installation & Maintenance [Fiber Optic, Mikrotik, Ubiquiti, Ruijie].",
        "IoT Application Programmer [Python].",
        "Internal Web Developer [NextJS, Flask].",
        "Database Administrator [PostgreSQL, Microsoft SQL].",
        "TrueNAS Infrastructure Administrator.",
        "VMware ESXi Infrastructure Administrator.",
      ],
    },
    {
      img: "/assets/image/udinus.png",
      title: "Universitas Dian Nuswantoro",
      position: "IT Lab Assistant",
      date: "2022 - 2024",
      jobdesk: [
        "Responsible for managing and supervising laboratory operations.",
        "Organized lab activities and assistance schedules to ensure smooth sessions.",
        "Supported students in understanding programming materials delivered by lecturers.",
      ],
    },
    {
      img: "/assets/image/bangkit.png",
      title: "Bangkit Academy",
      position: "Machine Learning Student",
      date: "2023 (6 Months)",
      jobdesk: [
        "Developed APIs and implemented Machine Learning models [Python, TensorFlow, Flask].",
        "Collaborated with the Android Development Team to build and integrate application features.",
      ],
    },
    {
      img: "/assets/image/fga.png",
      title: "Digital Talent Scholarship",
      position: "ORACLE - Database Design and Programming with SQL",
      date: "2022 (2 Months)",
      jobdesk: [
        "Database Design: From requirements analysis to conceptual (ERD), logical (schema, keys, normalization), and physical (storage, indexing) design.",
        "SQL Programming: Using DDL, DML, DCL, and TCL for defining, querying, and maintaining data.",
        "PL/SQL: Extends SQL with procedural features, including variables, loops, and stored procedures, for automation and advanced logic.",
      ],
    },
    // {
    //   img: "/assets/image/sadasa.png",
    //   title: "Sadasa Academy",
    //   position: "KMMI - Student of Social Network in R",
    //   date: "2021 (3 Months)",
    //   jobdesk: [
    //     "Learned the fundamentals of R programming language, including data manipulation and visualization using ggplot2 and dplyr packages.",
    //   ],
    // },
  ];

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

  return (
    <Fragment>
      <section
        id="experiences"
        ref={goto}
        className="relative w-full py-24 px-4 overflow-hidden min-h-screen"
      >

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* --- Header Utama --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
              Professional{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Journey
              </span>
            </h1>
            {/* Paragraf dengan efek Staggered Word Blur */}
            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="w-full sm:w-2/3 mx-auto flex flex-wrap justify-center text-gray-400 leading-relaxed text-sm sm:text-base"
            >
              {/* Bagian Teks Biasa 1 */}
              {"A timeline of my career path, highlighting the"
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={`exp1-${i}`}
                    variants={wordVariants}
                    className="mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}

              {/* Kata Khusus 1 (Biru + koma) */}
              <motion.span
                variants={wordVariants}
                className="text-blue-400 font-semibold mr-[0.25em]"
              >
                roles,
              </motion.span>

              {/* Kata Khusus 2 (Ungu + koma) */}
              <motion.span
                variants={wordVariants}
                className="text-purple-400 font-semibold mr-[0.25em]"
              >
                environments,
              </motion.span>

              {/* Teks Biasa (and) */}
              <motion.span variants={wordVariants} className="mr-[0.25em]">
                and
              </motion.span>

              {/* Kata Khusus 3 (Biru) */}
              <motion.span
                variants={wordVariants}
                className="text-blue-400 font-semibold mr-[0.25em]"
              >
                milestones
              </motion.span>

              {/* Bagian Teks Biasa 2 */}
              {"that have shaped my expertise.".split(" ").map((word, i) => (
                <motion.span
                  key={`exp2-${i}`}
                  variants={wordVariants}
                  className="mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* --- Timeline Wrapper --- */}
          <div className="relative w-full max-w-5xl mx-auto">
            {/* Garis Vertikal (Timeline Line) dengan Gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/60 via-purple-500/40 to-transparent rounded-full z-0"
            />

            {/* List Experiences */}
            <div className="flex flex-col gap-6 md:gap-8 relative z-10">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <ExperienceCard
                    {...exp}
                    side={i % 2 === 0 ? "left" : "right"}
                    defaultOpen={i === 0}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Experiences;
