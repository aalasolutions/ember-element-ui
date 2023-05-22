import Component from '@ember/component';
import layout from './el-progress';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { and, not, equal } from '@ember/object/computed';

export default Component.extend({
  layout,
  classNames: ['el-progress'],

  classNameBindings: ['getClassName', 'hit:is-hit'],

  attributeBindings: ['role'],
  role: 'progressbar',

  percentage: 0,
  type: 'line',
  strokeWidth: 6,
  textInside: false,
  status: null,
  color: '',
  width: 126,
  showText: true,

  iconClass: computed('line', 'status', 'type', function () {
    if (this.type === 'line') {
      return this.status === 'success'
        ? 'el-icon-circle-check'
        : 'el-icon-circle-close';
    } else {
      return this.status === 'success' ? 'el-icon-check' : 'el-icon-close';
    }
  }),

  relativeStrokeWidth: computed('strokeWidth', 'width', function () {
    return ((this.strokeWidth / this.width) * 100).toFixed(1);
  }),

  trackPath: computed('relativeStrokeWidth', function () {
    const radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
    return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
  }),

  perimeter: computed('relativeStrokeWidth', function () {
    const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
    return 2 * Math.PI * radius;
  }),

  stroke: computed('color', 'status', function () {
    let ret;
    if (this.color) {
      ret = this.color;
    } else {
      switch (this.status) {
        case 'success':
          ret = '#13ce66';
          break;
        case 'exception':
          ret = '#ff4949';
          break;
        default:
          ret = '#20a0ff';
      }
    }
    return ret;
  }),

  getClassName: computed(
    'type',
    'status',
    'showText',
    'textInside',
    function () {
      let classNames = '';

      if (this.type) {
        classNames += ` el-progress--${this.type}`;
      }
      if (this.status) {
        classNames += ` is-${this.status}`;
      } else {
        if (!this.showText) {
          classNames += ` el-progress--without-text`;
        }
        if (this.textInside) {
          classNames += ` el-progress--text-inside`;
        }
      }

      return classNames;
    }
  ),

  showTextInside: and('showText', 'textInside'),
  showStatus: not('status'),
  statusIsText: equal('status', 'text'),

  isTypeLine: equal('type', 'line'),
  isTypeCircle: equal('type', 'line'),

  progressText: computed('textInside', 'showText', function () {
    return !this.textInside && this.showText;
  }),

  strokeWidthStyle: computed('strokeWidth', function () {
    let strokeWidth = this.strokeWidth;
    return htmlSafe(`height: ${strokeWidth}px`);
  }),

  barStyle: computed('percentage', 'color', function () {
    const style = {};
    style.width = this.percentage + '%';
    style.backgroundColor = this.color;

    return htmlSafe(
      `width: ${style.width}; background-color: ${style.backgroundColor}`
    );
  }),

  circleStyle: computed('width', function () {
    let width = this.width;
    return htmlSafe(`height: ${width}px; width: ${width}px`);
  }),

  progressTextStyle: computed('type', 'strokeWidth', 'width', function () {
    let size =
      this.type === 'line'
        ? 12 + this.strokeWidth * 0.4
        : this.width * 0.111111 + 2;
    return htmlSafe(`fontSize: ${size}px`);
  }),

  circlePathStyle: computed('perimeter', 'percentage', function () {
    const perimeter = this.perimeter;

    let strokeDasharray = `${perimeter}px,${perimeter}px`;
    let strokeDashoffset = (1 - this.percentage / 100) * perimeter + 'px';
    let transition = 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease';

    return htmlSafe(
      `stroke-dasharray: ${strokeDasharray}; stroke-dashoffset: ${strokeDashoffset}; transition: ${transition}`
    );
  }),
});
