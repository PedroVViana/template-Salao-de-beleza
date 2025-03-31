import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Registrando o plugin do ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const IntroAnimation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configurar animação de entrada
    if (titleRef.current && backgroundRef.current) {
      // Timeline para a animação de entrada
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top top",
          end: "top 20%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1
        }
      });

      // Animação do título
      tl.fromTo(
        titleRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0
        },
        {
          opacity: 0,
          scale: 0.8,
          y: -50,
          duration: 1
        }
      );

      // Animação do fundo
      tl.fromTo(
        backgroundRef.current,
        {
          opacity: 1,
          scale: 1
        },
        {
          opacity: 0,
          scale: 1.2,
          duration: 1
        },
        "<"
      );
    }

    // Animar as bolhas decorativas
    const bubbles = decorationRef.current?.querySelectorAll('.bubble');
    if (bubbles) {
      gsap.to(bubbles, {
        y: -100,
        stagger: 0.2,
        duration: 2,
        repeat: -1,
        ease: "none"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === titleRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-beauty-pink-50 via-beauty-purple-50 to-orange-50"
    >
      {/* Fundo animado */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-beauty-pink-100/30 via-beauty-purple-100/30 to-orange-100/30"
      />
      
      {/* Elementos decorativos */}
      <div ref={decorationRef} className="absolute inset-0 overflow-hidden">
        <div className="bubble absolute top-20 right-10 w-32 h-32 rounded-full bg-beauty-pink-200 opacity-60" />
        <div className="bubble absolute bottom-40 left-20 w-24 h-24 rounded-full bg-beauty-purple-200 opacity-70" />
        <div className="bubble absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-orange-100 opacity-60" />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 
          ref={titleRef}
          className="font-serif text-5xl md:text-6xl font-bold text-center mb-6 text-gray-800 leading-tight"
        >
          <span className="text-beauty-pink-500">Beleza</span> & Estilo
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 text-center max-w-2xl mb-8">
          Transforme sua aparência e eleve sua confiança com nossos tratamentos exclusivos
        </p>
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg className="w-8 h-8 text-beauty-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroAnimation; 