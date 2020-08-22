import styled from "styled-components";
import { Card } from "semantic-ui-react";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  border-radius: 5px;
  background-color: lightgrey;
  padding: 3rem;
  overflow: auto;
  div.content-wrapper {
    margin: 0;
    width: inherit;
    display: flex;

    @media (max-width: 375px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    @media (max-width: 414px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    div.content {
      margin: 0;
      margin-right: 3rem;
      width: fit-content;
      text-align: center;
      @media (max-width: 375px) {
        margin-right: 0;
        div.map {
          width: 100% !important;
        }
      }
      @media (max-width: 414px) {
        margin-right: 0;
        div.map {
          width: 100% !important;
        }
      }
    }
  }

  @media (max-width: 375px) {
    flex-direction: column;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    div {
      margin: 0;
    }
  }
  @media (max-width: 414px) {
    justify-content: center;
    width: 100%;
    padding: 1rem;
    div {
      margin: 0;
    }
  }
`;

export const StyledCard = styled(Card)`
  margin: 1rem !important;
  width: 350px !important;
  @media (max-width: 375px) {
    max-width: 290px !important;
  }
  @media (max-width: 414px) {
    width: 240px !important;
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

export const Image = styled.img`
  height: 90px;
  width: 150px;
  border-radius: 5px;
`;
