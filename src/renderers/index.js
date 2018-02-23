import renderDefault from './renderDefault';
import renderPlain from './renderPlain';

const renderFormat = {
  default: renderDefault,
  plain: renderPlain,
};

export default format => renderFormat[format];
