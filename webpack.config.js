const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        'makeup-exit-emitter': './docs/makeup-exit-emitter/index.compiled.js',
        'makeup-expander': './docs/makeup-expander/index.compiled.js',
        'makeup-focusables': './docs/makeup-focusables/index.compiled.js',
        'makeup-key-emitter': './docs/makeup-key-emitter/index.compiled.js',
        'makeup-next-id': './docs/makeup-next-id/index.compiled.js',
        'makeup-prevent-scroll-keys': './docs/makeup-prevent-scroll-keys/index.compiled.js',
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
