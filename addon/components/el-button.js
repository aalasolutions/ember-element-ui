import Component from '@ember/component';
import layout from './el-button';
import { computed, get } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'button',

  classNames: ['el-button'],
  classNameBindings: [
    'getClassName',
    'loading:is-loading',
    'plain:is-plain',
    'round:is-round',
    'circle:is-circle',
  ],

  attributeBindings: ['disabled', 'autofocus', 'type', 'style'],

  disabled: false,
  autofocus: false,

  color: 'default',
  size: false, // false, medium, small, mini
  icon: false,
  loading: false,
  plain: false,
  round: false,
  circle: false,

  getClassName: computed(
    'autofocus',
    'color',
    'disabled',
    'loading',
    'size',
    function () {
      let classNames = '';

      classNames += 'el-button--' + this.color;

      if (this.size) {
        classNames += ` el-button--${this.size}`;
      }

      if (this.loading || this.disabled) {
        classNames += ` is-disabled`;
      }

      return classNames;
    }
  ),

  showIcon: computed('icon', 'loading', function () {
    return !!(this.icon && !this.loading);
  }),

  click() {
    if (this.action) {
      this.action();
    }
  },
});
