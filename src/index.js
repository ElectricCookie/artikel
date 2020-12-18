import chalk from "chalk";
import path from "path";
import { program } from "commander";
import fs from "fs";
import App from "./App";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import React from "react";
import glob from "glob";

program.version(require("../package.json")["version"]);

program.command("img").option("-C, --compress", "compress", "true");

program
  .command("render [path...]")
  .description("Render files")
  .option("-O, --output <path>", "change the output directory", "./output")
  .option("-F, --force", "force a re-render", "false")

  .action((files, options) => {
    console.log(process.argv);
    console.log(files);
    console.log(options.output);
    console.log(options.force);

    const OUT_DIR = path.join(process.cwd(), options.output);

    if (!fs.existsSync(OUT_DIR)) {
      fs.mkdirSync(OUT_DIR);
    }

    console.log(
      chalk.blueBright("👋🏻 Heyo. Artikel is looking for your notes...")
    );

    if (files.length == 0) {
      console.log(
        chalk.green("No specific file specified... looking for any *.art")
      );
      glob(path.join(process.cwd(), "./*.art"), {}, (err, files) => {
        if (err) {
          console.error(
            chalk.redBright("😫 Oh no something went wrong: " + err)
          );
          return;
        }
        render(files,OUT_DIR);
      });
    } else {
      render(files,OUT_DIR);
    }
  });

program.parse(process.argv);

const render = (files, out_dir) => {
  files.forEach((item) => {
    process.stdout.write(chalk.dim(`✍🏻 Converting note: "${item}"... \t\t`));
    var content = fs.readFileSync(item).toString();
    const sheet = new ServerStyleSheet();
    var output = ReactDOMServer.renderToStaticMarkup(
      sheet.collectStyles(<App title={path.basename(item)} content={content} />)
    );
    output += sheet.getStyleTags();
    const finalPath = path.join(out_dir, path.basename(item, "art") + "html");
    fs.writeFileSync(
      finalPath,
      output
    );
    console.log(chalk.dim(` Done! Written to: ${finalPath}`));
  });
};
