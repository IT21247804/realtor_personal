import { Element } from 'react-scroll';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AboutUs from './AboutUs';
import BrandPromise from './BrandPromise';
import OurTeam from './OurTeam';
import AboutBanner from './AboutBanner';
import ContactUs from '../modules/client/home/components/contact-us';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });
  }, []);

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

      <div className="my-14"></div>

     
        <OurTeam />
     

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