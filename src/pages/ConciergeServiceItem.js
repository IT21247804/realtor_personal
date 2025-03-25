import React from 'react';

const ConciergeServiceItem = ({ image, title, text, reverse }) => {
  return (
    <div className={`flex flex-col ${
      reverse ? 'md:flex-row-reverse' : 'md:flex-row'
    } bg-white rounded-lg shadow-md overflow-hidden my-16 border-b-4 border-[#272c63] min-h-[500px]`}>
      <div className="md:w-1/2 max-h-[500px] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-[500px] object-cover object-center"
        />
      </div>
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-3xl md:text-4xl font-bold text-[#272c63] mb-8">{title}</h3>
        <div className="text-[#272c63] space-y-6">
          {text.map((paragraph, index) => (
            <p key={index} className="mb-4 text-lg">
              {paragraph.map((part, subIndex) =>
                part.bold ? (
                  <strong key={subIndex}>{part.content}</strong>
                ) : (
                  <span key={subIndex}>{part.content}</span>
                )
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConciergeServiceItem;