import React, { useEffect, useRef } from "react";

import { Title, Input, TextArea } from "../../atoms";

const FormInput = ({
  title,
  variant = "2",
  type = "input",
  listings = true,
  ...rest
}) => {
  return (
    <div className="form__inputGroup">
      {type == "textarea" ? (
        <TextArea variant={variant} listings={listings} {...rest} />
      ) : (
        <Input variant={variant} type={type} {...rest} />
      )}
      {title && (
        <Title variant="pr-16-1" className="form__inputTitle">
          {title}
        </Title>
      )}
    </div>
  );
};

export default FormInput;
