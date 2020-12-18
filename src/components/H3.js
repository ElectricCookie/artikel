import React from "react";
import renderItem from "../renderTree";

import styled from "styled-components";

const H3Wrapper = styled.h3`
  color: #ffd200;
`;

const H3 = ({ text, classes, children }) => {
  const slug = text.trim().split(" ").slice(0, 3).join("-");
  return (
    <H3Wrapper id={slug} className={classes.join(" ")}>
      {text}
      <a href={"#" + slug} style={{ float: "right", fontSize: "60%" }}>
        #
      </a>
      {children.map(renderItem)}
    </H3Wrapper>
  );
};

export default H3;
