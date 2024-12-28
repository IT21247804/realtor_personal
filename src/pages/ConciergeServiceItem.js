import React from 'react';

const ConciergeServiceItem = ({ image, title, text, reverse }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white rounded-lg shadow-md overflow-hidden m-4`}>
      <div className="md:w-1/2">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <h3 className="text-3xl md:text-4xl font-bold text-[#272c63] mb-4">{title}</h3>
        <div className="text-[#272c63] space-y-4">
          {text.map((paragraph, index) => (
            <p key={index} className="mb-4">
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
