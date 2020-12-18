const webpack = require("webpack");
const path = require("path");

const staticConfig = {
  target: "node",
  optimization: {
    minimize: false,
  },

  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, ""),
    ],
  },

  entry: {
    render: "./src/index.js",
  },

  output: {
    chunkFilename: "[name].[chunkhash:4].js",
    filename: (chunkData) => {
      return chunkData.chunk.name == "render"
        ? "[name].js"
        : "[name].[chunkhash:4].js";
    },
    publicPath: "",
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules(?!\/ansi-regex)(?!\/strip-ansi)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env","@babel/react"]
          }
        },
      }
    ],
  },
};

module.exports = [staticConfig];
