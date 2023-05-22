import Component from '@ember/component';
import layout from './el-button';
import {computed, get} from "@ember/object";

export default Component.extend({
  layout,
  tagName: 'button',


  classNames: ['el-button'],
  classNameBindings: ['getClassName',
    'loading:is-loading',
    'plain:is-plain',
    'round:is-round',
    'circle:is-circle',
  ],

  attributeBindings: ['disabled', 'autofocus', 'type', 'style'],


  disabled: false,
  autofocus: false,

  color: 'default',
  size: false, // false, medium, small, mini
  icon:  false,
  loading: false,
  plain: false,
  round: false,
  circle: false,


  getClassName: computed('color', 'size', 'disabled', 'autofocus', function () {

    let classNames = '';

    classNames += 'el-button--' + get(this, 'color');

    if(get(this, 'size')){classNames += ` el-button--${get(this, 'size')}`;}

    if(get(this, 'loading') || get(this, 'disabled') ){classNames += ` is-disabled`;}

    return classNames;
  }),


  showIcon: computed('icon', 'loading', function(){
    return !!(get(this, 'icon') && !get(this, 'loading'));
  }),


  click(){
    if(this.get('action')){
      this.get('action')();
    }
  }


});
