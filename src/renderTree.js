import React from "react";
import Dd from "./components/dd";
import Dl from "./components/Dl";
import Document from "./components/Document";
import Dt from "./components/dt";
import H1 from "./components/H1";
import H2 from "./components/H2";
import H3 from "./components/H3";
import Hr from "./components/hr";
import Li from "./components/li";
import OL from "./components/ol";
import P from "./components/P";
import Page from "./components/Page";
import UL from "./components/ul";
import Img from "./components/img";
import B from "./components/b";
import Small from "./components/small";

import { Up, To, From, Down, Comp } from "./components/symbols";
const components = {
  document: Document,
  h1: H1,
  h2: H2,
  h3: H3,
  img: Img,
  li: Li,
  page: Page,
  dl: Dl,
  dt: Dt,
  hr: Hr,
  dd: Dd,
  p: P,
  b: B,
  small: Small,
  ul: UL,
  ol: OL,
  up: Up,
  from: From,
  to: To,
  down: Down,
  comp: Comp,
};

const renderItem = ({ type, text, classes, parameters, children }) => {
  if (components[type] != null) {
    return React.createElement(components[type], {
      type,
      text,
      classes,
      parameters,
      children,
    });
  }

  return <div>Unknown type: {type}</div>;
};

export default renderItem;
