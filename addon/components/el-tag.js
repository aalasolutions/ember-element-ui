import Component from '@ember/component';
import layout from './el-tag';
import { computed, get, set } from '@ember/object';
import transition from '../utils/transition';

export default Component.extend({
  layout,
  tagName: 'span',
  classNames: ['el-tag'],

  classNameBindings: ['getClassName', 'hit:is-hit', 'isClosed:el-hidden'],

  getClassName: computed('type', 'size', function () {
    let classNames = '';

    if (this.type) {
      classNames += ` el-tag--${this.type}`;
    }
    if (this.size) {
      classNames += ` el-tag--${this.size}`;
    }

    return classNames;
  }),

  isClosed: false,

  closable: false,
  type: '',
  hit: false,
  color: '',
  size: '',

  handleClose: null,

  actions: {
    handleClose() {
      // this.$().addClass('animated flipOutY');
      let e = this.element;

      let transitionEvent = transition('animation');
      e.addEventListener(transitionEvent, () => {
        set(this, 'isClosed', true);
        if (this.close) {
          this.close();
        }
      });

      e.classList.add('animate__animated');
      e.classList.add('animate__flipOutY');
    },
  },
});
