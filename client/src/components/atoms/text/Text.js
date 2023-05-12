import React from "react";

const Text = ({ variant, children, style, className }) => {
  return (
    <div className={`text text--${variant} ${className}`} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Text;
