import _ from 'lodash';

const indent = lvl => (lvl === 0 ? '' : '    '.repeat(lvl));
const indentSign = lvl => (lvl === 0 ? '  ' : ' '.repeat((lvl * 4) - 2));

const unwrapObject = (wrapObj, lvl) =>
  _.keys(wrapObj).map(key => `${indent(lvl)}${key}: ${wrapObj[key]}`).join('\n');

const toString = (key, val, lvl, sign) => {
  if (_.isObject(val)) {
    return `${indentSign(lvl)}${sign}${key}: {\n${unwrapObject(val, lvl + 1)}\n${indent(lvl)}}`;
  }
  return `${indentSign(lvl)}${sign}${key}: ${val}`;
};

const renderAst = (ast, lvl = 1) => {
  const result = ast.map((el) => {
    switch (el.type) {
      case 'child': return `${indent(lvl)}${el.key}: {\n${renderAst(el.beforeVal, lvl + 1)}\n${indent(lvl)}}`;
      case 'same': return toString(el.key, el.beforeVal, lvl, '  ');
      case 'add': return toString(el.key, el.afterVal, lvl, '+ ');
      case 'del': return toString(el.key, el.beforeVal, lvl, '- ');
      case 'change':
        return [toString(el.key, el.afterVal, lvl, '+ '), toString(el.key, el.beforeVal, lvl, '- ')];
      default: return null;
    }
  });
  return (_.flatten(result)).join('\n');
};

export default ast => `{\n${(renderAst(ast))}\n}`;
