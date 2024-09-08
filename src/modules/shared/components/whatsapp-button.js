import React from "react";

export const WhatsappButton = ({ number, message }) => {
  const handleClick = () => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center border p-4 justify-center rounded-4 shadow-sm hover:shadow-md cursor-pointer hover:shadow-[#085585]/50 duration-300 transition-all"
    >
      <img src={"/images/whatsapp.png"} alt="" className="w-4 h-4 mr-2" />
      <p>Whatsapp</p>
    </button>
  );
};
