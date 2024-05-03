const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: "source-map",
  entry: {
    "makeup-alert-dialog": "./docs/ui/makeup-alert-dialog/index.compiled.js",
    "makeup-combobox": "./docs/ui/makeup-combobox/index.compiled.js",
    "makeup-confirm-dialog": "./docs/ui/makeup-confirm-dialog/index.compiled.js",
    "makeup-dialog-button": "./docs/ui/makeup-dialog-button/index.compiled.js",
    "makeup-drawer-dialog": "./docs/ui/makeup-drawer-dialog/index.compiled.js",
    "makeup-floating-label": "./docs/ui/makeup-floating-label/index.compiled.js",
    "makeup-fullscreen-dialog": "./docs/ui/makeup-fullscreen-dialog/index.compiled.js",
    "makeup-input-dialog": "./docs/ui//makeup-input-dialog/index.compiled.js",
    "makeup-lightbox-dialog": "./docs/ui/makeup-lightbox-dialog/index.compiled.js",
    "makeup-listbox": "./docs/ui/makeup-listbox/index.compiled.js",
    "makeup-listbox-button": "./docs/ui/makeup-listbox-button/index.compiled.js",
    "makeup-menu": "./docs/ui/makeup-menu/index.compiled.js",
    "makeup-menu-button": "./docs/ui/makeup-menu-button/index.compiled.js",
    "makeup-modal": "./docs/ui/makeup-modal/index.compiled.js",
    "makeup-panel-dialog": "./docs/ui/makeup-panel-dialog/index.compiled.js",
    "makeup-snackbar-dialog": "./docs/ui/makeup-snackbar-dialog/index.compiled.js",
    "makeup-switch": "./docs/ui/makeup-switch/index.compiled.js",
    "makeup-toast-dialog": "./docs/ui/makeup-toast-dialog/index.compiled.js",
  },
  mode: "production",
  optimization: {
    minimize: false,
  },
  output: {
    filename: "[name]/index.min.js",
    path: path.resolve(__dirname, "./docs/ui"),
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
