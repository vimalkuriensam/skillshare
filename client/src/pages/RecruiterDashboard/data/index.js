import React from "react";
import moment from "moment";
import { Icon, Text } from "../../../components";

export const DEFAULT_RECRUITER_TABLE_HEADER = [
  {
    heading: "INDEX",
    accessor: "index",
  },
  {
    heading: "USERNAME",
    accessor: "username",
  },
  {
    heading: "FIRST NAME",
    accessor: "first_name",
  },
  {
    heading: "LAST NAME",
    accessor: "last_name",
  },
  {
    heading: "CURRENT COMPANY",
    accessor: "work_experience",
    cell: ({ work_experience }) => {
      if (work_experience.filter((val) => !!val).length)
        return (
          <Text variant="alr-14-1">
            {work_experience[work_experience.length - 1]["company_name"]}
          </Text>
        );
      return <Text variant="alr-14-1">Not Available</Text>;
    },
  },
  {
    heading: "EXPERIENCE",
    accessor: "work_experience",
    cell: ({ work_experience }) => {
      let exp = 0;
      work_experience
        .filter((val) => !!val)
        .filter(
          (item, index, array) =>
            array.findIndex((obj) => obj.id === item.id) === index
        )
        .forEach(({ start_date, end_date }) => {
          const e = moment(end_date, "YYYY-MM-DD");
          const s = moment(start_date, "YYYY-MM-DD");
          const duration = moment.duration(e.diff(s));
          const years = Number(duration.asYears().toFixed(2));
          console.log(years);
          exp += years;
        });
      return <Text variant="alr-14-1">{`${exp} years`}</Text>;
    },
  },
  {
    heading: "ACTION",
    accessor: "",
    cell: ({ onHandleAction = () => {} }) => {
      return (
        <div className="u-space-between">
          <Icon
            name="PdfDownload"
            className="u-cursor-pointer"
            onIconClick={onHandleAction.bind(this, "download")}
          />
          <Icon
            name="Reject"
            className="u-cursor-pointer"
            onIconClick={onHandleAction.bind(this, "reject")}
          />
          <Icon
            name="Select"
            className="u-cursor-pointer"
            onIconClick={onHandleAction.bind(this, "select")}
          />
        </div>
      );
    },
  },
];
