import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    role: "Web Developer Intern",
    company: "Rishabh Software",
    duration: "2023",
    description:
      "In this internship I gained valuable experience and exposure to various aspects of web development.",
  },
  {
    role: "Web Developer",
    duration: "2025",
    description:
      "Worked for 2 months under a freelance developer, building and contributing to web development projects.",
  },
  {
    role: "Web Developer",
    duration: "2025-Present",
    description:
      "Currently working as a freelance developer, building and delivering web applications for clients.",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [30, 0]);
  const x = useTransform(scrollYProgress, [start, end], [-20, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute ${idx % 2 === 0 ? "-top-8" : "-bottom-8"} w-[3px] bg-white/40`}
          style={{ height: 40, opacity }}
        />

        <motion.article
          className={`absolute ${
            idx % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-[300px] shadow-lg`}
          style={{ opacity, y }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">
            {exp.company} | {exp.duration}
          </p>
          <p className="text-md text-gray-300">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  // MOBILE LAYOUT

  return (
    <div className="relative flex items-start">
      <motion.div
        className="absolute -left-[16px] top-4 z-10 w-6 h-6 rounded-full bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.15)]"
        style={{ scale, opacity }}
      />

      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-full ml-6 shadow-lg"
        style={{ opacity, x }}
      >
        <h3 className="text-lg font-semibold">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2">
          {exp.company} | {exp.duration}
        </p>
        <p className="text-sm text-gray-300">{exp.description}</p>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Better height for mobile scrolling
  const SCENE_HEIGHT_VH = isMobile
    ? 100 * experiences.length
    : 120 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    []
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "100vh" }}
        className="relative"
      >
        <div className="sticky top-0 min-h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-10 text-center">
            Experience
          </h2>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            
            {/* DESKTOP */}
            {!isMobile && (
              <div className="relative w-full max-w-6xl">
                <div className="relative h-[6px] bg-white/15 rounded">
                  <motion.div
                    className="absolute left-0 top-0 h-[6px] bg-white rounded origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                <div className="relative flex justify-between">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* MOBILE */}
            {isMobile && (
              <div className="relative w-full max-w-md">
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-white/20 rounded">
                  <motion.div
                    className="absolute top-0 left-0 w-[4px] bg-white rounded origin-top"
                    style={{ height: lineSize }}
                  />
                </div>

                <div className="relative flex flex-col gap-8 ml-8 mt-8 pb-20">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem
                      key={idx}
                      exp={exp}
                      idx={idx}
                      start={idx === 0 ? 0 : thresholds[idx - 1]}
                      end={thresholds[idx]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}