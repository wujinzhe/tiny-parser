/**
 * 
 * 以C语言为模板，编写一个可以解析代码的编译器
 * string a = '1' + '3';
 * number b = 2;
 * number add (number a, number b) {
 *  return a + b
 * }
 * 
 * 变量 number和string类型
 * 在变量定义的时候进行类型检查  当赋的值与类型不匹配时，会在编译的语法不通过
 * 
 * 
 * number a = 1
 * string b = '3'
 * 
 * string ll (number str) {
 *  print(str)
 * }
 * 
 * 
 * number c = add(1, 2)
 * 
 * 自带函数print() 输出
 * 
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
string a='1';
`
// number b = 1 + 1
// b(1, 3)
// 关键字数组  后续变量的命名和函数的命名无法使用关键字进行命名
const keyword = ['number', 'string', 'return']
 
/** 词法分析器  将一个个的字符 提取成有用的单词  */
function Tokenizer(code) {

  let value = ''
  let tokens = []
  Array.prototype.map.call(code, (item, index) => {

    // 把已经读取到的单词push 如果读取到这些字符 那将value值存入tokens数组中
    if (/[\,\+\/\*\-\(\)\{\}=\s;]/.test(item)) {
      // 说明已经分析到一个词法了, 所以提取出该单词
      if (value) {
        tokens.push({ type: 'Token', value })
        value = ''
      }

      // 如果是回车 则记录结束标识
      if (/[;]/.test(item)) {
        tokens.push({
          type: 'End',
          value: ';'
        })
      }

      if (/[\,\+\/\*\-\(\)\{\}=]/.test(item)) {
        tokens.push({
          type: 'Token',
          value: item
        })
      }

      return
    }

    value += item
  })

  return tokens
}

let t = Tokenizer(code)
console.log(t)

/**
 * 添加表达式的ast节点
 * @param {*} array 解析的数组
 * @param {*} type 是否有限定的值类型  如 ：number 则表示值类型需要为number 否则抛出异常
 */
function addExpress (array, type) {

}

function addVarDeclaration (array) {
  let child = null
  let i = 0
  let value = []
  let type = array[i].value

  // string变量声明 查找string字符串
  if (type === 'string' || type === 'number') {
    child = {
      type: `${type}VariableDeclaration`,
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

    // 正则匹配string 后面的变量名是否合法 变量名的格式为字母开头 只能有字母和数字
    if (/^[\w\W][\w\W\d\D]+$/ig.test(array[i].value)) {

      // 变量名不能为关键字
      if (keyword.indexOf(array[i].value) !== -1) {
        throw new SyntaxError('无效的变量名')
      }

      child.declarations[0].id.name = tokens[current].value
    } else {
      throw new SyntaxError('无效的变量名')
    }

    // 如果第三个字符为"="号 则接着往下匹配
    if (array[i + 1].value === '=') {
      i++
    } else if (array[i + 1].value === ';') {
      // 如果为; 则该声明结束 进行下一条语句
      array.splice(0, i + 1)
      return child
    } else {
      throw new SyntaxError(`无效的标识符 ${array[i + 1].value}`)
    }

    // 匹配“=”号后面的东西
    // 如果“=”号后面直接跟“;”号  或者“=”号后面没有东西了 则直接抛出异常
    if (array[i].value === ';' || !array[i].value) {
      throw new SyntaxError('没有找到结束符')
    }

    // 只要没有匹配到分号或者没有匹配到最后一个字符，就一直将=号后面的内容暂时存起来
    while(array[i].value !== ';' && array[i].value !== undefined) {
      value.push(array[i])
      i++
    }

    child.declarations[0].init = addExpress(value, type)

    array.splice(0, i)

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

    child = addVarDeclaration(tokens)
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
