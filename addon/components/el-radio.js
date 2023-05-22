import Component from '@ember/component';
import layout from './el-radio';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  tagName: 'label',
  classNames: ['el-radio'],

  classNameBindings: [
    'isChecked:is-checked',
    'disabled:is-disabled',
    'border:is-bordered',
    'sizeClass',
  ],

  attributeBindings: ['role', 'isChecked:aria-checked'],
  role: 'radio',

  model: null,
  label: null,
  name: null,
  change: null,
  border: false,
  item: '',
  size: '',

  isChecked: computed('model', 'label', function () {
    return this.model === this.label;
  }),

  sizeClass: computed('size', function () {
    return this.size ? 'el-radio--' + this.size : '';
  }),

  actions: {
    changed(value, name) {
      if (this.action) {
        this.action(value, name);
      }
    },
  },
});
