import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrando o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Configurar efeito de "container flutuante"
    if (heroRef.current) {
      // Inicialmente posiciona o Hero abaixo da viewport
      gsap.set(heroRef.current, {
        y: window.innerWidth < 768 ? window.innerHeight * 0.8 : window.innerHeight,
        borderRadius: window.innerWidth < 768 ? "30px 30px 0 0" : "40px 40px 0 0",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100vw",
        zIndex: 10,
        opacity: 0
      });
      
      // Anima o Hero subindo para sobrepor a seção inicial durante o scroll
      gsap.to(heroRef.current, {
        y: 0,
        borderRadius: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "top top",
          scrub: window.innerWidth < 768 ? 0.2 : 0.3,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Sincroniza a opacidade dos elementos com o progresso do scroll
            if (contentRef.current) {
              gsap.to(contentRef.current, {
                opacity: self.progress,
                y: (1 - self.progress) * (window.innerWidth < 768 ? 25 : 50),
                duration: window.innerWidth < 768 ? 0.05 : 0.1
              });
            }
            if (textRef.current) {
              gsap.to(textRef.current, {
                opacity: self.progress,
                y: (1 - self.progress) * (window.innerWidth < 768 ? 15 : 30),
                duration: window.innerWidth < 768 ? 0.05 : 0.1
              });
            }
            if (imageRef.current) {
              gsap.to(imageRef.current, {
                opacity: self.progress,
                scale: 0.9 + (self.progress * 0.1),
                duration: window.innerWidth < 768 ? 0.05 : 0.1
              });
            }
            if (cardRef.current) {
              gsap.to(cardRef.current, {
                opacity: self.progress,
                y: (1 - self.progress) * (window.innerWidth < 768 ? 20 : 40),
                duration: window.innerWidth < 768 ? 0.05 : 0.1
              });
            }
          }
        }
      });
    }

    // Animação de rolagem suave para os botões de agendamento
    const smoothScroll = (e: MouseEvent, target: string) => {
      e.preventDefault();
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };

    const scheduleButtons = document.querySelectorAll('.schedule-btn');
    scheduleButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => 
        smoothScroll(e as MouseEvent, '#agendamento')
      );
    });

    return () => {
      scheduleButtons.forEach((btn) => {
        btn.removeEventListener('click', (e) => 
          smoothScroll(e as MouseEvent, '#agendamento')
        );
      });
      
      // Limpar as animações ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === heroRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      id="hero-section" 
      ref={heroRef} 
      className="relative min-h-screen bg-gradient-to-r from-beauty-pink-50 to-beauty-purple-50 overflow-hidden font-sans shadow-2xl transform-gpu"
      style={{
        zIndex: 10,
        transformOrigin: 'center top',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        opacity: 0
      }}
    >
      {/* Elementos decorativos animados */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-10 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-beauty-pink-200 opacity-60"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: window.innerWidth < 768 ? 8 : 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-40 left-10 sm:left-20 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-beauty-purple-200 opacity-70"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: window.innerWidth < 768 ? 9 : 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-1/3 left-1/4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-orange-100 opacity-60"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: window.innerWidth < 768 ? 6 : 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <div ref={contentRef} className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-8 md:px-16 py-8 md:py-16 h-screen relative z-10">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div ref={textRef}>
            <h4 className="text-beauty-pink-600 font-medium tracking-wider mb-2 md:mb-3 text-sm sm:text-base">BEM-VINDO(A) AO</h4>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 text-gray-800 leading-tight">
              <span className="text-beauty-pink-500">Beleza</span> & Estilo
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-6 md:mb-8 max-w-lg">
              Transforme sua aparência e eleve sua confiança com nossos 
              tratamentos exclusivos. Cuidamos de você com expertise e produtos 
              de alta qualidade em um ambiente sofisticado e acolhedor.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="schedule-btn bg-beauty-pink-500 text-white font-medium py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-beauty hover:bg-beauty-pink-600 transition-all duration-300 text-sm sm:text-base"
              >
                Agende Agora
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 sm:py-3 px-6 sm:px-8 rounded-full border border-beauty-pink-500 text-beauty-pink-500 font-medium hover:bg-beauty-pink-50 transition-all duration-300 text-sm sm:text-base"
              >
                Nossos Serviços
              </motion.button>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <div ref={imageRef} className="relative z-10 mx-4 sm:mx-0">
            <div className="w-full h-full relative">
              <motion.div 
                className="relative z-20 overflow-hidden rounded-2xl shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
                  alt="Salão de Beleza" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              
              {/* Decoração adicional */}
              <motion.div 
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-beauty-pink-300 rounded-xl z-10 hidden sm:block"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div 
                className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-beauty-purple-300 rounded-xl z-10 hidden sm:block"
                animate={{
                  rotate: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          {/* Card flutuante de promoção */}
          <div 
            ref={cardRef}
            className="absolute -bottom-5 -left-5 sm:-bottom-10 sm:-left-10 bg-white p-3 sm:p-4 rounded-xl shadow-xl z-30 max-w-xs hidden sm:block"
          >
            <motion.div 
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="w-full h-full"
            >
              <div className="flex items-start">
                <div className="bg-beauty-pink-100 rounded-full p-2 mr-3">
                  <svg className="w-5 h-5 text-beauty-pink-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">Promoção Especial</h4>
                  <p className="text-gray-600 text-sm">20% de desconto em pacotes completos para novas clientes!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: window.innerWidth < 768 ? 1.5 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg className="w-6 h-6 text-beauty-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero; 