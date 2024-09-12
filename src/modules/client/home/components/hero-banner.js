import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export const HeroBanner = ({ videoLink, location }) => {
  return (
    <div className="h-screen relative cursor-pointer">
      <img
        loop
        muted
        className="absolute top-0 left-0 ring-0 w-full h-screen z-0 object-cover bg-center"
        src={videoLink}
      />

      <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-screen bg-black/50 z-10" />
      <div className="absolute z-20 flex items-center justify-center flex-col w-full text-center text-white h-screen">
        <h1 className="text-4xl lg:text-7xl uppercase tracking-widest font-light mb-8 title-font">
          the real realtor
        </h1>
        <p className="text-lg lg:text-3xl font-normal mb-24 p-6">
          &ldquo; Welcome to The Real Realtor - Your Gateway to exceptional Real
          Estate Experiences &rdquo;
        </p>
        <div className="relative h-20 overflow-hidden">
          <div className="animate-slide-up">
            <span className="text-3xl lg:text-7xl font-light uppercase title-font">
              {location}
            </span>
          </div>
        </div>
        <h1 className="italic tracking-widest font-serif mb-10">
          &lsquo; Find your dream home. &rsquo;
        </h1>
        <Link to="/add-listing">
          <button className="text-sm uppercase tracking-wider bg-transparent border-white border-[1px] rounded-none px-14 py-4 transition ease-in-out duration-500 hover:bg-white hover:text-slate-900 hover:border-black text-white">
            add your listing
          </button>
        </Link>
      </div>
    </div>
  );
};
