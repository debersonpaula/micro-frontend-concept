const config = require('@template/config');

const webpackConfig = config({ mode: 'development' });
webpackConfig.devServer.historyApiFallback = true;
webpackConfig.output.publicPath = '/';

module.exports = webpackConfig;
