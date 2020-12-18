import chalk from "chalk";
import path from "path";
import fs from "fs";
import App from "./App";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import React from "react";
import glob from "glob";

const OUT_DIR = path.join(process.cwd(), "./output/");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR);
}

glob(path.join(process.cwd(), "./**/*.note"), {}, (err, files) => {
  files.forEach((item) => {
    var content = fs.readFileSync(item).toString();
    const sheet = new ServerStyleSheet();
    var output = ReactDOMServer.renderToStaticMarkup(
      sheet.collectStyles(<App title={path.basename(item)} content={content} />)
    );
    output += sheet.getStyleTags();

    fs.writeFileSync(
      path.join(OUT_DIR, path.basename(item, "note") + "html"),
      output
    );
  });
});
