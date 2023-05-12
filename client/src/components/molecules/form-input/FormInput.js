import React, { useEffect, useRef } from "react";

import { Title, Input, TextArea, Text } from "../../atoms";

const FormInput = ({
  title,
  variant = "2",
  type = "input",
  listings = true,
  error = "",
  ...rest
}) => {
  return (
    <div className="form__inputGroup">
      {type == "textarea" ? (
        <TextArea variant={variant} listings={listings} {...rest} />
      ) : (
        <Input
          className={`${error ? "form__inputError" : ""}`}
          variant={variant}
          type={type}
          {...rest}
        />
      )}
      {error && (
        <Text className="form__inputTitle--errorText" variant="error-12">
          {error}
        </Text>
      )}
      {title && (
        <Title
          variant="pr-16-1"
          className={`form__inputTitle ${
            rest?.value ? "form__inputTitle--showInput" : ""
          } ${error ? "form__inputTitle--error" : ""}`}
        >
          {title}
        </Title>
      )}
    </div>
  );
};

export default FormInput;
