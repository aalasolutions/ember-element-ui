// import Component from '@ember/component';
import layout from './el-menu-item-route';
import { computed, get, set } from '@ember/object';
import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
  layout,
  tagName: 'li',
  activeClass: 'is-active',

  didReceiveAttrs() {
    let params = [];

    if (this.linkto) {
      if (this.parent) {
        params.push(this.parent + '.' + this.linkto);
      } else {
        params.push(this.linkto);
      }
    }

    set(this, 'params', params);

    this._super();
  },

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
});
