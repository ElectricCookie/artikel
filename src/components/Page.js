import React from "react";
import styled from "styled-components";
import renderItem from "../renderTree";

const PageWrapper = styled.div`
  width: 210mm;
  margin: 0 auto;
  @media (prefers-color-scheme: dark) {
    background: #133b5c;
    color: #ffffff;
  }

  @media (prefers-color-scheme: light) {
    background: #fff;
    color: #333;
  }
  min-height: 297mm;
  padding: 2rem;
  @media only screen{
    border-radius: 8px;
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
