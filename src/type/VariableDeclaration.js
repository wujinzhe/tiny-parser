const Node = require('./Node.js')

class VariableDeclaration extends Node {
  constructor (start, end, declarations, kind) {
    super()

    this.type = 'VariableDeclaration'

    this.start = start
    this.end = end
    this.declarations = declarations
    this.kind = kind
    
  }
}

module.exports = VariableDeclaration