const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    // entry: path.join(__dirname, 'src', 'index.js'), // раскомментировать если нужен js
    entry: path.join(__dirname, 'src', 'index.tsx'), // закомментировать если нужен js
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: 'babel-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.(js|jsx|tsx|ts)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader', 
                    'postcss-loader', 
                    'sass-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name].[ext]'),
                },
            },
            {
                test: /\.(woff|woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'fonts/[name][ext][query]',
                }
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                    parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                    parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
        ],

    },
    resolve: {
        extensions: ['.*', '.js', '.jsx', '.tsx', '.ts'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'template.pug'),
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'blog-detail.pug'),
            filename: 'blog-detail.html',
        }),
        // new HtmlWebpackPlugin({
        //     template: path.join(__dirname, 'src', 'about.pug'),
        //     filename: 'about.html',
        // }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
                onEnd: {
                    copy: [
                        {
                        source: path.join('src', 'static'),
                        destination: 'dist',
                        },
                    ],
                },
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
        // watchContentBase: true,
        hot: true,
    },
    optimization: {
        minimizer: [
        new ImageMinimizerPlugin({
            minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
                plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                ['svgo', { name: 'preset-default' }],
                ],
            },
            },
        }),
        ],
    },
};