import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AppointmentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current, 
        { 
          y: 30, 
          opacity: 0 
        }, 
        {
          y: 0,
          opacity: 1,
          duration: window.innerWidth < 768 ? 0.5 : 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: window.innerWidth < 768 ? 0.6 : 1.2,
          delay: window.innerWidth < 768 ? 0.1 : 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
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
            y: (index % 2 === 0) ? 30 : -30,
            x: (index % 3 === 0) ? -20 : 20,
            opacity: 0
          },
          {
            y: 0,
            x: 0,
            opacity: 0.7,
            duration: window.innerWidth < 768 ? 1.5 : 2.5,
            delay: window.innerWidth < 768 ? index * 0.1 : index * 0.2,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            onComplete: () => {
              // Adicionar efeito flutuante após a aparição
              gsap.to(bubble, {
                y: (index % 2 === 0) ? 20 : -20,
                x: (index % 3 === 0) ? -10 : 10,
                duration: window.innerWidth < 768 ? 2 + index : 3 + index,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para enviar os dados do formulário
    console.log('Formulário enviado:', formData);
    
    // Mostrar mensagem de sucesso
    setFormSubmitted(true);
    
    // Esconder a mensagem após alguns segundos
    setTimeout(() => {
      setFormSubmitted(false);
      
      // Limpar o formulário após o envio
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        message: '',
      });
    }, 5000);
  };

  return (
    <section 
      ref={sectionRef} 
      id="agendamento" 
      className="relative py-24 bg-gradient-to-b from-orange-50 to-beauty-pink-50 overflow-hidden z-20"
    >
      {/* Elementos decorativos */}
      <div ref={bubblesRef} className="absolute inset-0 pointer-events-none">
        <div className="bubble absolute top-1/4 right-1/4 w-40 h-40 bg-beauty-pink-200 rounded-full opacity-20 blur-xl"></div>
        <div className="bubble absolute top-1/3 left-1/6 w-52 h-52 bg-beauty-purple-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="bubble absolute bottom-1/4 right-1/5 w-36 h-36 bg-beauty-pink-300 rounded-full opacity-20 blur-xl"></div>
        <div className="bubble absolute bottom-1/3 left-1/4 w-44 h-44 bg-orange-200 rounded-full opacity-25 blur-xl"></div>
        
        {/* Elementos de salão de beleza estilizados */}
        <div className="bubble absolute top-1/6 left-1/5 w-8 h-16 rotate-45 bg-beauty-pink-400 rounded-full opacity-10 blur-sm"></div>
        <div className="bubble absolute bottom-1/6 right-1/5 w-10 h-20 -rotate-45 bg-beauty-purple-400 rounded-full opacity-10 blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-12">
          <div ref={titleRef}>
            <div className="inline-block mb-6">
              <div className="flex items-center">
                <div className="w-12 h-1 bg-beauty-pink-500 mr-4"></div>
                <h3 className="text-lg font-medium text-beauty-pink-500">Reserve seu Horário</h3>
                <div className="w-12 h-1 bg-beauty-pink-500 ml-4"></div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Agende sua <span className="text-beauty-pink-500">Transformação</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transforme seu visual com nossos serviços exclusivos no Bella Rosa. Nossa equipe de profissionais 
              está pronta para proporcionar a melhor experiência de beleza para você.
            </p>
          </div>
        </div>
        
        <div 
          ref={formRef}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-2 bg-gradient-to-br from-beauty-pink-400 to-beauty-purple-500 text-white p-8 py-12 relative overflow-hidden">
                {/* Padrões decorativos */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-20 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
                  <div className="absolute top-40 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
                  
                  <svg className="absolute bottom-10 left-10 w-24 h-24 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 8h-9c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h9c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1zm0 8H4c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h7" />
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-8">Por que escolher o Bella Rosa?</h3>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="mr-4 p-2 bg-white/20 rounded-full">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Equipe Premium</h4>
                        <p className="text-white/80 mt-1">Profissionais especializados com anos de experiência no mercado.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="mr-4 p-2 bg-white/20 rounded-full">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Produtos Premium</h4>
                        <p className="text-white/80 mt-1">Utilizamos apenas produtos de alta qualidade para garantir os melhores resultados.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="mr-4 p-2 bg-white/20 rounded-full">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Atendimento VIP</h4>
                        <p className="text-white/80 mt-1">Atendimento personalizado para atender às suas necessidades específicas.</p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-10 pt-8 border-t border-white/30">
                    <h4 className="font-semibold text-lg mb-3">Horário de Funcionamento</h4>
                    <div className="space-y-2 text-sm">
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
              
              <div className="lg:col-span-3 p-10">
                {formSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Agendamento Recebido!</h3>
                    <p className="text-gray-600 max-w-md">
                      Obrigado por escolher o Bella Rosa Salon. Entraremos em contato em breve para confirmar seu horário.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Informações Pessoais</h3>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-pink-500 focus:border-transparent transition-all duration-300"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          E-mail
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-pink-500 focus:border-transparent transition-all duration-300"
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Telefone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-pink-500 focus:border-transparent transition-all duration-300"
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Detalhes do Agendamento</h3>
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Serviço Desejado
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-pink-500 focus:border-transparent transition-all duration-300 bg-white"
                      >
                        <option value="">Selecione um serviço</option>
                        <option value="corte">Corte de Cabelo</option>
                        <option value="coloracao">Coloração</option>
                        <option value="tratamento">Tratamento Capilar</option>
                        <option value="manicure">Manicure e Pedicure</option>
                        <option value="maquiagem">Maquiagem Profissional</option>
                        <option value="spa">Day Spa</option>
                        <option value="depilacao">Depilação</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Data Preferida
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-pink-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                          Horário Preferido
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-pink-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Mensagem (Opcional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-beauty-pink-500 focus:border-transparent transition-all duration-300"
                        placeholder="Descreva aqui detalhes adicionais sobre o serviço desejado..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-beauty-pink-500 text-white rounded-lg shadow-md hover:bg-beauty-pink-600 focus:outline-none focus:ring-2 focus:ring-beauty-pink-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
                    >
                      Agendar Agora
                    </button>
                    
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Ao agendar, você concorda com nossos termos de serviço e política de privacidade.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="rounded-full bg-beauty-pink-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-beauty-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Agendamento por Telefone</h3>
              <p className="text-gray-600">Prefere agendar por telefone? Ligue para (11) 99999-9999 e fale com nossas atendentes.</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="rounded-full bg-beauty-pink-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-beauty-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Reagendamento Gratuito</h3>
              <p className="text-gray-600">Precisou remarcar? Sem problemas! Oferecemos reagendamento gratuito com até 24h de antecedência.</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="rounded-full bg-beauty-pink-100 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-beauty-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Desconto na Primeira Visita</h3>
              <p className="text-gray-600">Primeira vez no Bella Rosa? Ganhe 15% de desconto em qualquer serviço ao agendar online.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm; 