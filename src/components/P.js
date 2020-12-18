import React from "react";
import renderItem from "../renderTree";

const P = ({ text, classes, children }) => {
  return (
    <p className={classes.join(" ")}>
      {text}  {children.map(renderItem)}
    </p>
  );
};

export default P;
