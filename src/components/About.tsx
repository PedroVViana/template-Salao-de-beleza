import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const [experienceCount, setExperienceCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: window.innerWidth < 768 ? 0.5 : 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: window.innerWidth < 768 ? 0.3 : 2,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animação das bolhas decorativas
    if (bubblesRef.current) {
      const bubbles = bubblesRef.current.querySelectorAll('.bubble');
      
      bubbles.forEach((bubble, index) => {
        gsap.fromTo(
          bubble,
          {
            y: index % 2 === 0 ? 20 : -20,
            x: index % 3 === 0 ? 10 : -10,
            scale: 0.8,
            opacity: 0.5
          },
          {
            y: index % 2 === 0 ? -20 : 20,
            x: index % 3 === 0 ? -10 : 10,
            scale: 1,
            opacity: 0.8,
            duration: window.innerWidth < 768 ? (2 + index * 0.5) : (3 + index),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: window.innerWidth < 768 ? (index * 0.2) : (index * 0.4)
          }
        );
      });
    }
    
    // Animação dos números subindo
    if (statsRef.current) {
      const statsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
      
      // Animação do contador de anos de experiência
      const experienceDuration = window.innerWidth < 768 ? 1 : 2;
      const experienceTarget = 10;
      const experienceStep = experienceTarget / (experienceDuration * 60);
      
      let experienceValue = 0;
      const experienceInterval = setInterval(() => {
        experienceValue += experienceStep;
        if (experienceValue >= experienceTarget) {
          experienceValue = experienceTarget;
          clearInterval(experienceInterval);
        }
        setExperienceCount(Math.floor(experienceValue));
      }, 1000/60);
      
      // Animação do contador de clientes
      const clientsDuration = window.innerWidth < 768 ? 1.2 : 2.5;
      const clientsTarget = 5000;
      const clientsStep = clientsTarget / (clientsDuration * 60);
      
      let clientsValue = 0;
      const clientsInterval = setInterval(() => {
        clientsValue += clientsStep;
        if (clientsValue >= clientsTarget) {
          clientsValue = clientsTarget;
          clearInterval(clientsInterval);
        }
        setClientsCount(Math.floor(clientsValue));
      }, 1000/60);
      
      // Animação dos cards
      statsTimeline.fromTo(
        statsRef.current.children,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: window.innerWidth < 768 ? 0.1 : 0.2, 
          duration: window.innerWidth < 768 ? 0.4 : 0.8, 
          ease: "back.out(1.7)" 
        }
      );
      
      return () => {
        clearInterval(experienceInterval);
        clearInterval(clientsInterval);
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 relative z-20 bg-gradient-to-b from-beauty-purple-50 to-beauty-purple-100 overflow-hidden"
    >
      {/* Elementos decorativos de bolhas */}
      <div ref={bubblesRef} className="absolute inset-0 pointer-events-none">
        <div className="bubble absolute top-1/4 right-1/4 w-32 h-32 bg-beauty-pink-200 rounded-full opacity-30 blur-lg"></div>
        <div className="bubble absolute top-1/3 left-1/5 w-48 h-48 bg-beauty-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="bubble absolute bottom-1/4 right-1/3 w-24 h-24 bg-beauty-pink-300 rounded-full opacity-25 blur-md"></div>
        <div className="bubble absolute bottom-1/3 left-1/4 w-40 h-40 bg-orange-200 rounded-full opacity-20 blur-lg"></div>
        <div className="bubble absolute top-1/2 right-1/6 w-20 h-20 bg-beauty-pink-200 rounded-full opacity-30 blur-md"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="flex items-center mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-1 bg-beauty-pink-500 mr-3 md:mr-4"></div>
                <h3 className="text-base md:text-lg font-medium text-beauty-pink-500">Desde 2013</h3>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-gray-800">
                Há <span className="text-beauty-pink-500">10 anos</span> transformando a beleza em <span className="text-beauty-pink-500">arte</span>
              </h2>
              
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                Fundado em 2013, o <strong>Bella Rosa</strong> nasceu com a missão de elevar o conceito de beleza em nossa cidade. Com uma equipe formada por profissionais especializados, nos dedicamos a oferecer muito mais que serviços estéticos - criamos experiências únicas de bem-estar e transformação.
              </p>
              
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                Nossa filosofia é baseada na combinação perfeita entre técnicas tradicionais e as mais recentes tendências, utilizando sempre produtos premium que respeitam a saúde dos seus cabelos e da sua pele.
              </p>
              
              <div ref={statsRef} className="grid grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="bg-white/70 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-beauty-pink-500">
                    {experienceCount}+
                    <span className="absolute ml-1 text-xs top-1 opacity-70">anos</span>
                  </div>
                  <div className="text-sm md:text-base text-gray-700">Anos de experiência</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-beauty-pink-500">
                    {clientsCount.toLocaleString('pt-BR')}+
                  </div>
                  <div className="text-sm md:text-base text-gray-700">Clientes satisfeitos</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="bg-beauty-pink-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-beauty-pink-600 transition-colors duration-300 shadow-md hover:shadow-beauty text-sm sm:text-base">
                  Agende Agora
                </button>
                <button className="border border-beauty-pink-500 text-beauty-pink-500 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-beauty-pink-50 transition-colors duration-300 text-sm sm:text-base">
                  Saiba Mais
                </button>
              </div>
            </div>
            
            <div className="relative mt-10 md:mt-0">
              <div className="absolute -top-10 -left-10 w-28 md:w-40 h-28 md:h-40 bg-beauty-pink-100 rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-28 md:w-40 h-28 md:h-40 bg-beauty-purple-100 rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse" style={{ animationDelay: "1s" }}></div>
              
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl z-10 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                    alt="Salão de Beleza Bella Rosa"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute bottom-4 -right-4 sm:bottom-8 sm:-right-8 bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg z-20 max-w-[180px] sm:max-w-xs">
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Horário de Funcionamento</h3>
                  <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Segunda - Sexta:</span>
                      <span>9h - 20h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado:</span>
                      <span>9h - 18h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo:</span>
                      <span>Fechado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 