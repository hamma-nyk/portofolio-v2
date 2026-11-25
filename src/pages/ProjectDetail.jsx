import { Fragment, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MonitorCog,
  CodeXml,
  Layers,
  Maximize2,
  X,
  MessageSquare,
} from "lucide-react";
import { Particles } from "@/components/ui/shadcn-io/particles";
import { getProjectBySlug } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectBySlug(slug);

  const images =
    project?.detailImages && project.detailImages.length > 0
      ? project.detailImages
      : [project?.thumbnail || project?.img || "/assets/image/img_not_found.png"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const hasMultipleImages = images.length > 1;

  // Scroll to top when opening detail page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setCurrentIndex(0);
    setDirection(0);
  }, [slug]);

  const handleNext = useCallback(() => {
    if (!hasMultipleImages) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [hasMultipleImages, images.length]);

  const handlePrev = useCallback(() => {
    if (!hasMultipleImages) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [hasMultipleImages, images.length]);

  const handleSelectSlide = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation (Left/Right arrows & Escape for lightbox)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleBackToProjects = () => {
    navigate("/", {
      state: {
        scrollTo: "projects",
        activeTab: project?.category || "it-support",
      },
    });
  };

  const handleContactClick = () => {
    navigate("/", { state: { scrollTo: "message" } });
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-3">Project Not Found</h1>
        <p className="text-gray-400 mb-6 text-center">
          The project you are looking for does not exist or may have been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 border border-neutral-700 hover:border-blue-500/50 text-white transition-all cursor-pointer"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </div>
    );
  }

  const isItSupport = project.category === "it-support";
  const CategoryIcon = isItSupport ? MonitorCog : CodeXml;

  return (
    <Fragment>
      <Particles
        className="fixed inset-0 z-0 pointer-events-none"
        quantity={40}
        ease={50}
        staticity={20}
        color="#ffffff"
        size={0.8}
      />

      <div className="relative min-h-screen w-full bg-neutral-900 text-white overflow-x-hidden">
        {/* Background Glows */}
        <div className="fixed top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Sticky Top Bar */}
        <header className="sticky top-0 z-40 bg-neutral-900/85 backdrop-blur-md border-b border-neutral-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
            <button
              onClick={handleBackToProjects}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-800/80 border border-neutral-700/70 hover:border-blue-500/50 text-sm font-medium text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back to Projects</span>
            </button>

            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-medium ${
                isItSupport
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                  : "bg-purple-500/10 border-purple-500/30 text-purple-300"
              }`}
            >
              <CategoryIcon size={15} />
              <span>{isItSupport ? "IT Support" : "App Development"}</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Title & Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-3">
              {project.title}
            </h1>
            {project.desc && (
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {project.desc}
              </p>
            )}
          </motion.div>

          {/* Image Slider / Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mb-10"
          >
            <div className="relative group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/40 w-full flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.img
                  key={images[currentIndex]}
                  src={images[currentIndex]}
                  alt={`${project.title} - Slide ${currentIndex + 1}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  drag={hasMultipleImages ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) handleNext();
                    else if (info.offset.x > 50) handlePrev();
                  }}
                  className="w-full h-auto max-h-[560px] object-contain select-none"
                />
              </AnimatePresence>

              {/* Top-right Counter & Lightbox Toggle */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/70 text-xs font-mono text-gray-300">
                  {currentIndex + 1} / {images.length}
                </span>
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  aria-label="Expand image"
                  className="p-2 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/70 text-gray-300 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer"
                >
                  <Maximize2 size={15} />
                </button>
              </div>

              {/* Prev / Next Navigation Buttons */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/70 text-gray-200 hover:text-white hover:border-blue-500/50 hover:scale-105 transition-all cursor-pointer shadow-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700/70 text-gray-200 hover:text-white hover:border-blue-500/50 hover:scale-105 transition-all cursor-pointer shadow-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/75 backdrop-blur-md border border-neutral-800">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex
                          ? "w-6 bg-blue-400"
                          : "w-2 bg-gray-500 hover:bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Strip (shown when multiple images exist) */}
            {hasMultipleImages && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectSlide(idx)}
                    className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === currentIndex
                        ? "border-blue-500 ring-2 ring-blue-500/30"
                        : "border-neutral-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details & Sidebar Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left / Main: Full Description */}
            <div className="lg:col-span-2 bg-neutral-800/40 border border-neutral-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-400 to-purple-500" />
                Project Overview
              </h2>
              <div className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {project.fullDesc ||
                  project.descModal ||
                  project.desc ||
                  "No additional details available."}
              </div>
            </div>

            {/* Right Sidebar: Tech Stack & Links */}
            <div className="flex flex-col gap-6">
              {/* Tech Stack Card */}
              <div className="bg-neutral-800/40 border border-neutral-800 rounded-2xl p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                  <Layers size={16} className="text-blue-400" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-neutral-900/90 border border-neutral-700/80 text-gray-200 px-3 py-1.5 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Card */}
              <div className="bg-neutral-800/40 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  Links & Actions
                </h3>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold transition-all shadow-lg shadow-blue-500/20"
                  >
                    <ExternalLink size={16} />
                    <span>Visit Live Website</span>
                  </a>
                )}

                {project.preview && (
                  <a
                    href={project.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white text-sm font-semibold transition-all"
                  >
                    <ExternalLink size={16} />
                    <span>View Live Preview</span>
                  </a>
                )}

                <button
                  onClick={handleContactClick}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-gray-200 text-sm font-medium transition-all cursor-pointer"
                >
                  <MessageSquare size={16} />
                  <span>Ask / Request Demo</span>
                </button>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen"
              className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <img
              src={images[currentIndex]}
              alt={`${project.title} - Fullscreen`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default ProjectDetail;
