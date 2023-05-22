import Helper from '@ember/component/helper';

export default Helper.extend({
  compute(params) {
    let item = params[0];
    let allowHalf = params[1];
    let pointerAtLeftHalf = params[2];
    let currentValue = params[3];
    let rateDisabled = params[4];
    return (
      rateDisabled &&
      allowHalf &&
      pointerAtLeftHalf &&
      item - 0.5 <= currentValue &&
      item > currentValue
    );
  },
});
