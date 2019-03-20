const Node = require('./Node.js')

class VariableDeclaratior extends Node {
  constructor (start, end, id, init) {
    super()

    this.type = 'VariableDeclarator'

    this.start = start
    this.end = end
    this.id = id
    this.init = init
  }
}

module.exports = VariableDeclaratior