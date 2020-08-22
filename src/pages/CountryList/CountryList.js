import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import CountryCard from "../../components/CountryCard";
import { Button, Input, Select } from "semantic-ui-react";
import { Container } from "./styles";
import Loader from "../../components/Loader";

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

function CountryList() {
  const result = useQuery(LOCAL_COUNTRIES, {
    onCompleted: (res) => {
      if (res.Country && res.Country.length > 0) setFilteredData(res.Country);
    },
  });

  const [filteredData, setFilteredData] = useState([]);
  const [searchSpec, setSearchSpec] = useState({ value: "", key: "name" });

  const searchOptions = [
    { key: "name", text: "Country name", value: "name" },
    { key: "capital", text: "Capital", value: "capital" },
  ];

  function handleSearch() {
    if (searchSpec.value !== "") {
      switch (searchSpec.key) {
        case "name":
          setFilteredData(
            result.data.Country.filter((country) => {
              return country.name
                .toLowerCase()
                .includes(searchSpec.value.toLowerCase());
            })
          );

          break;
        case "capital":
          setFilteredData(
            result.data.Country.filter((country) => {
              return country.capital
                .toLowerCase()
                .includes(searchSpec.value.toLowerCase());
            })
          );
          break;
        default:
          break;
      }
    } else {
      setFilteredData(result.data.Country);
    }
  }

  return (
    <Container>
      <div data-testid="search-bar" className="search">
        <Input
          className="searchInput"
          type="text"
          placeholder="Search..."
          action
          onChange={(e) =>
            setSearchSpec({ ...searchSpec, value: e.target.value })
          }
        >
          <input />
          <Select
            options={searchOptions}
            defaultValue="name"
            value={searchOptions.value}
            onChange={(e, data) => {
              setSearchSpec({ ...searchSpec, key: data.value });
            }}
          />
          <Button onClick={handleSearch}>Search</Button>
        </Input>
      </div>
      <div data-testid="cards-container" className="cards">
        {!filteredData.length && <div><Loader /> <h3>Loading...</h3></div>}
        {filteredData &&
          filteredData.map((country, index) => (
            <CountryCard key={country.name} country={country} />
          ))}
      </div>
    </Container>
  );
}

export default CountryList;
