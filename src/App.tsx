import React from 'react';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import AppointmentForm from './components/AppointmentForm';
import ScrollManager from './components/ScrollManager';

const App: React.FC = () => {
  return (
    <ScrollManager>
      <div className="relative">
        <div className="h-screen">
          <IntroAnimation />
        </div>
        <div className="h-screen">
          <Hero />
        </div>
        <Services />
        <About />
        <Testimonials />
        <AppointmentForm />
      </div>
    </ScrollManager>
  );
};

export default App;
