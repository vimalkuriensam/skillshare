import React, { Fragment, useEffect, useState } from "react";
import history from "../utils/history/history";

const BlacklistComponent = (WrappedComponent) => (_listings) => (props) => {
  const { location } = history;
  useEffect(() => {
    if (
      _listings.some((listing) =>
        listing.includes(location.pathname.split("/").pop())
      )
    )
      setIsBlackListed(true);
    else setIsBlackListed(false);
  }, [location.pathname.split("/").pop()]);
  const [isBlackListed, setIsBlackListed] = useState(false);
  return (
    <Fragment>
      {!isBlackListed ? <WrappedComponent {...props} /> : null}
    </Fragment>
  );
};

export default BlacklistComponent;
