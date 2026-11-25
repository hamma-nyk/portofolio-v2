import { ExternalLink, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ slug, title, thumbnail, img, link, desc, tech }) => {
  const navigate = useNavigate();

  const handleOpenDetail = () => {
    if (slug) {
      navigate(`/project/${slug}`);
    }
  };

  return (
    <div
      onClick={handleOpenDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleOpenDetail();
        }
      }}
      className="group relative flex flex-col bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden shadow-xl shadow-black/25 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer h-[390px] sm:h-[400px] w-full text-left"
    >
      {/* --- Bagian ATAS: Gambar Background (Separuh Card) dengan Gradient Transparan ke Bawah --- */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden shrink-0 bg-neutral-900">
        <img
          src={thumbnail || img || "/assets/image/img_not_found.png"}
          alt={title}
          loading="lazy"
          decoding="async"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 95%)",
          }}
          className="object-cover w-full h-full object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle top vignette untuk kontras ikon */}
        <div className="absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

        {/* Floating Action Badge / Icon di pojok kanan atas */}
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${title} live site`}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-neutral-900/75 backdrop-blur-md border border-neutral-700/60 text-gray-300 hover:text-white hover:border-blue-400/50 hover:bg-neutral-800 transition-all duration-300 shadow-md"
          >
            <ExternalLink
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        ) : (
          <div className="absolute top-3 right-3 z-10 p-2 rounded-full bg-neutral-900/75 backdrop-blur-md border border-neutral-700/60 text-gray-300 group-hover:text-white group-hover:border-blue-400/50 group-hover:bg-neutral-800 transition-all duration-300 shadow-md">
            <Eye
              size={15}
              className="group-hover:scale-110 transition-transform"
            />
          </div>
        )}
      </div>

      {/* --- Bagian BAWAH: Konten Info Project --- */}
      <div className="relative z-10 flex flex-col flex-1 p-5 pt-1 -mt-2 justify-between">
        <div className="flex flex-col">
          <h2 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
            {title}
          </h2>

          {desc && (
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
              {desc}
            </p>
          )}
        </div>

        {/* Tech Stack & Action Footer */}
        <div className="mt-auto pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {tech &&
              tech.slice(0, 3).map((t, idx) => (
                <span
                  key={idx}
                  className="text-[10px] sm:text-[11px] font-medium bg-neutral-800 border border-neutral-700/80 text-gray-300 px-2.5 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            {tech && tech.length > 3 && (
              <span className="text-[10px] text-gray-500 px-1 py-0.5">
                +{tech.length - 3}
              </span>
            )}
          </div>

          <span className="text-xs font-medium text-gray-400 group-hover:text-blue-400 transition-colors flex items-center gap-1 shrink-0">
            Detail
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
