import Helper from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export default Helper.extend({
  compute(params) {
    let item = params[0];
    let classes = params[1];
    let style = params[2];
    let disabled = params[3];
    let color = params[4];
    let lowThreshold = params[5];
    let highThreshold = params[6];
    let max = params[7];
    let colors = params[8];
    let currentValue = params[9];
    let value = params[10];
    let disabledVoidColor = params[11];
    // let color         = "rgb(247, 186, 42)";

    if (style) {
      if (colors.length === 3) {
        if (currentValue <= lowThreshold) {
          color = colors[0];
        } else if (currentValue <= highThreshold) {
          color = colors[1];
        } else {
          color = colors[2];
        }
        return htmlSafe(`color: ${color};`);
      }
      if (
        classes[item - 1] === 'el-icon-star-on' &&
        (!disabled || item < value)
      ) {
        return htmlSafe(`color: ${color};`);
      } else if (item > value && disabled) {
        return htmlSafe(`color: ${disabledVoidColor};`);
      }
      return;
    }

    if (highThreshold - 1 === max) {
      return classes[item - 1] + ' hover';
    } else {
      return classes[item - 1];
    }
  },
});
