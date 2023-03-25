import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";

import Four0Four from "./four0Four.route";

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

describe("<Four0Four />", () => {
  it("contains the invalid statement", () => {
    render(<Four0Four />, container);
    expect(
      screen.getByText(/This is not the url you are looking for/i)
    ).toBeInTheDocument();
  });
});
