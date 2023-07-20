const path = require("path");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;
const GLOBAL_CSS_REGEXP = /\.(global|min)\.css$/;

module.exports = {
  mode,
  target,
  devtool,
  entry: [
    path.resolve(__dirname, "src", "index.tsx"),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "index.js",
    // publicPath: "/",
    clean: true,
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
              }
            },
          }
        ],
        exclude: GLOBAL_CSS_REGEXP
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ],
  },
  devtool: "eval",
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
};
