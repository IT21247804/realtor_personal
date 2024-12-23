import { Element } from 'react-scroll';
import React from 'react';
import AboutUs from './AboutUs';
import BrandPromise from './BrandPromise';
import OurTeam from './OurTeam';
import AboutBanner from './AboutBanner';
import ContactUs from '../modules/client/home/components/contact-us';

const About = () => {
  return (
    <div>
      <AboutBanner />
      <AboutUs />
      <BrandPromise />
      <div className="my-14"></div> {/* Add margin here */}
      <OurTeam />
      <Element name="contact-us">
        <ContactUs />
      </Element>
    </div>
  );
};

export default About;