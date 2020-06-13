const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const util = require('./utils/util');

const config = {
  publicPath: '',
  name: 'package',
  isdebug: process.env.NODE_ENV != 'production',
  publishPath: '//aoshiman.com.cn/shopAdmin',
};

// console.log(process.env.NODE_ENV);
console.log('************', config.isdebug, process.env.NODE_ENV);
const webpackConfig = {
  output: {
    path: path.resolve(__dirname, config.name),
    publicPath: config.isdebug ? '/' : config.publishPath,
    filename: '[name].[contenthash].js',
  },
  mode: config.isdebug ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: '/node_modules',
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: config.isdebug ? '/' : config.publishPath, // 重置fonts请求路径
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.(jpg|png|gif|svg|woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: '8192',
            name: 'images/[hash:8].[name].[ext]',
            publicPath: config.isdebug ? '/' : config.publishPath,
          },
        },

      },
    ],
  },

  resolve: {
    extensions: ['.vue', '.js', '.css'],
    alias: {
      '@config': config.isdebug ? path.resolve(__dirname, './config/dev.js') : path.resolve(__dirname, './config/prd.js'),
    },
  },

  plugins: [
    new VueLoaderPlugin(),

    new ExtractTextPlugin({
      filename: 'css/[name].css', // 制定编译后的目录
      allChunks: true, // 把分割的块分别打包
    }),
    new CleanWebpackPlugin([config.name]),
  ],

  devServer: {
    contentBase: path.join(__dirname, config.name),
    compress: true,
    port: 8888,
    open: true,
    openPage: 'http://localhost:8888/html/login.html',
  },
};

const jsEntryMap = {}; const
  htmlMap = {};

util.fileMap('./js/entry', jsEntryMap);

console.log(jsEntryMap);

util.fileMap('./html', htmlMap);

Object.keys(htmlMap).forEach(key => {
  console.log('htmlplugin', key, htmlMap[key]);
  webpackConfig.plugins.push(new htmlWebpackPlugin({
    template: htmlMap[key],
    filename: htmlMap[key],
    inject: 'body',
    chunksSortMode: 'none',
    // minify: {
    // 	removeComments: true,               //去注释
    // 	collapseWhitespace: true,           //压缩空格
    // 	removeAttributeQuotes: true         //去除属性引用
    // },
    // hash: config.isdebug ,
    // allChunks: true,
    chunks: [`./js/entry${key.replace('./html', '')}`],
    // chunks: ['./js/entry' + key.replace('./html','')],
  }));
});

webpackConfig.entry = jsEntryMap;

module.exports = webpackConfig;
