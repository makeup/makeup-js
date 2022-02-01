// Karma configuration
// Generated on Tue Aug 11 2015 11:33:37 GMT-0700 (PDT)

const path = require('path');

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'packages/makeup-active-descendant/test/index.js',
            'packages/makeup-exit-emitter/test/index.js',
            'packages/makeup-expander/test/index.js',
            'packages/makeup-floating-label/test/index.js',
            'packages/makeup-focusables/test/index.js',
            'packages/makeup-key-emitter/test/index.js',
            'packages/makeup-keyboard-trap/test/index.js',
            'packages/makeup-modal/test/index.js',
            'packages/makeup-navigation-emitter/test/index.js',
            'packages/makeup-next-id/test/index.js',
            'packages/makeup-prevent-scroll-keys/test/index.js',
            'packages/makeup-roving-tabindex/test/index.js',
            'packages/makeup-screenreader-trap/test/index.js',
            'packages/makeup-switch/test/index.js',
            'packages/makeup-typeahead/test/index.js',

        ],

        preprocessors: {
            'packages/makeup-active-descendant/test/index.js': 'webpack',
            'packages/makeup-exit-emitter/test/index.js': 'webpack',
            'packages/makeup-expander/test/index.js': 'webpack',
            'packages/makeup-floating-label/test/index.js': 'webpack',
            'packages/makeup-focusables/test/index.js': 'webpack',
            'packages/makeup-key-emitter/test/index.js': 'webpack',
            'packages/makeup-keyboard-trap/test/index.js': 'webpack',
            'packages/makeup-modal/test/index.js': 'webpack',
            'packages/makeup-navigation-emitter/test/index.js': 'webpack',
            'packages/makeup-next-id/test/index.js': 'webpack',
            'packages/makeup-prevent-scroll-keys/test/index.js': 'webpack',
            'packages/makeup-roving-tabindex/test/index.js': 'webpack',
            'packages/makeup-screenreader-trap/test/index.js': 'webpack',
            'packages/makeup-switch/test/index.js': 'webpack',
            'packages/makeup-typeahead/test/index.js': 'webpack'
        },

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    // instrument only testing sources with Istanbul
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-active-descendant/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-exit-emitter/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-expander/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-floating-label/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-focusables/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-key-emitter/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-keyboard-trap/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-modal/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-navigation-emitter/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-next-id/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-prevent-scroll-keys/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-roving-tabindex/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-screenreader-trap/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-switch/src')
                    },
                    {
                        test: /\.js$/,
                        use: { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
                        include: path.resolve('packages/makeup-typeahead/src')
                    },
                ]
            }
        },

        // list of files to exclude
        exclude: [],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage-istanbul'],

        coverageIstanbulReporter: {
            reports: ['html', 'text-summary', 'lcovonly'],
            fixWebpackSourcePaths: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadless'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
