import React from 'react';

const BrandPromise = () => {
  return (
    <div className="p-4 justify-items-center bg-[#272c63]">
      <h2 className="mb-6 text-xl md:text-4xl lg:text-6xl transition-all ease-in-out duration-500 uppercase font-semibold md:font-bold text-[#FFFF] tracking-widest title-font">Brand Promise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card bg-[#272c63]  rounded-lg overflow-hidden p-4 justify-items-center">
          <img src="/images/peace_new.png" alt="Brand Promise 1" className="w-48 h-48 object-cover " />
          <div className="p-4 justify-items-center text-white">
            <p className="text-lg font-bold">Peace of Mind</p>
            <p>We meticulously vet all properties, buyers, and sellers to ensure secure and stress-free transactions.</p>
          </div>
        </div>
        <div className="card bg-[#272c63]  rounded-lg overflow-hidden p-4 justify-items-center ">
          <img src="/images/money_new.png" alt="Brand Promise 2" className="w-48 h-48 object-cover" />
          <div className="p-4 justify-items-center text-white">
            <p className="text-lg font-bold">Best Price</p>
            <p>We offer competitive pricing and ensure you get the best value for your investment.</p>
          </div>
        </div>
        <div className="card bg-[#272c63] rounded-lg overflow-hidden p-4 justify-items-center">
          <img src="/images/service_new.png" alt="Brand Promise 3" className="w-48 h-48 object-cover" />
          <div className="p-4 justify-items-center text-white">
            <p className="text-lg font-bold">Excellent Service</p>
            <p>Our team is dedicated to providing exceptional service and support throughout your real estate journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPromise;