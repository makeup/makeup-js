// Karma configuration
// Generated on Tue Aug 11 2015 11:33:37 GMT-0700 (PDT)

const path = require("path");

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha"],

    // list of files / patterns to load in the browser
    files: [
      "packages/core/makeup-active-descendant/test/index.js",
      "packages/core/makeup-exit-emitter/test/index.js",
      "packages/core/makeup-expander/test/index.js",
      "packages/core/makeup-floating-label/test/index.js",
      "packages/core/makeup-focusables/test/index.js",
      "packages/core/makeup-key-emitter/test/index.js",
      "packages/core/makeup-keyboard-trap/test/index.js",
      "packages/core/makeup-modal/test/index.js",
      "packages/core/makeup-navigation-emitter/test/index.js",
      "packages/core/makeup-next-id/test/index.js",
      "packages/core/makeup-prevent-scroll-keys/test/index.js",
      "packages/core/makeup-roving-tabindex/test/index.js",
      "packages/core/makeup-screenreader-trap/test/index.js",
      "packages/core/makeup-typeahead/test/index.js",
      "packages/ui/makeup-switch/test/index.js",
      "packages/ui/makeup-tabs/test/index.js",
    ],

    preprocessors: {
      "packages/core/makeup-active-descendant/test/index.js": "webpack",
      "packages/core/makeup-exit-emitter/test/index.js": "webpack",
      "packages/core/makeup-expander/test/index.js": "webpack",
      "packages/core/makeup-focusables/test/index.js": "webpack",
      "packages/core/makeup-key-emitter/test/index.js": "webpack",
      "packages/core/makeup-keyboard-trap/test/index.js": "webpack",
      "packages/core/makeup-modal/test/index.js": "webpack",
      "packages/core/makeup-navigation-emitter/test/index.js": "webpack",
      "packages/core/makeup-next-id/test/index.js": "webpack",
      "packages/core/makeup-prevent-scroll-keys/test/index.js": "webpack",
      "packages/core/makeup-roving-tabindex/test/index.js": "webpack",
      "packages/core/makeup-screenreader-trap/test/index.js": "webpack",
      "packages/core/makeup-typeahead/test/index.js": "webpack",
      "packages/ui/makeup-floating-label/test/index.js": "webpack",
      "packages/ui/makeup-switch/test/index.js": "webpack",
      "packages/ui/makeup-tabs/test/index.js": "webpack",
    },

    webpack: {
      mode: "development",
      module: {
        rules: [
          // instrument only testing sources with Istanbul
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-active-descendant/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-exit-emitter/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-expander/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-focusables/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-key-emitter/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-keyboard-trap/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-modal/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-navigation-emitter/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-next-id/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-prevent-scroll-keys/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-roving-tabindex/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-screenreader-trap/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/core/makeup-typeahead/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/ui/makeup-floating-label/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/ui/makeup-switch/src"),
          },
          {
            test: /\.js$/,
            use: { loader: "coverage-istanbul-loader", options: { esModules: true } },
            include: path.resolve("packages/ui/makeup-tabs/src"),
          },
        ],
      },
    },

    // list of files to exclude
    exclude: [],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["coverage-istanbul"],

    coverageIstanbulReporter: {
      reports: ["html", "text-summary", "lcovonly"],
      fixWebpackSourcePaths: true,
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
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
  });
};
