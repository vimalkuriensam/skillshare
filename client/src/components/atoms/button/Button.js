import React from "react";
import { Icon } from "../icon";

const Button = ({
  variant = "1-1",
  content = "Default",
  onButtonClick,
  className,
  icon = null,
  ...rest
}) => {
  return (
    <button
      className={`btn btn--${variant} ${className}`}
      onClick={onButtonClick}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {content && <span>{content}</span>}
    </button>
  );
};

export default Button;
