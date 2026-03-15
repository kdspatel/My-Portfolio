import { FaHtml5, FaCss3Alt, FaBootstrap, FaNodeJs } from 'react-icons/fa'
import { IoLogoJavascript } from 'react-icons/io'
import { RiTailwindCssFill, RiReactjsFill } from 'react-icons/ri'
import { BiLogoMongodb } from 'react-icons/bi'
import { motion, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Skills () {

  const skills = [
    {
      icon: <FaHtml5 />,
      name: 'HTML', 
    },
    {
      icon: <FaCss3Alt />,
      name: 'CSS', 
    },
    {
      icon: <IoLogoJavascript />,
      name: 'JavaScript', 
    },
    {
      icon: <RiTailwindCssFill />,
      name: 'Tailwind CSS', 
    },
    {
      icon: <FaBootstrap />,
      name: 'Bootstrap', 
    },
    {
      icon: <RiReactjsFill />,
      name: 'React JS', 
    },
    {
      icon: <FaNodeJs />,
      name: 'Node Js', 
    },
    {
      icon: <BiLogoMongodb />,
      name: 'MongoDB', 
    },
  ];

  const repeated = [...skills, ...skills, ...skills];

  const [dir , setdir] = useState(-1);
  const [active , setactive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const x = useMotionValue(0);

  // Skill section is visible or not

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      setactive(entry.isIntersecting && entry.intersectionRatio > 0.1);
    },
    { threshold: [0.1] }
    )
    io.observe(el);
    return () => io.disconnect();
  }, [])

  // Shows position of scroll

  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => setdir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setdir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart , { passive: true });
    window.addEventListener('touchmove', onTouchMove  , { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [active])

  // Animate skill icons

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) =>{
      const dt = (now - last)/1000; // We get distance with this dt.
      last = now;
      let next = x.get() + SPEED*dir*dt; // x.get() : It shows on which position we are rightnow , And "dir" shows the direction in which direction we have to move
      const loop = trackRef.current?.scrollWidth/2 || 0;

      if(loop){
        if(next <= -loop) next += loop;
        if(next >= 0) next -= loop;
      }
      x.set(next)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  },[dir , x])

  return (
    <section id="skills" ref={sectionRef} className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
      
      {/* <div className='absolute inset-0 pointer-events-none'>

        <div className='absolute top-1/4 left-0 w-[150px] h-[150px] rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 blur-[120px] animate-pulse'/>
        <div className='absolute bottom-1/4 right-0 w-[150px] h-[150px] rounded-full bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 blur-[120px] animate-pulse'/>

      </div> */}

      <motion.h2 className='text-4xl mt-5 sm:txt-5xl font-bold text-[#1cd8d2] z-10'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 , delay: 0.1 }}
      >
        My Skills
      </motion.h2>

      <motion.p className='mt-2 mb-8 text-white/90 text-base sm:text-lg z-10'
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 , delay: 0.1 }}
      >
        Modern Application | Modern Design | Modern Code
      </motion.p>

      <div className='relative w-full overflow-hidden'>
        <motion.div ref={trackRef} className='flex gap-10 text-6xl text-[#1cd8d2]'
          style={{x, whiteSpace:"nowrap", willChange:"transform"}}
        >
          {repeated.map((s, i) => (
            <div key={i} className='flex flex-col items-center gap-2 min-w-[120px] ' aria-label={s.name} title={s.name}> 
              <span className='hover:scale-125 transition-transform duration-300'>
                {s.icon}
              </span>
              <p className='text-sm'>
                {s.name}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}