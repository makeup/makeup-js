const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        'makeup-active-descendant': './docs/makeup-active-descendant/index.compiled.js',
        'makeup-exit-emitter': './docs/makeup-exit-emitter/index.compiled.js',
        'makeup-expander': './docs/makeup-expander/index.compiled.js',
        'makeup-floating-label': './docs/makeup-floating-label/index.compiled.js',
        'makeup-focusables': './docs/makeup-focusables/index.compiled.js',
        'makeup-key-emitter': './docs/makeup-key-emitter/index.compiled.js',
        'makeup-keyboard-trap': './docs/makeup-keyboard-trap/index.compiled.js',
        'makeup-listbox': './docs/makeup-listbox/index.compiled.js',
        'makeup-modal': './docs/makeup-modal/index.compiled.js',
        'makeup-navigation-emitter': './docs/makeup-navigation-emitter/index.compiled.js',
        'makeup-next-id': './docs/makeup-next-id/index.compiled.js',
        'makeup-prevent-scroll-keys': './docs/makeup-prevent-scroll-keys/index.compiled.js',
        'makeup-roving-tabindex': './docs/makeup-roving-tabindex/index.compiled.js',
        'makeup-screenreader-trap': './docs/makeup-screenreader-trap/index.compiled.js',
        'makeup-switch': './docs/makeup-switch/index.compiled.js',
        'makeup-typeahead': './docs/makeup-typeahead/index.compiled.js'
    },
    mode: 'production',
    optimization: {
        minimize: true
    },
    output: {
        filename: '[name]/index.min.js',
        path: path.resolve(__dirname, './docs')
    }
};
