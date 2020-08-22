import React from "react";
import { render } from "@testing-library/react";
import CountryDetailsCard from "../components/CountryDetailsCard";

describe("CountryDetailsCard", () => {

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

  const setTempCountry = null
  const toggleEdit = null
  const saveNewInfo = null

  test("Renders country details card", () => {
    render(
      <CountryDetailsCard
        setTempCountry={setTempCountry}
        toggleEdit={toggleEdit}
        saveNewInfo={saveNewInfo}
        tempCountry={tempCountry}
      />
    );
  });
});
