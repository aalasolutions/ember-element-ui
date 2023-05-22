import Component from '@ember/component';
// import layout from './el-radio-input';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';
import { once } from '@ember/runloop';


export default Component.extend({
  // layout,

  tagName: 'input',
  type: 'radio',



  // value - required
  // model - required

  // autofocus - boolean
  // disabled - optional
  // name - optional
  // required - optional
  // radioClass - string
  // radioId - string
  // tabindex - number
  // ariaLabelledby - string
  // ariaDescribedby - string

  defaultLayout: null, // ie8 support

  attributeBindings: [
    'autofocus',
    'checked',
    'disabled',
    'name',
    'required',
    'tabindex',
    'type',
    'value',
    'ariaLabelledby:aria-labelledby',
    'ariaDescribedby:aria-describedby',
    'checked:aria-checked'
  ],

  checked: computed('model', 'value', function () {
    return isEqual(this.get('model'), this.get('value'));
  }).readOnly(),

  sendChangedAction() {
    if (this.get('changed')) {
      this.get('changed')(this.get('value'), this.get('item'));
    }
  },

  change() {
    let value = this.get('value');
    let model = this.get('model');

    if (model !== value) {
      // this.set('model', value); // violates DDAU
      once(this, 'sendChangedAction');
    }
  }
});
