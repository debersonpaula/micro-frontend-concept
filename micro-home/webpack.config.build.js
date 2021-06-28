const config = require('@template/config');
const path = require('path');

module.exports = config({
  mode: 'production',
  outputPath: path.resolve(__dirname, '../dist/micro-home'),
});
