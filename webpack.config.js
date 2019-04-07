const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const util = require('./utils/util');

const config = {
	publicPath:"",
	name:'shopAdmin',
	isdebug : process.env.NODE_ENV == 'production' ? false : true
};

// console.log(process.env.NODE_ENV);
console.log(config.isdebug);
let webpackConfig = {
	output : {
		path : path.resolve(__dirname,config.name),
		// publicPath : '/',
		filename : "[name].bundle.js"
	},
	// mode: config.isdebug ? "development": "production",
	// mode:'production',
	mode:'development',
	
	module : {
		rules : [
			{
				test: /\.js$/,
				use:{
					loader : "babel-loader"
				},
				exclude: '/node_modules'
			},
			{
				test: /\.vue$/,
				use : {
					loader : "vue-loader"
				}
			},
			{
				test:/\.css$/,
				use : ExtractTextPlugin.extract({
					publicPath: '../../../',                    // 重置fonts请求路径
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test:/\.(jpg|png|gif|svg|woff|woff2|eot|ttf|otf)$/,
				use:{
					loader: 'url-loader',
					options:{
						limit:'8192',
						name: 'images/[hash:8].[name].[ext]'
					}
				}
				
			}
		]
	},
	
	resolve : {
		extensions : ['.vue','.js','.css']
	},
	
	plugins : [
		new VueLoaderPlugin(),
		
		new ExtractTextPlugin({
			filename:"css/[name].css",//制定编译后的目录
			allChunks:true,//把分割的块分别打包
		}),
		
		
		// new htmlWebpackPlugin(
		// 	{
		// 		title: "This is the result",
		// 		filename: "./login.shtml",                   /** 注入js后的文件*/
		// 		template: "./html/login.shtml",               /** 注入前的模板文件*/
		// 		inject: "body",                             /**  注入位置*/
		// 		favicon: "",                                /** 网站icon*/
		// 		chunks:['./js/entry/login'],                             /** 选择特定的trunk*/
		// 		hash: true,
		// 		cache: true,
		// 		showErrors: true,
		// 		chunksSortMode: "auto",
		// 		excludeChunks: "",
		// 		xhtml: false
		// }),
		
	
		
		new CleanWebpackPlugin([config.name])
	],
	
	devServer : {
		contentBase: path.join(__dirname, config.name),
		compress: true,
		port:8888
	}
};

let jsEntryMap = {},htmlMap={};

util.fileMap('./js/entry',jsEntryMap);

console.log(jsEntryMap);

util.fileMap('./html',htmlMap);


Object.keys(htmlMap).forEach(key=>{
	webpackConfig.plugins.push(new htmlWebpackPlugin({
		template: htmlMap[key],
		filename: htmlMap[key],
		inject: "body",
		minify: {
			removeComments: true,               //去注释
			collapseWhitespace: true,           //压缩空格
			removeAttributeQuotes: true         //去除属性引用
		},
		// hash: config.isdebug ,
		chunks: ['./js/entry' + key.replace('./html','')],
	}));
});

webpackConfig.entry= jsEntryMap;

module.exports = webpackConfig;