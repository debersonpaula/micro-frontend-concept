const config = require('@template/config');

const webconfig = config({ mode: 'development' });
webconfig.devServer.contentBase = '../dist';
// webconfig.output.publicPath = '../dist';

module.exports = webconfig;
