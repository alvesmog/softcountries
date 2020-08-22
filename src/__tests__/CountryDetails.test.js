import React from "react";
import { render, cleanup } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { gql } from "@apollo/client";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import CountryDetails from "../pages/CountryDetails/CountryDetails";
import { createMemoryHistory } from "history";

describe("CountryDetails", () => {
  afterEach(cleanup);

  const GET_SPECIFIC_COUNTRY = gql`
    query specificCountry($id: String) {
      Country(_id: $id) {
        _id
        flag {
          svgFile
        }
        name
        capital
        area
        population
        topLevelDomains {
          name
        }
        location {
          latitude
          longitude
        }
        distanceToOtherCountries(first: 5) {
          distanceInKm
          countryName
        }
      }
    }
  `;

  const GET_CLOSE_COUNTRIES = gql`
    query closeCountry($names: [String!]) {
      Country(filter: { name_in: $names }) {
        _id
        flag {
          svgFile
        }
        name
        location {
          latitude
          longitude
        }
      }
    }
  `;

  const resultWithSpecificCountry = {
    data: {
      Country: [
        {
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
        },
      ],
    },
  };

  const resultWithCloseCountries = {
    data: {
      Country: [
        {
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
        },
      ],
    },
  };

  test("Selected country found", async () => {
    const mocks = [
      {
        request: {
          query: GET_SPECIFIC_COUNTRY,
          variables: {
            id: "661",
          },
        },
        result: resultWithSpecificCountry,
      },
      {
        request: {
          query: GET_CLOSE_COUNTRIES,
          variables: {
            names: [
              "Bolivia (Plurinational State of)",
              "Paraguay",
              "Suriname",
              "French Guiana",
              "Guyana",
            ],
          },
        },
        result: resultWithCloseCountries,
      },
    ];

    const history = createMemoryHistory();
    history.push({
      pathname: `/country/brazil}`,
      state: {
        country: resultWithSpecificCountry.data.Country[0],
      },
    });

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>
          <CountryDetails />
        </Router>
      </MockedProvider>
    );

    expect(getByTestId("country-details"));
  });
});
