import { useEffect, useMemo, useRef, useState } from "react";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  easeOut,
} from "framer-motion";

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);

    const handler = (e) => {
      setIsMobile(e.matches);
      mql.addEventListener("change", handler);
      setIsMobile(mql.matches);
    }

    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "Aquila",
        link: "https://gsap-drinks-self.vercel.app/",
        bgColor: "#008236",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "KJ Beauty",
        link: "https://kj-frontend-psi.vercel.app/",
        bgColor: "#fecdd3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Letzplayy",
        link: "https://letzplayy-website.vercel.app/",
        bgColor: "#fdc700",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${90 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center px-4">
        
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl font-semibold text-center mt-8">
          My Work
        </h2>

        {/* Project Area */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-6">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0"
              }`}
              style={{ width: "90%", maxWidth: "1100px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className={`italic font-semibold text-white/95 text-center ${
                      isMobile
                        ? "text-3xl mb-4"
                        : "absolute -top-16 left-0 text-[clamp(2rem,6vw,5rem)]"
                    }`}
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              {/* Image */}
              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl rounded-xl mt-[25px] ${
                  isMobile ? "h-[45vh]" : "h-[70vh]"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className={`${isMobile ? "mb-20" : "mb-6"}`}>
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}