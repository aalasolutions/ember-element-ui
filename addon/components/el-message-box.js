import Component from '@ember/component';
import layout from './el-message-box';
import { computed, get, set } from "@ember/object";
import {inject as service} from '@ember/service';
import {and} from "@ember/object/computed";

export default Component.extend({
  layout,


  messagesService: service('message-box'),
  messageObj: null,

  classNames: ['el-message-box__wrapper', 'ember-element-box', 'animated'],
  classNameBindings: ['getClassName'],

  attributeBindings: ['role',
    'ariaModal:aria-modal',
    'ariaLabel',
    'tabindex',
  ],
  role: 'dialogue',
  ariaModal: true,
  tabindex: -1,
  ariaLabel: computed('title', function(){
    return get(this, 'title') || 'dialog';
  }),

  getClassName: computed('messageObj.{type,iconClass,customClass,dismiss}', function () {
    let classNames = '';

    if (get(this, 'messageObj.dismiss')) {
      classNames += ` fadeOut50 `;
    }else{
      classNames += ` fadeIn50 `;

    }

    return classNames;
  }),


  icon: computed('messageObj.{iconClass.type}', function(){

    let typeMap = {
      success: 'success',
      info: 'info',
      warning: 'warning',
      error: 'error'
    };
    let type = get(this,'messageObj.type');
    return get(this, 'messageObj.iconClass') || (type && typeMap[type] ? `el-icon-${ typeMap[type] }` : '');
  }),

  isIconCenter: and('messageObj.center', 'icon'),
  isIconCenter2: computed('messageObj.{center,message}', 'icon', function(){
    let icon = get(this, 'icon');
    let center = get(this, 'messageObj.center');
    let message = get(this, 'messageObj.message');

    return icon && !center && message;
  }),

  confirmButtonClasses: computed('messageObj.confirmButtonClass', function(){
    return `el-button--primary ${get(this, 'messageObj.confirmButtonClass')}`;
  }),
  cancelButtonClasses: computed('messageObj.cancelButtonClass', function(){
    return `${get(this, 'messageObj.cancelButtonClass')}`;
  }),



  getClassNameForBox: computed('messageObj.{customClass,center,dismiss}',  function () {
    let classNames = 'animated ';
    if (get(this, 'messageObj.customClass')){ classNames += ' ' + get(this, 'messageObj.customClass'); }
    if (get(this, 'messageObj.center')){ classNames += ' el-message-box--center'; }
    if (get(this, 'messageObj.dismiss')) {
      classNames += ` fadeOutUpElCustomBox `;
    }else{
      classNames += ` fadeInDownElCustomBox `;

    }

    return classNames;
  }),

  didInsertElement(){
    get(this, 'element').focus();
  },


  doClose() {

    // this.onClose && this.onClose();

    get(this, 'messagesService').removeMessage(get(this, 'messageObj'));

    if (this.lockScroll) {
      setTimeout(this.restoreBodyStyle, 200);
    }

    set(this, 'opened', true);

    this.doAfterClose();
    // setTimeout(() => {
    //   if (this.action) this.callback(this.action, this);
    // });
  },

  doAfterClose(){
    let currentMsg = get(this, 'messageObj');
    if (currentMsg.resolve) {
      let action = get(this, 'action');
      if (action === 'confirm') {
        if (get(currentMsg,'showInput')) {
          currentMsg.resolve( {value: get(currentMsg,'inputValue'), action});
        } else {
          currentMsg.resolve(action);
        }
      } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
        currentMsg.reject(action);
      }
    }
  },

  handleAction(action) {
    if (get(this, 'messageObj.type') === 'prompt' && action === 'confirm' && !this.validate()) {
      return;
    }
    set(this,'action', action);
    if (typeof get(this, 'messageObj.beforeClose')  === 'function') {
      // this.close = this.doClose();
      get(this, 'messageObj.beforeClose')(action, get(this, 'messageObj'), this);
    } else {
      this.doClose();
    }
  },

  validate() {
    if (get(this, 'messageObj.type')  === 'prompt') {
      const inputPattern = get(this, 'messageObj.inputPattern');
      if (inputPattern && !inputPattern.test(get(this, 'messageObj.inputValue') || '')) {
        set(this, 'messageObj.editorErrorMessage',  get(this, 'messageObj.inputErrorMessage'));
        set(this, 'inputErrorClass', 'invalid');
        return false;
      }
      const inputValidator = get(this, 'messageObj.inputValidator') ;
      if (typeof inputValidator === 'function') {
        const validateResult = inputValidator(get(this, 'messageObj.inputValue'));
        if (validateResult === false) {
          set(this, 'messageObj.editorErrorMessage',  get(this, 'messageObj.inputErrorMessage'));
          set(this, 'inputErrorClass', 'invalid');
          return false;
        }
        if (typeof validateResult === 'string') {
          set(this, 'messageObj.editorErrorMessage',  validateResult);
          set(this, 'inputErrorClass', 'invalid');
          return false;
        }
      }
    }
    set(this, 'messageObj.editorErrorMessage',  '');
    set(this, 'inputErrorClass', '');
    return true;
  },

  actions: {

    handleWrapperClick() {
      if (get(this, 'closeOnClickModal')) {
        this.handleAction(get(this,'messageObj.distinguishCancelAndClose')  ? 'close' : 'cancel');
      }
    },
    // handleInputEnter(e,f) {
    //   console.log(e, f);
    //   // if (get(this, 'inputType') !== 'textarea') {
    //   //   return this.handleAction('confirm');
    //   // }
    // },


    // getFirstFocus() {
    //   const btn = this.$el.querySelector('.el-message-box__btns .el-button');
    //   const title = this.$el.querySelector('.el-message-box__btns .el-message-box__title');
    //   return btn || title;
    // },
    // getInputElement() {
    //   const inputRefs = this.$refs.input.$refs;
    //   return inputRefs.input || inputRefs.textarea;
    // },

    close(){
      this.handleAction(get(this,'messageObj.distinguishCancelAndClose') ? 'close' : 'cancel');
    },

    handleAction(action) {
      this.handleAction(action);
    },

  },
  click(e){
    if(e.target.classList.contains('el-message-box__wrapper') && get(this, 'messageObj.closeOnClickModal')){
      this.handleAction(get(this,'messageObj.distinguishCancelAndClose') ? 'close' : 'cancel');
    }
  },
  keyUp(e){
    if(e.keyCode === 27 && get(this, 'messageObj.closeOnPressEscape')){
      this.handleAction(get(this,'messageObj.distinguishCancelAndClose') ? 'close' : 'cancel');
    }
  },


});
