import React from "react";
import { withRouter } from "react-router-dom";
import { StyledCard, Image } from "./styles";
import { Card } from "semantic-ui-react";

function CountryCard({ country, history }) {
  const slugify = (str) =>
    str
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();

  const onCardClick = () => {
    history.push({
      pathname: `/country/${slugify(country._id)}`,
      state: {
        country,
      },
    });
  };

  return (
    <StyledCard onClick={onCardClick} key={country.name} data-testid="country-card">
      <Card.Header className="link">{country.name}</Card.Header>
      <Card.Content>
        <h4>Capital: {country.capital}</h4>
      </Card.Content>
      <Card.Content className="countryImage">
        <h4>
          <p>Flag</p>
        </h4>
        <Image src={country.flag.svgFile}></Image>{" "}
      </Card.Content>
    </StyledCard>
  );
}

export default withRouter(CountryCard);
