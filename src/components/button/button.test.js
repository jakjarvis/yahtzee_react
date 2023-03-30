import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import Button from "./button.component";

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

describe("<Button />", () => {
  it("passes class and other props to created button", () => {
    render(<Button buttonClass={"btn"} data-testid={"btn-test"} />, container);
    expect(document.getElementsByClassName("btn").length).toBe(1);
    expect(screen.getByTestId("btn-test")).toBeInTheDocument();
  });
});
