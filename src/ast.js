import _ from 'lodash';

const getAstDiff = (beforeObj, afterObj) => {
  const result = _.union(_.keys(beforeObj), _.keys(afterObj))
    .map((key) => {
      if (_.isObject(beforeObj[key]) && _.isObject(afterObj[key])) {
        return { key, val: getAstDiff(beforeObj[key], afterObj[key]), type: 'child' };
      }
      if (_.has(afterObj, key) && _.has(beforeObj, key)) {
        if (beforeObj[key] === afterObj[key]) {
          return { key, val: beforeObj[key], type: 'same' };
        }
        return [{ key, val: afterObj[key], type: 'add' }, { key, val: beforeObj[key], type: 'del' }];
      }
      if (_.has(afterObj, key)) {
        return { key, val: afterObj[key], type: 'add' };
      }
      return { key, val: beforeObj[key], type: 'del' };
    });
  return _.flatten(result);
};
export default getAstDiff;
