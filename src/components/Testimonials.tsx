import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Array de depoimentos para organizar os dados
const testimonials = [
  {
    id: 1,
    name: "Isabela Martins",
    role: "Cliente desde 2015",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    stars: 5,
    text: "Há 8 anos frequento o Bella Rosa e posso afirmar que é o melhor salão da cidade. O atendimento personalizado, a atenção aos detalhes e a qualidade dos produtos utilizados são incomparáveis. Meu cabelo nunca esteve tão saudável, mesmo após várias mudanças de cor."
  },
  {
    id: 2,
    name: "Carla Mendonça",
    role: "Cliente desde 2018",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    stars: 5,
    text: "Os profissionais do Bella Rosa são verdadeiros artistas. Sempre que tenho um evento importante, confio meu visual a eles. As técnicas de coloração são avançadas e os tratamentos capilares realmente funcionam. Além disso, o ambiente é acolhedor e refinado, me sinto especial a cada visita."
  },
  {
    id: 3,
    name: "Rafael Oliveira",
    role: "Cliente desde 2016",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    stars: 5,
    text: "Como homem, sempre tive dificuldade em encontrar um lugar onde entendessem o que eu queria para meu cabelo e barba. No Bella Rosa, finalmente encontrei profissionais que me ouvem e sugerem o que realmente combina comigo. O cuidado com a higiene e esterilização dos equipamentos também é notável."
  },
  {
    id: 4,
    name: "Marina Alves",
    role: "Cliente desde 2020",
    image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
    stars: 5,
    text: "Mesmo sendo cliente há apenas 3 anos, posso perceber porque o Bella Rosa está há tanto tempo no mercado. A equipe é extremamente qualificada e atualizada com as tendências. Fiz um balayage que recebeu elogios por meses! O atendimento pontual e o respeito ao cliente são diferenciais importantes."
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Estados para os contadores
  const [ratingCount, setRatingCount] = useState(0);
  const [recurrentClientsCount, setRecurrentClientsCount] = useState(0);
  const [awardsCount, setAwardsCount] = useState(0);
  const [transformationsCount, setTransformationsCount] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: window.innerWidth < 768 ? 0.5 : 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: window.innerWidth < 768 ? 1 : 2,
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
            duration: window.innerWidth < 768 ? (2 + index * 0.3) : (3 + index),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: window.innerWidth < 768 ? (index * 0.2) : (index * 0.4)
          }
        );
      });
    }

    // Animação dos depoimentos
    if (testimonialsRef.current) {
      const cards = testimonialsRef.current.querySelectorAll('.testimonial-card');
      
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: window.innerWidth < 768 ? 0.1 : 0.2, 
          duration: window.innerWidth < 768 ? 0.4 : 0.8, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 90%",
          }
        }
      );
    }
    
    // Animação dos números subindo nos cards de estatísticas
    if (statsRef.current) {
      const statsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
          once: false
        }
      });
      
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
      
      // Animação do contador de rating
      const ratingDuration = window.innerWidth < 768 ? 1 : 2;
      const ratingTarget = 4.9;
      const ratingStep = ratingTarget / (ratingDuration * 60);
      
      let ratingValue = 0;
      const ratingInterval = setInterval(() => {
        ratingValue += ratingStep;
        if (ratingValue >= ratingTarget) {
          ratingValue = ratingTarget;
          clearInterval(ratingInterval);
        }
        setRatingCount(ratingValue);
      }, 1000/60);
      
      // Animação do contador de clientes recorrentes
      const recurrentClientsDuration = window.innerWidth < 768 ? 1.1 : 2.2;
      const recurrentClientsTarget = 98;
      const recurrentClientsStep = recurrentClientsTarget / (recurrentClientsDuration * 60);
      
      let recurrentClientsValue = 0;
      const recurrentClientsInterval = setInterval(() => {
        recurrentClientsValue += recurrentClientsStep;
        if (recurrentClientsValue >= recurrentClientsTarget) {
          recurrentClientsValue = recurrentClientsTarget;
          clearInterval(recurrentClientsInterval);
        }
        setRecurrentClientsCount(Math.floor(recurrentClientsValue));
      }, 1000/60);
      
      // Animação do contador de prêmios
      const awardsDuration = window.innerWidth < 768 ? 0.9 : 1.8;
      const awardsTarget = 10;
      const awardsStep = awardsTarget / (awardsDuration * 60);
      
      let awardsValue = 0;
      const awardsInterval = setInterval(() => {
        awardsValue += awardsStep;
        if (awardsValue >= awardsTarget) {
          awardsValue = awardsTarget;
          clearInterval(awardsInterval);
        }
        setAwardsCount(Math.floor(awardsValue));
      }, 1000/60);
      
      // Animação do contador de transformações
      const transformationsDuration = window.innerWidth < 768 ? 1.2 : 2.5;
      const transformationsTarget = 5000;
      const transformationsStep = transformationsTarget / (transformationsDuration * 60);
      
      let transformationsValue = 0;
      const transformationsInterval = setInterval(() => {
        transformationsValue += transformationsStep;
        if (transformationsValue >= transformationsTarget) {
          transformationsValue = transformationsTarget;
          clearInterval(transformationsInterval);
        }
        setTransformationsCount(Math.floor(transformationsValue));
      }, 1000/60);
      
      return () => {
        clearInterval(ratingInterval);
        clearInterval(recurrentClientsInterval);
        clearInterval(awardsInterval);
        clearInterval(transformationsInterval);
      };
    }

    // Iniciar carrossel automático para dispositivos móveis
    const carouselInterval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, window.innerWidth < 768 ? 3000 : 5000);

    return () => {
      clearInterval(carouselInterval);
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
      className="min-h-screen py-20 relative z-20 bg-gradient-to-b from-beauty-purple-100 to-orange-50 overflow-hidden"
    >
      {/* Elementos decorativos */}
      <div ref={bubblesRef} className="absolute inset-0 pointer-events-none">
        <div className="bubble absolute top-1/5 right-1/4 w-40 h-40 bg-beauty-pink-200 rounded-full opacity-20 blur-xl"></div>
        <div className="bubble absolute top-1/3 left-1/6 w-52 h-52 bg-beauty-purple-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="bubble absolute bottom-1/4 right-1/5 w-36 h-36 bg-beauty-pink-300 rounded-full opacity-20 blur-xl"></div>
        <div className="bubble absolute bottom-1/3 left-1/4 w-44 h-44 bg-orange-200 rounded-full opacity-25 blur-xl"></div>
        <div className="bubble absolute top-1/2 right-1/6 w-20 h-20 bg-beauty-pink-200 rounded-full opacity-15 blur-md"></div>
        
        {/* Elementos de salão de beleza estilizados */}
        <div className="bubble absolute top-1/6 left-1/5 w-8 h-16 rotate-45 bg-beauty-pink-400 rounded-full opacity-10 blur-sm"></div>
        <div className="bubble absolute bottom-1/6 right-1/5 w-10 h-20 -rotate-45 bg-beauty-purple-400 rounded-full opacity-10 blur-sm"></div>
        <div className="bubble absolute top-2/3 left-1/3 w-6 h-14 rotate-15 bg-beauty-pink-400 rounded-full opacity-10 blur-sm"></div>
        
        {/* Padrões de fundo estilizados em formas de tesouras, pentes, etc */}
        <div className="absolute top-1/4 left-10 w-20 h-20 opacity-5">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M6 9c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-4 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm16-6c0-3.3-2.7-6-6-6-1.5 0-2.9.6-4 1.5C6.9 3.6 5.5 3 4 3 .7 3-2 5.7-2 9c0 1.5.6 2.9 1.5 4-.9 1.1-1.5 2.5-1.5 4 0 3.3 2.7 6 6 6 1.5 0 2.9-.6 4-1.5 1.1.9 2.5 1.5 4 1.5 3.3 0 6-2.7 6-6 0-1.5-.6-2.9-1.5-4 .9-1.1 1.5-2.5 1.5-4z" stroke="#FF4978" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="absolute bottom-1/4 right-20 w-24 h-24 opacity-5 rotate-45">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path d="M20 8h-9c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h9c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1zm0 8H4c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h7" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={contentRef} className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-block mb-4 md:mb-6">
              <div className="flex items-center">
                <div className="w-8 md:w-12 h-1 bg-beauty-pink-500 mr-3 md:mr-4"></div>
                <h3 className="text-base md:text-lg font-medium text-beauty-pink-500">Experiências Reais</h3>
                <div className="w-8 md:w-12 h-1 bg-beauty-pink-500 ml-3 md:ml-4"></div>
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800">
              Clientes <span className="text-beauty-pink-500">Satisfeitos</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Descubra por que centenas de clientes confiam no Bella Rosa há mais de uma década. Nosso compromisso com a excelência e atendimento personalizado nos torna referência em beleza.
            </p>
          </div>
          
          {/* Versão Desktop - Grid */}
          <div ref={testimonialsRef} className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card bg-white/80 backdrop-blur-sm p-5 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover ring-4 ring-beauty-pink-200 mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <svg className="absolute top-0 left-0 w-6 md:w-8 h-6 md:h-8 text-beauty-pink-200 transform -translate-x-3 -translate-y-3 md:-translate-x-4 md:-translate-y-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-sm md:text-base text-gray-600 italic">
                    "{testimonial.text}"
                  </p>
                  <svg className="absolute bottom-0 right-0 w-6 md:w-8 h-6 md:h-8 text-beauty-pink-200 transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 opacity-50 rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          
          {/* Versão Mobile - Carrossel */}
          <div className="md:hidden relative mb-8">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="testimonial-card bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-lg w-full flex-shrink-0"
                  >
                    <div className="flex items-center mb-4">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover ring-3 ring-beauty-pink-200 mr-3"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.stars)].map((_, i) => (
                            <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic line-clamp-6">
                      "{testimonial.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    activeIndex === index ? 'bg-beauty-pink-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Ver depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <a href="#" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-beauty-pink-500 text-white hover:bg-beauty-pink-600 transition-colors duration-300 shadow-md hover:shadow-lg text-sm sm:text-base">
              <span>Deixe seu depoimento</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Bloco de dados adicionais com animação de números */}
          <div ref={statsRef} className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 text-center">
            <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-beauty-pink-500 mb-1">
                {ratingCount.toFixed(1)}/5
              </div>
              <div className="flex justify-center mb-1 md:mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-700">Nota média Google</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-beauty-pink-500 mb-1 md:mb-2">
                {recurrentClientsCount}%
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-700">Clientes recorrentes</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-beauty-pink-500 mb-1 md:mb-2">
                {awardsCount}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-700">Prêmios de excelência</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-beauty-pink-500 mb-1 md:mb-2">
                {transformationsCount.toLocaleString('pt-BR')}+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-700">Transformações realizadas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 