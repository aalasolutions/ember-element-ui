import Component from '@ember/component';
import layout from './el-container';
import { computed, get, set } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'section',
  direction: null,
  classNames: ['el-container'],
  classNameBindings: ['getClassName'],

  hasChildToMakeVertical: false,

  getClassName: computed('direction', 'hasChildToMakeVertical', function () {
    return this.direction === 'vertical' || this.hasChildToMakeVertical
      ? 'is-vertical'
      : '';
  }),

  didRender() {
    this._super(...arguments);
    const child = this.element.children;
    let foundElements = false;
    for (let i = 0; i < child.length; i++) {
      let c = child[i];
      if (
        c.dataset.component === 'el-header' ||
        c.dataset.component === 'el-footer'
      ) {
        // set(this, 'hasChildToMakeVertical', true);
        foundElements = true;
        break;
      }
    }
    set(this, 'hasChildToMakeVertical', foundElements);
  },
});
