import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import "./title-bar.styles.css";

const TitleBar = () => {
  return (
    <Fragment>
      <div className="title_bar">
        <h1>Yahtzee!</h1>
        <h4>Beta version</h4>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default TitleBar;
