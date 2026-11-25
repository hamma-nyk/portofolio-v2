import { useState } from "react";
import { ChevronDown, Calendar, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceCard = ({
  title,
  img,
  position,
  date,
  side,
  jobdesk = [],
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const isCurrent = date?.toLowerCase().includes("present");

  return (
    <div
      className={`relative flex items-start w-full pl-11 md:pl-0 ${
        side === "right" ? "md:justify-end" : "md:justify-start"
      }`}
    >
      {/* Timeline Node (anchored to header height) */}
      <div
        className={`absolute left-4 md:left-1/2 top-7 -translate-x-1/2 z-20 flex items-center justify-center w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
          open || isCurrent
            ? "bg-neutral-900 border-blue-400"
            : "bg-neutral-900 border-neutral-600"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isCurrent
              ? "bg-emerald-400"
              : open
                ? "bg-blue-400"
                : "bg-neutral-500"
          }`}
        />
      </div>

      {/* Horizontal Connector Line (Desktop) */}
      <div
        className={`hidden md:block absolute top-[35px] h-[1px] w-7 bg-neutral-700/80 z-10 ${
          side === "right" ? "left-1/2 ml-2" : "right-1/2 mr-2"
        }`}
      />

      {/* Card */}
      <div
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
          }
        }}
        className={`group w-full md:w-[calc(50%-2.25rem)] bg-neutral-900/95 border rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/25 transition-all duration-300 cursor-pointer select-none ${
          open
            ? "border-blue-500/35 hover:border-blue-500/50"
            : "border-neutral-800 hover:border-neutral-700"
        }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-neutral-800/90 border border-neutral-700/80 flex items-center justify-center overflow-hidden shrink-0 p-1">
              <img
                src={img}
                alt={title}
                loading="lazy"
                decoding="async"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            <div className="min-w-0 text-left">
              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                {title}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-blue-300/90 mt-0.5 flex items-center gap-1.5">
                <Briefcase size={13} className="shrink-0 text-purple-400" />
                <span className="truncate">{position}</span>
              </p>
            </div>
          </div>

          <div
            className={`shrink-0 p-1.5 rounded-full bg-neutral-800/90 border border-neutral-700/80 text-gray-400 group-hover:text-blue-400 group-hover:border-blue-500/40 transition-all duration-300 ${
              open ? "rotate-180 text-blue-400 border-blue-500/40" : "rotate-0"
            }`}
          >
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Date & Meta Row */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-800/90 border border-neutral-700/80 text-gray-300 text-xs font-medium rounded-full">
            <Calendar size={12} className="text-blue-400" />
            <span>{date}</span>
          </span>

          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px] font-medium rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Current
            </span>
          )}

          {!open && jobdesk.length > 0 && (
            <span className="text-[11px] text-gray-500 ml-auto font-mono">
              {jobdesk.length} highlights
            </span>
          )}
        </div>

        {/* Expandable Jobdesk Content */}
        <AnimatePresence initial={false}>
          {open && jobdesk.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="mt-4 pt-4 border-t border-neutral-800/90 space-y-2.5 text-left">
                {jobdesk.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceCard;
