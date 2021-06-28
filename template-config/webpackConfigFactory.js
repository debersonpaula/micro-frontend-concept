const webpack = require('webpack');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const rootPath = process.cwd();

/**
 * @param {{
 *  mode: 'development' | 'production',
 *  port: number,
 * }} param0
 * @returns
 */
function webpackConfigFactory({
  mode = 'development',
  port = 9000,
  sourceFile = './src/index.tsx',
  outputPath = path.resolve(rootPath, './dist'),
  outputFile = 'bundle.js',
}) {
  const isEnvDevelopment = mode === 'development';
  const isEnvProduction = mode === 'production';
  const host = 'localhost';

  return {
    mode,

    entry: [isEnvDevelopment && 'react-hot-loader/patch', sourceFile].filter(
      Boolean,
    ),

    output: {
      path: outputPath,
      // publicPath: '/',
      filename: outputFile,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      plugins: [new TsconfigPathsPlugin({})],
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|mjs|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: ['@babel/env', '@babel/react', '@babel/preset-typescript'],
            plugins: [
              'react-hot-loader/babel',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },

    plugins: [
      // isEnvProduction &&
      // new CleanWebpackPlugin({
      //   dry: false,
      //   verbose: true,
      //   cleanOnceBeforeBuildPatterns: [path.join(__dirname, 'dist/**/*')]
      // }),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      new HTMLWebpackPlugin({
        template: './src/index.html',
        inject: true,
      }),
      // isEnvProduction &&
      //   new BundleAnalyzerPlugin({
      //     analyzerMode: "static",
      //     openAnalyzer: false,
      //   }),
    ].filter(Boolean),

    // optimization: {
    //   minimize: true,
    //   minimizer: [
    //     new UglifyJsPlugin({
    //       cache: isEnvDevelopment,
    //       parallel: true,
    //       uglifyOptions: {
    //         compress: isEnvProduction,
    //         mangle: isEnvProduction,
    //         beautify: isEnvDevelopment,
    //       },
    //       sourceMap: isEnvDevelopment,
    //     }),
    //   ],
    //   usedExports: isEnvProduction,
    //   sideEffects: isEnvProduction,
    // },

    // devtool: isEnvProduction ? "source-map" : "cheap-module-eval-source-map",

    // devServer: {
    //   port,
    //   host,
    //   publicPath: "/",
    //   contentBase: "./src",
    //   historyApiFallback: true,
    //   open: true,
    //   openPage: "",
    // },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      compress: true,
      port,
      open: true,
      hot: true,
    },
  };
}

module.exports = webpackConfigFactory;
