import React, { useEffect, useState, useRef } from "react";

import moment from "moment";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { Text } from "../text";
import { Icon } from "../icon";

const Calendar = ({
  id,
  stamp,
  value,
  onHandleCalendar,
  type = "date",
  placeholder = "Select Date",
  ...rest
}) => {
  const ref = useRef();
  const [showYear, setShowYear] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [calendarProps, setCalandarProps] = useState({
    createdAt: value ? moment(value) : moment(),
    calendarFocused: false,
    timeAt: value
      ? moment(value).format("H:mm:ss")
      : moment().format("H:mm:ss"),
    dayAt: moment(stamp).format("dddd") || moment().format("dddd"),
  });

  const [startDate, setStartDate] = useState(
    value ? moment(value).valueOf() : null
  );

  useEffect(() => {
    if (value) setStartDate(moment(value).valueOf());
  }, [value]);

  useEffect(() => {
    const handler = (event) => {
      if (
        event.target.className?.baseVal == "" ||
        event.target.className?.includes(
          "react-datepicker__navigation react-datepicker__navigation--previous"
        ) ||
        event.target.className?.includes(
          "react-datepicker__navigation react-datepicker__navigation--next"
        ) ||
        event.target.className?.includes(
          "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
        ) ||
        event.target.className?.includes(
          "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
        ) ||
        event.target.className?.includes("react-datepicker__year-text")
      )
        return;
      else if (
        event.target.className?.includes("react-datepicker__current-month")
      )
        setShowYear(true);
      else setShowYear(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  });

  const onSetDate = (date) => {
    setStartDate(moment(date).valueOf());
    onHandleCalendar({ target: { value: moment(date).valueOf() } });
    if (showYear == true) {
      setShowYear(false);
      setTimeout(() => {
        setShowMonth(true);
        ref.current.setOpen(true);
      }, 0);
    } else if (showMonth == true) {
      setTimeout(() => {
        setShowMonth(false);
        ref.current.setOpen(true);
      }, 0);
    }
  };

  const onFocusChange = ({ focused }) =>
    setCalandarProps((prevState) => ({
      ...prevState,
      calendarFocused: focused,
    }));

  const getCalendarComponent = (mode) => {
    switch (mode) {
      case "time":
        return (
          <TimePicker
            value={calendarProps.timeAt}
            onChange={(e) => onHandleCalendar({ target: { value: e } })}
          />
        );
      case "day":
        return (
          <div className="form__calendar--date">
            {!value ? (
              <Text>{placeholder}</Text>
            ) : (
              <Text>{moment(stamp).format("dddd")}</Text>
            )}
          </div>
        );
      default:
        return (
          <DatePicker
            ref={ref}
            selected={startDate}
            showYearPicker={showYear}
            showMonthYearPicker={showMonth}
            showFourColumnMonthYearPicker
            onChange={onSetDate}
            dateFormatCalendar="MMMM yyyy"
            placeholderText={placeholder}
            value={value}
            {...rest}
          />
        );
    }
  };

  return (
    <div className="form__calendar">
      {getCalendarComponent(type)}
      {type === "date" && (
        <div
          className="form__calendar--icon"
          onClick={onFocusChange.bind(this, { focused: true })}
        >
          <Icon name="Calendar" />
        </div>
      )}
    </div>
  );
};

export default Calendar;
