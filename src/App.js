import React, { useState, useEffect } from "react";
import CountryList from "./pages/CountryList/CountryList";
import CountryDetails from "./pages/CountryDetails/CountryDetails";

import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
} from "@apollo/client";
import { persistCache } from "apollo-cache-persist";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PageWrapper } from "./styles";
import "semantic-ui-css/semantic.min.css";

const cache = new InMemoryCache({
  typePolicies: {
    Product: {
      keyFields: ["_id"],
    },
  },
});

async function setupPersistance() {
  try {
    await persistCache({
      cache,
      storage: window.localStorage,
    });
  } catch (error) {
    console.log(error);
  }
}

setupPersistance();

const client = new ApolloClient({
  uri: "https://countries-274616.ew.r.appspot.com",
  cache: cache,
  storage: window.localStorage,
});

function App() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setupPersistance().finally(() => {
      setHydrated(true);
      client.query({
        query: gql`
          query {
            Country {
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
        `,
      });
    });
  }, []);

  return (
    <div data-testid="main-app">
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <PageWrapper>
              <Route
                path="/"
                exact
                render={() => <CountryList />}
              />
              <Route path="/country/:name" exact component={CountryDetails} />
            </PageWrapper>
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
