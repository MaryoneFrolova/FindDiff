import _ from 'lodash';

const getValue = value => (_.isObject(value) ? 'complex value' : `'${value}'`);
const getAddValue = value => (_.isObject(value) ? 'complex value' : `value: '${value}'`);

const renderAst = (ast, prefix = '') => {
  const result = ast.map((el) => {
    const property = (prefix === '') ? `${el.key}` : `${prefix}.${el.key}`;
    switch (el.type) {
      case 'child': return `${renderAst(el.beforeVal, property)}`;
      case 'add': return `Property '${property}' was added with ${getAddValue(el.afterVal)}`;
      case 'del': return `Property '${property}' was removed`;
      case 'change': return `Property '${property}' was updated. From ${getValue(el.beforeVal)} to ${getValue(el.afterVal)}`;
      default: return null;
    }
  });
  return (_.without(result, null)).join('\n');
};

export default renderAst;
