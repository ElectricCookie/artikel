import React from "react";
import renderItem from "../renderTree";

const Img = ({ text, classes, children }) => {
  return (
    <img
      src={"http://localhost:9090/image/" + text.trim()}
      className={classes.join(" ")}
    />
  );
};

export default Img;
