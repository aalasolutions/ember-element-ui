import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-col', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{el-col}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      <ElCol>
        template block text
      </ElCol>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');

    this.set('gutter', '20');
    await render(hbs`{{el-col gutter=gutter }}`);

    this.set('lg', 20);
    await render(hbs`{{el-col lg=lg}}`);

    this.set('lg', { lg: 20, span: 10 });
    await render(hbs`{{el-col lg=lg}}`);

    assert.equal(this.element.textContent.trim(), '');
  });
});
