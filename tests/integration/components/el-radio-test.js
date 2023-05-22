import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-radio', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-radio}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElRadio>
        template block text
      </ElRadio>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');

    this.set('size', 'small');
    await render(hbs`{{el-radio size=size}}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
