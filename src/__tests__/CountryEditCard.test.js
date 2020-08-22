import React from "react";
import { render } from "@testing-library/react";
import CountryEditCard from "../components/CountryEditCard";

describe("CountryEditCard", () => {

  const tempCountry = {
    _id: "661",
    flag: {
      svgFile: "https://restcountries.eu/data/bra.svg",
    },
    name: "Brazil",
    capital: "Brasília",
    area: 8515767,
    population: 206135893,
    topLevelDomains: [
      {
        name: ".br",
      },
    ],
    location: {
      latitude: -10,
      longitude: -55,
    },
  };

  const toggleEdit = null

  test("Renders country edit card", () => {
    render(
      <CountryEditCard
        toggleEdit={toggleEdit}
        tempCountry={tempCountry}
      />
    );
  });
});
