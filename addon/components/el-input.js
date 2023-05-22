import Component from '@ember/component';
import layout from './el-input';
import {computed, get, set} from "@ember/object";

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
    return !!(get(this, 'prepend') || get(this, 'append'));
  }),

  _isPrefix: computed('prefix', 'prefixIcon', function () {
    return !!(get(this, 'prefix') || get(this, 'prefixIcon'));
  }),

  _isSuffix: computed('suffix', 'suffixIcon', function () {
    return !!(get(this, 'suffix') || get(this, 'suffixIcon'));
  }),


  showClear: computed('clearable', 'disabled', 'readonly', 'value', function () {
    return this.get('clearable') &&
      !this.get('disabled') &&
      !this.get('readonly') &&
      this.get('value') !== ''
  }),


  _isShowSuffixIcon: computed('suffixIcon', 'showClear', 'validateState', 'needStatusIcon', function () {
    return !!(get(this, 'suffixIcon') || get(this, 'showClear') || (get(this, 'validateState') && get(this, 'needStatusIcon')));
  }),


  classNameBindings: ['getClassName',
    'disabled:is-disabled',
    '_isGroup:el-input-group',
    '_isPrefix:el-input--prefix',
    '_isSuffix:el-input--suffix',
    'append:el-input-group--append',
    'prepend:el-input-group--prepend',
  ],


  getClassName: computed('type', 'size', function () {

    let classNames = '';

    classNames += get(this, 'type') === 'textarea' ? 'el-textarea' : 'el-input';

    if (get(this, 'size')) {
      classNames += ` el-input--${get(this, 'size')}`;
    }

    return classNames;
  }),

  actions: {
    clear() {
      set(this, 'value', '');
    }
  }


});
