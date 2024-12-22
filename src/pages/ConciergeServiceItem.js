import React from 'react';

const ConciergeServiceItem = ({ image, title, text }) => {
  return (
    <div
      className="bg-cover bg-center p-4 m-2 rounded-lg shadow-md"
      style={{
        backgroundImage: `url(${image})`,
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h3 className="text-xl font-bold text-black mb-4">{title}</h3>
      <div className="text-black">
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
  );
};

export default ConciergeServiceItem;
