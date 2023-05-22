import Component from '@ember/component';
import layout from './el-rate';
import {computed, get, set} from "@ember/object";
import {htmlSafe} from '@ember/template';
import {typeOf} from '@ember/utils';
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
    if (!get(this, 'colors')) {
      set(this, 'colors', [get(this, '_defaultColor')]);
    }
    if (!get(this, 'iconClasses')) {
      set(this, 'iconClasses', ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on']);
    }
    if (!get(this, 'texts')) {
      set(this, 'texts', []);
    }
    if (get(this, "disabledVoidIconClass") === null) {
      set(this, "disabledVoidIconClass", 'el-icon-star-on');
    }
  },

  currentValue: computed('value', function () {
    return get(this, "value");
  }),

  rateDisabled: computed("value", function () {
    return !!get(this, "disabled");
  }),


  valueDecimal: computed("value", function () {
    return get(this, "value") * 100 - Math.floor(get(this, "value")) * 100;
  }),

  text: computed('value', "currentValue", function () {
    let result = '';
    if (get(this, "showScore")) {
      result = get(this, "scoreTemplate").replace(/\{\s*value\s*\}/, get(this, "rateDisabled")
        ? get(this, "value")
        : get(this, "currentValue"));
    } else if (get(this, "showText")) {
      result = get(this, "texts")[Math.ceil(get(this, "currentValue")) - 1];
    }
    return result;
  }),

  decimalStyle: computed("rateDisabled", function () {
    let width = '';
    if (get(this, "rateDisabled")) {
      width = `${get(this, "valueDecimal")}%`;
    } else if (get(this, "allowHalf")) {
      width = '50%';
    }
    let color = get(this, "colorMap");
    return htmlSafe(`color: ${color}; width: ${width};`);

  }),

  activeColor: computed("currentValue", function () {
    return this.getValueFromMap(get(this, "currentValue"), get(this, "colorMap"));
  }),

  maxNumberOfTimes: computed('max', function () {
    let max = get(this, "max");
    let maxObj = [];

    for (let i = 0; i < max; i++) {
      maxObj.push(i + 1);
    }
    return maxObj;
  }),

  classMap: computed("iconClasses", "value", function () {
    let iconClasses = get(this, "iconClasses");
    return Array.isArray(iconClasses) ? {
      [get(this, "lowThreshold")]: iconClasses[0],
      [get(this, "highThreshold")]: {value: iconClasses[1], excluded: true},
      [get(this, "max")]: iconClasses[2]
    } : get(this, "iconClasses");
  }),

  decimalIconClass: computed("classMap", function () {
    return this.getValueFromMap(get(this, "value"), get(this, "classMap"));
  }),

  activeClass: computed("classMap", "currentValue", function () {
    return this.getValueFromMap(get(this, "currentValue"), get(this, "classMap"));
  }),

  colorMap: computed('colors', 'lowThreshold', 'currentValue', 'highThreshold', function () {
    let colors = get(this, "colors");
    let color = null;

    if (colors.length === 3) {
      if (get(this, "currentValue") <= get(this, "lowThreshold")) {
        color = colors[0];
      } else if (get(this, "currentValue") <= get(this, "highThreshold")) {
        color = colors[1];
      } else {
        color = colors[2];
      }
    } else {
      color = colors[0];
    }
    return color;
  }),

  voidClass: computed("classMap", "currentValue", "disabledVoidIconClass", "voidIconClass", function () {
    return get(this, "rateDisabled") ? get(this, "disabledVoidIconClass") : get(this, "voidIconClass");
  }),

  classes: computed('currentValue', "voidClass", 'disabled', function () {

      let result = [];
      let i = 0;

      if (get(this, 'rateDisabled')) {
        for (; i < this.max; i++) {
          result.push(get(this, "voidClass"));
        }
        return result;
      }

      let threshold = get(this, "currentValue");

      if (get(this, "allowHalf") && get(this, "currentValue") !== Math.floor(get(this, "currentValue"))) {
        threshold--;
      }

      for (; i < threshold; i++) {
        result.push(get(this, "activeClass"));
      }
      for (; i < this.max; i++) {
        result.push(get(this, "voidClass"));
      }
      return result;
    }
  ),

  showTextScore: or("showText", "showScore"),

  textSpanStyle: computed("textColor", "text", function () {
    let color = get(this, "textColor");
    return htmlSafe(`color: ${color};`)

  }),
  //
  // iconStyle: computed("value", function () {
  //   return this.getIconStyle();
  // }),

  getValueFromMap(value, map) {
    const matchedKeys = Object.keys(map)
      .filter(key => value <= key)
      .sort((a, b) => a - b);
    const matchedValue = map[matchedKeys[0]];
    if (typeOf(matchedValue) === "object") {
      return matchedValue.value;
    } else {
      return (matchedValue || '');
    }
  },

  spanCursor: computed("rateDisabled", function () {
    let rateDisabled = get(this, "rateDisabled");
    if (rateDisabled) {
      return htmlSafe(`cursor:auto;`)
    } else {
      return htmlSafe(`cursor:pointer;`)
    }

  }),

  actions: {

    setCurrentValue(item) {
      if (!get(this, "rateDisabled")) {
        set(this, "currentValue", item);
      }
    },

    resetCurrentValue() {
      set(this, "currentValue", get(this, "value"));
    },

    selectValue(item) {
      if (!get(this, "rateDisabled")) {
        set(this, "value", item);
      }
    },

    handleKey(e) {
      if (get(this,"rateDisabled")) {
        return;
      }
      let currentValue = get(this,"currentValue");
      const keyCode = e.keyCode;
      if (keyCode === 38 || keyCode === 39) { // left / down
        if (get(this,"allowHalf")) {
          currentValue += 0.5;
        } else {
          currentValue += 1;
        }
        e.stopPropagation();
        e.preventDefault();
      } else if (keyCode === 37 || keyCode === 40) {
        if (get(this, "allowHalf")) {
          currentValue -= 0.5;
        } else {
          currentValue -= 1;
        }
        e.stopPropagation();
        e.preventDefault();
      }
      currentValue = currentValue < 0 ? 0 : currentValue;
      currentValue = currentValue > get(this, "max") ? get(this, "max") : currentValue;
      set(this, "value", currentValue);
      set(this, "currentValue", currentValue);
    },
  }
});
