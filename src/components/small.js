import React from "react";
import renderItem from "../renderTree";

import styled from "styled-components";
const SmallWrapper = styled.small`
  font-size: 70%;
  color: #aaa;
`;

const Small = ({ text, classes, children }) => {
  return (
    <SmallWrapper className={classes.join(" ")}>
      {text} {children.map(renderItem)}
    </SmallWrapper>
  );
};

export default Small;
