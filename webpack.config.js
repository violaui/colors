const path = require("path");
const pkg = require("./package.json");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: "./colors.sass",
  output: {
    path: path.resolve(__dirname, "css"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version} | ${pkg.repository} | ${pkg.license} License`
    }),
    new MiniCssExtractPlugin({filename: "colors.min.css"}),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {map: true},
      cssProcessorPluginOptions: {
        preset: ["advanced", {
          discardComments: {removeAll: false},
          autoprefixer: {add: true}
        }]
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: [/node_modules/],
        use: [
          {loader: MiniCssExtractPlugin.loader, options: {sourceMap: true}},
          {loader: "css-loader", options: {sourceMap: true}},
          {loader: "resolve-url-loader", options: {sourceMap: true}},
          {
            loader: "sass-loader",
            options: {sourceMap: true, sourceMapContents: false, outputStyle: "compact"}
          }
        ]
      }
    ]
  }
}
