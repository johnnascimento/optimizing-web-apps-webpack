const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const StatsGraphPlugin = require('./StatsGraphPlugin');
const babelLoader = require('./babelLoader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
// const { NpmAutoInstallWebpackPlugin } = require("npm-auto-install-webpack-plugin");
const codeGenConfig = require('./configs/codegen');

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
    const isDevelopment = (env && env.development) ? env.development : false,
        baseConfigMode = (env && env.development) ? 'development' : 'production',
        distLocation = 'app/dist';

    const baseConfig = {
        mode: baseConfigMode,
        entry: [
            './app/app.js'
        ],
        output: {
            path: path.resolve(__dirname, distLocation),
            filename: 'app.bundle.js',
            clean: true,
        },
        devtool: 'inline-source-map',
        optimization: {
            moduleIds: 'named'
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                ENV_IS_DEVELOPMENT: isDevelopment,
                ENV_IS: JSON.stringify(env),
            }),
            // new StatsGraphPlugin()
        ]
    };

    let baseConfigBuilt = merge(baseConfig, babelLoader);

    // console.log(`Env: \n ${JSON.stringify(env)}`);
    console.log(`This is a ${isDevelopment ? 'development' : 'production'} build`);
    // console.log('baseConfigBuilt', baseConfigBuilt);

    if (isDevelopment) {
        let baseConfigMerged = merge(baseConfigBuilt, codeGenConfig, {
            devServer: {
                static: {
                    directory: path.resolve(__dirname, 'app'),
                    watch: false
                },
                devMiddleware: {
                    publicPath: '/dist/'
                },
                hot: true,
                client: {
                    overlay: true
                }
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
                            // console.log(require('util').inspect(compiler.options));
                        });
                    }
                }
            ]
        });

        baseConfigBuilt = baseConfigMerged;

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
