import _ from 'lodash';

const getAstDiff = (beforeObj, afterObj) => {
  const result = _.union(_.keys(beforeObj), _.keys(afterObj))
    .map((key) => {
      if (_.isObject(beforeObj[key]) && _.isObject(afterObj[key])) {
        return { key, beforeVal: getAstDiff(beforeObj[key], afterObj[key]), type: 'child' };
      }
      if (_.has(afterObj, key) && _.has(beforeObj, key)) {
        if (beforeObj[key] === afterObj[key]) {
          return { key, beforeVal: beforeObj[key], type: 'same' };
        }
        return {
          key, beforeVal: beforeObj[key], afterVal: afterObj[key], type: 'change',
        };
      }
      if (_.has(afterObj, key)) {
        return { key, afterVal: afterObj[key], type: 'add' };
      }
      return { key, beforeVal: beforeObj[key], type: 'del' };
    });
  return (result);
};
export default getAstDiff;
