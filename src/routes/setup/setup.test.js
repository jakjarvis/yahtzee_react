import React from "react";
import { render } from "@testing-library/react";
import Setup from "./setup.route";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../functions/fetch.functions", () => {
  return {
    setupGame: jest.fn().mockImplementation(() => {
      return;
    }),
  };
});

it("renders the setup page", () => {
  const setupPath = "/setup";
  const setup = render(
    <MemoryRouter initialEntries={[setupPath]}>
      <Setup />
    </MemoryRouter>
  );
  expect(setup.container.querySelector("#player1Name")).toBeInTheDocument;
  expect(setup.container.querySelector("#player2Name")).toBeInTheDocument;
  expect(setup.Button).toBeInTheDocument;
});
