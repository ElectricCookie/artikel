import React from "react";
import styled from "styled-components";
import renderItem from "../renderTree";

const PageWrapper = styled.div`
  width: 210mm;
  margin: 0 auto;
  background: #0c1011;
  min-height: 297mm;
  padding: 2rem;
  @media (screen) {
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.2);
  }
`;

const Page = ({ text, classes, children }) => {
  return (
    <PageWrapper className={classes.join(" ")}>
      {children.map(renderItem)}
    </PageWrapper>
  );
};

export default Page;
