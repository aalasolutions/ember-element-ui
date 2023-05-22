import Service from '@ember/service';
// import {assign, merge} from '@ember/polyfills';
import {A} from '@ember/array';
import {isEmpty} from '@ember/utils';
import EmberObject, {set, get} from '@ember/object';
import {later} from '@ember/runloop';
import {htmlSafe} from '@ember/template';

// const messageAssign = assign || merge;
export default Service.extend({

  messages: A(),

  // Method for adding a message
  addMessage(options, resolve, reject) {
    if (!options.message) {
      throw new Error("No message set");
    }

    const message = EmberObject.create({
      title: (isEmpty(options.title) ? '' : options.title),
      message: (isEmpty(options.message) ? '' : htmlSafe(options.message)),
      type: (isEmpty(options.type) ? null : options.type),
      iconClass: (isEmpty(options.iconClass) ? null : options.iconClass),
      customClass: (isEmpty(options.customClass) ? null : options.customClass),
      showClose: (isEmpty(options.showClose) ? true : options.showClose),
      beforeClose: (isEmpty(options.beforeClose) ? undefined : options.beforeClose),
      distinguishCancelAndClose: (isEmpty(options.distinguishCancelAndClose) ? null : options.distinguishCancelAndClose),
      showCancelButton: (isEmpty(options.showCancelButton) ? false : options.showCancelButton),
      showConfirmButton: (isEmpty(options.showConfirmButton) ? true : options.showConfirmButton),
      cancelButtonText: (isEmpty(options.cancelButtonText) ? 'Cancel' : options.cancelButtonText),
      confirmButtonText: (isEmpty(options.confirmButtonText) ? 'Ok' : options.confirmButtonText),
      cancelButtonClass: (isEmpty(options.cancelButtonClass) ? null : options.cancelButtonClass),
      confirmButtonClass: (isEmpty(options.confirmButtonClass) ? null : options.confirmButtonClass),
      closeOnClickModal: (isEmpty(options.closeOnClickModal) ? false : options.closeOnClickModal),
      closeOnPressEscape: (isEmpty(options.closeOnPressEscape) ? false : options.closeOnPressEscape),
      showInput: (isEmpty(options.showInput) ? null : options.showInput),
      inputPlaceholder: (isEmpty(options.inputPlaceholder) ? null : options.inputPlaceholder),
      inputType: (isEmpty(options.inputType) ? null : options.inputType), // todo: pending
      inputValue: (isEmpty(options.inputValue) ? null : options.inputValue),
      inputPattern: (isEmpty(options.inputPattern) ? null : options.inputPattern),
      inputValidator: (isEmpty(options.inputValidator) ? null : options.inputValidator),
      inputErrorMessage: (isEmpty(options.inputErrorMessage) ? null : options.inputErrorMessage),
      center: (isEmpty(options.center) ? false : options.center),
      roundButton: (isEmpty(options.roundButton) ? false : options.roundButton),



      // lockScroll: (isEmpty(options.lockScroll) ? true : options.lockScroll), // todo: pending
      // closeOnHashChange: (isEmpty(options.closeOnHashChange) ? true : options.closeOnHashChange),


      // action: (isEmpty(options.action) ? null : options.action),
      // confirmButtonLoading: (isEmpty(options.confirmButtonLoading) ? null : options.confirmButtonLoading),
      // cancelButtonLoading: (isEmpty(options.cancelButtonLoading) ? null : options.cancelButtonLoading),
      // confirmButtonDisabled: (isEmpty(options.confirmButtonDisabled) ? null : options.confirmButtonDisabled),
      // editorErrorMessage: (isEmpty(options.editorErrorMessage) ? null : options.editorErrorMessage),
      // callback: (isEmpty(options.callback) ? null : options.callback),
      // dangerouslyUseHTMLString: (isEmpty(options.dangerouslyUseHTMLString) ? null : options.dangerouslyUseHTMLString),
      // focusAfterClosed: (isEmpty(options.focusAfterClosed) ? null : options.focusAfterClosed),
      // isOnComposition: (isEmpty(options.isOnComposition) ? null : options.isOnComposition),
      resolve: resolve ? resolve : undefined,
      reject: reject ? reject : undefined,
    });

    get(this, 'messages').pushObject(message);
    return message;
  },


  // Helper methods for each type of message

  alert(message, title, options) {
    // return new Promise((resolve, reject) => {
      this.addMessage(Object.assign({message, title, type: 'alert',}, options));
    // });
  },

  confirm(message, title, options) {
    return new Promise((resolve, reject) => {
      this.addMessage(Object.assign({
        message,
        title,
        showCancelButton: true,
        type: 'confirm',
      }, options), resolve, reject);
    });
  },


  prompt(message, title, options) {
    return new Promise((resolve, reject) => {
      this.addMessage(messageAssign({
        message,
        title,
        showCancelButton: true,
        showInput: true,
        type: 'prompt',
      }, options), resolve, reject);
    });



  },


  removeMessage(message) {
    if (!message) {
      return;
    }

    set(message, 'dismiss', true);

    // if (typeof get(message, 'onClose') === 'function') {
    //   get(message, 'onClose')(message);
    // }
    //

    // Delay removal from DOM for dismissal animation
    later(this, () => {
      get(this, 'messages').removeObject(message);
    }, 500);
  },


  clearAll() {
    get(this, 'messages').forEach(message => {
      this.removeMessage(message);
    });

    return this;
  },

});
