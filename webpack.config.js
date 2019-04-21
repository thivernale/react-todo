// require webpack
var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

// fetch environment variables available on node
// we can define variable on command line and run weback with it like this:
// add -p flag for optimization
// > NODE_ENV=production webpack -p
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
    envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

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
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_KEY: JSON.stringify(process.env.API_KEY),
                AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
                DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
                PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
                STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
                MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
                GITHUB_ACCESS_TOKEN: JSON.stringify(process.env.GITHUB_ACCESS_TOKEN)
            }
        })
    ],
    // output:
    output: {
        // in nodejs this gives us the path to the current folder
        path: __dirname + '/public',
        // the bundle file is in the "public" folder because it is served to the browser
        filename: './bundle.js'
    },
    resolve: {
        // root folder to resolve paths of required components
        root: __dirname,
        // specify folders for webpack to look at (overwrite default) so we don't have to specify alias for every file in 'alias' setting
        modulesDirectories: [
            'node_modules',
            './app/components',
            './app/api'
        ],
        // tell webpack where to find our components, so we can require them just by name from any other file
        alias: {
            app: 'app',
            applicationStyles: 'app/styles/app.scss',
            actions: 'app/actions/actions.jsx',
            reducers: 'app/reducers/reducers.jsx',
            configureStore: 'app/store/configureStore.jsx'
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
            },
            //{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            {
                test: /\.woff(2)?/,
                loader: "url-loader"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]/*,
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_module|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-0']
                    }
                }
            },
            {
                test: /\.s?css$/,
                loaders: ["style", "css?sourceMap", "sass?sourceMap"],
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.ttf$|\.eot$|\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './public'
                        }
                    },
                ],
                options: {
                    ouputPath: "./public"
                }
            },
            {
                test: /\.woff2?$/,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ]
            }
        ]*/
    },
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
    },
    // enables creation of source maps that the browser understands
    // this way we can debug the files we wrote but still run the transformed files
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};
