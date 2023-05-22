import Component from '@ember/component';
import layout from './el-row';
import {computed, get} from "@ember/object";
import {htmlSafe} from '@ember/template';

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
    if (get(this, 'gutter')) {
      let gutter = (get(this, 'gutter') / 2) + 'px';
      return htmlSafe(`margin-left: -${gutter}; margin-right: -${gutter}`);
    }
    return htmlSafe("");
  }),

  getClassName: computed('justify', 'align', function () {

    let classNames = '';

    if (get(this, 'justify') !== 'start') {
      classNames += ` is-justify-${get(this, 'justify')}`;
    }

    if (get(this, 'align') !== 'top') {
      classNames += ` is-align-${get(this, 'align')}`;
    }

    if (get(this, 'type') === 'flex') {
      classNames += ` el-row--flex`;
    }

    return classNames;
  }),
});
