const renderAst = (ast) => {
  const result = tree => tree.reduce((acc, el) => {
    switch (el.type) {
      case 'added': return { ...acc, [el.key]: { type: el.type, value: el.afterVal } };
      case 'deleted': return { ...acc, [el.key]: { type: el.type, value: el.beforeVal } };
      case 'changed': return { ...acc, [el.key]: { type: el.type, beforeValue: el.beforeVal, afterValue: el.afterVal } };
      case 'unchanged': return { ...acc, [el.key]: { type: el.type, value: el.beforeVal } };
      case 'child': return { ...acc, [el.key]: { type: el.type, value: result(el.beforeVal) } };
      default: return null;
    }
  }, {});
  return JSON.stringify(result(ast), null, 2);
};

export default renderAst;
