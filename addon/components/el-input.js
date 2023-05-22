import Component from '@ember/component';
import layout from './el-input';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  layout,
  value: null,
  size: null,
  resize: null,
  disabled: false,
  readonly: false,
  type: 'text',
  autosize: false,
  autocomplete: 'off',
  validateEvent: true,
  suffixIcon: null,
  prefixIcon: null,
  label: null,
  clearable: false,
  tabindex: '',
  placeholder: '',
  prepend: null,
  append: null,
  customClass: '',

  _isGroup: computed('prepend', 'append', function () {
    return !!(this.prepend || this.append);
  }),

  _isPrefix: computed('prefix', 'prefixIcon', function () {
    return !!(this.prefix || this.prefixIcon);
  }),

  _isSuffix: computed('suffix', 'suffixIcon', function () {
    return !!(this.suffix || this.suffixIcon);
  }),

  showClear: computed(
    'clearable',
    'disabled',
    'readonly',
    'value',
    function () {
      return (
        this.clearable && !this.disabled && !this.readonly && this.value !== ''
      );
    }
  ),

  _isShowSuffixIcon: computed(
    'suffixIcon',
    'showClear',
    'validateState',
    'needStatusIcon',
    function () {
      return !!(
        this.suffixIcon ||
        this.showClear ||
        (this.validateState && this.needStatusIcon)
      );
    }
  ),

  classNameBindings: [
    'getClassName',
    'disabled:is-disabled',
    '_isGroup:el-input-group',
    '_isPrefix:el-input--prefix',
    '_isSuffix:el-input--suffix',
    'append:el-input-group--append',
    'prepend:el-input-group--prepend',
  ],

  getClassName: computed('type', 'size', function () {
    let classNames = '';

    classNames += this.type === 'textarea' ? 'el-textarea' : 'el-input';

    if (this.size) {
      classNames += ` el-input--${this.size}`;
    }

    return classNames;
  }),

  actions: {
    clear() {
      set(this, 'value', '');
    },
  },
});
