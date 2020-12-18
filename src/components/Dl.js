import React from "react";
import renderItem from "../renderTree";
import styled from "styled-components";

const DlWrapper = styled.dl`
  dt {
    float: left;
    width: 160px;
    clear: left;
    font-weight: bold;
    text-align: right;
    overflow: hidden;
  }
  dd {
    margin-left: 180px;
    margin-bottom: 30px;
  }
`;

const Dl = ({ text, classes, children }) => {
  return (
    <DlWrapper className={classes.join(" ")}>
      {" "}
      {children.map(renderItem)}
    </DlWrapper>
  );
};

export default Dl;
