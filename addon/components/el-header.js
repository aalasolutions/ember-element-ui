import Component from '@ember/component';
import layout from './el-header';
import {computed, get} from "@ember/object";
import {htmlSafe} from '@ember/template';

export default Component.extend({
  layout,
  tagName: 'header',
  classNames: ['el-header'],
  height: '60px',

  attributeBindings: ['style', 'dataComponent:data-component'],
  dataComponent: 'el-header',
  style: computed('height', function () {
    return htmlSafe('height: ' + get(this, 'height'));
  }),

});
