import Component from '@ember/component';
import layout from './el-card';
import {computed, get} from "@ember/object";

export default Component.extend({
  layout,
  classNames: ['el-card'],

  classNameBindings: ['getClassName',
    'box:box-card',
  ],

  shadow: 'always', // always false hover
  box: false,
  bodyStyle: null,

  getClassName: computed('shadow', function () {
    let classNames = '';

    if(get(this, 'shadow')){
      classNames += ` is-${get(this, 'shadow')}-shadow`;
    }

    return classNames;
  }),

});
