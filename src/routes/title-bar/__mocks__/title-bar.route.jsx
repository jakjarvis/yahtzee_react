import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const TitleBar = () => {
  return (
    <Fragment>
      <div>Title Bar</div>
      <Outlet />
    </Fragment>
  );
};

export default TitleBar;
