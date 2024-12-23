import React from 'react';
import OurServices from './OurServices';
import ConciergeService from './ConciergeService';
import ContactUs from '../modules/client/home/components/contact-us';
import { Element } from 'react-scroll';

const Services = () => {
  return (
    <div>
      
      <OurServices />
      <div className="my-12"></div>
      <ConciergeService />
      <Element name="contact-us">
        <ContactUs />
      </Element>
    </div>
  );
};

export default Services;

