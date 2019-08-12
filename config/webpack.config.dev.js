'use strict';

// 导入webpack依赖
const path = require('path');
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const getClientEnvironment = require('./env');
const paths = require('./paths');
const ManifestPlugin = require('webpack-manifest-plugin');
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');

const publicPath = '/';		//告诉webpack, app 被served的位置，开发环境中为根目录
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

// 样式文件名的正则表达
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less/;

// style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
	const loaders = [
		require.resolve('style-loader'),
		{
			loader: require.resolve('css-loader'),
			options: cssOptions,
		},
		{
			loader: require.resolve('postcss-loader'),
			options: {
				ident: 'postcss',
				plugins: () => [
					require('postcss-flexbugs-fixes'),
					require('postcss-preset-env')({
						autoprefixer: {
							flexbox: 'no-2009',
						},
						stage: 3,
					}),
				],
			},
		},
	];
	if (preProcessor) {
		loaders.push(require.resolve(preProcessor));
	}
	return loaders;
};

/**
 * 开发环境的配置
 */
module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	// 入口
	entry: [
		require.resolve('react-dev-utils/webpackHotDevClient'),
		paths.appIndexJs,
	],
	output: {
		pathinfo: true,
		filename: 'static/js/bundle.js',
		chunkFilename: 'static/js/[name].chunk.js',
		publicPath: publicPath,
		devtoolModuleFilenameTemplate: info =>
			path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: false,
		},
		runtimeChunk: true,
	},
	resolve: {
		modules: ['node_modules'].concat(
			process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
		),
		extensions: ['.mjs', '.web.js', '.js', '.json', '.web.jsx', '.jsx'],
		alias: {	/**配置别名，配置之后需要重启服务 */
			'react-native': 'react-native-web',
			'@': paths.appSrc,	// 全局相对路径别名，处理相对路径过长和繁琐问题
			myutils: paths.appSrc + '/utils',
			myaxios: paths.appSrc + "/axios",
			mycomponents: paths.appSrc + "/components"
		},
		plugins: [
			PnpWebpackPlugin,
			new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
		],
	},
	resolveLoader: {
		plugins: [
			PnpWebpackPlugin.moduleLoader(module),
		],
	},
	module: {
		strictExportPresence: true,
		rules: [
			{ parser: { requireEnsure: false } },
			{
				test: /\.(js|mjs|jsx)$/,
				enforce: 'pre',
				use: [
					{
						options: {
							formatter: require.resolve('react-dev-utils/eslintFormatter'),
							eslintPath: require.resolve('eslint'),

						},
						loader: require.resolve('eslint-loader'),
					},
				],
				include: paths.appSrc,
			},
			{
				oneOf: [
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
					{
						test: /\.(js|mjs|jsx)$/,
						include: paths.appSrc,
						loader: require.resolve('babel-loader'),
						options: {
							customize: require.resolve(
								'babel-preset-react-app/webpack-overrides'
							),

							plugins: [
								[
									require.resolve('babel-plugin-named-asset-import'),
									{
										loaderMap: {
											svg: {
												ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
											},
										},
									},
								],
								['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
							],
							cacheDirectory: true,
							cacheCompression: false,
						},
					},
					{
						test: /\.(js|mjs)$/,
						exclude: /@babel(?:\/|\\{1,2})runtime/,
						loader: require.resolve('babel-loader'),
						options: {
							babelrc: false,
							configFile: false,
							compact: false,
							presets: [
								[
									require.resolve('babel-preset-react-app/dependencies'),
									{ helpers: true },
								],
							],
							cacheDirectory: true,
							cacheCompression: false,
							sourceMaps: false,
						},
					},
					{
						test: cssRegex,
						exclude: cssModuleRegex,
						use: getStyleLoaders({
							importLoaders: 1,
						}),
					},
					{
						test: cssModuleRegex,
						use: getStyleLoaders({
							importLoaders: 1,
							modules: true,
							getLocalIdent: getCSSModuleLocalIdent,
						}),
					},
					{
						test: sassRegex,
						exclude: sassModuleRegex,
						use: getStyleLoaders({ importLoaders: 2 }, 'sass-loader'),
					},
					{
						test: sassModuleRegex,
						use: getStyleLoaders(
							{
								importLoaders: 2,
								modules: true,
								getLocalIdent: getCSSModuleLocalIdent,
							},
							'sass-loader'
						),
					},
					{
						test: lessRegex,
						exclude: lessModuleRegex,
						use: [
							...getStyleLoaders({ importLoaders: 2 }, 'less-loader'),
							// {
							// 	loader: require.resolve('less-loader'),
							// 		options: {
							// 		  	modifyVars: { "@primary-color": "#001529" },
							// 		},
							// }
						],
					},
					{
						test: lessModuleRegex,
						use: getStyleLoaders(
							{
								importLoaders: 2,
								modules: true,
								getLocalIdent: getCSSModuleLocalIdent,
							},
							'less-loader'
						),
					},
					{
						exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/],
						loader: require.resolve('file-loader'),
						options: {
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
				],
			},
			// ** STOP ** Are you adding a new loader?
			// Make sure to add the new loader(s) before the "file" loader.
		],
	},
	plugins: [
		// 用于生成html文件，并在其中引入js以及样式
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
		}),
		// Makes some environment variables available in index.html.
		// The public URL is available as %PUBLIC_URL% in index.html, e.g.:
		// <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
		// In development, this will be an empty string.
		new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
		// This gives some necessary context to module not found errors, such as
		// the requesting resource.
		new ModuleNotFoundPlugin(paths.appPath),
		// Makes some environment variables available to the JS code, for example:
		// if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
		new webpack.DefinePlugin(env.stringified),
		// This is necessary to emit hot updates (currently CSS only):
		new webpack.HotModuleReplacementPlugin(),
		// Watcher doesn't work well if you mistype casing in a path so we use
		// a plugin that prints an error when you attempt to do this.
		// See https://github.com/facebook/create-react-app/issues/240
		new CaseSensitivePathsPlugin(),
		// If you require a missing module and then `npm install` it, you still have
		// to restart the development server for Webpack to discover it. This plugin
		// makes the discovery automatic so you don't have to restart.
		// See https://github.com/facebook/create-react-app/issues/186
		new WatchMissingNodeModulesPlugin(paths.appNodeModules),
		// Moment.js is an extremely popular library that bundles large locale files
		// by default due to how Webpack interprets its code. This is a practical
		// solution that requires the user to opt into importing specific locales.
		// https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
		// You can remove this if you don't use Moment.js:
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		// Generate a manifest file which contains a mapping of all asset filenames
		// to their corresponding output file so that tools can pick it up without
		// having to parse `index.html`.
		new ManifestPlugin({
			fileName: 'asset-manifest.json',
			publicPath: publicPath,
		}),
	],

	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
	},
	// Turn off performance processing because we utilize
	// our own hints via the FileSizeReporter
	performance: false,
};
