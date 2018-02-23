import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';
import render from './renderers';
import getAstDiff from './ast';

const formatInputFile = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (beforeFilePath, afterFilePath, format = 'default') => {
  const beforeFile = fs.readFileSync(beforeFilePath, 'utf8');
  const afterFile = fs.readFileSync(afterFilePath, 'utf8');
  const extnameBeforeFile = path.extname(beforeFilePath);
  const extnameAfterFile = path.extname(afterFilePath);
  const beforeObj = formatInputFile[extnameBeforeFile](beforeFile);
  const afterObj = formatInputFile[extnameAfterFile](afterFile);
  return render(format)(getAstDiff(beforeObj, afterObj));
};
