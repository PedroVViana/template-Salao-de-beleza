import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: window.innerWidth < 768 ? 0.5 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 20%",
            scrub: window.innerWidth < 768 ? 0.5 : 1,
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Adicionar animação para os cards de serviços
    if (sectionRef.current) {
      const serviceCards = sectionRef.current.querySelectorAll('.service-card');
      
      gsap.fromTo(
        serviceCards,
        { 
          y: 20, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          stagger: window.innerWidth < 768 ? 0.1 : 0.2, 
          duration: window.innerWidth < 768 ? 0.4 : 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const services = [
    {
      category: "Corte de Cabelo",
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
      items: [
        { name: "Corte Feminino", price: "R$ 45,00", description: "Corte personalizado com finalização" },
        { name: "Corte Masculino", price: "R$ 35,00", description: "Corte com máquina e tesoura" },
        { name: "Corte Infantil", price: "R$ 25,00", description: "Corte especial para crianças" },
        { name: "Corte + Barba", price: "R$ 60,00", description: "Corte masculino com modelagem de barba" }
      ]
    },
    {
      category: "Coloração",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      items: [
        { name: "Coloração Completa", price: "R$ 120,00", description: "Coloração em todo o cabelo" },
        { name: "Mechas", price: "R$ 150,00", description: "Mechas personalizadas" },
        { name: "Balayage", price: "R$ 200,00", description: "Técnica de mechas naturais" },
        { name: "Retoque de Raiz", price: "R$ 80,00", description: "Retoque apenas na raiz" }
      ]
    },
    {
      category: "Tratamentos",
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      items: [
        { name: "Hidratação Profunda", price: "R$ 80,00", description: "Tratamento intensivo de hidratação" },
        { name: "Reconstrução", price: "R$ 100,00", description: "Tratamento para cabelos danificados" },
        { name: "Botox Capilar", price: "R$ 150,00", description: "Tratamento de reconstrução e alinhamento" },
        { name: "Spa Capilar", price: "R$ 120,00", description: "Tratamento completo com massagem" }
      ]
    },
    {
      category: "Manicure e Pedicure",
      icon: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z",
      items: [
        { name: "Manicure", price: "R$ 45,00", description: "Corte, limpeza e esmaltação das unhas das mãos" },
        { name: "Pedicure", price: "R$ 55,00", description: "Corte, limpeza e esmaltação das unhas dos pés" },
        { name: "Manicure + Pedicure", price: "R$ 90,00", description: "Combo completo de unhas" },
        { name: "Unhas em Gel", price: "R$ 120,00", description: "Aplicação de unhas em gel" }
      ]
    },
    {
      category: "Depilação",
      icon: "M6 18L18 6M6 6l12 12",
      items: [
        { name: "Depilação com Cera", price: "R$ 40,00", description: "Depilação com cera quente" },
        { name: "Depilação com Linha", price: "R$ 50,00", description: "Depilação com linha (técnica oriental)" },
        { name: "Sobrancelhas", price: "R$ 30,00", description: "Design de sobrancelhas" },
        { name: "Área Íntima", price: "R$ 60,00", description: "Depilação completa da área íntima" }
      ]
    },
    {
      category: "Maquiagem",
      icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
      items: [
        { name: "Maquiagem Social", price: "R$ 80,00", description: "Maquiagem para eventos sociais" },
        { name: "Maquiagem Noiva", price: "R$ 150,00", description: "Maquiagem especial para noivas" },
        { name: "Maquiagem Artística", price: "R$ 100,00", description: "Maquiagem para eventos especiais" },
        { name: "Aula de Maquiagem", price: "R$ 120,00", description: "Aprenda técnicas de maquiagem" }
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-16 md:py-20 relative z-20 bg-gradient-to-b from-beauty-pink-50 to-beauty-purple-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-gray-800">
              Nossos <span className="text-beauty-pink-500">Serviços</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Oferecemos uma ampla variedade de serviços para cuidar da sua beleza. Confira nossos preços e agende seu horário!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col">
                <div className="p-4 md:p-5 border-b border-gray-100">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-beauty-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-beauty-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-center text-gray-800">{service.category}</h3>
                </div>
                <div className="p-4 md:p-5 flex-grow">
                  <ul className="space-y-2 md:space-y-3">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 md:gap-2">
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm md:text-base text-gray-800">{item.name}</h4>
                            <span className="text-beauty-pink-500 font-semibold ml-2 md:ml-4 whitespace-nowrap text-sm md:text-base">{item.price}</span>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 md:p-5 bg-gray-50">
                  <button className="w-full bg-beauty-pink-500 text-white py-2 text-sm md:text-base rounded-full hover:bg-beauty-pink-600 transition-colors duration-300">
                    Agendar {service.category}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 md:mt-8">
            <p className="text-xs md:text-sm text-gray-500">
              * Os preços podem variar de acordo com o comprimento do cabelo e técnica utilizada.
              Entre em contato para mais informações.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 