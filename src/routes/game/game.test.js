import React from "react";
import { render } from "@testing-library/react";
import Game from "./game.route";

jest.mock("../../functions/fetch.functions", () => {
  return {
    getGameState: jest.fn().mockImplementation(() => {
      return;
    }),
  };
});

jest.mock("../../components/score-table/score-table.component.jsx");

jest.mock("../../components/dice-mat/dice-mat.component.jsx");

it("renders the gameboard", () => {
  const game = render(<Game />);
  expect(game.getByText("Dice Mat")).toBeInTheDocument();
  expect(game.getByText("Score Table")).toBeInTheDocument();
});
