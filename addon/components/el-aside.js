import Component from '@ember/component';
import layout from './el-aside';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  layout,
  tagName: 'aside',
  classNames: ['el-aside', 'el-animate'],
  width: '300px',
  collapse: false,

  attributeBindings: ['style'],

  style: computed('width', 'collapse', function () {
    let width = this.width;
    if (this.collapse === true) {
      width = '65px';
    }
    return htmlSafe('width: ' + width);
  }),
});
