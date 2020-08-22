import React from "react";
import { render, act } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("App renders", async () => {
    await act(async () => {
      const { getByTestId } = render(<App />);
      expect(getByTestId("main-app"));
    });
  });
});
