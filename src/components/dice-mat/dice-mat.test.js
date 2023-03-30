import { render, screen } from "@testing-library/react";

import DiceMat from "./dice-mat.component";

jest.mock("../mat-section/mat-section.component.jsx");
jest.mock("../buttons/buttons.component.jsx");

describe("<DiceMat />", () => {
  it("renders as many MatSection elements as specified in props, with sequential ids", () => {
    const matSections = 5;
    render(<DiceMat dice={matSections} />);
    expect(document.getElementsByClassName("mat").length).toBe(matSections);
    for (let i = 0; i < matSections; i++) {
      expect(screen.getByText(`ID = ${i}`)).toBeInTheDocument();
    }
  });
  it("renders the Buttons component once", () => {
    render(<DiceMat />);
    expect(document.getElementsByClassName("buttons").length).toBe(1);
  });
  it("displays the rolls remaining, with a defulat value of 3", () => {
    render(<DiceMat />);
    expect(screen.getByText("Rolls remaining:")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
