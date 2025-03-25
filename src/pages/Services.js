import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import OurServices from './OurServices';
import ConciergeService from './ConciergeService';
import ContactUs from '../modules/client/home/components/contact-us';
import { Element } from 'react-scroll';

const Services = () => {
  const location = useLocation();

  useEffect(() => {
    // Small delay to ensure the page has loaded
    const timeoutId = setTimeout(() => {
      if (location.hash === '#concierge-service') {
        scroller.scrollTo('concierge-service', {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
          offset: -100 // Adjust this value based on your navbar height
        });
      }
    }, 100);
  
    return () => clearTimeout(timeoutId);
  }, [location]);

  return (
    <div>
      <Element name="our-services">
        <OurServices />
      </Element>
      <div className="my-12"></div>
      <Element name="concierge-service">
        <ConciergeService />
      </Element>
      <Element name="contact-us">
        <ContactUs />
      </Element>
    </div>
  );
};

export default Services;