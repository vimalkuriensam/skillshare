import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "../../components";
import { getAllUserInfo } from "../../redux/actions/auth.action";
import { DEFAULT_RECRUITER_TABLE_HEADER } from "./data";

const RecruiterDashboard = ({ dispatch, users = [] }) => {
  useEffect(() => {
    dispatch(getAllUserInfo());
  }, []);

  const onHandleAction = (actionState) => {
    console.log(actionState);
  };
  return (
    <section className="section-recruiter">
      <Table
        minRows={10}
        header={DEFAULT_RECRUITER_TABLE_HEADER}
        data={users.map((user, index) => ({ ...user, index: index + 1 }))}
        loader={null}
        onHandleTable={onHandleAction}
        // isVerticalBorder={
        //   search?.split("=")[search?.split("=").length - 1] == "royaltyTree"
        // }
      />
    </section>
  );
};

const mapStateToProps = ({ auth: { users = [] } }) => ({ users });

export default connect(mapStateToProps)(RecruiterDashboard);
