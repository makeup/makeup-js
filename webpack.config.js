const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        'makeup-exit-emitter': './docs/makeup-exit-emitter/index.compiled.js',
        'makeup-focusables': './docs/makeup-focusables/index.compiled.js',
        'makeup-next-id': './docs/makeup-next-id/index.compiled.js',
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
