// import { useEffect, useMemo, useRef, useState } from "react";

// import photo1 from "../assets/photo1.png";
// import photo2 from "../assets/photo2.png";
// import photo3 from "../assets/photo3.png";
// import photo4 from "../assets/photo4.png";
// import photo5 from "../assets/photo5.png";
// import photo6 from "../assets/photo6.png";
// import photo7 from "../assets/photo7.png";

// import img1 from "../assets/img1.png";
// import img2 from "../assets/img2.png";
// import img3 from "../assets/img3.png";
// import img4 from "../assets/img4.png";
// import img5 from "../assets/img5.png";
// import img6 from "../assets/img6.png";
// import img7 from "../assets/img7.png";

// import {
//   motion,
//   AnimatePresence,
//   useMotionValueEvent,
//   useScroll,
//   easeOut,
// } from "framer-motion";

// /* ✅ FIXED MOBILE HOOK */
// const useIsMobile = (query = "(max-width: 639px)") => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     const mql = window.matchMedia(query);

//     const handler = (e) => setIsMobile(e.matches);

//     // initial value
//     setIsMobile(mql.matches);

//     // listener
//     mql.addEventListener("change", handler);

//     return () => mql.removeEventListener("change", handler);
//   }, [query]);

//   return isMobile;
// };

// export default function Projects() {
//   const isMobile = useIsMobile();
//   const sceneRef = useRef(null);

//   /* ✅ Projects update properly when isMobile changes */
//   const projects = useMemo(
//     () => [
//       {
//         title: "BTS Merch",
//         link: "https://bts-merch.vercel.app/",
//         bgColor: "#9370DB",
//         image: isMobile ? photo1 : img1,
//       },
//       {
//         title: "Cafe",
//         link: "https://brew-theory-cafe.vercel.app/",
//         bgColor: "#C4A484",
//         image: isMobile ? photo2 : img2,
//       },
//       {
//         title: "Salon",
//         link: "https://elara-salon.vercel.app/",
//         bgColor: "#DCA1A1",
//         image: isMobile ? photo3 : img3,
//       },
//       {
//         title: "Gym",
//         link: "https://auragym-website.vercel.app/",
//         bgColor: "#FFDAB9",
//         image: isMobile ? photo4 : img4,
//       },
//       {
//         title: "Aquila",
//         link: "https://aquila-mocktails.vercel.app/",
//         bgColor: "#008236",
//         image: isMobile ? photo5 : img5,
//       },
//       {
//         title: "KJ Beauty",
//         link: "https://kjbeauty.vercel.app/",
//         bgColor: "#fecdd3",
//         image: isMobile ? photo6 : img6,
//       },
//       {
//         title: "Pixel Frames",
//         link: "https://pixelframes.vercel.app/",
//         bgColor: "#C4A484",
//         image: isMobile ? photo7 : img7,
//       },
//     ],
//     [isMobile]
//   );

//   const { scrollYProgress } = useScroll({
//     target: sceneRef,
//     offset: ["start start", "end end"],
//   });

//   const thresholds = projects.map((_, i) => (i + 1) / projects.length);

//   const [activeIndex, setActiveIndex] = useState(0);

//   useMotionValueEvent(scrollYProgress, "change", (v) => {
//     const idx = thresholds.findIndex((t) => v <= t);
//     setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
//   });

//   const activeProject = projects[activeIndex];

//   return (
//     <section
//       id="projects"
//       ref={sceneRef}
//       className="relative text-white"
//       style={{
//         height: `${90 * projects.length}vh`,
//         backgroundColor: activeProject.bgColor,
//         transition: "background-color 400ms ease",
//       }}
//     >
//       <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center px-4">
        
//         {/* Title */}
//         <h2 className="text-3xl sm:text-5xl font-semibold text-center mt-8">
//           My Work
//         </h2>

//         {/* Project Area */}
//         <div className="relative w-full flex-1 flex items-center justify-center mt-6">
//           {projects.map((project, idx) => (
//             <div
//               key={project.title}
//               className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
//                 activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0"
//               }`}
//               style={{ width: "95%", maxWidth: "1100px" }}
//             >
//               <AnimatePresence mode="wait">
//                 {activeIndex === idx && (
//                   <motion.h3
//                     key={project.title}
//                     initial={{ opacity: 0, y: -30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 30 }}
//                     transition={{ duration: 0.5, ease: easeOut }}
//                     className={`italic font-semibold text-white/95 text-center ${
//                       isMobile
//                         ? "text-2xl mb-4"
//                         : "absolute -top-16 left-0 text-[clamp(2rem,6vw,5rem)]"
//                     }`}
//                   >
//                     {project.title}
//                   </motion.h3>
//                 )}
//               </AnimatePresence>

//               {/* Image */}
//               <div
//                 className={`relative w-full overflow-hidden bg-black/20 shadow-2xl rounded-xl mt-[25px] ${
//                   isMobile ? "h-[40vh]" : "h-[70vh]"
//                 }`}
//               >
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-full object-cover"
//                   loading="lazy"
//                 />

//                 <div
//                   className="pointer-events-none absolute inset-0"
//                   style={{
//                     background:
//                       "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Button */}
//         <div className={`${isMobile ? "mb-20" : "mb-6"}`}>
//           <a
//             href={activeProject?.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
//           >
//             View Project
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import photo4 from "../assets/photo4.png";
import photo5 from "../assets/photo5.png";
import photo6 from "../assets/photo6.png";
import photo7 from "../assets/photo7.png";

import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";


const useMobile = () => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setMobile(window.innerWidth < 768);
    };

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  return mobile;
};


export default function Projects() {

  const isMobile = useMobile();

  const sectionRef = useRef(null);


  const projects = useMemo(
    () => [
      {
        title: "BTS Merch",
        category: "E-Commerce",
        image: isMobile ? photo1 : img1,
        color: "#8E6CE5",
        link: "https://bts-merch.vercel.app/",
      },

      {
        title: "Cafe",
        category: "Restaurant",
        image: isMobile ? photo2 : img2,
        color: "#556B4E",
        link: "https://brew-theory-cafe.vercel.app/",
      },

      {
        title: "Salon",
        category: "Beauty Brand",
        image: isMobile ? photo3 : img3,
        color: "#DFA4A4",
        link: "https://elara-salon.vercel.app/",
      },

      {
        title: "Gym",
        category: "Fitness",
        image: isMobile ? photo4 : img4,
       color: "#3B82F6",
        link: "https://auragym-website.vercel.app/",
      },

      {
        title: "Aquila",
        category: "Mocktail Brand",
        image: isMobile ? photo5 : img5,
        color: "#008236",
        link: "https://aquila-mocktails.vercel.app/",
      },

      {
        title: "KJ Beauty",
        category: "Luxury Beauty",
        image: isMobile ? photo6 : img6,
        color: "#B76E79",
        link: "https://kjbeauty.vercel.app/",
      },

      {
        title: "Pixel Frames",
        category: "Photography",
        image: isMobile ? photo7 : img7,
        color: "#8B6F47",
        link: "https://pixelframes.vercel.app/",
      },
    ],
    [isMobile]
  );


  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });


  const [active, setActive] = useState(0);


  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const index = Math.min(
      Math.floor(v * projects.length),
      projects.length - 1
    );

    setActive(index);
  });


  const project = projects[active];

    return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: project.color,
        transition: "background-color .8s ease",
      }}
    >

      <div
        className="
          sticky
          top-0
          min-h-screen
          overflow-hidden
          flex
          items-center
          px-5
          sm:px-8
          lg:px-20
          py-10
        "
      >


        {/* Background Number */}

        <motion.div
          key={project.title}

          initial={{
            opacity:0,
            x:-100
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:.8
          }}

          className="
            absolute
            left-0
            bottom-0
            text-[45vw]
            sm:text-[35vw]
            leading-none
            font-black
            text-white/10
            select-none
            pointer-events-none
          "
        >
          0{active + 1}

        </motion.div>




        <div
          className="
            relative
            z-10
            grid
            w-full
            grid-cols-1
            lg:grid-cols-[35%_65%]
            items-center
            gap-8
            lg:gap-10
          "
        >



          {/* LEFT CONTENT */}

          <div
            className="
              order-2
              lg:order-1
              text-white
              w-full
              max-w-xl
              mx-auto
              lg:mx-0
            "
          >

            <p
              className="
                uppercase
                tracking-[6px]
                sm:tracking-[8px]
                text-xs
                sm:text-sm
                text-white/60
              "
            >
              Selected Work
            </p>



            <AnimatePresence mode="wait">

              <motion.h1
                key={project.title}

                initial={{
                  opacity:0,
                  y:50
                }}

                animate={{
                  opacity:1,
                  y:0
                }}

                exit={{
                  opacity:0,
                  y:-50
                }}

                transition={{
                  duration:.6
                }}

                className="
                  mt-5
                  sm:mt-6
                  text-4xl
                  sm:text-6xl
                  lg:text-7xl
                  xl:text-8xl
                  font-black
                  leading-[0.9]
                "
              >
                {project.title}

              </motion.h1>


            </AnimatePresence>



            <motion.p
              key={project.category}

              initial={{
                opacity:0
              }}

              animate={{
                opacity:1
              }}

              transition={{
                delay:.2
              }}

              className="
                mt-5
                sm:mt-6
                text-base
                sm:text-lg
                text-white/80
              "
            >
              {project.category}
            </motion.p>



            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"

              className="
                inline-flex
                mt-8
                lg:mt-10
                rounded-full
                bg-white
                px-7
                py-3
                sm:px-8
                sm:py-4
                text-black
                font-semibold
                hover:scale-105
                transition
              "
            >
              View Project →
            </a>


          </div>


                    {/* RIGHT IMAGE */}

          <div
            className="
              order-1
              lg:order-2
              flex
              justify-center
              w-full
            "
          >

            <AnimatePresence mode="wait">

              <motion.div

                key={project.image}

                initial={{
                  opacity:0,
                  scale:.85,
                  rotate:3
                }}

                animate={{
                  opacity:1,
                  scale:1,
                  rotate:0
                }}

                exit={{
                  opacity:0,
                  scale:.9,
                  rotate:-3
                }}

                transition={{
                  duration:.8,
                  ease:[0.22,1,0.36,1]
                }}

                className="
                  relative
                  w-full
                  max-w-[1000px]
                  lg:max-w-[900px]
                "

              >


                {/* Browser Shadow */}

                <div
                  className="
                    absolute
                    inset-0
                    translate-y-5
                    sm:translate-y-8
                    rounded-[25px]
                    sm:rounded-[35px]
                    bg-black/20
                    blur-3xl
                  "
                />



                {/* Browser Card */}

                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[22px]
                    sm:rounded-[30px]
                    border
                    border-white/20
                    bg-white/10
                    backdrop-blur-xl
                    shadow-2xl
                  "
                >



                  {/* Top Bar */}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      bg-black/20
                      px-4
                      sm:px-5
                      py-3
                      sm:py-4
                    "
                  >

                    <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-400"/>

                    <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400"/>

                    <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400"/>

                  </div>



                  {/* Website Image */}

                  <motion.img

                    src={project.image}

                    alt={project.title}


                    className="
                      block
                      w-full

                      h-[32vh]
                      sm:h-[45vh]

                      lg:h-auto

                      max-h-[75vh]

                      object-contain
                    "


                    whileHover={{
                      scale:1.03
                    }}

                    transition={{
                      duration:.5
                    }}

                  />


                </div>


              </motion.div>


            </AnimatePresence>


          </div>


        </div>


                {/* Progress Indicator */}

        <div
          className="
            absolute
            right-5
            lg:right-12
            top-1/2
            -translate-y-1/2
            hidden
            xl:flex
            flex-col
            gap-4
          "
        >

          {projects.map((_, index) => (

            <motion.div

              key={index}

              animate={{
                height: active === index ? 70 : 25,
                opacity: active === index ? 1 : .35,
              }}

              transition={{
                duration:.4
              }}

              className="
                w-[3px]
                rounded-full
                bg-white
              "

            />

          ))}

        </div>



        {/* Bottom Counter */}

        <div
          className="
            absolute
            bottom-5
            sm:bottom-8
            left-5
            sm:left-8
            lg:left-20
            text-white
          "
        >

          <span
            className="
              text-xs
              sm:text-sm
              tracking-[5px]
              sm:tracking-[6px]
              text-white/60
            "
          >
            PROJECT
          </span>


          <div
            className="
              mt-2
              text-2xl
              sm:text-3xl
              font-bold
            "
          >

            {String(active + 1).padStart(2,"0")}

            <span className="text-white/40">
              {" "}
              / {projects.length}
            </span>

          </div>


        </div>


      </div>

    </section>
  );
}