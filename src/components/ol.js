import React from "react";

import styled from "styled-components";
import renderItem from "../renderTree";
const ListWrapper = styled.ol`
  padding-left: 30px;
`;

const OL = ({ children }) => {
  return <ListWrapper>{children.map(renderItem)}</ListWrapper>;
};

export default OL;
