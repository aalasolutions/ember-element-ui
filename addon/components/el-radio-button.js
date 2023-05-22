import Component from '@ember/component';
import layout from './el-radio-button';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  tagName: 'label',
  classNames: ['el-radio-button'],

  classNameBindings: [
    'isChecked:is-checked',
    'disabled:is-disabled',
    'sizeClass',
  ],
  attributeBindings: ['role', 'isChecked:aria-checked'],
  role: 'radio',

  model: null,
  label: null,
  name: null,
  change: null,
  item: '',

  size: '',

  isChecked: computed('model', 'label', function () {
    return this.model === this.label;
  }),

  sizeClass: computed('size', function () {
    return this.size ? 'el-radio-button--' + this.size : '';
  }),

  actions: {
    changed(value, name) {
      if (this.action) {
        this.action(value, name);
      }
    },
  },
});
