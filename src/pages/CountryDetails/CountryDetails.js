import React, { useState } from "react";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { CachePersistor } from "apollo-cache-persist";
import { Container, Image } from "./styles";
import CountryEditCard from "../../components/CountryEditCard";
import CountryDetailsCard from "../../components/CountryDetailsCard";
import Map from "../../components/Map/Map";
import Loader from "../../components/Loader";

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

function CountryDetails() {
  const [canLoadMap, setCanLoadMap] = useState(false);
  const [tempCountry, setTempCountry] = useState();
  const [
    closeCountriesFullDetailsPassDown,
    setCloseCounriesFullDetailsPassDown,
  ] = useState([]);
  const [showEditInput, setShowEditInput] = useState(false);

  const history = useHistory();
  const closeCountriesNames = [];
  const id = history.location.state.country._id;

  const client = useApolloClient();

  //Selected country query, sets a temporary country to hold any changes made by the user
  const result = useQuery(GET_SPECIFIC_COUNTRY, {
    variables: { id: id },
    fetchPolicy: "cache-first",
    onCompleted: (res) => {
      try {
        if (res.Country) setTempCountry(res.Country[0]);
      } catch (error) {
        console.log(Object.values(result.client.cache.data.data));
        console.log(result.client.cache.data.data);
      }
    },
  });

  //Checks if the temp country exists, if it does, gets close countries names from it
  tempCountry &&
    tempCountry.distanceToOtherCountries.map((c) =>
      closeCountriesNames.push(c.countryName)
    );

  //Queries the close countries details
  const distanceDetails = [];

  const closeCountries = useQuery(GET_CLOSE_COUNTRIES, {
    variables: { names: closeCountriesNames },
    fetchPolicy: "cache-first",
    onCompleted: (res) => {
      try {
        res.Country.map((country) => {
          distanceDetails.push(
            tempCountry.distanceToOtherCountries.filter(
              (cc) => cc.countryName === country.name
            )
          );
          return fillDistanceDetails();
        });
      } catch (error) {
        //console.log(Object.values(closeCountries.client.cache.data.data));

        Object.values(
          Object.values(closeCountries.client.cache.data.data).map(
            (country) => {
              distanceDetails.push(
                tempCountry.distanceToOtherCountries.filter(
                  (cc) => cc.countryName === country.name
                )
              );
              return fillDistanceDetails();
            }
          )
        );
      }
    },
  });

  //As we still need to fill in the distance attribute in the close countries, we are now going to take each country in the distanceDetails

  let closeCountriesFullDetails = [];

  function fillDistanceDetails() {
    distanceDetails.map((c) => {
      closeCountries.data.Country.find((cc) =>
        cc.name === c[0].countryName
          ? closeCountriesFullDetails.push({
              ...cc,
              distanceInKm: c[0].distanceInKm,
            })
          : false
      );
      return renderMap();
    });
  }
  function renderMap() {
    let uniqueDetails = closeCountriesFullDetails.filter(function ({ _id }) {
      return !this[_id] && (this[_id] = _id);
    }, {});
    setCloseCounriesFullDetailsPassDown(uniqueDetails);
    setCanLoadMap(true);
  }

  //Save infos
  const saveNewInfo = () => {

    //Temporarily disabled due to intermittent issues with cache handling

/*     client.cache.modify({
      id: client.cache.identify(tempCountry),
      fields: {
        name(cachedName) {
          return tempCountry.name;
        },
      },
    });
    client.cache.modify({
      id: client.cache.identify(tempCountry),
      fields: {
        capital(cachedCapital) {
          return tempCountry.capital;
        },
      },
    }); */
    client.cache.modify({
      id: client.cache.identify(tempCountry),
      fields: {
        area(cachedArea) {
          return tempCountry.area;
        },
      },
    });
    client.cache.modify({
      id: client.cache.identify(tempCountry),
      fields: {
        population(cachedPopulation) {
          return tempCountry.population;
        },
      },
    });
    client.cache.modify({
      id: client.cache.identify(tempCountry),
      fields: {
        topLevelDomains(cachedTopLevelDomains) {
          return tempCountry.topLevelDomains;
        },
      },
    });
    persistNewCache();
    toggleEdit();
  };

  function persistNewCache() {
    const cache = client.cache;

    const persistor = new CachePersistor({
      cache: cache,
      storage: window.localStorage,
    });
    persistor.persist();
    setShowEditInput(!showEditInput);
  }

  const toggleEdit = () => {
    setShowEditInput(!showEditInput);
  };

  return (
    <Container data-testid="country-details">
      {!tempCountry && <div><Loader /> <h3>Loading...</h3></div>}
      {tempCountry && (
        <div className="content-wrapper">
          <div className="content">
            <Image src={tempCountry.flag.svgFile}></Image>
            {showEditInput ? (
              <CountryDetailsCard
                tempCountry={tempCountry}
                setTempCountry={setTempCountry}
                toggleEdit={toggleEdit}
                saveNewInfo={saveNewInfo}
              />
            ) : (
              <CountryEditCard
                tempCountry={tempCountry}
                toggleEdit={toggleEdit}
              />
            )}
          </div>
          {canLoadMap && (
            <div className="content">
              <h3>Click on a country flag to see more details</h3>
              <div className="map" style={{ width: "60vw", height: "50vh" }}>
                <Map
                  googleMapURL={/*Google maps API KEY*/}
                  loadingElement={<div style={{ height: "100%" }}></div>}
                  containerElement={<div style={{ height: "100%" }}></div>}
                  mapElement={<div style={{ height: "100%" }}></div>}
                  country={tempCountry}
                  closeCountries={closeCountriesFullDetailsPassDown}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default CountryDetails;
