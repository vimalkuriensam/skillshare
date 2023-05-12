import React, { Fragment } from "react";
import { connect } from "react-redux";

const Loader = ({ loader }) => {
  return (
    <Fragment>
      {loader && (
        <div className="loader">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ utils: { loader = false } }) => ({ loader });

export default connect(mapStateToProps)(Loader);
