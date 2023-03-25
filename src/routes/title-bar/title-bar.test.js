/* Using techniques from https://legacy.reactjs.org/docs/testing-recipes.html */

import { render, screen, waitFor, act } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { MemoryRouter } from "react-router-dom";

import TitleBar from "./title-bar.route";

// Setup
let container = null;
beforeEach(() => {
  container = document.createElement("div");
  container.setAttribute("id", "root");
  document.body.appendChild(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("<TitleBar />", () => {
  it("contains the title text", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <TitleBar />
      </MemoryRouter>,
      container
    );
    expect(screen.getByText(/Yahtzee/i)).toBeInTheDocument();
  });

  it("opens/closes the modal on click", () => {
    act(() => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <TitleBar />
        </MemoryRouter>,
        container
      );
    });

    expect(screen.queryByText(/Overview/i)).not.toBeInTheDocument();

    act(() => {
      let btn = document.querySelector(".btn_about");
      btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    waitFor(() => expect(screen.queryByText(/Overview/i)).toBeInTheDocument());

    act(() => {
      let btn = document.querySelector(".btn_close");
      btn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    waitFor(() =>
      expect(screen.queryByText(/Overview/i)).not.toBeInTheDocument()
    );
  });
});
