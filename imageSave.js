var path =require("path");
var {exec} = require("child_process");
var clipboardy = require("clipboardy");

var clip = Date.now().toString();
      console.log(`pngpaste ${path.join(__dirname, "./notes/images/", clip)}.png`)
      exec(`pngpaste ${path.join(__dirname, "./notes/images/", clip)}.png`);
      setTimeout(() => {clipboardy.writeSync(clip+".png");},1000);