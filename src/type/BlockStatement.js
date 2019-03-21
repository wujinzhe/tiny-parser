const Node = require('./Node.js')

class BlockStatement extends Node {
  constructor (start, end, body) {
    super()

    this.type = 'BlockStatement'

    this.start = start
    this.end = end
    this.body = body
  }


}

module.exports = BlockStatement