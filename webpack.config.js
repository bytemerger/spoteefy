const path = require('path')

const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const HtmlWebPackPlugin = require('html-webpack-plugin')

const Dotenv = require('dotenv-webpack')

const packageFolder = path.resolve(__dirname, 'build')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'source-map' : false,

  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000,
    ignored: ['**/node_modules']
  },

  entry: path.resolve(__dirname, 'src', 'index.tsx'),

  output: {
    path: packageFolder,
    sourceMapFilename: '[file].map',
    filename: 'assets/js/[name].min.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
                decorators: false,
                dynamicImport: true
              },
              target: 'es2015'
            },
            minify: true
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          isDevelopment
            ? 'style-loader'
            : {
                // save the css to external file
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: false
                }
              },
          {
            // combine other css files into one
            loader: 'css-loader',
            options: {
              esModule: false,
              importLoaders: 1, // 1 other loaders used first, postcss-loader
              sourceMap: isDevelopment
            }
          },
          {
            // process tailwind stuff
            loader: 'postcss-loader',
            options: {
              sourceMap: isDevelopment,
              postcssOptions: {
                plugins: [
                  require('tailwindcss')
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(ttf|eot|otf|woff)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]',
          esModule: false
        }
      },
      {
        test: /\.(ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          esModule: false
        }
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),

    // build html file
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),

    isDevelopment && new ReactRefreshWebpackPlugin(),

    // dump css into its own files
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].min.css'
    }),

    process.env.ANALYZE && new BundleAnalyzerPlugin(),

    new Dotenv()

  ].filter(Boolean),

  optimization: {
    minimize: !isDevelopment,
    minimizer: [

      new CssMinimizerPlugin({
        exclude: /style\.css$/,

        // Use multi-process parallel running to improve the build speed
        parallel: true,

        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }]
        }
      })
    ]
  },

  devServer: {
    port: 3000,
    host: '0.0.0.0',
    compress: true,
    allowedHosts: 'all',
    hot: true,
    historyApiFallback: true
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}
