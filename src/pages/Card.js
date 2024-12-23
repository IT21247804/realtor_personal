import React from 'react';

const Card = ({ image, altText, name, title }) => {
  return (
    <div className="card bg-[#272c63]  rounded-lg overflow-hidden w-full  p-10 m-2">
      <img src={image} alt={altText} className="w-15 h-25 object-cover bg-transparent" />
      <div className="p-4 justify-items-center text-white text-center">
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm ">{title}</p>
      </div>
    </div>
  );
};

export default Card;