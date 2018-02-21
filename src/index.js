import _ from 'lodash';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const formatInputFile = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
};

export default (beforeFilePath, afterFilePath) => {
  const beforeFile = fs.readFileSync(beforeFilePath, 'utf8');
  const afterFile = fs.readFileSync(afterFilePath, 'utf8');
  const extnameBeforeFile = path.extname(beforeFilePath);
  const extnameAfterFile = path.extname(afterFilePath);
  const beforeObj = formatInputFile[extnameBeforeFile](beforeFile);
  const afterObj = formatInputFile[extnameAfterFile](afterFile);
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
