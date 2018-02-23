import _ from 'lodash';

const indent = lvl => (lvl === 0 ? '' : '    '.repeat(lvl));
const indentSign = lvl => (lvl === 0 ? '  ' : ' '.repeat((lvl * 4) - 2));

const getSimpleObject = (simpleObj, lvl) =>
  _.keys(simpleObj).map(el => `${indent(lvl)}${el}: ${simpleObj[el]}`).join('\n');

const toString = (el, lvl, f) => {
  if (_.isObject(el.val)) {
    return `${indentSign(lvl)}${f}${el.key}: {\n${getSimpleObject(el.val, lvl + 1)}\n${indent(lvl)}}`;
  }
  return `${indentSign(lvl)}${f}${el.key}: ${el.val}`;
};

const getSign = {
  same: '  ',
  add: '+ ',
  del: '- ',
  child: '  ',
};

const renderAst = (ast, lvl = 1) => {
  const result = ast.map((el) => {
    if (el.type === 'child') {
      return `${indent(lvl)}${el.key}: {\n${renderAst(el.val, lvl + 1)}\n${indent(lvl)}}`;
    }
    return toString(el, lvl, getSign[el.type]);
  });
  return result.join('\n');
};

export default ast => `{\n${renderAst(ast)}\n}`;
