import Component from '@ember/component';
import layout from './el-rate';
import { computed, get, set } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { typeOf } from '@ember/utils';
import { or } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNames: ['el-rate'],

  voidIconClass: 'el-icon-star-off',
  colors: null,
  voidColor: '#C6D1DE',
  disabledVoidColor: '#EFF2F7',
  iconClasses: null,
  disabledVoidIconClass: null,
  textColor: '#1f2d3d',
  texts: null,
  value: 0,
  lowThreshold: 2,
  highThreshold: 4,
  max: 5,
  disabled: false,
  allowHalf: false,
  showText: false,
  showScore: false,
  scoreTemplate: '{value}',
  pointerAtLeftHalf: true,
  hoverIndex: -1,

  _defaultColor: 'rgb(247, 186, 42)',

  didReceiveAttrs() {
    this._super();
    if (!this.colors) {
      set(this, 'colors', [this._defaultColor]);
    }
    if (!this.iconClasses) {
      set(this, 'iconClasses', [
        'el-icon-star-on',
        'el-icon-star-on',
        'el-icon-star-on',
      ]);
    }
    if (!this.texts) {
      set(this, 'texts', []);
    }
    if (this.disabledVoidIconClass === null) {
      set(this, 'disabledVoidIconClass', 'el-icon-star-on');
    }
  },

  currentValue: computed.reads('value'),

  rateDisabled: computed('disabled', 'value', function () {
    return !!this.disabled;
  }),

  valueDecimal: computed('value', function () {
    return this.value * 100 - Math.floor(this.value) * 100;
  }),

  text: computed(
    'currentValue',
    'rateDisabled',
    'scoreTemplate',
    'showScore',
    'showText',
    'texts',
    'value',
    function () {
      let result = '';
      if (this.showScore) {
        result = this.scoreTemplate.replace(
          /\{\s*value\s*\}/,
          this.rateDisabled ? this.value : this.currentValue
        );
      } else if (this.showText) {
        result = this.texts[Math.ceil(this.currentValue) - 1];
      }
      return result;
    }
  ),

  decimalStyle: computed(
    'allowHalf',
    'colorMap',
    'rateDisabled',
    'valueDecimal',
    function () {
      let width = '';
      if (this.rateDisabled) {
        width = `${this.valueDecimal}%`;
      } else if (this.allowHalf) {
        width = '50%';
      }
      let color = this.colorMap;
      return htmlSafe(`color: ${color}; width: ${width};`);
    }
  ),

  activeColor: computed('colorMap', 'currentValue', function () {
    return this.getValueFromMap(this.currentValue, this.colorMap);
  }),

  maxNumberOfTimes: computed('max', function () {
    let max = this.max;
    let maxObj = [];

    for (let i = 0; i < max; i++) {
      maxObj.push(i + 1);
    }
    return maxObj;
  }),

  classMap: computed(
    'highThreshold',
    'iconClasses',
    'lowThreshold',
    'max',
    'value',
    function () {
      let iconClasses = this.iconClasses;
      return Array.isArray(iconClasses)
        ? {
            [this.lowThreshold]: iconClasses[0],
            [this.highThreshold]: {
              value: iconClasses[1],
              excluded: true,
            },
            [this.max]: iconClasses[2],
          }
        : this.iconClasses;
    }
  ),

  decimalIconClass: computed('classMap', 'value', function () {
    return this.getValueFromMap(this.value, this.classMap);
  }),

  activeClass: computed('classMap', 'currentValue', function () {
    return this.getValueFromMap(this.currentValue, this.classMap);
  }),

  colorMap: computed(
    'colors',
    'lowThreshold',
    'currentValue',
    'highThreshold',
    function () {
      let colors = this.colors;
      let color = null;

      if (colors.length === 3) {
        if (this.currentValue <= this.lowThreshold) {
          color = colors[0];
        } else if (this.currentValue <= this.highThreshold) {
          color = colors[1];
        } else {
          color = colors[2];
        }
      } else {
        color = colors[0];
      }
      return color;
    }
  ),

  voidClass: computed(
    'classMap',
    'currentValue',
    'disabledVoidIconClass',
    'rateDisabled',
    'voidIconClass',
    function () {
      return this.rateDisabled
        ? this.disabledVoidIconClass
        : this.voidIconClass;
    }
  ),

  classes: computed(
    'activeClass',
    'allowHalf',
    'currentValue',
    'disabled',
    'max',
    'rateDisabled',
    'voidClass',
    function () {
      let result = [];
      let i = 0;

      if (this.rateDisabled) {
        for (; i < this.max; i++) {
          result.push(this.voidClass);
        }
        return result;
      }

      let threshold = this.currentValue;

      if (
        this.allowHalf &&
        this.currentValue !== Math.floor(this.currentValue)
      ) {
        threshold--;
      }

      for (; i < threshold; i++) {
        result.push(this.activeClass);
      }
      for (; i < this.max; i++) {
        result.push(this.voidClass);
      }
      return result;
    }
  ),

  showTextScore: or('showText', 'showScore'),

  textSpanStyle: computed('textColor', 'text', function () {
    let color = this.textColor;
    return htmlSafe(`color: ${color};`);
  }),
  //
  // iconStyle: computed("value", function () {
  //   return this.getIconStyle();
  // }),

  getValueFromMap(value, map) {
    const matchedKeys = Object.keys(map)
      .filter((key) => value <= key)
      .sort((a, b) => a - b);
    const matchedValue = map[matchedKeys[0]];
    if (typeOf(matchedValue) === 'object') {
      return matchedValue.value;
    } else {
      return matchedValue || '';
    }
  },

  spanCursor: computed('rateDisabled', function () {
    let rateDisabled = this.rateDisabled;
    if (rateDisabled) {
      return htmlSafe(`cursor:auto;`);
    } else {
      return htmlSafe(`cursor:pointer;`);
    }
  }),

  actions: {
    setCurrentValue(item) {
      if (!this.rateDisabled) {
        set(this, 'currentValue', item);
      }
    },

    resetCurrentValue() {
      set(this, 'currentValue', this.value);
    },

    selectValue(item) {
      if (!this.rateDisabled) {
        set(this, 'value', item);
      }
    },

    handleKey(e) {
      if (this.rateDisabled) {
        return;
      }
      let currentValue = this.currentValue;
      const keyCode = e.keyCode;
      if (keyCode === 38 || keyCode === 39) {
        // left / down
        if (this.allowHalf) {
          currentValue += 0.5;
        } else {
          currentValue += 1;
        }
        e.stopPropagation();
        e.preventDefault();
      } else if (keyCode === 37 || keyCode === 40) {
        if (this.allowHalf) {
          currentValue -= 0.5;
        } else {
          currentValue -= 1;
        }
        e.stopPropagation();
        e.preventDefault();
      }
      currentValue = currentValue < 0 ? 0 : currentValue;
      currentValue = currentValue > this.max ? this.max : currentValue;
      set(this, 'value', currentValue);
      set(this, 'currentValue', currentValue);
    },
  },
});
