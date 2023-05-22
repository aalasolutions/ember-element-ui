import Component from '@ember/component';
import layout from './el-table-colgroup';

export default Component.extend({
  layout,
  tagName: 'col',

  attributeBindings: ['width'],
  width: null,
});
