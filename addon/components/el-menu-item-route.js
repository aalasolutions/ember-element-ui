// import Component from '@ember/component';
import layout from '../templates/components/el-menu-item-route';
import {computed, get, set} from "@ember/object";
import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
  layout,
  tagName: 'li',
  activeClass: 'is-active',


  didReceiveAttrs() {
    let params = [];

    if (this.get('linkto')) {
      if (this.get('parent')) {
        params.push(get(this, 'parent') + '.' + get(this, 'linkto'));
      } else {
        params.push(get(this, 'linkto'));
      }
    }


    set(this, 'params', params);

    this._super();
  },

  submenu: false,
  classNameBindings: ['getMenuClass',
    'disabled:is-disabled'],

  role: 'menuitem',
  attributeBindings: ['role'],

  getMenuClass: computed('submenu', function () {

    if (get(this, 'submenu')) {
      return 'el-submenu';
    } else {
      return 'el-menu-item';
    }
  }),
});
