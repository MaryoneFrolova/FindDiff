import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const renderFormat = {
  default: renderDefault,
  plain: renderPlain,
  json: renderJson,
};

export default format => renderFormat[format];
