import React from "react";
import {
  render,
  act,
  waitForElementToBeRemoved,
  cleanup,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { gql } from "@apollo/client";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import CountryCard from "../components/CountryCard";
import CountryList from "../pages/CountryList/CountryList";

describe("CountryList", () => {
  afterEach(cleanup);

  const LOCAL_COUNTRIES = gql`
    query {
      Country {
        _id
        flag {
          svgFile
        }
        name
        capital
      }
    }
  `;

  const resultWithCountries = {
    data: {
      Country: [
        {
          _id: "661",
          flag: {
            svgFile: "https://restcountries.eu/data/bra.svg",
          },
          name: "Brazil",
          capital: "Brasília",
        },
      ],
    },
  };

  const resultWithoutCountries = {
    data: {
      Country: [],
    },
  };

  const mocks = [
    {
      request: {
        query: LOCAL_COUNTRIES,
      },
      result: resultWithCountries,
    },
  ];

  test("Countries found", async () => {
    const result = resultWithCountries.data.Country;
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          {!result.length && (
            <div>
              <Loader /> <h3>Loading...</h3>
            </div>
          )}
          {result &&
            result.map((country, index) => (
              <CountryCard key={country.name} country={country} />
            ))}
        </MemoryRouter>
      </MockedProvider>
    );
    expect(getByTestId("country-card"));
  });

  test("While loading, show Loader component", async () => {
    const filteredData = []

    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <CountryList />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(getByTestId("loader"));
  });
});
