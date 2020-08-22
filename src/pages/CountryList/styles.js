import styled from "styled-components";

export const Container = styled.div`
  display: inline-block;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: lightgrey;
  padding: 3rem;
  overflow-y: auto;
  .searchInput {
    width: 40rem;
    div[role="listbox"] {
      min-width: 7rem;
    }
  }

  .search {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  @media (max-width: 375px) {
    .searchInput {
      max-width: 230px !important;
      margin: 14px;
      display: flex;
      flex-direction: column;
      input,
      div,
      button {
        width: 230px !important;
      }
    }
  }

  @media (max-width: 414px) {
    .searchInput {
      max-width: 198px !important;
      margin: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      input,
      div,
      button {
        width: 198px !important;
      }
    }
  }

  div.cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    h3 {
      padding-left: 23px;
      width: fit-content;
    }
    img.loader {
      margin-top: 100px;
    }
  }
`;
