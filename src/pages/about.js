import { Element } from 'react-scroll';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutUs from './AboutUs';
import BrandPromise from './BrandPromise';
import OurTeam from './OurTeam';
import AboutBanner from './AboutBanner';
import ContactUs from '../modules/client/home/components/contact-us';

const About = () => {
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
      if (location.hash === '#our-team') {
        scroller.scrollTo('our-team', {
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
      <div 
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <AboutBanner />
      </div>

      <div 
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <AboutUs />
      </div>

      <div 
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-delay="400"
      >
        <BrandPromise />
      </div>

      <div className="my-14">
        <Element name="our-team">
          <OurTeam />
        </Element>
      </div>
     

      <div 
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="800"
      >
        <Element name="contact-us">
          <ContactUs />
        </Element>
      </div>
    </div>
  );
};

export default About;