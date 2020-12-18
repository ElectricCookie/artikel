import React, { useState } from "react";
import inflate from "./inflate";
import parse from "./parser";
import renderItem from "./renderTree";

import styled from "styled-components";

const Wrapper = styled.body`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Libre Baskerville", serif;
    font-weight: bold;
  }
  font-family: "Source Sans Pro", sans-serif;
  @media (prefers-color-scheme: dark) {
    background: #1d2d50;
    color: #ffffff;
    a{
      color: #fcdab7;
    }
  }

  @media (prefers-color-scheme: light) {
    background: #fafafa;
    color: #333;
  }


  font-size: 12px;
  line-height: 130%;
`;

const App = ({ content, title }) => {
  return (
    <html>
      <head>
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <Wrapper>
          <div>{renderItem(inflate(parse(content)))}</div>
        </Wrapper>
      </body>
    </html>
  );
};

export default App;
