import Component from '@ember/component';
import layout from './el-row';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  layout,
  gutter: null, // todo: Add dynamic gutter classes
  justify: 'start',
  align: 'top',
  type: null,

  classNames: ['el-row'],
  classNameBindings: ['getClassName'],
  attributeBindings: ['style'],

  style: computed('gutter', function () {
    if (this.gutter) {
      let gutter = this.gutter / 2 + 'px';
      return htmlSafe(`margin-left: -${gutter}; margin-right: -${gutter}`);
    }
    return htmlSafe('');
  }),

  getClassName: computed('align', 'justify', 'type', function () {
    let classNames = '';

    if (this.justify !== 'start') {
      classNames += ` is-justify-${this.justify}`;
    }

    if (this.align !== 'top') {
      classNames += ` is-align-${this.align}`;
    }

    if (this.type === 'flex') {
      classNames += ` el-row--flex`;
    }

    return classNames;
  }),
});
