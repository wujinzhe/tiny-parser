const Node = require('./Node.js')

class BinaryExpression extends Node {
  constructor (start, end, left, operator, right) {
    super()

    this.type = 'BinaryExpression'

    this.start = start
    this.end = end
    this.left = left
    this.operator = operator
    this.right = right
  }
}

module.exports = BinaryExpression