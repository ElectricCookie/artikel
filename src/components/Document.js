import React from "react";

import styled from "styled-components";
import renderItem from "../renderTree";
const DocumentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Document = ({ children }) => {
  return children.map(renderItem);
};

export default Document;
