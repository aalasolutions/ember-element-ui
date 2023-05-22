import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | el-divider', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`{{el-divider}}`);
    assert.equal(this.element.textContent.trim(), '');

    await render(hbs`
      <ElDivider>
        template block text
      </ElDivider>
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });

  test('Direction', async function (assert) {
    this.set('direction', 'vertical');
    await render(hbs`
      <ElDivider @direction="vertical">
        divider
      </ElDivider>
    `);

    assert.equal(this.element.textContent.trim(), 'divider');
  });

  test('Content Position', async function (assert) {
    this.set('contentPosition', 'center');
    await render(hbs`
      <ElDivider @contentPosition="vertical">
        divider
      </ElDivider>
    `);

    assert.equal(this.element.textContent.trim(), 'divider');
  });

  test('Content Position', async function (assert) {
    this.set('contentPosition', 'center');
    await render(hbs`
      <ElDivider @contentPosition="vertical">
        divider
      </ElDivider>
    `);

    assert.equal(this.element.textContent.trim(), 'divider');
  });
});
