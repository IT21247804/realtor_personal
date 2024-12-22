import React from 'react';
import Card from './Card';

const OurServices = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          image="/images/buysell.png"
          altText="Service 1"
          name="Buying & Selling"
          title=" We assist clients in buying and selling properties with a streamlined and 
secure process. Our expert team handles every aspect, from property 
vetting to market analysis, ensuring the best outcomes for both buyers and 
sellers."
        />
        <Card
          image="/images/rental.png"
          altText="Service 2"
          name="Rental"
          title="We offer comprehensive rental services, helping property owners rent out 
their properties and assisting tenants in finding the perfect rental home. 
Our services cover everything from tenant screening to lease agreements, 
ensuring a smooth rental experience."
        />
        <Card
          image="/images/property.png"
          altText="Service 3"
          name="Property Management"
          title="Description of Service 3"
        />
      </div>
    </div>
  );
};

export default OurServices;