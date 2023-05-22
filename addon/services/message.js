import Service from '@ember/service';
// import {assign, merge} from '@ember/polyfills';
import {A} from '@ember/array';
import {isEmpty} from '@ember/utils';
import EmberObject, {set, get} from '@ember/object';
import {later, cancel} from '@ember/runloop';

// const messageAssign = assign || merge;
export default Service.extend({

  messages: A(),

  // Method for adding a message
  addMessage(options) {
    if (!options.message) {
      throw new Error("No message set");
    }


    const message = EmberObject.create({
      message: options.message,
      duration: (isEmpty(options.duration) ? 3000 : options.duration),
      type: options.type || 'info',
      iconClass: options.iconClass || '',
      customClass: options.customClass || '',
      onClose: options.onClose, //null,
      showClose: options.showClose, //false,
      timer: options.timer, //null,
      center: options.center, //false,
      dismiss: false,
      autoClear: (isEmpty(options.autoClear) ? true : options.autoClear),
      return: (isEmpty(options.return) ? null : options.return),
    });

    if (get(message, 'autoClear')) {
      set(message, 'remaining', get(message, 'duration'));
      this.startTimer(message);
    }

    get(this, 'messages').pushObject(message);

    return message;
  },

  // Helper methods for each type of message
  error(message, options) {
    return this.addMessage(Object.assign({
      message: message,
      type: 'error'
    }, options));
  },

  success(message, options) {
    return this.addMessage(Object.assign({
      message: message,
      type: 'success'
    }, options));
  },

  info(message, options) {
    return this.addMessage(Object.assign({
      message: message,
      type: 'info'
    }, options));
  },

  warning(message, options) {
    return this.addMessage(Object.assign({
      message: message,
      type: 'warning'
    }, options));
  },

  removeMessage(message) {
    if (!message) {
      return;
    }

    set(message, 'dismiss', true);

    if (typeof get(message, 'onClose') === 'function') {
      get(message, 'onClose')(message);
    }


    // Delay removal from DOM for dismissal animation
    later(this, () => {
      get(this, 'messages').removeObject(message);
    }, 1000);
  },

  startTimer(message) {
    set(message, 'startTime', Date.now());

    const timer = later(this, () => {
      // Hasn't been closed manually
      if (get(this, 'messages').indexOf(message) >= 0) {
        this.removeMessage(message);
      }
    }, get(message, 'remaining'));
    set(message, 'timer', timer);
  },

  clearTimer(message) {
    cancel(get(message, 'timer'));
    const elapsed = Date.now() - get(message, 'startTime');
    const remaining = get(message, 'duration') - elapsed;
    set(message, 'remaining', remaining);
  },

  clearAll() {
    get(this, 'messages').forEach(message => {
      this.removeMessage(message);
    });

    return this;
  },

});
