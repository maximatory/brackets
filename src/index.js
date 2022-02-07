module.exports = function check(str, bracketsConfig) {
  let stack = [];
  // открывающие скобки
  let openBrackets = bracketsConfig.map((elem) => {
    return elem[0]
  })

  // массив откр-закр
  let br = {};
  for (let elem of bracketsConfig) {
    if (elem[1] == elem[0]) {
      let re = `\\${elem[1]}`;
      str = str.replace(new RegExp(re, "g"), "")
      br[elem[1]] = elem[0]
    } else {
      br[elem[1]] = elem[0]
    }
  }

  function func(str) {
    for (let i = 0; i < str.length; i++) {
      let symbol = str[i];
      if (openBrackets.includes(symbol)) {
        stack.push(symbol)
      } else {
        // оказалось не было ни одного открывающего
        if (stack.length === 0) {
          return false
        }
        // если открывающие в стеке есть и попался закрывающий
        // сверяем закрывающий элемент со стеком с обр стороны
        let endSymbol = stack[stack.length - 1]
        if (br[symbol] == endSymbol) {
          stack.pop()
        } else {
          return false
        }
      }
    }
    return stack.length == 0;
  }
  return func(str)
}
