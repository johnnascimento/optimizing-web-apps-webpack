const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const StatsGraphPlugin = require('./StatsGraphPlugin');

const otherConfig = {
    name: 'other',
    mode: 'development',
    entry: [
        './app/app.js'
    ],
    output: {
        path: path.resolve(__dirname, 'app/other'),
        filename: 'app.bundle.js',
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'app'),
            watch: false
        },
        devMiddleware: {
            publicPath: '/other/'
        },
        hot: true
    },
    optimization: {
        moduleIds: 'named'
    },
    plugins: []
};

module.exports = function (env) {
    const isDevelopment = (env && env.development) ? env.development : false;

    const baseConfig = {
        mode: 'development',
        entry: [
            './app/app.js'
        ],
        output: {
            path: path.resolve(__dirname, 'app/dist'),
            filename: 'app.bundle.js',
            clean: true,
        },
        module:{
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        debug: true,
                                        modules: false // Set the type of export/import pattern used. By default false is set, but we can use commonJs, systemJs, amd, etc
                                    }
                                ]
                            ]
                        }
                    }
                }
            ]
        },
        devtool: 'inline-source-map',
        optimization: {
            moduleIds: 'named'
        },
        plugins: [
            new webpack.DefinePlugin({
                ENV_IS_DEVELOPMENT: isDevelopment,
                ENV_IS: JSON.stringify(env),
            }),
            // new StatsGraphPlugin()
        ]
    };

    let baseConfigBuilt = baseConfig;

    console.log(`Env: \n ${JSON.stringify(env)}`);
    console.log(`This is a ${isDevelopment ? 'development' : 'production'} build`);

    if (isDevelopment) {
        baseConfigBuilt = merge(baseConfig, {
            devServer: {
                static: {
                    directory: path.resolve(__dirname, 'app'),
                    watch: false
                },
                devMiddleware: {
                    publicPath: '/dist/'
                },
                hot: true
            },
            plugins: [
                new HtmlWebpackPlugin({
                    title: 'HtmlWebpackPlugin',
                }),
                new webpack.HotModuleReplacementPlugin({
                    title: 'HotModuleReplacementPlugin'
                }),
                {
                    apply(compiler) {
                        compiler.hooks.done.tap("Done", function (params) {
                            console.log(require('util').inspect(compiler.options));
                        });
                    }
                }
            ]
        });

        // console.log(`Development mode active: ${JSON.stringify(baseConfigBuilt.plugins)}`);
        // baseConfig.plugins.push(
        //     new HtmlWebpackPlugin({
        //         title: 'Hot Module Replacement',
        //     }),
        //     new webpack.HotModuleReplacementPlugin()
        // )
    }

    // baseConfig.name = 'base';

    return baseConfigBuilt;
};
