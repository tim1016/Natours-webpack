const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const rules = [];
const plugins=[];

const isDevelopment = process.env.NODE_ENV !== 'production';


// Define Plugins
const loaderOptions = new webpack.LoaderOptionsPlugin({
	options: {}
});
plugins.push(loaderOptions);

const htmlWebpack1 = new HtmlWebpackPlugin({
	template: './src/index.html',
	minify: !isDevelopment && {
		html5: true,
		collapseWhitespace: true,
		caseSensitive: true,
		removeComments: true,
		removeEmptyElements: true
	}
});

const htmlWebpack2 = new HtmlWebpackPlugin({
	title: 'My awesome service',
	template: './src/test.handlebars',
	filename: 'test.html',
	minify: !isDevelopment && {
		html5: true,
		collapseWhitespace: true,
		caseSensitive: true,
		removeComments: true,
		removeEmptyElements: true
	}
});



plugins.push(htmlWebpack2);
plugins.push(htmlWebpack1);



const miniCSSExtract = new MiniCssExtractPlugin({
	filename: "[name]-styles.css",
	chunkFilename: "[id].css"
});
plugins.push(miniCSSExtract);



//Define Rules - Handlebars
const handleBarRule = { test: /\.handlebars$/, loader: "handlebars-loader" }
rules.push(handleBarRule);

// Babel
const babelRule = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	use: {
		loader: "babel-loader",
		options: {
			presets: ["@babel/preset-env"],
			plugins: [
				"@babel/plugin-proposal-class-properties",
				"@babel/plugin-proposal-object-rest-spread"
			]
		}
	}
}
rules.push(babelRule);

// Sass and CSS
const postCSSLoader = {
	loader: "postcss-loader",
	options: {
		sourceMap: isDevelopment,
		autoprefixer: {
			browsers: ["last 2 versions"]
		},
		plugins: () => [
			precss,
			autoprefixer
		]
	},
}
const sassLoader = { 
	loader: 'sass-loader', 
	options: { sourceMap: isDevelopment } 
}
const cssLoader = { 
	loader: 'css-loader', 
	options: {
		sourceMap: isDevelopment //,
		// minimize: !isDevelopment
	}
}
const cssUse = [MiniCssExtractPlugin.loader, cssLoader, postCSSLoader, sassLoader];
const cssRule = {
	test: /\.(scss|css)$/,
	use: cssUse
};
rules.push(cssRule);

// Images and other files
const fileLoader =  {
	loader: "file-loader",
	options: {
		name: '[name].[ext]',
		outputPath: 'static/',
		useRelativePath: true,
	}
}
const imageLoader = {
	loader: 'image-webpack-loader',
	options: {
		mozjpeg: {
			progressive: true,
			quality: 65
		},
		optipng: {
			enabled: true,
		},
		pngquant: {
			quality: '65-90',
		speed: 4
		},
		gifsicle: {
			interlaced: false,
		},
		webp: {
			quality: 75
		}
	}
};
const fileUse = [fileLoader, imageLoader];
const fileRule = {
	test: /\.(gif|png|jpe?g|jpg|svg)/i,
	use: fileUse
}
rules.push(fileRule);



module.exports = {
	mode: "development",
	entry: path.join(__dirname, "..", 'src', 'js', "app.js"),
	devServer: {
        port: 3000,
        open: true
	},
	devtool: "source-map",
	module: {
		rules: rules
	},
    output: {
        path: path.resolve(__dirname, '../dist')
    }, 	
	plugins: plugins,
	devServer: {
		hot: true,
		historyApiFallback: true
	}
};