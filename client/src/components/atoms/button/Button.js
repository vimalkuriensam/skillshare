import React from "react";

const Button = ({
  variant = "1",
  content = "Default",
  onButtonClick,
  className,
  icon = "Plus",
  ...rest
}) => {
  return (
    <button
      className={`btn btn--${variant} ${className}`}
      onClick={onButtonClick}
      {...rest}
    >
      {content && <span>{content}</span>}
    </button>
  );
};

export default Button;
