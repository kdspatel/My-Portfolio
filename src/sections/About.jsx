import { motion } from "framer-motion";
import React from "react";
import about from "../assets/about.png";
import ParticlesBackground from '../components/ParticlesBackground.jsx'

export default function About() {

  const stats = [
    { label: "Focus ", value: "Performance & UX" },
    { label: "Specialization", value: "React JS" },
  ];

  // const glows = [
  //   "-top-10 -left-10 w-[230px] h-[230px] opacity-20 blur-[120px] delay-300",
  //   "-top-10 right-10 w-[250px] h-[250px] opacity-15 blur-[140px] delay-300",
  //   "-top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  // ]

  return (

    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative bg-black text-white overflow-hidden"
    > 

      <ParticlesBackground/>


      {/* Glows */}

      {/* <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div key={i} className={`absolute rounded-full bg-gradient-to-tr from-pink-200 via-purple-200 to-indigo-200 animate-pulse ${c}`}></div>
        ))}
      </div> */}

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }} // It will animate once when about us section is 40% displayed in the viewport
        >
          {/* Image */}

          <motion.div className="relative w-[160px] h-[160px] md:w-[250px] md:h-[250px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-pink-500 to-purple-500 border border-[#fff]/25"
            whileHover={{scale:1.02}}
            transition={{type:"spring", stiffness:200, damping:18}}
          >
            <img src={about} alt="About Me" className="absolute inset-0" />
          </motion.div>

          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-blue-400">
              Kajal Patel
            </h2>

            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              Front-End Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I'm a freelance frontend developer specializing in React, focused
              on building modern, responsive, and visually appealing websites.
              I help clients bring their ideas to life through clean 
              and efficient code.
            </p>

            <div className="mt-6 grid grid-col-2 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl">
              {stats.map((item, i) => (

                <motion.div key={i} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 , delay: i * 0.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold">{item.value}</div>

                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a href="#projects" className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition">View Project</a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-5 py-3 hover:bg-white/20 transition">Get In Touch</a>
            </div>

          </div>
        </motion.div>

        <motion.div className="text-center md:text-left"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} 
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              Hello I am a ReactJS Developer passionate about building fast, responsive, and user friendly web applications. 
          </p>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
              I bring strong foundational skills in  HTML, CSS , JavaScript, Tailwand CSS , Bootstrap & ReactJS. I am a quick learner and always eager to expand my skill set and stay updated with the latest industry trends.
          </p>
        </motion.div>


      </div>
    </section>

  );
}
