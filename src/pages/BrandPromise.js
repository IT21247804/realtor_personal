import React from 'react';

const BrandPromise = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-8">Brand Promise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card bg-white  rounded-lg overflow-hidden p-4">
          <img src="/images/peace.jpg" alt="Brand Promise 1" className="w-48 h-48 object-cover" />
          <div className="p-4 justify-items-center">
            <p className="text-lg font-bold">Peace of Mind</p>
            <p>We meticulously vet all properties, buyers, and sellers to ensure secure and stress-free transactions.</p>
          </div>
        </div>
        <div className="card bg-white  rounded-lg overflow-hidden p-4">
          <img src="/images/price.png" alt="Brand Promise 2" className="w-48 h-48 object-cover" />
          <div className="p-4 justify-items-center">
            <p className="text-lg font-bold">Best Price</p>
            <p>We offer competitive pricing and ensure you get the best value for your investment.</p>
          </div>
        </div>
        <div className="card bg-white  rounded-lg overflow-hidden p-4">
          <img src="/images/service.png" alt="Brand Promise 3" className="w-48 h-48 object-cover" />
          <div className="p-4 justify-items-center">
            <p className="text-lg font-bold">Excellent Service</p>
            <p>Our team is dedicated to providing exceptional service and support throughout your real estate journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPromise;