const fs = require('fs');

export default (beforeConf, afterConf) => {
  const beforeObj = JSON.parse(fs.readFileSync(beforeConf, 'utf8'));
  const afterObj = JSON.parse(fs.readFileSync(afterConf, 'utf8'));
  const allKeys = [...new Set([...Object.keys(beforeObj), ...Object.keys(afterObj)])];
  return allKeys.reduce(
    (acc, el) => {
      if (Object.keys(afterObj).includes(el) && Object.keys(beforeObj).includes(el)) {
        if (beforeObj[el] === afterObj[el]) {
          return [...acc, `  ${el}: ${afterObj[el]}`];
        }
        return [...acc, `+ ${el}: ${afterObj[el]}`, `- ${el}: ${beforeObj[el]}`];
      }
      if (Object.keys(afterObj).includes(el)) {
        return [...acc, `+ ${el}: ${afterObj[el]}`];
      }
      return [...acc, `- ${el}: ${beforeObj[el]}`];
    },
    [],
  ).join('\n');
};
