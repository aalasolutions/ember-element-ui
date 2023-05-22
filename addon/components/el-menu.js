import Component from '@ember/component';
import layout from './el-menu';
import {computed, set, get} from "@ember/object";

export default Component.extend({
  layout,
  tagName: 'ul',
  mode: 'vertical',
  collapse: false,
  defaultActive: '',
  defaultOpeneds: null,
  uniqueOpened: false,
  router: false,
  menuTrigger: 'hover',
  backgroundColor: '',
  textColor: '',
  activeTextColor: '',
  collapseTransition: false,

  role: 'menubar',
  attributeBindings: ['role'],


  classNames: ['el-menu'],
  classNameBindings: ['getClassName',
    'collapse:el-menu--collapse',
  ],


  getClassName: computed('mode', function () {
    let classNames = '';
    if (get(this, 'mode') === 'horizontal') {
      classNames += 'el-menu--horizontal';
    }
    return classNames;
  }),

  init(){
    this._super(...arguments);
    set(this, 'defaultOpeneds', []);
  },




});
