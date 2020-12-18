const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        },
      },

      {
        test: /module\.css$/,
        include: path.resolve(__dirname, "../"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
            options: {
              url: false,
              modules: true,
              localIdentName: "[local]--[hash:base64:5]",
            },
          },
          {
            loader: "postcss-loader",
          },
        ],
      },

      {
        exclude: /\.(js|css|html|json|svg)$/i,
        loader: "file-loader",
        options: { name: "[name].[hash:4].[ext]" },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "static.css",
    }),
  ],
};

module.exports = [staticConfig];
