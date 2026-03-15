import { useMemo } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { delay, motion } from "framer-motion";
import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
// import hero from "../assets/hero.png";
import avatar from "../assets/avatar.png";

const socials = [
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/login",
  },
  { Icon: FaGithub, 
    label: "GitHub", 
    href: "https://github.com/" 
  },
]

const glowVariants = {
  initial: {
    scale: 1,
    y: 0,
    filter: "drop-shadow(0 0 0 rgba(0, 0, 0, 0))",
  },
  hover: {
    scale: 1.1,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13, 88, 204, 0.9)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.87))",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
}

export default function Home() {
  const roles = useMemo(
    () => [
      "Software Developer",
      "Website Developer",
      "MERN Stack Developer",
      "Front-End Devloper",
    ],
    [],
  );

  //  Create three state

  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = roles[index];
    const timeOut = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200); // It will give hold for 1.2 seconds before deleting the text
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((p) => (p + 1) % roles.length); // It will give the next index of the array and if it reaches the end it will start from the beginning
        }
      },
      deleting ? 40 : 60,
    ); // It will give the speed of typing and deleting the text

    return () => clearTimeout(timeOut);
  }, [subIndex, index, deleting, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <ParticlesBackground />

      <div className="relative z-10 h-full w-full max-w-6xl mx-auto px-4 grid grid-col-1 lg:grid-cols-2 mt-[20px]">
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            <motion.div
              className="mb-3 text-xl sn:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animation-pulse align-middle"
                style={{ height: "1em" }}
              ></span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, I'm <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Kajal Patel
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Welcome To My Portfolio!<br/> Here you can explore my projects, skills,
              and experience as a developer. I enjoy creating modern,
              user-friendly, and responsive web applications.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>
              <a
                href="/Kajal Freelancer.pdf"
                download
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </motion.div>

            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  href={href}
                  key={label}
                  target="_blank"
                  aria-label={label}
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              background:
                "conic-gradient(from 0deg, #0d58cc, #10b981, #0d58cc)",
              filter: "blur(38px)",
              opacity: 0.32,
            }}
          ></div>

          <motion.img
            src={avatar}
            alt="avatar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "min(45vw, 780px)",
              maxHeight: "90vh",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
