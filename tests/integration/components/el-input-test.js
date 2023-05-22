import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-input}}`);

    assert.equal(this.element.textContent.trim(), '');

    this.set('clearable', true);
    this.set('disabled', false);
    this.set('readonly', false);
    this.set('value', 'Test');

    await render(
      hbs`{{el-input clearable=clearable  disabled=disabled readonly=readonly value=value }}`
    );

    this.set('needStatusIcon', true);
    this.set('suffixIcon', 'icon');
    this.set('showClear', false);

    await render(
      hbs`{{el-input clearable=clearable needStatusIcon=needStatusIcon suffixIcon=suffixIcon showClear=showClear}}`
    );

    this.set('type', 'textarea');
    this.set('size', 'large');
    this.set('showClear', true);

    await render(hbs`{{el-input type=type size=size showClear=showClear}}`);

    await click('.el-input__icon');
  });
});
