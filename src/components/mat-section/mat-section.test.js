import { render, waitFor } from "@testing-library/react";

import MatSection from "./mat-section.component";

jest.mock("../../functions/dice.functions.jsx");

describe("<MatSection />", () => {
  it("renders div containing an img, both with classnames based on the props.id, which are hidden by default", () => {
    let testId = 3;
    render(<MatSection id={testId} />);
    expect(document.getElementsByClassName(`mat${testId}`)).toBeTruthy();
    expect(
      document.getElementsByClassName(`dice${testId} hidden`)
    ).toBeTruthy();
  });
  it("should call holdDie function on click", () => {
    let testId = 3;
    render(<MatSection id={testId} />);
    const holdDie = jest.fn();
    let diceImg = document.querySelector(".dice");
    diceImg.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    waitFor(() => expect(holdDie).toHaveBeenCalled());
  });
});
