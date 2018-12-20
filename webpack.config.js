module.exports = function (env, argv) {
    const webpack = require('webpack');
    const htmlPlugin = require('html-webpack-plugin');
    const isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';

    const entries = {
        app: "./src/main.tsx",
    };

    const mainConfig = {
        devtool: false,
        entry: entries,
        mode: "production",
        target: "web",
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        isProduction && {
                            loader: 'babel-loader',
                            options: { plugins: ['react-hot-loader/babel'] }
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                compilerOptions: {
                                    module: "esnext",
                                    paths: {
                                        "*": ["@types/*", "*"]
                                    },
                                    typeRoots: []
                                }
                            }
                        }
                    ].filter(Boolean),
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: "style-loader" }, 
                        { loader: 'css-loader' }
                    ]
                },
                { test: /\.(woff)$/, use: 'file-loader' }
            ]
        },
        optimization: {
            minimize: false,
            splitChunks: false
        },
        output: {
            chunkFilename: "[name].bundle.js"
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"]
        },
        resolveLoader: {
        },
        plugins: [
            new htmlPlugin({
                template: 'src/app.html'
            })
        ],
        performance: {
            hints: false,
        },
        devServer: {
            contentBase: './src',
            hot: true,
            inline: true,
            historyApiFallback: {
                disableDotRule: true
            },
            stats: 'minimal'
        },
        node: {
            setImmediate: false,
        }
    };

    /**
     * To improve build times use `--mode development`, this will skip the split chunks optimizations.
     * Note: The fast dev loop will always load common.bundle.js but it will never be executed because
     * the tool bundle will contain all used common code due to split chunking being disabled.
     */
    if (argv.mode === "development") {
        return {
            ...mainConfig,
            entry: {
                ...mainConfig.entry
            }
        };
    } else {
        return {
            ...mainConfig,
            entry: {
                ...mainConfig.entry
            }
        };
    }

}