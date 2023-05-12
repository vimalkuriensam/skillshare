import React, { useRef } from "react";
import { Button } from "../button";
import { Icon } from "../icon";

const Input = ({
  onHandleText,
  onHandleFile,
  variant,
  content = "Upload Document",
  placeholder = "Enter Text",
  className,
  type = "text",
  ...rest
}) => {
  const ref = useRef();
  const onChangeNumber = (val) => {
    let value;
    if (val > 0) value = +ref.current.value + 1;
    else value = +ref.current.value - 1;
    onHandleText({ target: { value } });
  };
  if (type == "file") {
    return (
      <div>
        <Button
          variant="4"
          onButtonClick={() => ref.current.click()}
          type="button"
          content={content}
          {...rest}
        />
        <input
          ref={ref}
          className="form__inputfile"
          onChange={onHandleFile}
          type="file"
          multiple
        />
      </div>
    );
  } else if (type == "number") {
    return (
      <div className="form__input-number">
        <input
          placeholder={placeholder}
          onChange={onHandleText}
          className={`form__input-number-${variant} ${className}`}
          type="number"
          ref={ref}
          {...rest}
        />
        <div className={`form__input-number-${variant}--action`}>
          <button
            className={`form__input-number-${variant}--action1`}
            onClick={onChangeNumber.bind(this, -1)}
            type="button"
          >
            <Icon name="Minus" />
          </button>
          <button
            className={`form__input-number-${variant}--action2`}
            onClick={onChangeNumber.bind(this, 1)}
            type="button"
          >
            <Icon name="Plus2" />
          </button>
        </div>
      </div>
    );
  }
  return (
    <input
      placeholder={placeholder}
      onChange={onHandleText}
      className={`form__input-${variant} ${className}`}
      type={type}
      // required
      // pattern="[a-zA-Z0-9\W]+"
      {...rest}
    />
  );
};

export default Input;
