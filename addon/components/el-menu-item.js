import Component from '@ember/component';
import layout from './el-menu-item';
import { computed, get } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'li',
  disabled: false,

  submenu: false,
  classNameBindings: ['getMenuClass', 'disabled:is-disabled'],

  role: 'menuitem',
  attributeBindings: ['role'],

  getMenuClass: computed('submenu', function () {
    if (this.submenu) {
      return 'el-submenu';
    } else {
      return 'el-menu-item';
    }
  }),

  click() {
    if (this.action) {
      this.action();
    }
  },
});
