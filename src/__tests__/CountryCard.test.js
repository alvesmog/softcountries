import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountryCard from "../components/CountryCard";

describe("CountryCard", () => {
  const country = {
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
    distanceToOtherCountries: [
      {
        distanceInKm: 1333.0445603821204,
        countryName: "Bolivia (Plurinational State of)",
      },
      {
        distanceInKm: 1481.9677422904354,
        countryName: "Paraguay",
      },
      {
        distanceInKm: 1562.413522321208,
        countryName: "Suriname",
      },
      {
        distanceInKm: 1574.1741073802189,
        countryName: "French Guiana",
      },
      {
        distanceInKm: 1727.7054803482656,
        countryName: "Guyana",
      },
    ],
  };

  test("Renders Country Card component", () => {
    render(
      <MemoryRouter>
        <CountryCard key={country.name} country={country} />
      </MemoryRouter>
    );
  });
});
