import React from 'react';
import OurServices from './OurServices';
import ConciergeService from './ConciergeService';

const Services = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Services</h1>
      <OurServices />
      <ConciergeService />
    </div>
  );
};

export default Services;

