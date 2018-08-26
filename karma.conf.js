var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    // set options
    config.set({
        browsers: ['Chrome'],
        singleRun: true,
        frameworks: ['mocha'],
        files: [
            'node_modules/jquery/dist/jquery.min.js',
            'app/tests/**/*.test.jsx'
        ],
        preprocessors: {
            // for all matching files we want to run webpack and use sourcemap
            'app/tests/**/*.test.jsx': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        client: {
            mocha: {
                timeout: '5000'
            }
        },
        // require webpack config file and pass config object
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
}