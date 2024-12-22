import React from 'react';

const Card = ({ image, altText, name, title }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden w-full  p-4 m-2">
      <img src={image} alt={altText} className="w-full h-55 object-cover" />
      <div className="p-4 justify-items-center">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default Card;