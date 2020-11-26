var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  target: "web",
  entry: path.resolve(__dirname, 'js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'index.js'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Aurial',
      template: 'src/index.html'
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
};
