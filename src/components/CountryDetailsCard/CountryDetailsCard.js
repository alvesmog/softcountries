import React from "react";
import { StyledCard } from "./styles";
import { Card, Button, Input } from "semantic-ui-react";

function CountryDetailsCard({tempCountry, setTempCountry, toggleEdit, saveNewInfo}) {
  return (
    <StyledCard>
      <Card.Header className="link">Edit country info</Card.Header>
      <Card.Content>
        <Input
          disabled
          fluid
          label="Country name"
          placeholder={tempCountry.name}
          onChange={(e) =>
            setTempCountry({ ...tempCountry, name: e.target.value })
          }
        />
      </Card.Content>
      <Card.Content>
        <Input
          fluid
          disabled
          label="Capital"
          placeholder={tempCountry.capital}
          onChange={(e) =>
            setTempCountry({ ...tempCountry, capital: e.target.value })
          }
        />
      </Card.Content>
      <Card.Content>
        <Input
          fluid
          label="Area"
          placeholder={tempCountry.area + "km²"}
          onChange={(e) =>
            setTempCountry({ ...tempCountry, area: e.target.value })
          }
        />
      </Card.Content>
      <Card.Content>
        <Input
          fluid
          label="Population"
          placeholder={tempCountry.population}
          onChange={(e) =>
            setTempCountry({
              ...tempCountry,
              population: e.target.value,
            })
          }
        />
      </Card.Content>
      <Card.Content>
        <Input
          fluid
          label="Top-level domain"
          placeholder={tempCountry.topLevelDomains[0].name}
          onChange={(e) =>
            setTempCountry({
              ...tempCountry,
              topLevelDomains: [
                { name: e.target.value, __typename: "TopLevelDomain" },
              ],
            })
          }
        />
      </Card.Content>
      <Card.Content>
        <Button onClick={toggleEdit}>Cancel</Button>
        <Button primary onClick={saveNewInfo}>
          Save
        </Button>
      </Card.Content>
    </StyledCard>
  );
}

export default CountryDetailsCard;
