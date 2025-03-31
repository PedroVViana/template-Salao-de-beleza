import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrando apenas o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface ScrollManagerProps {
  children: React.ReactNode;
}

const ScrollManager: React.FC<ScrollManagerProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuração global do ScrollTrigger
    ScrollTrigger.defaults({
      markers: false,
      scrub: 1,
    });

    // Refresh do ScrollTrigger
    gsap.delayedCall(0.5, () => {
      ScrollTrigger.refresh(true);
    });
    
    // Configurar navegação suave para os botões
    const setupSmoothScrolling = () => {
      const navButtons = document.querySelectorAll('button[data-scroll-to]');
      
      navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSelector = button.getAttribute('data-scroll-to');
          if (targetSelector) {
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
              // Usando o scrollIntoView para navegação suave
              targetElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }
          }
        });
      });
    };
    
    setupSmoothScrolling();

    return () => {
      // Limpar todas as animações ao desmontar
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ScrollManager; 