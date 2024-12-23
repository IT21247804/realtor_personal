import React from 'react';
import Card from './Card';

const OurServices = () => {
  return (
    <div className="p-4 justify-items-center bg-[#272c63]">
      <h2 className="mb-6 text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-semibold md:font-bold text-[#FFFF] tracking-widest title-font">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          image="/images/buy_new.png"
          altText="Service 1"
          name="Buying & Selling"
          title=" We assist clients in buying and selling properties with a streamlined and 
secure process. Our expert team handles every aspect, from property 
vetting to market analysis, ensuring the best outcomes for both buyers and 
sellers."
        />
        <Card
          image="/images/rent_new.png"
          altText="Service 2"
          name="Rental"
          title="We offer comprehensive rental services, helping property owners rent out 
their properties and assisting tenants in finding the perfect rental home. 
Our services cover everything from tenant screening to lease agreements, 
ensuring a smooth rental experience."
        />
        <Card
          image="/images/town_new.png"
          altText="Service 3"
          name="Property Management"
          title="Description of Service 3"
        />
      </div>
    </div>
  );
};

export default OurServices;