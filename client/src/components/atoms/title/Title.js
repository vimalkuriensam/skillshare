import React from "react";

const Title = ({ variant, children, style, className }) => {
  return (
    <div
      className={`title title--${variant} ${className}`}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};

export default Title;
