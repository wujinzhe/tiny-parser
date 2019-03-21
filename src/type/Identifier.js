const Node = require('./Node.js')

class Identifier extends Node {
  constructor (start, end, name) {
    super()

    this.type = 'Identifier'

    this.start = start
    this.end = end
    this.name = name

  }
}

module.exports = Identifier