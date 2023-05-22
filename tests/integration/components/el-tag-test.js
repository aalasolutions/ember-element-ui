import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-tag', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-tag}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElTag>
        template block text
      </ElTag>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('Check size and Types', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('type', 'warning');
    this.set('size', 'large');
    this.set('closable', true);

    await render(hbs`
      <ElTag @type={{type}} @size={{size}}>
        template block text
      </ElTag>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
    this.set('myAction', function (val) {
      // console.log(val);
      assert.equal(val, 1);
    });

    await render(hbs`
      <ElTag @closable={{closable}} @close={{myAction}}>
        template block text
      </ElTag>
    `);

    await click('.el-icon-close');
    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
