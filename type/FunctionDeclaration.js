const Node = require('./Node.js')

class FunctionDeclaration extends Node {
  constructor (start, end, expression, params, body) {
    super()

    this.type = 'FunctionDeclaration'

    this.start = start
    this.end = end

    this.generator = false
    this.expression = expression
    this.params = params
    this.body = body
  }
}

module.exports = FunctionDeclaration