const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
    clean: true,
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "less-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 4kb
          },
        },
        generator: {
          filename: "static/images/[hash:6][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name][hash:6][ext]",
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      
    ],
  },
  resolve:{
    extensions: ['.js', '.jsx', '.json','.wasm'],
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  devServer:{
    // hotOnly:true,
    open:true,
    hot: "only",
    proxy:{
        '/api':{
          target:"http://localhost:8888",
          pathRewrite:{
            "/api":""
          },
          changeOrigin:true
        }
        
      }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "react模板",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: path.relative(__dirname,'../dist'),
          globOptions: {
            ignore: ["**/index.html", "**/.DS_store"],
          },
        },
      ],
    }),
    new ReactRefreshWebpackPlugin()
  ],
};
