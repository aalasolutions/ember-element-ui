import Component from '@ember/component';
import layout from './el-checkbox-button';
import { computed, set } from '@ember/object';
import { or } from '@ember/object/computed';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  layout,
  // todo: focus
  tagName: 'label',
  classNames: ['el-checkbox-button'],

  classNameBindings: [
    'isChecked:is-checked',
    'isDisabled:is-disabled',
    'border:is-bordered',
    'checkboxSize',
  ],

  attributeBindings: ['role', 'isChecked:aria-checked'],
  role: 'checkbox',

  name: null,
  change: null,
  border: false,
  size: '',

  label: null,
  trueLabel: undefined,
  falseLabel: undefined,

  value: null,
  model: null,

  isLabelProvided: or('falseLabel', 'trueLabel'),

  init() {
    this._super(...arguments);
    set(this, 'value', this.modelGet());
  },

  style: computed('isChecked', 'parent.{fill,textColor}', function () {
    let style = '';
    if (this.parent) {
      style += this.parent.fill ? `background-color: ${this.parent.fill};` : '';
      style += this.parent.fill ? `border-color: ${this.parent.fill};` : '';
      style += this.parent.textColor ? `color: ${this.parent.textColor};` : '';
      style += `box-shadow: -1px 0 0 0  + ${this.parent.fill};`;
    }

    return htmlSafe(this.isChecked && style ? style : '');
  }),

  isChecked: computed('model', 'label', 'trueLabel', 'checked', function () {
    if (typeof this.checked === 'boolean') {
      return this.checked;
    }

    if (typeof this.model === 'boolean') {
      return this.model;
    } else if (Array.isArray(this.model)) {
      return this.model.indexOf(this.label) > -1;
    } else if (this.model !== null && this.model !== undefined) {
      return this.model === this.trueLabel;
    }

    return !!this.model;
  }),

  checkboxSize: computed('parent.size', 'size', function () {
    let size = this.parent ? this.parent.size || this.size : this.size;

    return size ? 'el-checkbox-button--' + size : '';
  }),

  isLimitDisabled: computed(
    'isChecked',
    'max',
    'min',
    'model.length',
    'parent.{max,min}',
    function () {
      if (this.parent) {
        return (
          (!!(this.parent.max || this.parent.min) &&
            this.model.length >= this.parent.max &&
            !this.isChecked) ||
          (this.model.length <= this.parent.min && this.isChecked)
        );
      }

      return false;
    }
  ),
  isDisabled: computed(
    'parent',
    'disabled',
    'parent.disabled',
    'isLimitDisabled',
    function () {
      return this.parent
        ? this.parent.disabled || this.disabled || this.isLimitDisabled
        : this.disabled;
    }
  ),

  actions: {
    changed(value, name) {
      if (this.action) {
        this.action(value, name);
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (typeof this.checked === 'boolean') {
        value = !this.checked;
      } else {
        if (ev.target.checked) {
          value = this.trueLabel === undefined ? true : this.trueLabel;
        } else {
          value = this.falseLabel === undefined ? false : this.falseLabel;
        }
      }

      set(this, 'value', value);
      this.modelSet(this.value);
      if (this.action) {
        this.action(this.value);
      }
    },
  },

  modelGet() {
    if (this.parent) {
      const model = this.model;
      if (typeof model === 'boolean') {
        return model;
      } else if (Array.isArray(model)) {
        return model.indexOf(this.label) > -1;
      } else if (model !== null && model !== undefined) {
        return model === this.trueLabel;
      }
    }

    return this.model;
  },
  modelSet(val) {
    if (this.parent) {
      set(this, 'isLimitExceeded', false);

      this.parent.min !== undefined &&
        val.length < this.parent.min &&
        set(this, 'isLimitExceeded', true);
      this.parent.max !== undefined &&
        val.length > this.parent.max &&
        set(this, 'isLimitExceeded', true);
      if (
        Array.isArray(this.model) &&
        this.isLimitExceeded === false &&
        !this.model.includes(this.label)
      ) {
        set(this, 'model', [...this.model, this.label]);
      } else {
        const index = this.model.indexOf(this.label);
        this.model.splice(index, 1);
        set(this, 'model', [...this.model]);
      }
    } else {
      set(this, 'value', val);
      set(this, 'model', val);
    }
  },
});
