import React from "react";
import renderItem from "../renderTree";
import styled from "styled-components";

const H2Wrapper = styled.h2`
`;
const H2 = ({ text, classes, children }) => {
  const slug = text.trim().split(" ").slice(0, 3).join("-");

  return (
    <H2Wrapper id={slug} className={classes.join(" ")}>
      {text}
      <a href={"#" + slug} style={{ float: "right", fontSize: "60%" }}>
        #
      </a>
      {children.map(renderItem)}
    </H2Wrapper>
  );
};

export default H2;
