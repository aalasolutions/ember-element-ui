import Component from '@ember/component';
import layout from './el-alert';
import {computed, get, set} from "@ember/object";
import transition from "../utils/transition";


export default Component.extend({
  layout,

  TYPE_CLASSES_MAP: null,

  classNames: ['el-alert','animated', 'fadeIn'],
  classNameBindings: ['typeClass', 'effectClass',
    'center:is-center',
    'isClosed:el-hidden',
  ],

  attributeBindings: ['role'],

  role: 'alert',

  title: '',
  description: '',
  type: 'info',
  closable: true,
  closeText: '',
  showIcon: false,
  center: false,
  isClosed: false,
  effect: 'light',

  init() {
    this._super();
    set(this,
      'TYPE_CLASSES_MAP', {
        'success': 'el-icon-success',
        'warning': 'el-icon-warning',
        'error': 'el-icon-error'
      }
    )
  },

  typeClass: computed('type', function () {
    return `el-alert--${ get(this, 'type') }`;
  }),
  effectClass: computed('effect', function () {
    return `is-${ get(this, 'effect') }`;
  }),
  iconClass: computed('type', function () {
    return get(this, 'TYPE_CLASSES_MAP')[get(this, 'type')] || 'el-icon-info';
  }),
  isBigIcon: computed('description', function () {
    return get(this, 'description') !== '' ? 'is-big' : '';
  }),
  isBoldTitle: computed('description', function () {
    return get(this, 'description') !== '' ? 'is-bold' : '';

  }),

  actions: {
    close() {
      debugger;
      let e = this.element;

      let transitionEvent = transition('animation');
      e.addEventListener(transitionEvent, () => {
        set(this, 'isClosed', true);
        if (this.get('action')) {
          this.get('action')();
        }
      });

      e.classList.add('animated');
      e.classList.add('fadeOut');

    }
  }

});
