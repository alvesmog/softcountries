import React from "react";
import { render } from "@testing-library/react";
import Map from "../components/Map/Map";

describe("Map", () => {
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

  const closeCountries = [
    {
      _id: "561",
      flag: {
        svgFile: "https://restcountries.eu/data/bol.svg",
      },
      name: "Bolivia (Plurinational State of)",
      location: {
        latitude: -17,
        longitude: -65,
      },
    },
    {
      _id: "1548",
      flag: {
        svgFile: "https://restcountries.eu/data/guf.svg",
      },
      name: "French Guiana",
      location: {
        latitude: 4,
        longitude: -53,
      },
    },
    {
      _id: "1852",
      flag: {
        svgFile: "https://restcountries.eu/data/guy.svg",
      },
      name: "Guyana",
      location: {
        latitude: 5,
        longitude: -59,
      },
    },
    {
      _id: "3278",
      flag: {
        svgFile: "https://restcountries.eu/data/pry.svg",
      },
      name: "Paraguay",
      location: {
        latitude: -23,
        longitude: -58,
      },
    },
    {
      _id: "3990",
      flag: {
        svgFile: "https://restcountries.eu/data/sur.svg",
      },
      name: "Suriname",
      location: {
        latitude: 4,
        longitude: -56,
      },
    },
  ];

  test("Renders Map component", () => {
    render(
      <Map
        googleMapURL={/*Google maps API KEY*/}
        loadingElement={<div style={{ height: "100%" }}></div>}
        containerElement={<div style={{ height: "100%" }}></div>}
        mapElement={<div style={{ height: "100%" }}></div>}
        country={country}
        closeCountries={closeCountries}
      />
    );
  });
});
