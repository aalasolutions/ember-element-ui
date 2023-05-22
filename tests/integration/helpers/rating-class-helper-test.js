import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | rating-class-helper', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('item', 2);
    this.set('classes', ['blue', 'el-icon-star-on']);
    this.set('style', true);
    this.set('disabled', false);
    this.set('color', true);
    this.set('lowThreshold', 1);
    this.set('highThreshold', 5);
    this.set('max', 4);
    this.set('colors', ['red', 'green', 'blue']);
    this.set('currentValue', 1);
    this.set('value', 3);
    this.set('disabledVoidColor', 'orange');

    await render(
      hbs`{{rating-class-helper item classes style disabled color lowThreshold highThreshold max colors currentValue value disabledVoidColor}}`
    );
    assert.equal(this.element.textContent.trim(), 'color: red;');

    this.set('currentValue', 5);

    await render(
      hbs`{{rating-class-helper item classes style disabled color lowThreshold highThreshold max colors currentValue value disabledVoidColor}}`
    );
    assert.equal(this.element.textContent.trim(), 'color: green;');

    this.set('currentValue', 9);

    await render(
      hbs`{{rating-class-helper item classes style disabled color lowThreshold highThreshold max colors currentValue value disabledVoidColor}}`
    );
    assert.equal(this.element.textContent.trim(), 'color: blue;');

    this.set('max');
    await render(
      hbs`{{rating-class-helper item classes style disabled color lowThreshold highThreshold max colors currentValue value disabledVoidColor}}`
    );
    assert.equal(this.element.textContent.trim(), 'color: blue;');
  });
});
