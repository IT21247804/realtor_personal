import React from 'react';
import { Link } from 'react-router-dom';

const AboutBanner = () => {
  return (
    <div 
      className="relative w-full h-96 md:h-128 lg:h-[40rem] xl:h-[50rem] bg-cover bg-center" 
      style={{ backgroundImage: "url('/images/presentation.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">About Us</h1>
        <Link to="/services">
          <button className="text-sm uppercase tracking-wider bg-transparent border-white border-[1px] rounded-none px-14 py-4 transition ease-in-out duration-500 hover:bg-white hover:text-slate-900 hover:border-black text-white">
            Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutBanner;
