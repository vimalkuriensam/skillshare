import { pdf } from "@react-pdf/renderer";
import React, { useEffect } from "react";
import { saveAs } from "file-saver";
import moment from "moment";
import { connect } from "react-redux";
import { PdfSaver, Table } from "../../components";
import { getAllUserInfo } from "../../redux/actions/auth.action";
import { DEFAULT_RECRUITER_TABLE_HEADER } from "./data";
import { decodeUser } from "../../redux/actions/profile.action";

const RecruiterDashboard = ({ dispatch, users = [] }) => {
  useEffect(() => {
    dispatch(getAllUserInfo());
  }, []);

  const onHandleAction = async (actionState) => {
    switch (Object.keys(actionState)[0]) {
      case "download":
        await onDownloadResume(actionState["download"]["index"]);
        break;
      case "reject":
        break;
      case "select":
        break;
    }
  };

  const onDownloadResume = async (index) => {

    const decodedUser = await dispatch(decodeUser(users[+index - 1]))
    const blob = await pdf(<PdfSaver user={decodedUser} />).toBlob();
    if (blob)
      saveAs(
        blob,
        `${users[+index - 1].last_name.replace(/ +/g, "")}_${moment().valueOf()}`
      );
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
