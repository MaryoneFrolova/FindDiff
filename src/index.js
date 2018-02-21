import _ from 'lodash';

const fs = require('fs');

export default (beforeFilePath, afterFilePath) => {
  const beforeObj = JSON.parse(fs.readFileSync(beforeFilePath, 'utf8'));
  const afterObj = JSON.parse(fs.readFileSync(afterFilePath, 'utf8'));
  const startSpace = '  ';
  const diff = _.union(_.keys(beforeObj), _.keys(afterObj))
    .map((el) => {
      if (_.has(afterObj, el) && _.has(beforeObj, el)) {
        if (beforeObj[el] === afterObj[el]) {
          return `${startSpace}  ${el}: ${beforeObj[el]}`;
        }
        return `${startSpace}+ ${el}: ${afterObj[el]}\n${startSpace}- ${el}: ${beforeObj[el]}`;
      }
      if (_.has(afterObj, el)) {
        return `${startSpace}+ ${el}: ${afterObj[el]}`;
      }
      return `${startSpace}- ${el}: ${beforeObj[el]}`;
    });
  return `{\n${diff.join('\n')}\n}`;
};
