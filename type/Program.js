const Node = require('./Node.js')

class Literal extends Node {
  constructor (start, end, value, raw) {
    super()

    this.type = 'Literal'

    this.start = start
    this.end = end
    this.value = value
    this.raw = raw
  }
}

module.exports = Literal