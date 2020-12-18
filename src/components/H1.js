import React from "react";
import renderItem from "../renderTree";
import styled from "styled-components";

const H1Wrapper = styled.h1`

`;

const H1 = ({ text, classes, children }) => {
  const slug = text.trim().split(" ").slice(0, 3).join("-");

  return (
    <H1Wrapper id={slug} className={classes.join(" ")}>
      {text}
      <a href={"#" + slug} style={{ float: "right", fontSize: "60%" }}>
        #
      </a>
      {children.map(renderItem)}
    </H1Wrapper>
  );
};

export default H1;
