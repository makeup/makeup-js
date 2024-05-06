const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    "makeup-lightbox-dialog": "./docs/element/makeup-lightbox-dialog/index.compiled.js",
  },
  mode: "production",
  optimization: {
    minimize: false,
  },
  output: {
    filename: "[name]/index.min.js",
    path: path.resolve(__dirname, "./docs/element"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/index.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "[name].[ext]" },
          },
        ],
      },
    ],
  },
};
