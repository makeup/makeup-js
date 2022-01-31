const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: 'source-map',
    entry: {
        'makeup-active-descendant': './docs/makeup-active-descendant/index.compiled.js',
        'makeup-alert-dialog': './docs/makeup-alert-dialog/index.compiled.js',
        'makeup-combobox': './docs/makeup-combobox/index.compiled.js',
        'makeup-confirm-dialog': './docs/makeup-confirm-dialog/index.compiled.js',
        'makeup-dialog-button': './docs/makeup-dialog-button/index.compiled.js',
        'makeup-drawer-dialog': './docs/makeup-drawer-dialog/index.compiled.js',
        'makeup-exit-emitter': './docs/makeup-exit-emitter/index.compiled.js',
        'makeup-expander': './docs/makeup-expander/index.compiled.js',
        'makeup-floating-label': './docs/makeup-floating-label/index.compiled.js',
        'makeup-focusables': './docs/makeup-focusables/index.compiled.js',
        'makeup-fullscreen-dialog': './docs/makeup-fullscreen-dialog/index.compiled.js',
        'makeup-input-dialog': './docs/makeup-input-dialog/index.compiled.js',
        'makeup-key-emitter': './docs/makeup-key-emitter/index.compiled.js',
        'makeup-keyboard-trap': './docs/makeup-keyboard-trap/index.compiled.js',
        'makeup-lightbox-dialog': './docs/makeup-lightbox-dialog/index.compiled.js',
        'makeup-listbox': './docs/makeup-listbox/index.compiled.js',
        'makeup-listbox-button': './docs/makeup-listbox-button/index.compiled.js',
        'makeup-menu': './docs/makeup-menu/index.compiled.js',
        'makeup-menu-button': './docs/makeup-menu-button/index.compiled.js',
        'makeup-listbox-button': './docs/makeup-listbox-button/index.compiled.js',
        'makeup-modal': './docs/makeup-modal/index.compiled.js',
        'makeup-navigation-emitter': './docs/makeup-navigation-emitter/index.compiled.js',
        'makeup-next-id': './docs/makeup-next-id/index.compiled.js',
        'makeup-panel-dialog': './docs/makeup-panel-dialog/index.compiled.js',
        'makeup-prevent-scroll-keys': './docs/makeup-prevent-scroll-keys/index.compiled.js',
        'makeup-roving-tabindex': './docs/makeup-roving-tabindex/index.compiled.js',
        'makeup-screenreader-trap': './docs/makeup-screenreader-trap/index.compiled.js',
        'makeup-snackbar-dialog': './docs/makeup-snackbar-dialog/index.compiled.js',
        'makeup-switch': './docs/makeup-switch/index.compiled.js',
        'makeup-toast-dialog': './docs/makeup-toast-dialog/index.compiled.js',
        'makeup-typeahead': './docs/makeup-typeahead/index.compiled.js'
    },
    mode: 'production',
    optimization: {
        minimize: false
    },
    output: {
        filename: '[name]/index.min.js',
        path: path.resolve(__dirname, './docs')
    },
    plugins: [new MiniCssExtractPlugin({
        filename: '[name]/index.css'
    })],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
};
