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
`
// number b = 1 + 1
// b(1, 3)
 
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

function addStringVarDeclaration (array) {
  let child = null
  let i = 0

  // string变量声明 查找string字符串
  if (array[i] === 'string') {
    child = {
      type: 'StringVariableDeclaration',
      declarations: [
        {
          id: {
            type: 'Identifier',
            name: '' // 标识符的名字
          },
          init: {}
        }
      ]
    }

    i++

    // 正则匹配string 后面的变量名是否合法 变量名的格式只能为字母
    if (/^[\w\W]$/ig.test(array[i])) {
      child.declarations[0].id.name = tokens[current]
    } else {
      throw new TypeError('string 变量名不合法')
    }

    // 如果第三个字符为"="号 则接着往下匹配
    if (array[i + 1] === '=') {
      i++
    } else if (array[i + 1] === '\n') {
      // 如果为回车 则该声明结束 进行下一条语句
      array.splice(0, i + 1)
      return child
    } else {
      throw new TypeError(`错误的标识符 ${array[i + 1]}`)
    }

    // 匹配“=”号后面的变量
    // 字符串常量
    if (/^("*+"|'*+')$/ig.test(array[i])) {
      child.declarations[0].init.value = tokens[current]
    } else if (/^\d+$/ig.test(array[i])) {
      throw new TypeError(`无法将数字类型赋值给字符串类型`)
    }

  }

  return child
}

function addNumberVarDeclaration () {
  
}

function addFunctionDeclaration () {
  
}

function parser (tokens) {
  let node = []
  let child = {}
  let current = 0
  while (tokens.length > 0) {
    if (tokens[current] === '\n') {
      current++
      child = {}
      continue
    }

    child = addStringVarDeclaration(tokens)
    child && node.push()
  }
  // tokens.map(item => {
  //   if (item === 'string') {
  //     child = {
  //       type: 'StringVariableDeclaration',
  //       declarations: [
  //         {
  //           id: {
  //             type: 'Identifier',
  //             name: '' // 标识符的名字
  //           },
  //           init: {}
  //         }
  //       ]
  //     }
  //   }
  // })
  // if (tokens)
}
