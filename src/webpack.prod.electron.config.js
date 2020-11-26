var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
{
  target: "electron-main",
  entry: path.resolve(__dirname, "electron.js"),
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "electron.js"
  },
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		})
  ]
},
{
  target: "electron-renderer",
  entry: path.resolve(__dirname, 'js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'render.js'
  },
  plugins: [
    new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
    new HtmlWebpackPlugin({
      title: 'Aurial',
      template: 'src/index.electron.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        dead_code: true
      }
    }),
    new CopyWebpackPlugin([{
      from: 'src/css',
      to: 'css'
    }]),
    new CopyWebpackPlugin([{  
      from: "src/static",
      to: 'static'
    }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
					"plugins": [
						["transform-react-jsx", { "pragma": "h" }]
					],
          "presets": ["es2015", "stage-0"]
        }
      }
    ]
  }
}];
