const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    "makeup-active-descendant": "./docs/core/makeup-active-descendant/index.compiled.js",
    "makeup-exit-emitter": "./docs/core/makeup-exit-emitter/index.compiled.js",
    "makeup-expander": "./docs/core/makeup-expander/index.compiled.js",
    "makeup-focusables": "./docs/core/makeup-focusables/index.compiled.js",
    "makeup-key-emitter": "./docs/core/makeup-key-emitter/index.compiled.js",
    "makeup-keyboard-trap": "./docs/core/makeup-keyboard-trap/index.compiled.js",
    "makeup-modal": "./docs/core/makeup-modal/index.compiled.js",
    "makeup-navigation-emitter": "./docs/core/makeup-navigation-emitter/index.compiled.js",
    "makeup-next-id": "./docs/core/makeup-next-id/index.compiled.js",
    "makeup-prevent-scroll-keys": "./docs/core/makeup-prevent-scroll-keys/index.compiled.js",
    "makeup-roving-tabindex": "./docs/core/makeup-roving-tabindex/index.compiled.js",
    "makeup-screenreader-trap": "./docs/core/makeup-screenreader-trap/index.compiled.js",
    "makeup-typeahead": "./docs/core/makeup-typeahead/index.compiled.js",
  },
  mode: "production",
  optimization: {
    minimize: false,
  },
  output: {
    filename: "[name]/index.min.js",
    path: path.resolve(__dirname, "./docs/core"),
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
