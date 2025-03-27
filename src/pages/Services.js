import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';
import OurServices from './OurServices';
import ConciergeService from './ConciergeService';
import ContactUs from '../modules/client/home/components/contact-us';
import { Element } from 'react-scroll';

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });
  }, []);

  useEffect(() => {
    // Small delay to ensure the page has loaded
    const timeoutId = setTimeout(() => {
      if (location.hash === '#concierge-service') {
        scroller.scrollTo('concierge-service', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -100
        });
      }
    }, 100);
  
    return () => clearTimeout(timeoutId);
  }, [location]);

  return (
    <div>
      <div data-aos="fade-up">
        <Element name="our-services">
          <OurServices />
        </Element>
      </div>

      <div className="my-12"></div>

     
        <Element name="concierge-service">
          <ConciergeService />
        </Element>
     

      <div data-aos="fade-up">
        <Element name="contact-us">
          <ContactUs />
        </Element>
      </div>
    </div>
  );
};

export default Services;