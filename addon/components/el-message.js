import Component from '@ember/component';
import layout from './el-message';
import {computed, get} from "@ember/object";
import {htmlSafe} from '@ember/template';

import {inject as service} from '@ember/service';

export default Component.extend({
  layout,

  messagesService: service('message'),
  messageObj: null,

  classNames: ['el-message', 'animated'],
  classNameBindings: ['getClassName',
    'messageObj.center:is-center',
    'messageObj.showClose:is-closable',
  ],

  attributeBindings: ['role'],
  role: 'alert',

  getClassName: computed('messageObj.{type,iconClass,customClass,dismiss}', function () {
    let classNames = '';
    if (get(this, 'messageObj.type') && !get(this, 'messageObj.iconClass')) {
      classNames += ` el-message--${get(this, 'messageObj.type')}`;
    }

    if (get(this, 'messageObj.dismiss')) {
      classNames += ` fadeOutUpElCustom `;
    }else{
      classNames += ` fadeInDownElCustom `;

    }
    return classNames;
  }),


  typeClass: computed('messageObj.{type,iconClass}', function () {
    let typeMap = {
      success: 'success',
      info: 'info',
      warning: 'warning',
      error: 'error'
    };
    return get(this, 'messageObj.type') && !get(this, 'messageObj.iconClass')
      ? `el-message__icon el-icon-${ typeMap[get(this, 'messageObj.type')] }`
      : '';
  }),

  messageHTML: computed('messageObj.message', function () {
    return htmlSafe(get(this, 'messageObj.message'));
  }),


  actions: {
    close() {
      this.close();
    },

  },

  close() {
    get(this, 'messagesService').removeMessage(get(this, 'messageObj'));
  },

  mouseEnter() {
    if (get(this, 'messageObj.autoClear')) {
      get(this, 'messagesService').clearTimer(get(this, 'messageObj'));
    }
  },
  mouseLeave() {
    if (get(this, 'messageObj.autoClear')) {
      get(this, 'messagesService').startTimer(get(this, 'messageObj'));
    }
  },

});
