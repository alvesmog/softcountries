import React from "react";
import { render } from "@testing-library/react";
import Loader from "../components/Loader";

describe("Loader", () => {
  test("Renders loader component", () => {
    render(<Loader />);
  });
});
