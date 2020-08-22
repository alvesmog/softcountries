import styled from 'styled-components'
import { Card } from "semantic-ui-react";

export const StyledCard = styled(Card)`
  margin: 1rem !important;
  width: 350px !important;
  @media (max-width: 375px) {
    width: 290px !important;
  }
  @media (max-width: 414px) {
    width: 240px !important;
  }
  div.content {
    width: 100% !important;
  }
  .header.link {
    display: flex;
    vertical-align: middle;
    cursor: default;
    height: 50px;
    color: black;
    font-weight: bold;
    padding: 10px;
    font-size: 11pt;
    .saveButton {
      width: 50%;
      display: block;
      button {
        float: right;
      }
    }
  }
`;