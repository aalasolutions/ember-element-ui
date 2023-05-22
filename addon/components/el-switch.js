import Component  from '@ember/component';
import layout     from './el-switch';
import {computed} from "@ember/object";
import {htmlSafe} from '@ember/template';
import { or } from '@ember/object/computed';
import {and} from "@ember/object/computed";

export default Component.extend({
  layout,
  classNames: ['el-switch'],
  tagName   : 'label',

  id               : '',
  name             : '',
  disabled         : false,
  width            : '',
  activeIconClass  : '',
  inactiveIconClass: '',
  activeText       : '',
  inactiveText     : '',
  activeValue      : true,
  inactiveValue    : false,
  validateEvent    : true,
  activeColor      : '',
  inactiveColor    : '',
  model            : false,

  isChecked: computed('model', function () {
    return !!this.get('model');
  }),

  notChecked: computed('model', function () {
    return !this.get('model');
  }),

  isInactive: or('inactiveIconClass', 'inactiveText'),

  notInactiveIconClass: computed('inactiveIconClass', function () {
    return !this.get('inactiveIconClass');
  }),

  isInactiveText: and('notInactiveIconClass', 'inactiveText'),


  isActive: or('activeIconClass', 'activeText'),

  notActiveIconClass: computed('isActive', function () {
    return !this.get('activeIconClass');
  }),

  isActiveText: and('notActiveIconClass', 'activeText'),


  spanStyle: computed("isChecked", "inactiveColor", "activeColor", 'width', function () {
    let color = this.get("model") ? this.get("activeColor") : this.get("inactiveColor");
    let width = this.get("width");

    if (width === '') {
      width = 40;
    }

    return htmlSafe(`background: ${color}; border-color: ${color}; width: ${width}px;`);
  }),

});
