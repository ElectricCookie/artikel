import React from "react";
import renderItem from "../renderTree";

const Dt = ({ text, classes, children }) => {
  return (
    <dt className={classes.join(" ")}>
      {text} {children.map(renderItem)}
    </dt>
  );
};

export default Dt;
