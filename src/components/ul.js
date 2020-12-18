import React from "react";

import styled from "styled-components";
import renderItem from "../renderTree";
const ListWrapper = styled.ul`
  padding-left: 30px;
`;

const UL = ({ children }) => {
  return <ListWrapper>{children.map(renderItem)}</ListWrapper>;
};

export default UL;
