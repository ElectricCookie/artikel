import React from "react";
import renderItem from "../renderTree";

const Li = ({ text, classes, children }) => {
  return (
    <li className={classes.join(" ")}>
      {text} {children.map(renderItem)}
    </li>
  );
};

export default Li;
