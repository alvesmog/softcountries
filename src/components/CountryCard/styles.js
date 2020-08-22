import { Card } from "semantic-ui-react";
import styled from "styled-components";

export const StyledCard = styled(Card)`
  margin: 1rem !important;
  width: 250px !important;
  display: flex
  flex-direction: column;
  justify-content: space-between;
  .header.link {
    display: flex;
    vertical-align: middle;
    cursor: pointer;
    height: 50px;
    color: black;
    font-weight: bold;
    padding: 10px;
    font-size: 11pt;
  }
  .content.countryImage {
    display: flex;
  }
`;

export const Image = styled.img`
  display: block;
  height: 30px;
  width: 50px;
`;
