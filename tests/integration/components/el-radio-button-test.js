import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-radio-button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-radio-button}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElRadioButton>
        template block text
      </ElRadioButton>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');

    this.set('size', 'large');
    this.set('changed', function (v, n) {
      assert.equal(v, 'test', 'fetch closure action called with search value');
      assert.equal(n, 'test', 'fetch closure action called with search value');
    });
    await render(hbs`{{el-radio-button size=size changed=changed}}`);
  });
});
