import React from "react";
import renderItem from "../renderTree";

const B = ({ text, classes, children }) => {
  return (
    <b className={classes.join(" ")}>
      {text} {children.map(renderItem)}
    </b>
  );
};

export default B;
