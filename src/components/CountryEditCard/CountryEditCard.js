import React from "react";
import { StyledCard } from "./styles";
import { Card, Button } from "semantic-ui-react";

function CountryEditCard({tempCountry, toggleEdit}) {
  return (
    <StyledCard>
      <Card.Header className="link">Selected country</Card.Header>
      <Card.Content>Country name: {tempCountry.name}</Card.Content>
      <Card.Content>Capital: {tempCountry.capital}</Card.Content>
      <Card.Content>Area: {tempCountry.area} km²</Card.Content>
      <Card.Content>Population: {tempCountry.population}</Card.Content>
      <Card.Content>
        Top-level domain: {tempCountry.topLevelDomains[0].name}
      </Card.Content>
      <Card.Content>
        <Button onClick={toggleEdit} primary>
          Edit
        </Button>
      </Card.Content>
    </StyledCard>
  );
}

export default CountryEditCard;
