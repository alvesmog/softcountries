import styled, { createGlobalStyle } from 'styled-components'

export const  PageWrapper = styled.div`
    height: 100vh;
    width: 100%;
    padding: 3rem;
    background-image: linear-gradient(to bottom right, #465564, #293139);
    overflow-y: auto;
    @media (max-width: 375px) {
      padding: 1rem;
    }
`

export default createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
    }
    html,
    body,
    #root {
      height: 100%;
    }
    body {
      text-rendering: optimizeLegibility !important;
      font-family: sans-serif;
      -webkit-font-smoothing: antialiased;
      background: linear-gradient(to top, rgba(97, 112, 126, 0.5), #fff);
    }
`;