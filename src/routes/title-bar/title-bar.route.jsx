import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import Modal from "react-modal";

import "./title-bar.styles.css";

import Button from "../../components/button/button.component";

//Modal.setAppElement("#root");

const TitleBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <Fragment>
      <div className="title_bar">
        <h1>Yahtzee!</h1>
        <Button type="button" buttonClass={"btn_about"} onClick={toggleModal}>
          About
        </Button>
      </div>
      <Modal
        className="modal"
        isOpen={isOpen}
        onRequestClose={toggleModal}
        appElement={document.querySelector("#root")}
      >
        <div className="modal_content">
          <h3>Yahtzee V3 - Overview</h3>
          <p>
            This version of the Yahtzee web app uses a React Frontend to render
            the game, while fetching data from REST APIs built into the Django
            backend from Version 2. This allows saving of games and rendering of
            data directly from the backend, while minimizing flashing when the
            game rerenders.
          </p>
          <br />
          The source code can be found at:
          <br />
          <a href="https://github.com/jakjarvis/yahtzee_react">
            React Source Code
          </a>
          <br />
          <br />
          <a href="https://github.com/jakjarvis/jakjarvis_apps/tree/main/yahtzee_api">
            Django source code
          </a>
          <br />
          <br />
          <Button buttonClass={"btn_close"} onClick={toggleModal}>
            Close Modal
          </Button>
        </div>
      </Modal>
      <Outlet />
    </Fragment>
  );
};

export default TitleBar;
