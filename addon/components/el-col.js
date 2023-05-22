import Component from '@ember/component';
import layout from './el-col';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  layout,
  span: 24,
  offset: null,
  pull: null,
  push: null,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,

  gutter: null,

  classNames: ['el-col'],
  classNameBindings: ['getClassName'],
  attributeBindings: ['style'],

  style: computed('gutter', function () {
    if (this.gutter) {
      let gutter = this.gutter / 2 + 'px';
      return htmlSafe(`padding-left: ${gutter}; padding-right: ${gutter}`);
    }
    return htmlSafe('');
  }),

  getClassName: computed(
    'span',
    'offset',
    'pull',
    'push',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    function () {
      let classList = [];
      ['span', 'offset', 'pull', 'push'].forEach((prop) => {
        if (get(this, prop) || get(this, prop) === 0) {
          classList.push(
            prop !== 'span'
              ? `el-col-${prop}-${get(this, prop)}`
              : `el-col-${get(this, prop)}`
          );
        }
      });

      ['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
        if (typeof get(this, size) === 'number') {
          classList.push(`el-col-${size}-${get(this, size)}`);
        } else if (get(this, size) && typeof get(this, size) === 'object') {
          let props = get(this, size);

          Object.keys(props).forEach((prop) => {
            classList.push(
              prop !== 'span'
                ? `el-col-${size}-${prop}-${props[prop]}`
                : `el-col-${size}-${props[prop]}`
            );
          });
        }
      });

      return classList.join(' ');
    }
  ),
});
