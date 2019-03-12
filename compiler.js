/**
 * 
 * 以C语言为模板，编写一个可以解析代码的编译器
 * string a = '1'
 * number b = 2
 * number add (number a, number b) {
 *  return a + b
 * }
 * 
 * number c = add(1, 2)
 * 
 * 自带函数print() 输出
 * 
 * ast tree 
 * 需要定义NumberToken(数字字面量) 和 StringToken(字符串字面量)
 * 
 * Program: {
 *  body: [
 *    VariableDeclaration,
 *    VariableDeclaration,
 *    FunctionDeclaration,
 *    ExpressionStatement,
 *    CallExpression
 *  ]
 * }
 */

let code = `
string a = '1'
number b = 1 + 1
b(1, 3)
`
 
/** 词法分析器 */
function Tokenizer(code) {
  // console.log(Array.prototype.forEach)
  let current = 0
  let value = ''
  let tokens = []
  Array.prototype.map.call(code, (item, index) => {
    if (item === ' ') {
      // 说明已经分析到一个词法了, 所以提取出该单词
      if (value) {
        tokens.push({ type: 'Token', value })
        value = ''
      }
      
      return
    }

    if (/[\r\n]/.test(item)) {
      if (value) {
        tokens.push({ type: 'Token', value })
        value = ''
      }
      tokens.push({
        type: 'End',
        value: '\n'
      })
      return
    }

    // 判断'('
    if (item === '(') {
      if (value) {
        tokens.push({ type: 'Token', value })
        value = ''
      }

      return tokens.push({
        type: 'Paren',
        value: '('
      })
    }

    if (item === ')') {
      if (value) {
        tokens.push({ type: 'Token', value })
        value = ''
      }
      return tokens.push({
        type: 'Paren',
        value: ')'
      })
    }

     // 判断'('
     if (item === '{') {
      if (value) {
        tokens.push({ type: 'Token', value })
        value = ''
      }
      return tokens.push({
        type: 'Paren',
        value: '{'
      })
    }

    if (item === '}') {
      if (value) {
        tokens.push({ type: 'Token', value })
        value = ''
      }
      return tokens.push({
        type: 'Paren',
        value: '}'
      })
    }

    if (/,/.test(item)) {
      if (value) {
        tokens.push({ type: 'Token', value })
        value = ''
      }
      return tokens.push({
        type: 'Symbol',
        value: ','
      })
    }

    if (!/\s/.test(item)) {
      value += item
      return
    }
  })

  return tokens
}

let t = Tokenizer(code)
console.log(t)

function parser (tokens) {
  let node = []
  let child = {}
  tokens.map(item => {
    if (item === 'string') {
      child = {
        type: 'StringVariableDeclaration',
        declarations: [
          {
            id: {
              type: 'Identifier',
              name: ''
            },
            init: {}
          }
        ],
        kind: 'let'
      }
    }
  })
  // if (tokens)
}
