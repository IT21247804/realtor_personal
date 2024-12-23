import React from 'react';

const AboutUs = () => {
  return (
    <div className="p-2 flex justify-center items-center min-h-screen">
      <div className="max-w-3xl text-center">
        <h1 className= "mb-6 text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-semibold md:font-bold text-[#272c63] tracking-widest title-font">About Real Realtor</h1>
        <p className="mb-6 md:mb-8 lg:mb-10 font-semibold italic tracking-widest text-[#272c63]">
          The Real Realtor is a dynamic Sri Lankan-based real estate company 
          dedicated to transforming traditional real estate practices. <br />
          We specialize in 
          buying, selling, renting, and property management, making the process 
          more accessible and straightforward for everyone. With our rigorous 
          vetting of properties, buyers, and sellers, we provide our clients with the 
          confidence and peace of mind they deserve. <br />
          Our concierge service 
          ensures a seamless, convenient experience, empowering clients to buy, 
          sell, or rent their properties with ease and optimism for the future.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
