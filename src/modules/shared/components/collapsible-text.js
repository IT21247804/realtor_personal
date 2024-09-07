import React, { useState } from "react";

export const CollapsibleText = ({ text, collapsedHeight }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const textStyle = {
    maxHeight: isExpanded ? "none" : `${collapsedHeight}px`,
    overflow: "hidden",
    transition: "max-height 0.3s ease",
  };

  return (
    <div>
      <div style={textStyle}>
        <p className="text-md lg:text-lg">{text}</p>
      </div>
      <button
        onClick={toggleText}
        className="font-semibold text-md text-[#272c63]"
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};
