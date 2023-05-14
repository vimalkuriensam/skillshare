import React, { useEffect, useRef, useState } from "react";

import Button from "../button/Button";
import Text from "../text/Text";
import Input from "../input/Input";
import { Title } from "../title";

const Dropdown = ({
  contents,
  value,
  placeholder = "Select",
  onHandleDropdownValue,
  className,
  filter = true,
  name = null,
}) => {
  useEffect(() => {
    const handler = (event) => {
      if (!menuRef.current.contains(event.target)) setActive(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

  useEffect(() => {
    setUpdatedContents(contents);
  }, [contents]);

  const [val, setVal] = useState();
  const [active, setActive] = useState(false);
  const [updatedContents, setUpdatedContents] = useState(contents);

  useEffect(() => {
    if (value) setVal(value);
    else setVal("");
  }, [value]);
  const menuRef = useRef();

  const onHandleListToggle = () => setActive((prevState) => !prevState);

  const onHandleValueSelect = (val) => {
    setActive(false);
    setVal(val);
    onHandleDropdownValue({ target: { value: val } });
  };

  const onSetContentFilter = (e) => {
    const text = e.target.value;
    let newContents = contents;
    newContents = newContents.filter((newContent) => {
      if (name)
        return newContent[name].toLowerCase().includes(text.toLowerCase());
      return newContent.toLowerCase().includes(text.toLowerCase());
    });
    setUpdatedContents(newContents);
  };
  return (
    <div className={`form__dropdown-1 ${className}`} ref={menuRef}>
      <div className="form__dropdown-1--value" onClick={onHandleListToggle}>
        <span>
          {val ? (
            <Text variant="ii-18-1">{name ? val[name] : val}</Text>
          ) : (
            <Text variant="ss-18-1">{placeholder}</Text>
          )}
        </span>
        <span>
          <Button variant="2-1" icon="ArrowDown" content="" />
        </span>
      </div>
      {active && (
        <div className="form__dropdown-1--list">
          {filter && (
            <Input
              onHandleText={onSetContentFilter}
              placeholder="Filter"
              className="form__dropdown-1--input"
              autoFocus
            />
          )}
          <ul>
            {contents &&
              updatedContents.map((content, index) => (
                <li
                  onClick={onHandleValueSelect.bind(this, content)}
                  key={index}
                >
                  <Text variant="ss-18-1">
                    {name ? content[name] : content}
                  </Text>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
