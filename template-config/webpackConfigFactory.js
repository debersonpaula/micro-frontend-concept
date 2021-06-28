/**
 * @param {{
 *  mode: 'development' | 'production',
 *  port: number,
 * }} param0
 * @returns
 */
function webpackConfigFactory({ mode = 'development', port = 9000 }) {
  const isEnvDevelopment = mode === 'development';
  const isEnvProduction = mode === 'production';
  const host = 'localhost';

  return {
    mode,

    entry: [path.resolve(__dirname, 'src/index.tsx')].filter(Boolean),

    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'bundle.js',
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
          loader: 'ts-loader',
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
      port: 9000,
      open: true,
      hot: true,
    },
  };
}

module.exports = webpackConfigFactory;
