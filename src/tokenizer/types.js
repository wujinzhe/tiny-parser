export class TokenType {

  constructor (value, options = {}) {
    // 表示这个token的值
    this.value = value,

    // 只有该token为关键字时，keyword才有值
    this.keyword = options.keyword

    // 用于标记“=”号，先获取赋值表达式的结果
    this.isAssign = !!conf.isAssign

    //  表示这个运算符可以放在数字的前面  比如 +1 中的“+”  -3 中的“-”
    this.isPrefix = !!options.isPrefix
    
    // 当这个存在 表示这个token是一个二元运算符 并且给出它的优先级
    this.binop = options.binop || null
  }
}

export const keywords = {}

function getKW (name, options = {}) {
  options.name = name
  return keywords[name] = new TokenType(name, options)
}

export const types = {
  number: new TokenType('num'),
  string: new TokenType('str'),
  eof: new TokenType('eof'),

  // 标点符号的token类型
  braceL: new TokenType('{'),
  braceR: new TokenType('}'),
  parenL: new TokenType('('),
  parenR: new TokenType(')'),
  comma: new TokenType(','),
  semi: new TokenType(';'),
  dot: new TokenType('.'),


  // 运算符的token类型
  eq: new TokenType('=', { isAssign: true }),
  plus: new TokenType('+', { binop: 9, isPrefix: true }),
  min: new TokenType('-', { binop: 9, isPrefix: true }),
  start: new TokenType('*', { binop: 10 }),
  Slash: new TokenType('/', { binop: 10 }),

  // 关键字类型
  _number: getKW('number', { isPrefix: true }),
  _string: getKW('string', { isPrefix: true }),
  _void: getKW('void', { isPrefix: true }),
  _boolean: getKW('boolean', { isPrefix: true }),
  _true: kw('true'),
  _false: kw('false'),
  _return: kw('return')
}
