const path = require('path')

module.exports = {
  entry: {
    tiny: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'src/index.js'),
    filename: 'tiny.js'
  }
}
