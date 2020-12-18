import React from "react";
import renderItem from "../renderTree";


const Dd = ({ text, classes, children }) => {
  return (
    <dd className={classes.join(" ")}>
      {text} {children.map(renderItem)}
    </dd>
  );
};

export default Dd;
