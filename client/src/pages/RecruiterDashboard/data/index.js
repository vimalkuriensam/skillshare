import moment from "moment";

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
      if (work_experience)
        return (
          <span>
            {work_experience[work_experience.length - 1]["company_name"]}
          </span>
        );
      return <span>Not Available</span>;
    },
  },
  {
    heading: "EXPERIENCE",
    accessor: "work_experience",
    cell: ({ work_experience }) => {
      let exp = 0;
      work_experience.forEach(({ start_date, end_date }) => {
        const e = moment(end_date, "YYYY-MM-DD");
        const s = moment(start_date, "YYYY-MM-DD");
        const duration = moment.duration(e.diff(s));
        const years = Number(duration.asYears().toFixed(2));
        exp += years;
      });
      return <span>{`${exp} years`}</span>;
    },
  },
  //   {
  //     heading: "Type",
  //     accessor: "type",
  //     cell: ({ type }) =>
  //       type === "Credit" ? (
  //         <span className="table__success">Credit</span>
  //       ) : (
  //         <span className="table__danger">Debit</span>
  //       ),
  //   },
];
