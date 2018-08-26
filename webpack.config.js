// require webpack
var webpack = require('webpack');
var path = require('path');

/**
 * configuration file for running webpack for project with
 * cannot be done just from command line because JSX (Babel, React) and ES6 functionality is used in project
 * when a file with such name is available webpack can be run without arguments
 * now we compile the application before we start the server so the bundle file is ready to go -
 * this is a more realistic setup for a production React app
 *
 * Run webpack waiting for changes (no need to re-run it every time):
 * webpack -w
 */
module.exports = {
    // the entry point is where webpack starts compiling the bundle file from
    // by default webpack does not know what to do with a jsx file
    // "app" folder will contain all the raw files
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/js/foundation.min.js',
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        })
    ],
    // output:
    output: {
        // in nodejs this gives us the path to the current folder
        path: __dirname,
        // the bundle file is in the "public" folder because it is served to the browser
        filename: './public/bundle.js'
    },
    resolve: {
        // root folder to resolve paths of required components
        root: __dirname,
        // tell webpack where to find our components, so we can require them just by name from any other file
        alias: {
            applicationStyles: 'app/styles/app.scss'
        },
        // file extensions that we want to process
        extensions: ['', '.js', '.jsx']
    },
    module: {
        // specify loader to convert the jsx file into ES5 javascript
        loaders: [
            {
                // name of the loader
                loader: 'babel-loader',
                // what the loader has to do
                query: {
                    // presets are built into babel:
                    // this tells babel-loader to take the files, parse them through react, take the output and run it through ES2015 as well
                    presets: ['react', 'es2015', 'stage-0']
                },
                // regular expression specifying which files to process
                test: /\.jsx?$/,
                // which folders should not be parsed
                exclude: /(node_module|bower_components)/
            }
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
    },
    // enables creation of source maps that the browser understands
    // this way we can debug the files we wrote but still run the transformed files
    devtool: 'cheap-module-eval-source-map'
};
